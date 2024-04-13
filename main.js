let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
fetch('./points.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.cords.length; i++) {
        points.push(new Point(data.cords[i].latitude,data.cords[i].longitude))
    }
    for (let i = 0; i < points.length; i++) {
        points[i].plot();
     }
  })
  .catch(error => console.error('Error fetching JSON:', error));
// Real-world latitude and longitude points
class Point {
    constructor(latitude,longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.scalledX = 0;
        this.scalledY = 0;
    }
    plot() {
        this.scalledX = (this.longitude + 180) * (canvas.width / 360);
        this.scalledY = (90 - this.latitude) * (canvas.height / 180);
        ctx.fillRect(this.scalledX - 5, this.scalledY - 5, 10, 10); // Adjusted by -5 to center the rectangle
    }
}
let points = []
function drawLine(point1,point2) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(point1.scalledX, point1.scalledY); // Move the pen to (30, 50)
    ctx.lineTo(point2.scalledX, point2.scalledY); // Draw a line to (150, 100)
    ctx.stroke();
}
function calcDist(point1,point2) {
    let xDist = point1.scalledX - point2.scalledX;
    let yDist = point1.scalledY - point2.scalledY;
    return { x: Math.abs(xDist), y: Math.abs(yDist) };
}
setTimeout(() => {
    for (let i = 0; i < points.length; i++) {
        if (i-1 !== -1) {
            console.log(calcDist(points[i-1],points[i]))
            drawLine(points[i-1],points[i])

        } else {
            console.log("0")
        }
    }
}, 200);
  

