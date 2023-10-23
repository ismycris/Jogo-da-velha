const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[Data-board]'); // Use querySelector para selecionar o elemento específico
const winningMessageTextelement = document.querySelector();

let isCircleTurn;

const winningCombinations =[
    [0, 1, 2],
    [3, 4, 5,],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startgame = () => {
    for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, { once: true });
    }
    isCircleTurn = false; // Remova a declaração da variável aqui

    board.classList.add('x');
};

const endGame = (draw) =>{

};


const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        //vai conferir se esta em todas as celulas da combinacao
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    // Remova ambas as classes do tabuleiro e, em seguida, adicione a classe apropriada com base no turno
    board.classList.remove('circle', 'x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
};

const handleClick = (e) => {
    // Colocar a marca (X ou círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x"; // É a vez do círculo? Se não, é o X

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);
    if(isWin){
        console.log("winner");
    }
    // Verificar por empate

    //muda o simbolo
      swapTurns(); // Trocar o turno após cada jogada

}

startgame();