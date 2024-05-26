import serial
import sys
import time
import math
import json
import requests
port = "/dev/tty.usbmodem1101"
baudrate = 19200
#setting up serial with the micro controller
ser = serial.Serial(port, baudrate, timeout=0.001)
url = 'http://apps.hude.earth:4300/ImOnline'
GPSUrl = "http://apps.hude.earth:4300/gps"
def send_gps(latitude,longitude):
        #Sending GPS dat to my server and then back down to amiga
        params = {
            'latitude': latitude,
            'longitude': longitude
        }
        response = requests.get(GPSUrl, params=params)
        print("Sending Gps data", params)
        print(response)
def adjust_gps(latitude, longitude, accuracy):
    # Convert accuracy from degrees to meters
    if accuracy != 0:
        meters_accuracy = accuracy * 111139
        adjusted_lat = latitude + (accuracy / 111139)  # Adjust latitude
        adjusted_lon = longitude - (accuracy / (111139 * math.cos(math.radians(latitude))))  # Adjust longitude
        return {'latitude': adjusted_lat, 'longitude': adjusted_lon}
    else:
        return {'latitude': latitude, 'longitude': longitude}

accuracy = 0
while True:
    #Reading the main line from the serial port
    received_data = ser.readline().decode('utf-8').strip()
    if received_data == "Waiting for fix...":
        print("Looking for GPS Satellites")
    else:
        #If the data seems correct then process it
        splitData = received_data.split(",")
        if len(splitData) >= 2:  # Check if splitData contains at least two elements
            latitude = float(splitData[0])  # Latitude is at index 1
            longitude = float(splitData[1])  # Longitude is at index 2
            adjusted_gps = adjust_gps(latitude, longitude,accuracy)
            response = requests.get(url)
            #Printing out procesed GPS data
            print("Adjusted Latitude:", adjusted_gps['latitude'], "Original Latitude: ", latitude)
            print("Adjusted Longitude:", adjusted_gps['longitude'], "Original Longitude: ", longitude)
            send_gps(latitude,longitude)
            new_data = {
                "id": 1,
                "latitude": adjusted_gps['latitude'],
                "longitude": adjusted_gps['longitude']
            }      
            # with open("points.json", "a") as file:
            #     json.dump(new_data, file)
            #     file.write("\n")  # Append a newline after each JSON object
        else:
            print("Invalid data format:", received_data)
    time.sleep(1)  # Add a 1-second delay between iterations
