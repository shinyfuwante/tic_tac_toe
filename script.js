const gameController = (() => {
    const winningSpaces = [[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2, 5,8], [2,4,6], [3, 4,5], [6,7,8]];
    let players = [];
    let turnPlayer;
    const setFirstPlayer = (player) => {
        turnPlayer = player;
    }
    const loadPlayers = (player1, player2) => {
        players.push(player1, player2);
        setFirstPlayer(players[0]);
    }

    const getPlayers = () => {
        players;
    }

    const turnChange = () => {
        if (turnPlayer == players[0]) turnPlayer = players[1];
        else turnPlayer = players[0];
    }
    const getTurnPlayer = () => {
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
        if (gameBoard.placeMarker(panelIndex, gameController.getTurnPlayer().marker())) {
            checkBoardState();
            gameController.turnChange();
        }
        listener();
    }
    
    return {
        getTurnPlayer,
        listener,
        loadPlayers,
        turnChange
    };
})();

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const isEmpty = (index) => {
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
            return true;
        } 
        alert('The space is occupied!');
        return false;

    }
    const clearBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = (index=-1) => { 
        if (index < 0) {
            return board;
        }
        else return board[index];
    }
    //todo deal with a full board and tying
    return {
        clearBoard, 
        createBoard,
        getBoard,
        placeMarker
    };
})();

const playerFactory = (name, symbol) => {
    const marker = () => symbol;
    const playerName = () => name; 
    return {
        marker,
        playerName
    };

}

const playerOne = playerFactory('me', 'x');
const playerTwo = playerFactory('you', 'o');
gameController.loadPlayers(playerOne, playerTwo);
gameBoard.createBoard();