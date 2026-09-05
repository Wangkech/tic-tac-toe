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
    };
  }

  const winPattern = [];
  const board = gameBoard();
  const winner = null;
  const players = [];
  let currentPlayer = {};
  let rounds = [];
  let gameOn = false;
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
    createGenericPlayers() {
      if (this.players.length === 0) {
        const playerX = createPlayer("player1", "X");
        this.players.push(playerX);
        const playerO = createPlayer("player2", "0");
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
      this.createGenericPlayers();
      console.log(this.players);
      const initialPlayer = this.players[0];
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
            }
          });
        }
      });
      return winStatus;
    },
    endCurrentRound() {
      this.gameOn = false;
    },
    // switchPlayer() {
    //   let nextPlayer;
    //   if (players.indexOf(currentPlayer) === 0) {
    //     nextPlayer = players[1];
    //   } else {
    //     nextPlayer = players[0];
    //   }
    //   this.currentPlayer = nextPlayer;
    // },
    playRound() {
      let board = this.board;
      // let symbol = this.currentPlayer.symbol;
      let players = this.players;
      let currentPlayer = this.currentPlayer;
      let playerMove = this.currentPlayerMove;
      let gameOn = this.gameOn;
      let roundWinner;
      let rounds = this.rounds;

      function selectedCell(cell) {
        let symbol = currentPlayer.symbol;

        return {
          symbol,
          cell,
        };
      }

      function updateBoard(cell) {
        // let cell = playerMove.cell;
        let symbol = playerMove.symbol;
        board[cell] = symbol;
        console.log(symbol, "has been placed at cell", cell + 1);
      }

      function checkForWin() {
        let winStatus = false;
        let winPattern;

        possibilities.map((possibility) => {
          let matches = 0;
          if (!winStatus) {
            possibility.map((cell) => {
              if (board[cell] === playerMove.symbol) {
                matches++;
              }
              if (matches === 3) {
                winStatus = true;
                winPattern = [...possibility];
              }
            });
          }
        });
        return { winStatus, winPattern };
      }
      // function handResult() {
      //   if (result === {}) {
      //     console.log("This game is a tie");
      //   } else {
      //     console.log(result, "Has WON this round!!");
      //   }
      // }
      function switchPlayer() {
        let nextPlayer;
        if (players.indexOf(currentPlayer) === 0) {
          nextPlayer = players[1];
        } else {
          nextPlayer = players[0];
        }
        currentPlayer = nextPlayer;
      }
      function makeMove() {
        playerMove = selectedCell();
        let pattern;
        if (board[playerMove.cell] != "") {
          return;
        } else {
          updateBoard();
          let winStatus = checkForWin().winStatus;
          if (winStatus) {
            pattern = checkForWin().winPattern;
            gameOn = !gameOn;
            roundWinner = { currentPlayer, pattern };

            console.log(gameOn ? "game is still on" : "game is over");
          } else if (!checkForWin().winStatus && board.includes("") === false) {
            gameOn = !gameOn;
          }
        }
      }
      function roundDetails() {
        return roundWinner;
      }

      while (board.includes("") === true && gameOn) {
        makeMove();
        switchPlayer();
      }
      rounds.push(roundDetails());
    },
  };
}
