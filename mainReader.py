import serial
import sys
import json

port = "/dev/tty.usbmodem11301"
baudrate = 9600
ser = serial.Serial(port, baudrate, timeout=0.001)

output_file = "points.json"  # File to save data in JSON format
coords = []  # List to store coordinates

with open(output_file, "a") as file:
    while True:
        # Read latitude and longitude values separately
        latitude_str = ser.readline().decode('utf-8').strip()
        longitude_str = ser.readline().decode('utf-8').strip()

        # Check if latitude or longitude string is empty
        if not latitude_str or not longitude_str:
            continue  # Skip empty lines

        try:
            # Convert latitude and longitude strings to float values
            latitude = float(latitude_str)
            longitude = float(longitude_str)

            # Print data to console
            print("Latitude:", latitude)
            print("Longitude:", longitude)

            # Append coordinates to the list
            coords.append({"latitude": latitude, "longitude": longitude})

            # Write coords to file in JSON format
            file.seek(0)  # Move to the beginning of the file
            file.truncate()  # Clear file contents
            file.write(json.dumps({"cords": coords}, indent=2))  # Write coords to file
            file.flush()  # Ensure data is written immediately
        except ValueError:
            print("Error: Invalid latitude or longitude value")
            continue  # Skip lines with invalid values
