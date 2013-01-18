var WIDTH = 465;
var HEIGHT = 465;
var INNERLINEWIDTH = 8;
var OUTERLINEWIDTH = 13;
var BG_IMG = 'http://jsrun.it/assets/h/l/z/y/hlzyr.jpg';
var COLOR1_RGB = [150, 120, 80];
var COLOR2_RGB = [220, 180, 121];
var COLOR1_DEC = 50;
var COLOR2_INC = 20;

var canvas,context;
var isDraw = false;
var imgData;

canvas = document.getElementById("world");
canvas.width = WIDTH;
canvas.height = HEIGHT;
context = canvas.getContext("2d");

canvas.addEventListener("mouseup", MouseUp);
canvas.addEventListener("mousedown", MouseDown);
canvas.addEventListener("mousemove", MouseMove);
canvas.addEventListener("mouseout", MouseOut);

/* BackGround Image */
var img = new Image();
img.src = BG_IMG + '?' + new Date().getTime();
img.onload = function() {
    var canvasPattern = context.createPattern(img, 'repeat');
    context.fillStyle = canvasPattern;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    
    imgData = context.getImageData(0, 0, WIDTH, HEIGHT);
}

/* Mouse Event */
function MouseUp(e) {
    isDraw = false;
}
function MouseDown(e) {
    isDraw = true;
    drawLine(e);
}
function MouseMove(e) {
    if (isDraw)  drawLine(e);
}
function MouseOut(e) {
    isDraw = false;
}

function drawLine(e) {
    var dx, dy, dw, dh;
    var x = e.clientX;
    var y = e.clientY;
    var data = imgData.data;
    
    for (dy = y - OUTERLINEWIDTH, dh = y + OUTERLINEWIDTH; dy < dh; dy++) {
        for (dx = x - OUTERLINEWIDTH, dw = x + OUTERLINEWIDTH; dx < dw; dx++) {
            var i = (dx + (dy * WIDTH)) * 4;
            
            if (data[i] > COLOR1_RGB[0] && data[i + 1] > COLOR1_RGB[1] && data[i + 2] > COLOR1_RGB[2]) { 
                
                if ( Math.pow((x - dx), 2) + Math.pow((y - dy), 2) <= Math.pow(INNERLINEWIDTH, 2) ) {
                    data[i]     -= COLOR1_DEC;
                    data[i + 1] -= COLOR1_DEC;
                    data[i + 2] -= COLOR1_DEC;
                    
                } else if ( Math.pow((x - dx), 2) + Math.pow((y - dy), 2) <= Math.pow(OUTERLINEWIDTH, 2) ) {
                    
                    if (data[i] < COLOR2_RGB[0] && data[i + 1] < COLOR2_RGB[1] && data[i + 2] < COLOR2_RGB[2]) {
                        data[i]     += COLOR2_INC;
                        data[i + 1] += COLOR2_INC;
                        data[i + 2] += COLOR2_INC;
                    }
                }
            }
        }
    }
    imgData.data = data;
    context.putImageData(imgData, 0, 0);
}
