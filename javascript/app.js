const canvas = document.querySelector('#jsCanvas'),
    ctx = canvas.getContext('2d'),
    colors = document.querySelectorAll('.jsColor'),
    range = document.querySelector('#jsRange'),
    mode = document.querySelector('#jsMode');

let isPainting = false, // defines whether it is painting or not
    isFilling = false; // defines whether current mode is filling or not

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

function onColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function onRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function onModeClick(event) {
    if (!isFilling) { // if current mode is filling mode
        isFilling = true;
        mode.innerText = "drawing";
    } else { // if current mode is not drawing mode
        isFilling = false;
        mode.innerText = "filling";
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


function init() { // init function
    if (canvas) { // if canvas exists, not null
        canvas.addEventListener("mousemove", onMouseMove); // when mouse moves
        canvas.addEventListener("mousedown", startPainting); // when mouse click begins
        canvas.addEventListener("mouseup", stopPainting); // when mouse click finishes
        canvas.addEventListener("mouseleave", stopPainting); // when mouse leaves the canvas
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
}

init(); // starts code