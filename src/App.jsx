import { useState } from "react";
import Board from "./Board";
import { Game } from "./domain/game.js";
import NameInput from "./NameInput";
import LogoBanner from "./LogoBanner.jsx";
import StartButton from "./StartButton.jsx";
function App() {
  // states
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [game, setGame] = useState(Game(null));
  const [board, setBoard] = useState(game.board);
  const players = game.players;
  const [gameOn, setGameOn] = useState(game.gameOn);
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
  const [cellChoice, setCellChoice] = useState("");
  let currentPlayerMove = game.currentPlayerMove;

  // console.log("Board in APP", board);

  function startGameHandler() {
    let newGame = Game(player1, player2);
    let newBoard = newGame.board;
    let newCurrentPlayer = newGame.currentPlayer;
    setCellChoice(null);
    setGame(newGame);
    setBoard(newBoard);
    setCurrentPlayer(newCurrentPlayer);

    // console.log(newGame.players);
  }
  function pullStartGameModal() {}
  // console.log(currentPlayerMove);
  function cellClickHandler(index) {
    let playerChoice = index;
    let newCurrentPlayerMove = { ...game.currentPlayerMove };

    newCurrentPlayerMove.cell = playerChoice;
    newCurrentPlayerMove.symbol = currentPlayer.symbol;
    console.log(newCurrentPlayerMove);

    if (board[index] != "") {
      alert("That cell is occupied");
    } else {
      // updateBoard
      let newBoard = [...board];
      newBoard[index] = currentPlayer.symbol;
      setBoard(newBoard);
      console.log(newBoard);

      // calculate WIN
      let winStatus = game.checkForWin(
        newBoard,
        newCurrentPlayerMove,
      ).winStatus;
      console.log(winStatus);
      if (winStatus === false) {
        if (newBoard.includes("") === false) {
          alert("there is a tie");
        } else {
          let nextPlayer = game.switchPlayer();
          // console.log(nextPlayer);
          setCurrentPlayer(nextPlayer);
        }
      } else {
        alert(currentPlayer.name, " has won the game");
      }
    }
  }
  return (
    <>
      {/* <h1>We are up and running.....</h1> */}
      {/* <div className="flex h-20 justify-around">
        <NameInput setPlayer={setPlayer1} placeholder={"enter Player1 name"} />
        <NameInput setPlayer={setPlayer2} placeholder={"enter Player2 name"} />
      </div> */}
      <LogoBanner />
      <StartButton text="Start Game" click={startGameHandler} />
      <Board board={board} cellClickHandler={cellClickHandler} />
    </>
  );
}

export default App;
