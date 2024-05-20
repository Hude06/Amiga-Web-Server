const express = require('express');
const fs = require('fs');
// Create an Express application
const app = express();
let droneOnline = false;
// Define a route
let gpsData = [];
function droneIsOnline() {
    setTimeout(() => {
        droneOnline = false;
        console.log(droneOnline);
        droneIsOnline(); // Call the function recursively after 6 seconds
    }, 6000); // 6000 milliseconds = 6 seconds
}
droneIsOnline(); // Call the function to start the interval
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/gps', (req, res) => {
    const { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    console.log('Received GPS point:', { latitude, longitude });

    const point = { latitude, longitude };
    gpsData.push(point);

    const jsonData = JSON.stringify(gpsData);

    // Write JSON data to file
    fs.writeFile('gps_data.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing data to file:', err);
        }
    });
    // Here you can do something with the received GPS point
    res.json({ message: 'GPS point received successfully' });
});

app.get('/ImOnline', (req, res) => {
    res.send("Sending that IM ONLINE")
    droneOnline = true
    console.log(droneOnline);
})
app.get('/DroneOnline', (req, res) => {
    res.send(droneOnline);
});

// Start the server
const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
