const gameController = (() => {
    let turnPlayer;
    const turnChange = (currentPlayer) => {
        turnPlayer = currentPlayer;
    }
    const whoseTurn = () => {return turnPlayer};
    
    return {
        turnChange,
        whoseTurn,
        listener
    };
})

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const listener = () => {
        const panels = document.querySelectorAll("div.board-panel");
        panels.forEach(panel => panel.addEventListener('click', () => console.log(panel)));
    }
    
    const getBoard = () => { 
        return board;
    }

    const renderBoard = () => {
        const boardElement = document.querySelector("game-board");
        for (let i = 0; i < board.length; i++) {
            const panel = document.createElement('div');
            panel.classList.add("board-panel");
            panel.dataset.index = i;
            boardElement.appendChild(panel);
        }
        listener();
    }

    const clearBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    const placeMarker = (playerMark, coordinate) => {
        if (board[coordinate] == '') {
            board[coordinate] = playerMark;
            return true;
        }
        return false;
    }
    return {
        clearBoard, 
        placeMarker,
        renderBoard,
        getBoard
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