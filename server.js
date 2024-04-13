const express = require('express');
const app = express();
const port = 3000;
app.get('/cords/:latitude', (req, res) => {
    const latitude = req.params.latitude;
    console.log(latitude)

});
app.get('/cords/:longitude', (req, res) => {
    const longitude = req.params.longitude;
    console.log(longitude)

});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
