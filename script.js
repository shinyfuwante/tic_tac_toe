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
        gameBoard.placeMarker(panelIndex, 'x');
    }
    
    return {
        turnChange,
        getTurnPlayer,
        listener
    };
})();

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const isEmpty = (index) => {
        console.log(index);
        return board[index] == '';
    }

    const createBoard = () => {
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
            board[panelIndex] = playerMark;

            const panel = document.querySelector(`[data-index='${panelIndex}']`);
            panel.innerText = playerMark;
        } else { 
            alert('The space is occupied!');
        }
        gameController.listener();
    }
    const clearBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => { 
        return board;
    }
    return {
        clearBoard, 
        createBoard,
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
gameBoard.createBoard();