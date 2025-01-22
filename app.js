function player (name) {
    let symbol;
    let score = 0;

    const getName = () => name;
    const addScore = () => score++;
    const getScore = () => score;
    const setSymbol = item => symbol = item;
    const getsymbol = () => symbol;

    return {getName, setSymbol, addScore, getScore, getsymbol};
}

(function game () {
    const grid = document.querySelectorAll("#boxArea > div");
    const player1Name = document.getElementById("p1-name");
    const player2Name = document.getElementById("p2-name");
    const player1Score = document.getElementById("p1-score");
    const player2Score = document.getElementById("p2-score");

    const getPlayerName = (promptMessage) => {
        let name;
        while (!name) {
            name = prompt(promptMessage) || "Player";
        }
        return name;
    }

    const player1 = player(getPlayerName("Enter Player 1 Name:"));
    const player2 = player(getPlayerName("Enter Player 2 Name:"));

    player1Name.textContent = player1.getName();
    player1.setSymbol("X");


    player2Name.textContent = player2.getName();
    player2.setSymbol("O");

    let currentPlayer = player1;

    const turnHandling = () => currentPlayer = currentPlayer === player1 ? player2 : player1;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    const checkStatus = () => {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                grid[a].textContent !== "" &&
                grid[a].textContent === grid[b].textContent &&
                grid[a].textContent === grid[c].textContent
            );
        });
    }

    const checkDraw = () => {
        for(let tile of grid) {
            if(tile.textContent == ""){
                return;
            }
        }
        win("Draw");
    }

    const clearTiles = () => {
        grid.forEach(tile => {
            tile.textContent = "";
            tile.className = "";
        });
    }

    const win = (winner) => {
        if (winner === "Draw") {
            setTimeout(() => {
                alert(winner);
                clearTiles();
            }, 200);
            return;
        }
        winner.addScore();
        player1Score.textContent = player1.getScore();
        player2Score.textContent = player2.getScore();
    
        setTimeout(() => {
            alert(`${winner.getName()} WINS`);
            clearTiles();
        }, 200);
    }

    grid.forEach(tile => {
        tile.addEventListener("click", () => {
            if (tile.textContent != "") return;

            tile.textContent = currentPlayer.getsymbol(); 
            if (currentPlayer === player1){
                tile.classList.add("player1");
            } else {
                tile.classList.add("player2");
            }
            if (checkStatus()) {
                win(currentPlayer);
                return;
            }
            checkDraw();
            turnHandling();
            
        });
    });
})();