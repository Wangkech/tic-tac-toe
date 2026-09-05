import { useState } from "react";
import { Game } from "../domain/game";
const controller = Game();
let snapshot = controller.getSnapshot();
export const useGame = () => {
  const [game, setGame] = useState(snapshot);
  const [onGame, setOnGame] = useState(false);
  const currentPlayer = game?.currentPlayer;
  const gameOn = game.gameOn;
  const board = game?.board;
  const players = game?.players ?? [];
  const winPattern = game.winPattern;
  const winner = game.winner;
  // start new game
  const startNewGame = async () => {
    // controller.addPlayer("wangkech", "X");
    // controller.addPlayer("Kelly", "O");
    controller.selectStartingPlayer();
    setGame(controller.getSnapshot());
    controller.startRound();
    console.log(controller.getSnapshot());
    setGame(controller.getSnapshot());
  };
  // determine starting player
  // handle cell click
  const updateCell = (cell) => {
    const updated = controller.updateBoard(cell);
    setGame(controller.getSnapshot());
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

        return "WIN";
      } else if (!win && controller.board.includes("") && controller.gameOn) {
        controller.switchPlayer();
        setGame(controller.getSnapshot());
        return "ON";
      } else {
        controller.endCurrentRound();
        setGame(controller.getSnapshot());

        return "TIE";
      }
    }
  };
  const resetBoard = () => {
    controller.startRound();
    setOnGame(true);
    setGame(controller.getSnapshot());
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
    winPattern,
    winner,
  };
};
