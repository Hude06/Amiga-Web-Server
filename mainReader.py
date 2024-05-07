import serial
import sys
import time
import math
import json
port = "/dev/tty.usbmodem101"
baudrate = 19200
ser = serial.Serial(port, baudrate, timeout=0.001)
url_post = "https://judemakes.dev/posts"
def adjust_gps(latitude, longitude, accuracy):
    # Convert accuracy from degrees to meters
    meters_accuracy = accuracy * 111139

    # Generate random offsets within the accuracy circle
    # Adjust latitude and longitude
    adjusted_lat = latitude + accuracy
    adjusted_lon = longitude - accuracy
    # adjusted_lat = latitude + meters_accuracy / 111139
    # adjusted_lon = longitude - meters_accuracy / (111139 * math.cos(latitude * math.pi / 180))

    return {'latitude': adjusted_lat, 'longitude': adjusted_lon}

accuracy = 0.000267  # Horizontal accuracy in degrees

while True:
    received_data = ser.readline().decode('utf-8').strip()
    if received_data == "Waiting for fix...":
        print("Looking for GPS Satellites")
    else:
        splitData = received_data.split(",")
        if len(splitData) >= 2:  # Check if splitData contains at least two elements
            latitude = float(splitData[0])
            longitude = float(splitData[1])
            adjusted_gps = adjust_gps(latitude, longitude, accuracy)
            print("Adjusted Latitude:", adjusted_gps['latitude'],"Original Latitude: ",splitData[0])
            print("Adjusted Longitude:", adjusted_gps['longitude'],"Original Longitude: ",splitData[1])
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
