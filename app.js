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
    playerMove(move) {
      let symbol = this.currentPlayer.symbol;
      this.currentPlayerMove = {
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
      }
      if (board[move] === "") {
        return valid;
      } else {
        return inValid;
      }
    },
    updateBoard() {
      let board = this.board;
      let move = this.currentPlayerMove.move;
      let symbol = this.currentPlayerMove;
      board[move] = this.currentPlayerMove.symbol;
      console.log(board);
    },
  };
}

const game = Game("wangkech", "kelly");

console.log(game.currentPlayer);
