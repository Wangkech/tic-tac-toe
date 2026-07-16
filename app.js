function Game(player1, player2) {
  function gameBoard() {
    const boardSize = 9;
    const board = (boardSize) => {
      const initialBoard = [];

      for (let i = 0; i < boardSize; i++) {
        initialBoard.push("");
      }

      return initialBoard;
    };
    return board(boardSize);
  }

  function createPlayers(player1, player2) {
    function createPlayer(name, symbol) {
      return {
        name,
        symbol,
      };
    }
    const playerX = createPlayer(player1, "X");
    const playerO = createPlayer(player2, "O");
    return [playerX, playerO];
  }
  const board = gameBoard();
  const players = createPlayers(player1, player2);
  const initialPlayer = players[0];
  let currentPlayer = initialPlayer;
  let currentPlayerMove;
  const possibilities = [
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
  ];
  return {
    players,
    board,
    currentPlayer,
    currentPlayerMove,
    possibilities,

    switchPlayer() {
      let nextPlayer;
      if (this.players.indexOf(this.currentPlayer) === 0) {
        nextPlayer = this.players[1];
      } else {
        nextPlayer = this.players[0];
      }

      this.currentPlayer = nextPlayer;
    },
    getPlayerMove() {
      let symbol = this.currentPlayer.symbol;
      let move = parseInt(prompt(`Player ${symbol} MOVE: `));
      console.log(move);
      while (isNaN(move) || move < 0 || move > this.board.length) {
        move = parseInt(prompt(`Player ${symbol} MOVE: `));
      }
      return {
        symbol,
        move,
      };
    },
    isMoveValid() {
      let board = this.board;
      let move = this.currentPlayerMove.move;
      let valid = true;
      let inValid = false;
      if (move <= 0 && move < board.length) {
        return inValid;
      } else {
        if (board[move] === "") {
          return valid;
        } else {
          console.log("this space is not available");
        }
      }
    },
    updateBoard() {
      let move = this.currentPlayerMove.move;
      let symbol = this.currentPlayer.symbol;
      this.board[move] = symbol;

      console.log(symbol, "has been placed at box", move + 1);
    },
    checkForWin() {
      let board = this.board;
      symbol = this.currentPlayer.symbol;
      let playerWon = false;

      possibilities.map((possibility) => {
        let matches = 0;
        if (!playerWon) {
          console.log(
            ` ${possibilities.indexOf(possibility) + 1}  cheking ' ${possibility} ...'`,
          );
          possibility.map((box) => {
            if (board[box] === symbol) {
              matches++;
              console.log(matches, " found");
            }
            if (matches === 3) {
              console.log(`this move resulted in Player ${symbol} winning`);
              playerWon = true;
            }
          });
        }
      });
      if (playerWon === false) {
        console.log(`this did not make Player ${symbol} winning`);
      }

      return playerWon;
    },

    resetBoard() {
      this.board.map((box) => {
        box = "";
      });
    },

    play() {
      while (this.board.includes("")) {
        this.currentPlayerMove = this.getPlayerMove();
        // validate Move
        if (this.isMoveValid) {
          this.updateBoard();
          if (this.checkForWin()) {
            console.log(`${currentPlayer.name} has won the game `);
            this.resetBoard();
            break;
          }
          this.switchPlayer();
        } else {
          alert(`spot ${this.currentPlayer.move} is not available`);
        }
      }
    },
  };
}

const game = Game("wangkech", "kelly");

console.log(game.currentPlayer);
