// Seleção de elementos no DOM
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[data-board]');
const winningMessageTextelement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector('[data-winning-Message]');
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn; // Variável para controlar de quem é a vez de jogar
let lastWinner = null; // Variável para controlar o último vencedor

// Combinações vencedoras no jogo da velha
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

// Função para iniciar o jogo
const startgame = () => {
    // Determinar de quem é a vez de jogar com base no vencedor anterior
    if (lastWinner === 'X Venceu') {
        isCircleTurn = false;
    } else if (lastWinner === 'Círculo Venceu') {
        isCircleTurn = true;
    } else {
        // Caso não haja vencedor anterior, comece com um jogador aleatório
        isCircleTurn = Math.random() < 0.5;
    }

  // Configurar os eventos de clique nas células
    for (const cell of cellElements) {
        cell.classList.remove('circle', 'x');
        cell.addEventListener('click', handleClick, { once: true });
    }

  setBoardHoverClass(); // Configurar a classe de destaque no tabuleiro

  winningMessage.classList.remove('show-winning-message'); // Ocultar mensagem de vitória
};

// Função para encerrar o jogo
const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextelement.innerText = 'Empate!';
    } else {
        const winner = isCircleTurn ? 'Círculo Venceu' : 'X Venceu';
        winningMessageTextelement.innerText = winner;
        lastWinner = winner; // Atualizar o último vencedor
    }

  winningMessage.classList.add('show-winning-message'); // Exibir mensagem de vitória
};

// Função para verificar se há um vencedor
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
        return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

// Função para verificar se o jogo terminou em empate
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

// Função para marcar uma célula com "X" ou "O"
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

// Função para configurar a classe de destaque no tabuleiro com base no jogador atual
const setBoardHoverClass = () => {
    board.classList.remove("circle", "x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

// Função para alternar entre os jogadores
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

// Função de tratamento de clique em uma célula
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x"; // Define a marca atual (X ou O)

    placeMark(cell, classToAdd); // Coloca a marca na célula

    const isWin = checkForWin(classToAdd); // Verifica se houve vitória
    const isDraw = checkForDraw(); // Verifica se houve empate

    if (isWin || isDraw) {
        endGame(isDraw); // Encerra o jogo
    } else {
        swapTurns(); // Alterna para o próximo jogador
    }
};

// Inicia o jogo
startgame();

// Configura o evento de clique no botão de reinício para iniciar o próximo jogo
restartButton.addEventListener('click', startgame);
