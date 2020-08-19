const canvas = document.querySelector('#jsCanvas'),
    ctx = canvas.getContext('2d');
let isPainting = false; // defines whether it is painting or not

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#34495e";
ctx.lineWidth = 2.5;

function startPainting() {
    isPainting = true;
}

function stopPainting() {
    isPainting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!isPainting) { // when not clicked
        ctx.beginPath(); // make path
        ctx.moveTo(x, y); // set location of path
    } else { // when clicked
        ctx.lineTo(x, y); // make line from previous path to current location
        ctx.stroke(); // draw line
    }
}

// function onMouseDown(event) {
//     startPainting();
// }
// deleted because it's useless

// function onMouseUp(event) {
//     stopPainting();
// }
// deleted because it's useless

if (canvas) { // if canvas exists
    canvas.addEventListener("mousemove", onMouseMove); // when mouse moves
    canvas.addEventListener("mousedown", startPainting); // when mouse click begins
    canvas.addEventListener("mouseup", stopPainting); // when mouse click finishes
    canvas.addEventListener("mouseleave", stopPainting); // when mouse leaves the canvas
}