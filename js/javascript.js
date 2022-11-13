

const containerDiv = document.querySelector('.container');

function changeBackground(event) {
    event.target.style.backgroundColor = "green";
}



function askGridSize() {
    let gridSize;
    let isVadidSize = false;
    do {
        gridSize = prompt("Choose a grid size between 1 and 100");
        if( gridSize === null) {
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
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', changeBackground));
}

function buildGrid(gridSize) {
    let squareDiv;
    for (let i = 0; i < gridSize * gridSize; i++) {
        squareDiv = document.createElement('div');
        squareDiv.setAttribute('class', 'square');
        squareDiv.style.width = `calc(100% / ${gridSize})`;
        containerDiv.appendChild(squareDiv);
    }

}

buildGrid(4);


const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('mouseover', changeBackground));

