let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Real-world latitude and longitude points
class Point {
    constructor(latitude,longitude,scalledX,scalledY) {
        this.latitude = latitude;
        this.longitude = longitude;

        this.scalledX = scalledX
        this.scalledY = scalledY
    }
    plot() {
        this.scalledX = (this.longitude + 180) * (canvas.width / 360);
        this.scalledY = (90 - this.latitude) * (canvas.height / 180);
        ctx.fillRect(this.scalledX - 5, this.scalledY - 5, 10, 10); // Adjusted by -5 to center the rectangle
    }
}

let point1 = new Point(10.7128,-74.0060)
let point2 = new Point(35.6895,139.6917)
let point3 = new Point(36.57227534133874,-119.34141253053983)

let points = [point1,point2,point3]
function drawLine(point1,point2) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(point1.scalledX, point1.scalledY); // Move the pen to (30, 50)
    ctx.lineTo(point2.scalledX, point2.scalledY); // Draw a line to (150, 100)
    ctx.stroke();
}
for (let i = 0; i < points.length; i++) {
   points[i].plot();
}
drawLine(points[0],points[1])
drawLine(points[0],points[2])


