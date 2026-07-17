export function Game(player1, player2) {
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
  // eslint-disable-next-line no-unassigned-vars
  let currentPlayerMove;
  let rounds = [];
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
    rounds,
    possibilities,
    gameOn,

    resetBoard() {
      this.board.map((cell) => {
        cell.push("");
      });
    },

    playRound() {
      let board = this.board;
      // let symbol = this.currentPlayer.symbol;
      let players = this.players;
      let currentPlayer = this.currentPlayer;
      let playerMove = this.currentPlayerMove;
      let gameOn = this.gameOn;
      let roundWinner;
      let rounds = this.rounds;

      function selectBoardCell() {
        let symbol = currentPlayer.symbol;
        let cell;
        function getCell() {
          cell = parseInt(prompt(`Player ${symbol} MOVE: `));
          while (isNaN(cell) || cell < 0 || cell > board.length) {
            cell = parseInt(prompt(`Player ${symbol} MOVE: `));
          }
        }
        do {
          getCell();
          console.log(cell);
        } while (board[cell] != "");

        return {
          symbol,
          cell,
        };
      }
      function updateBoard() {
        let cell = playerMove.cell;
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
        playerMove = selectBoardCell();
        let pattern;
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
