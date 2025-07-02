import { setupToolButtons } from './buttonListeners.js';
import { sendCanvasForPrediction } from './predictionService.js';

const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');

setupToolButtons((tool) => {
    if (tool === "eraser") {
        canvas.style.transition = "opacity 0.2s ease";
        canvas.style.opacity = "0";
        
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = "1";
        }, 150);
    }
});

const scaleCanvas = () => {
    const cssWidth = canvas.offsetWidth;
    const cssHeight = canvas.offsetHeight;

    canvas.width = cssWidth;
    canvas.height = cssHeight;

    ctx.lineWidth = 4; 
    ctx.strokeStyle = 'black'; 
};    

scaleCanvas();

window.addEventListener("resize", scaleCanvas);

let isDrawing = false;
let drawTimeout;
let delay = 500; // 0.5 seconds delay

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    clearTimeout(drawTimeout);
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    clearTimeout(drawTimeout);
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();

    drawTimeout = setTimeout(() => {
        sendCanvasForPrediction(canvas); 
    }, delay); 
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.closePath();

    drawTimeout = setTimeout(() => {
        sendCanvasForPrediction(canvas);
    }, delay);
});

