let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d"); 

function plotGps(longitude,lattitude) {
    ctx.fillRect(longitude,lattitude,10,10)
}
plotGps(10,10)