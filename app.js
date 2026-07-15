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
  return {
    players,
    board,
  };
}

const game = Game("wangkech", "kelly");

console.log(game.players);
