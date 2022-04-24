const gameController = (() => {
    let turnPlayer;
    const turnChange = (currentPlayer) => {
        turnPlayer = currentPlayer;
    }
    const getTurnPlayer = () => {
        console.log('in getTurnPlayer');
        return turnPlayer
    }

    const listener = () => {
        const panels = document.querySelectorAll("div.board-panel");
        panels.forEach(panel => panel.addEventListener('click', panelClick));
    }    
    
    const panelClick = (e) => {
        const panel = e.target;
        const panelIndex = panel.dataset.index;
        console.log(panel);
        console.log(panelIndex);
    }
    
    
    return {
        turnChange,
        getTurnPlayer,
        listener
    };
})();

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const isEmpty = (index) = () => {
        return board[index] == '';
    }

    const renderBoard = () => {
        const boardElement = document.querySelector("game-board");
        for (let i = 0; i < board.length; i++) {
            const panel = document.createElement('div');
            panel.classList.add("board-panel");
            panel.dataset.index = i;
            boardElement.appendChild(panel);
        }
        gameController.listener();
    }

    const placeMarker = (panelIndex, playerMark) => {
        if (isEmpty(panelIndex)) {
            board[index] = playerMark;

            const panel = document.querySelector(`[data-index=${panelIndex}]`);
            console.log(panel);
        }
    }
    const clearBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => { 
        return board;
    }
    return {
        clearBoard, 
        renderBoard,
        getBoard,
        placeMarker
    };
})();

const playerFactory = (name) => {
    let score = 0;
    const increaseScore = () => score++;
    const makeMove = () => console.log("move");
    const getScore = () => console.log(score);
    return {
        makeMove, 
        getScore, 
        increaseScore
    };

}

const playerOne = playerFactory('me');
const playerTwo = playerFactory('you');
gameBoard.renderBoard();