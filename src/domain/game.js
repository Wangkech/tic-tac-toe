export function Game() {
  // Board
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

  function createPlayer(name, symbol) {
    return {
      name,
      symbol,
      wins: 0,
    };
  }

  const winPattern = [];
  const board = gameBoard();
  const winner = null;
  const players = [];
  let currentPlayer = {};
  let rounds = [];
  let gameOn = false;
  const roundNumber = 0;
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
    winner,
    // currentPlayerMove,
    winPattern,
    rounds,
    roundNumber,
    gameOn,
    addPlayer(p, s) {
      const player = createPlayer(p, s);
      this.players.push(player);
    },

    getSnapshot() {
      return Object.freeze({
        players: this.players,
        board: this.board,
        currentPlayer: this.currentPlayer,
        rounds: this.rounds,
        gameOn: this.gameOn,
        winPattern: this.winPattern,
        winner: this.winner,
      });
    },
    restoreSnapshot(data) {
      players.length = 0;
      players.push(...data.players);
      this.players = data.players;
      this.currentPlayer = data.currentPlayer;
      this.rounds = data.rounds;
      gameOn = data.gameOn;
      this.gameOn = data.gameOn;
      winPattern.length = 0;
      winPattern.push(...data.winPattern);
      this.winPattern = data.winPattern;
      this.board = data.board;

      this.winner = data.winner;
      return this.getSnapshot();
    },
    createGenericPlayers() {
      if (this.players.length === 0) {
        const playerX = createPlayer("player1", "X");
        this.players.push(playerX);
        const playerO = createPlayer("player2", "O");
        this.players.push(playerO);
      } else if (this.players.length === 1) {
        const player = this.players[0];
        if (player.symbol === "X") {
          let newPlayer = createPlayer("player2", "O");
          this.players.push(newPlayer);
        } else {
          let newPlayer = createPlayer("player2", "X");
          this.players.push(newPlayer);
        }
      }
      return;
    },
    selectStartingPlayer() {
      const random = Math.floor(Math.random() * this.players.length);
      console.log(random);

      this.createGenericPlayers();
      console.log(this.players);
      const initialPlayer = this.players[random];
      currentPlayer = initialPlayer;
      this.currentPlayer = initialPlayer;
    },
    startRound() {
      gameOn = true;
      this.gameOn = true;
      this.resetBoard();
      this.selectStartingPlayer();
      return true;
    },
    switchPlayer() {
      let nextPlayer;
      if (this.players.indexOf(this.currentPlayer) === 0) {
        nextPlayer = this.players[1];
      } else {
        nextPlayer = this.players[0];
      }

      this.currentPlayer = nextPlayer;
      return nextPlayer;
    },
    resetGame() {
      this.resetBoard();
      this.players.map((p) => (p.wins = 0));
    },
    resetBoard() {
      this.board = gameBoard();
      this.winPattern.length = 0;
      this.winner = null;
    },
    updateBoard(cell) {
      if (!gameOn) {
        return "ENDED";
      }
      if (this.board[cell] === "") {
        this.board[cell] = this.currentPlayer.symbol;
        return true;
      } else return false;
    },
    checkForWin() {
      let winStatus = false;
      // let winPattern;

      possibilities.map((possibility) => {
        let matches = 0;
        if (!winStatus) {
          possibility.map((cell) => {
            if (this.board[cell] === this.currentPlayer.symbol) {
              matches++;
            }
            if (matches === 3) {
              winStatus = true;
              this.winPattern.length = 0;
              this.winPattern.push(...possibility);
              this.winner = this.currentPlayer;
              this.players.find((p) => p.symbol === this.currentPlayer.symbol)
                .wins++;
            }
          });
        }
      });
      return winStatus;
    },
    endGame() {
      this.resetGame();
      this.gameOn = false;
      return this.getSnapshot();
    },
    endCurrentRound() {
      this.gameOn = false;
      return this.getSnapshot();
    },
  };
}
