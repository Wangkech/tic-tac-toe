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
  return {
    players,
    board,
    currentPlayer,
    currentPlayerMove,

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

      console.log(this.symbol, "has been placed at box", move + 1);
    },
    play() {
      while (this.board.includes("")) {
        this.currentPlayerMove = this.getPlayerMove();
        // validate Move
        if (this.isMoveValid) {
          this.updateBoard();
          this.switchPlayer();
        }
      }
    },
  };
}

const game = Game("wangkech", "kelly");

console.log(game.currentPlayer);
