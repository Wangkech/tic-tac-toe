import PlayersBanner from "./PlayersBanner";
import Board from "./Board";
import Button from "./Button";
import logo from "./assets/images/favicon.svg";
function Header() {
  return (
    <div className="row-1 flex w-full items-center max-[376px]:px-4">
      <span className="w-[30%]">
        <button className="rounded-xl bg-white p-2 text-(--primary-bg) shadow-(--shadow)">
          Back
        </button>
      </span>
      <div className="flex w-[80%] items-center gap-4 px-8">
        <img src={logo} alt="logo" height={32} width={32} />
        <h1 className="text-center font-['piedra'] text-xl text-white">
          Ticky Toe
        </h1>
      </div>
    </div>
  );
}

export default function GameScreen({
  onGame,
  gameOn,
  winPattern,
  currentPlayer,
  handleCellUpdate,
  resetBoard,
  board,
  resetGame,
}) {
  return (
    <main
      className={`grid h-full w-full grid-rows-[3rem_6rem_minmax(0,350px)_4rem] justify-center p-4 max-[376px]:px-2 min-[376px]:gap-10`}
    >
      <Header />
      <>
        <PlayersBanner currentPlayer={currentPlayer} />

        <Board
          gameOn={gameOn}
          board={board}
          winPattern={winPattern}
          handleCellUpdate={handleCellUpdate}
        />
        {/* <AccentLine /> */}
        <div className="flex w-full items-center justify-center">
          {!gameOn ? (
            <Button
              text="Play Again"
              onGame={onGame}
              style={{
                transform: "scale(0.65)",
                backgroundColor: "#FFFFFF",
                color: "#1A5866",
                minWidth: "150px",
                boxShadow: "var(--shadow)",
                gridRow: 4,
              }}
              click={resetBoard}
            />
          ) : (
            <Button
              text="Reset Game"
              onGame={onGame}
              style={{
                transform: "scale(0.65)",
                minWidth: "175px",
                width: "fit-content",
                padding: "0.5rem",
                boxShadow: "var(--shadow)",
                gridRow: 4,

                // fontSize: "2rem",
              }}
              click={resetGame}
            />
          )}
        </div>
      </>
    </main>
  );
}
