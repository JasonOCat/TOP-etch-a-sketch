

const containerDiv = document.querySelector('.container');

function changeBackground(event) {
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
        event.target.style.backgroundColor = getRandomRGB();
    }

}

function addHoverListenersToSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', changeBackground));
}



function askGridSize() {
    let gridSize;
    let isVadidSize = false;
    do {
        gridSize = prompt("Choose a grid size between 1 and 100");
        if (gridSize === null) {
            return;
        }
        isVadidSize = !isNaN(gridSize) && gridSize >= 1 && gridSize <= 100;
        if (!isVadidSize) {
            alert("Wrong size format");
        }
    }
    while (!isVadidSize);

    containerDiv.textContent = "";

    buildGrid(gridSize);
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
    });
}

function getRandomRGBOneColor() {
    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}

function getRandomRGB() {
    return `rgb(${getRandomRGBOneColor()}, ${getRandomRGBOneColor()}, ${getRandomRGBOneColor()})`
}


// Start
buildGrid(20);
addHoverListenersToSquares()


