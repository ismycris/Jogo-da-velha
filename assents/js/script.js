const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[data-board]');
const winningMessageTextelement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector('[data-winning-Message]');
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn;
let lastWinner = null;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startgame = () => {
    if (lastWinner === 'X Venceu') {
        isCircleTurn = false;
    } else if (lastWinner === 'Círculo Venceu') {
        isCircleTurn = true;
    } else {
        // Caso não haja vencedor anterior, comece com um jogador aleatório
        isCircleTurn = Math.random() < 0.5;
}

    for (const cell of cellElements) {
    cell.classList.remove('circle', 'x');
    cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();

    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextelement.innerText = 'Empate!';
    } else {
        const winner = isCircleTurn ? 'O Venceu!' : 'X Venceu!';
        winningMessageTextelement.innerText = winner;
        lastWinner = winner;
    }

    winningMessage.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
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
    board.classList.remove("circle", "x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if (isWin || isDraw) {
        endGame(isDraw);
    } else {
        swapTurns();
    }
};

startgame();

restartButton.addEventListener('click', startgame);
