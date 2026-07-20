import { useState } from "react";
import Board from "./Board";
import { Game } from "./domain/game.js";
import NameInput from "./NameInput";
import LogoBanner from "./LogoBanner.jsx";
import StartButton from "./StartButton.jsx";
import StartGameModal from "./StartGameModal.jsx";
import CurrentPlayerBanner from "./CurrentPlayerBanner.jsx";
import AccentLine from "./AccentLine.jsx";
function App() {
  // states
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [game, setGame] = useState(Game(null));
  const [board, setBoard] = useState(game.board);
  // const players = game.players;
  const [gameOn, setGameOn] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
  const [cellChoice, setCellChoice] = useState("");
  let currentPlayerMove = game.currentPlayerMove;

  // console.log("Board in APP", board);

  const logoBannerDuringGame = {
    height: "9.625rem",
    transition: "all ease 0.5s",
  };

  function startGameHandler() {
    let newGame = Game(player1, player2);
    let newBoard = newGame.board;
    let newCurrentPlayer = newGame.currentPlayer;
    setCellChoice(null);
    setGameOn(true);
    setGame(newGame);
    setBoard(newBoard);
    setCurrentPlayer(newCurrentPlayer);

    // console.log(newGame.players);
  }
  function container() {
    let modal = <StartGameModal />;
    return modal;
  }
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
          setTimeout(() => alert("there is a tie"), 500);
        } else {
          let nextPlayer = game.switchPlayer();
          // console.log(nextPlayer);
          setCurrentPlayer(nextPlayer);
        }
      } else {
        setBoard(newBoard);
        setTimeout(() => alert(`${currentPlayer.name} has won`), 500);
        // setGameOn(false);
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

      {gameOn ? (
        <>
          <LogoBanner style={logoBannerDuringGame} />
          <CurrentPlayerBanner currentPlayer={currentPlayer} />
          <AccentLine />
          <Board board={board} cellClickHandler={cellClickHandler} />
          <AccentLine />
          <div className="flex w-[70vw] items-center justify-evenly">
            <StartButton
              text="Play Again"
              style={{
                transform: "scale(0.5)",
                backgroundColor: "#FFFFFF",
                color: "#1A5866",
                minWidth: "150px",

                // width: "fit-content",
              }}
            />
            <StartButton
              text="Reset Game"
              style={{
                transform: "scale(0.5)",
                minWidth: "175px",
                width: "fit-content",
                padding: "0.5rem",
              }}
            />
          </div>
        </>
      ) : (
        <>
          <LogoBanner />
          <AccentLine />
          <StartButton text="Start Game" click={startGameHandler} />
        </>
      )}
      {/* <StartButton text="Start Game" click={startGameHandler} />
      <Board board={board} cellClickHandler={cellClickHandler} /> */}
    </>
  );
}

export default App;
