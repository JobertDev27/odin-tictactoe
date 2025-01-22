function player (name) {
    name;
    let symbol;
    let score = 0;

    const getName = () => name;
    const addScore = () => score++;
    const getScore = () => score;
    const setSymbol = item => symbol = item;
    const getsymbol = () => symbol;

    return {getName, setSymbol, addScore, getScore, getsymbol};
};

(function game () {
    const grid = document.querySelectorAll("#boxArea > div");
    const player1Name = document.getElementById("p1-name");
    const player2Name = document.getElementById("p2-name");
    const player1Score = document.getElementById("p1-score");
    const player2Score = document.getElementById("p2-score");

    player1 = player("John");
    player1Name.textContent = player1.getName();
    player1.setSymbol("X");
    player1.score = 0;

    player2 = player("Doe");
    player2Name.textContent = player2.getName();
    player2.setSymbol("O");
    player2.score = 0;

    let currentPlayer = player1;

    grid.forEach(tile => {
        tile.addEventListener("click", () => {
            tile.textContent = currentPlayer.getsymbol();
            checkStatus();
            if (checkStatus()) {
                win(currentPlayer);
            }
            turnHandling();
        });
    });

    const turnHandling = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
    };

    const checkStatus = () => {
        return (
            (
            grid[0].textContent === grid[3].textContent &&
            grid[0].textContent === grid[6].textContent &&
            grid[0].textContent != ""
            )
        );
    };

    const win = (winner) => {
        setTimeout( function() {
            alert(`${winner.name} WINS`);
            grid.forEach(tile => tile.textContent = "");
        }, 200 );
        winner.addScore();
        console.log(player1.getScore());
        console.log(player2.getScore());
        player1Score.textContent = player1.getScore();
        player2Score.textContent = player2.getScore();
        
    };
})();