import { useState } from "react";
import { Game } from "../domain/game";
const controller = Game();
const raw = localStorage.getItem("game");
const storedData = JSON.parse(raw);
let snapshot = storedData
  ? controller.restoreSnapshot(storedData)
  : controller.getSnapshot();
const rawUI = localStorage.getItem("uiSnapshot");
const uiSnapshot = rawUI ? JSON.parse(rawUI) : null;
export const useGame = () => {
  const [game, setGame] = useState(snapshot);
  const [onGame, setOnGame] = useState(Boolean(uiSnapshot?.onGame ?? null));
  const currentPlayer = game?.currentPlayer;
  const gameOn = game.gameOn;
  const board = game?.board;
  const players = game?.players ?? [];
  const winPattern = game.winPattern;
  const winner = game.winner;
  const saveUIstates = () => {};
  const saveGame = () => {
    const uiSnapshot = {
      onGame: onGame,
    };
    localStorage.setItem("uiSnapshot", JSON.stringify(uiSnapshot));
    localStorage.setItem("game", JSON.stringify(controller.getSnapshot()));
    saveUIstates();
  };
  // start new game
  const startNewGame = async () => {
    // controller.addPlayer("wangkech", "X");
    // controller.addPlayer("Kelly", "O");
    controller.selectStartingPlayer();
    setGame(controller.getSnapshot());
    controller.startRound();
    console.log(controller.getSnapshot());
    setGame(controller.getSnapshot());
    saveGame();
  };

  // determine starting player
  // handle cell click
  const updateCell = (cell) => {
    const updated = controller.updateBoard(cell);
    setGame(controller.getSnapshot());
    saveGame();
    // console.log(updated);

    if (updated === "ENDED") {
      alert("Game already Ended");
      return "ENDED";
    }
    if (updated) {
      const win = controller.checkForWin();
      // console.log(win);

      if (win) {
        controller.endCurrentRound();
        setGame(controller.getSnapshot());
        saveGame();

        return "WIN";
      } else if (!win && controller.board.includes("") && controller.gameOn) {
        controller.switchPlayer();
        setGame(controller.getSnapshot());
        saveGame();

        return "ON";
      } else {
        controller.endCurrentRound();
        setGame(controller.getSnapshot());
        saveGame();

        return "TIE";
      }
    }
  };

  const resetGame = () => {
    // resets both the board and the stats
    controller.resetGame();
    setGame(controller.getSnapshot());
    saveGame();
  };
  const resetBoard = () => {
    // clears only the board
    controller.startRound();
    setOnGame(true);
    setGame(controller.getSnapshot());
    saveGame();
  };
  const backToHome = () => {
    // resets the game state
    let snapshot = controller.endGame();
    setGame(snapshot);
    console.log(onGame);
    saveGame();
  };

  return {
    game,
    gameOn,
    onGame,
    setOnGame,
    board,
    currentPlayer,
    players,
    startNewGame,
    updateCell,
    resetBoard,
    resetGame,
    winPattern,
    winner,
    backToHome,
  };
};
