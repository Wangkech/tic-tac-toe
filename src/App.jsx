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
const {backToHome, } = useGame()
  function handleBackToHome(){
    backToHome();
    setOnGame(false);
  }
  function handleCellUpdate(cell) {
    const result = updateCell(cell);
    console.log(result);
    if (result === "ENDED") {
      alert(`${currentPlayer.name} Already Won. Game Ended`);
    }
  }

  console.log(onGame)
  return (
    <>
     {!onGame && (
        <HomeScreen onGame={onGame} startGameHandler={startGameHandler} />
      )}
      {onGame && (
        <GameScreen
          winner={winner}
          board={board}
          currentPlayer={currentPlayer}
          gameOn={gameOn}
          onGame={onGame}
          handleBackToHome={handleBackToHome}
          handleCellUpdate={handleCellUpdate}
          resetBoard={resetBoard}
          winPattern={winPattern}
          resetGame={resetGame}
        />
      )}
     
    </>
  );
}

export default App;
