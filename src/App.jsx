import { useState } from "react";
import Board from "./Board";
import { Game } from "./domain/game.js";
import NameInput from "./NameInput";
function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [game, setGame] = useState(Game(player1, player2));
  const [board, setBoard] = useState(game.board);
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);

  console.log("Board in APP", board);

  function startGameHandler() {
    let newGame = Game(player1, player2);
    let newBoard = newGame.board;
    let newCurrentPlayer = newGame.currentPlayer;
    setGame(newGame);
    setBoard(newBoard);
    setCurrentPlayer(newCurrentPlayer);

    console.log(newGame.players);
  }

  console.log(currentPlayer);
  return (
    <>
      {/* <h1>We are up and running.....</h1> */}
      <div className="m-4 flex h-20 justify-around">
        <NameInput setPlayer={setPlayer1} placeholder={"enter Player1 name"} />
        <NameInput setPlayer={setPlayer2} placeholder={"enter Player2 name"} />
      </div>
      <button onClick={() => startGameHandler()}>Start Game</button>
      <Board board={board} setBoard={setBoard} currentPlayer={currentPlayer} />
    </>
  );
}

export default App;
