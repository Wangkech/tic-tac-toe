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
  let gameOn = true;
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
    gameOn,

    switchPlayer() {
      let nextPlayer;
      if (this.players.indexOf(this.currentPlayer) === 0) {
        nextPlayer = this.players[1];
      } else {
        nextPlayer = this.players[0];
      }

      this.currentPlayer = nextPlayer;
    },
    selectBoardCell() {
      let board = this.board;
      let symbol = this.currentPlayer.symbol;
      let move;
      function getCell() {
        let cell = parseInt(prompt(`Player ${symbol} MOVE: `));
        while (isNaN(cell) || cell < 0 || move > this.board.length) {
          cell = parseInt(prompt(`Player ${symbol} MOVE: `));
        }
        return cell;
      }
      do {
        move = getCell();
      } while (this.board[move] != "");

      return {
        symbol,
        move,
      };
    },

    updateBoard() {
      let move = this.currentPlayerMove.move;
      let symbol = this.currentPlayer.symbol;
      this.board[move] = symbol;

      console.log(symbol, "has been placed at cell", move + 1);
    },
    checkForWin() {
      let board = this.board;
      let symbol = this.currentPlayer.symbol;
      let playerWon = false;

      possibilities.map((possibility) => {
        let matches = 0;
        if (!playerWon) {
          possibility.map((cell) => {
            if (board[cell] === symbol) {
              matches++;
            }
            if (matches === 3) {
              playerWon = true;
            }
          });
        }
      });
      return playerWon;
    },

    resetBoard() {
      this.board.map((cell) => {
        cell = "";
      });
    },

    makePlay() {
      const move = this.currentPlayerMove;
      let board = this.board;

      if (this.board.includes("")) {
        // validate Move
        if (true) {
          this.updateBoard();
          if (this.checkForWin()) {
            console.log(`${currentPlayer.name} has won the game `);
            this.resetBoard();
            // break;
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
