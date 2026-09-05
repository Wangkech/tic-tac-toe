import Board from "./Board";
import LogoBanner from "./LogoBanner.jsx";
import StartButton from "./StartButton.jsx";
import CurrentPlayerBanner from "./CurrentPlayerBanner.jsx";
import AccentLine from "./AccentLine.jsx";
import { useGame } from "./hooks/useGame.js";
function App() {
  // states
  // const [player1, setPlayer1] = useState("Player 1");
  // const [player2, setPlayer2] = useState("Player 2");
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
    updateCell,
  } = useGame();

  const logoBannerDuringGame = {
    height: "9.625rem",
    transition: "all ease 0.5s",
  };

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
      {onGame ? (
        <>
          <LogoBanner style={logoBannerDuringGame} />
          <CurrentPlayerBanner
            gameOn={gameOn}
            winner={winner}
            currentPlayer={currentPlayer}
          />
          <AccentLine />
          <Board
            gameOn={gameOn}
            board={board}
            winPattern={winPattern}
            handleCellUpdate={handleCellUpdate}
          />
          <AccentLine />
          <div className="flex w-[70vw] items-center justify-evenly">
            {!gameOn ? (
              <StartButton
                text="Play Again"
                style={{
                  transform: "scale(0.5)",
                  backgroundColor: "#FFFFFF",
                  color: "#1A5866",
                  minWidth: "150px",
                }}
                click={resetBoard}
              />
            ) : (
              <StartButton
                text="Reset Game"
                style={{
                  transform: "scale(0.5)",
                  minWidth: "175px",
                  width: "fit-content",
                  padding: "0.5rem",
                }}
                click={resetBoard}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <LogoBanner />
          <AccentLine />
          <StartButton text="Start Game" click={startGameHandler} />
        </>
      )}
    </>
  );
}

export default App;
