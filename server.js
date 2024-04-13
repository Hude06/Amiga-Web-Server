const express = require('express');
const fs = require('fs');
const cors = require('cors');
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
// Load existing data from JSON file, if any
let cordsData = loadCordsData();
// Define route to handle latitude and longitude
const corsOptions = {
    origin: '*', // You can replace '*' with your specific domain
};
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/cords', (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  // Update data with new coordinates
  if (latitude !== undefined && longitude !== undefined) {
    cordsData.cords.push({ latitude: latitude, longitude: longitude });
    saveCordsData(cordsData);
  }

  res.send('Latitude: ' + latitude + ', Longitude: ' + longitude + ' added successfully.');
});

// Define route to reset data
app.get('/reset', (req, res) => {
  // Overwrite the data with an empty array
  data.cords = [];
  // Save the empty data
  saveCordsData(data);
  // Send a success response
  res.send('Data reset successfully.');
});

// Function to load data from JSON file
function loadCordsData() {
  try {
    const data = fs.readFileSync('points.json');
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
