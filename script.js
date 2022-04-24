const gameController = (() => {
    const winningSpaces = [[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2, 5,8], [2,4,6], [3, 4,5], [6,7,8]];
    let turnPlayer;
    const turnChange = (currentPlayer) => {
        turnPlayer = currentPlayer;
    }
    const getTurnPlayer = () => {
        console.log('in getTurnPlayer');
        return turnPlayer;
    }
    const checkBoardState = () => {
        winningSpaces.forEach( (combo) => {
            if (isWin(combo)) {
                console.log('win');
            }
            return;
        })

    }

    const isWin = (arr) => {
        let index1 = arr[0];
        let index2 = arr[1];
        let index3 = arr[2];
        return ((gameBoard.getBoard(index1) != '')) &&
            (gameBoard.getBoard(index1) == gameBoard.getBoard(index2)) && 
        (gameBoard.getBoard(index1) == gameBoard.getBoard(index3));
    }
    const listener = () => {
        const panels = document.querySelectorAll("div.board-panel");
        panels.forEach(panel => panel.addEventListener('click', panelClick));
    }    
    
    const panelClick = (e) => {
        const panel = e.target;
        const panelIndex = panel.dataset.index;
        gameBoard.placeMarker(panelIndex, 'x');
        checkBoardState();
        listener();
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
    }
    const clearBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = (index=-1) => { 
        if (index < 0) {
            return board;
        }
        else return board[index];
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