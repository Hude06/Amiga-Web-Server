const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
// Load existing data from JSON file, if any
let cordsData = loadCordsData();

// Define route to handle latitude and longitude
app.get('/cords', (req, res) => {
    res.send("Loading")
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;

    // Update data with new coordinates
    if (latitude !== undefined && longitude !== undefined) {
        if (latitude > 90) {
            latitude = 90
        }
        if (latitude < -90) {
            latitude = -90
        }
        if (longitude > 180) {
            longitude = 180
        }
        if (longitude < -180) {
            longitude = -180
        }
        cordsData.cords.push({ latitude: parseFloat(latitude), longitude: parseFloat(longitude)});
        saveCordsData(cordsData);
    }

    res.send('Latitude: ' + latitude + ', Longitude: ' + longitude + ' added successfully.');
});

// Function to load data from JSON file
function loadCordsData() {
    try {
        const data = fs.readFileSync('../points.json');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading cordsData.json:', err);
        return { cords: [] };
    }
}
// Function to save data to JSON file
function saveCordsData(data) {
    fs.writeFile('points.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing cordsData.json:', err);
        } else {
            console.log('cordsData.json updated successfully.');
        }
    });
}
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
