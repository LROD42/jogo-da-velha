const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text");
const winningMessage = document.querySelector("[data-winning-message");
const restartButton = document.querySelector("[data-restart-button");

let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isCircleTurn = true;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");

};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "X Venceu!" : "O Venceu!";
    }

    winningMessage.classList.add("show-winning-message");
}

const handleRestartClick = () => {}

const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd); 
};

const setBoardHoverClass = () => {
    board.classList.remove("x");
    board.classList.remove("circle");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => {
    // Colocar a marca (x ou circulo)
        const cell = e.target;
        const classToAdd = isCircleTurn ? "circle" : "x";

        placeMark(cell, classToAdd);

    //Mudar a Marca
        swapTurns ();
    // Verificar condição Vitória
        const isWin = checkForWin(classToAdd);
    
    // Verificar condição empate
        const isDraw = checkForDraw();
        if (isWin) {
            endGame(false);
        } else if (isDraw) {
            endGame(true);
        };
        
        
       
        };

startGame ();

restartButton.addEventListener("click", startGame); 

