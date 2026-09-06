import { useGame } from "./hooks/useGame.js";
import GameScreen from "./GameScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";
function App() {
  const {
    startNewGame,
    board,
    currentPlayer,
    onGame,
    gameOn,
    winner,
    winPattern,
    setOnGame,
    resetBoard,
    resetGame,
    updateCell,
  } = useGame();

  function startGameHandler() {
    startNewGame();
    setOnGame(true);
  }

  function handleCellUpdate(cell) {
    const result = updateCell(cell);
    console.log(result);
    if (result === "ENDED") {
      alert(`${currentPlayer.name} Already Won. Game Ended`);
    }
  }
  return (
    <>
      {onGame && (
        <GameScreen
          winner={winner}
          board={board}
          currentPlayer={currentPlayer}
          gameOn={gameOn}
          onGame={onGame}
          handleCellUpdate={handleCellUpdate}
          resetBoard={resetBoard}
          winPattern={winPattern}
          resetGame={resetGame}
        />
      )}
      {!onGame && (
        <HomeScreen onGame={onGame} startGameHandler={startGameHandler} />
      )}
    </>
  );
}

export default App;
