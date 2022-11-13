
const containerDiv = document.querySelector('.container');

let mouseDown = false
let currentGridSize = 20;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


let currentColor = "green";

const rainbowColorBtn = document.querySelector('#btn-rainbow-color');
const greenColorBtn = document.querySelector('#btn-green-color');
const erazerBtn = document.querySelector('#btn-erazer');

rainbowColorBtn.onclick = () =>  {
    if (currentColor == 'rainbow') {
        return;
    }
    setCurrentColor('rainbow');
    removeActive();
};

greenColorBtn.onclick = () => {
    if (currentColor == 'green') {
        return;
    }
    setCurrentColor('green');
    removeActive();
};

erazerBtn.onclick = () => {
    if (currentColor == 'erazer') {
        return;
    }
    setCurrentColor('erazer');
    removeActive();
};

function removeActive() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.classList.remove("active");
    })
}

function setCurrentColor(newColor) {
    currentColor = newColor;
    updateButtonsColor(newColor);
}

function updateButtonsColor(newColor) {
    if (newColor === 'green') {
        greenColorBtn.classList.add("active");
        rainbowColorBtn.classList.remove("active");
        erazerBtn.classList.remove("active");
    } else if (newColor === 'erazer') {
        erazerBtn.classList.add("active");
        greenColorBtn.classList.remove("active");
        rainbowColorBtn.classList.remove("active");
    } else {
        rainbowColorBtn.classList.add("active");
        greenColorBtn.classList.remove("active");
        erazerBtn.classList.remove("active");
    }
}

function changeColor(event) {
    if (event.type === 'mouseover' && !mouseDown) {
        return;
    }

    if (currentColor == "erazer") {
        event.target.style.backgroundColor = "white";
        event.target.setAttribute("data-brightness", 100);
        event.target.style.filter = `brightness(100%)`;
        return;
    }
 
    if (event.target.classList.contains("active")) {
        let brightness = event.target.getAttribute("data-brightness");

        if (brightness >= 20) {
            brightness -= 20;
            event.target.setAttribute("data-brightness", brightness);
            event.target.style.filter = `brightness(${brightness}%)`;
        }
        else {
            return;
        }

    } else {
        event.target.classList.toggle("active");
        event.target.setAttribute("data-brightness",100);
        event.target.style.filter = "brightness(100%)";
        if (currentColor == "green") {
            event.target.style.backgroundColor = "green";
        } else {
            event.target.style.backgroundColor = getRandomRGB();
        }
    }

}

function addHoverListenersToSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', changeColor));
}


function askGridSize() {
    let isVadidSize = false;
    do {
        currentGridSize = prompt("Choose a grid size between 1 and 100");
        if (currentGridSize === null) {
            return;
        }
        isVadidSize = !isNaN(currentGridSize) && currentGridSize >= 1 && currentGridSize <= 100;
        if (!isVadidSize) {
            alert("Wrong size format");
        }
    }
    while (!isVadidSize);

    containerDiv.textContent = "";

    buildGrid(currentGridSize);
    addHoverListenersToSquares()
}

function buildGrid(gridSize) {
    let squareDiv;
    for (let i = 0; i < gridSize * gridSize; i++) {
        squareDiv = document.createElement('div');
        squareDiv.setAttribute('class', 'square');
        squareDiv.style.filter = 'brightness(100%)';
        squareDiv.setAttribute('data-brightness', 100);
        squareDiv.style.width = `calc(100% / ${gridSize})`;
        containerDiv.appendChild(squareDiv);
    }

}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = "white";
        square.style.filter = "";
        square.setAttribute("filter",'brightness(100%)');
        square.setAttribute('data-brightness', 100);
        square.classList.remove("active");
    });
}


function getRandomRGBOneColor() {
    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}

function getRandomRGB() {
    return `rgb(${getRandomRGBOneColor()}, ${getRandomRGBOneColor()}, ${getRandomRGBOneColor()})`
}


// Start
buildGrid(currentGridSize);
addHoverListenersToSquares()


