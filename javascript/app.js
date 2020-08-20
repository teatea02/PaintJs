// Initializing Section

const canvas = document.querySelector('#jsCanvas'),
    ctx = canvas.getContext('2d'),
    colors = document.querySelectorAll('.jsColor'),
    range = document.querySelector('#jsRange'),
    mode = document.querySelector('#jsMode'),
    save = document.querySelector('#jsSave');

let isPainting = false, // defines whether it is painting or not
    isFilling = false; // defines whether current mode is filling or not

const DEFAULT_COLOR = "#34495e",
    DEFAULT_LINE_WIDTH = 2.5;

const CANVAS_SIZE = [500, 500]; // width, height

// Width and height of canvas
canvas.width = CANVAS_SIZE[0];
canvas.height = CANVAS_SIZE[1];

// Initializing color of canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

// Initializing color and width of brush
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = DEFAULT_LINE_WIDTH;


// Function Section

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

function onColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function onRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function onModeClick(event) {
    if (isFilling) { // if current mode is filling mode
        isFilling = false;
        mode.innerText = "Draw";
    } else { // if current mode is not drawing mode
        isFilling = true;
        mode.innerText = "Fill";
    }
}

function onCanvasClick(event) {
    if (isFilling) { // if current mode is filling mode
        ctx.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    }
}

function onRightClick(event) {
    event.preventDefault(); // disable right click context menu
}

function onSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs";
    link.click();
}

// function onMouseDown(event) {
//     startPainting();
// }
// deleted because it's useless

// function onMouseUp(event) {
//     stopPainting();
// }
// deleted because it's useless


function main() { // main function
    if (canvas) { // if canvas exists, not null
        canvas.addEventListener("mousemove", onMouseMove); // when mouse moves
        canvas.addEventListener("mousedown", startPainting); // when mouse click begins
        canvas.addEventListener("mouseup", stopPainting); // when mouse click finishes
        canvas.addEventListener("mouseleave", stopPainting); // when mouse leaves the canvas
        canvas.addEventListener("click", onCanvasClick); // when canvas is clicked
        canvas.addEventListener("contextmenu", onRightClick); // when canvas is right-clicked
    }
    
    if (range) { // if range exist
        range.addEventListener("input", onRangeChange);
    }
    
    
    if (colors) {
        // All the codes below does exactly the same thing!
    
        // Arrow Function type 1
        Array.from(colors).forEach(color => color.addEventListener("click", onColorClick));
    
        // Arrow Function type 2
        // Array.from(colors).forEach((color) => {color.addEventListener("click", onColorClick)});
    
        // Immediately-invoked Function type
        // Array.from(colors).forEach(function(color){color.addEventListener("click", onColorClick)});
    }

    if (mode) { // if mode exists
        mode.addEventListener("click", onModeClick);
    }

    if (save) { // if save exists
        save.addEventListener("click", onSaveClick);
    }
}

main(); // starts code