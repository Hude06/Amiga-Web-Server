const express = require('express');
// Create an Express application
const app = express();
let droneOnline = false;
// Define a route
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
app.get('/', (req, res) => {
  res.send('Hello, world!');
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
