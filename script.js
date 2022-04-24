const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
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
        placeMarker
    };
})();

const gameController = (() => {
    let turnPlayer;
    const turnChange = (currentPlayer) => {
        turnPlayer = currentPlayer;
    }
    
    return {
        turnChange
    };
})

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