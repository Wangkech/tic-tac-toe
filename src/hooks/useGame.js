import { useState } from "react";
import { Game } from "../domain/game";
const controller = Game();
let snapshot = controller.getSnapshot();
export const useGame = () => {
  const [game, setGame] = useState(snapshot);
  const gameOn = game.gameOn;
  const currentPlayer = game.currentPlayer;
  const board = game?.board;
  const players = game?.players ?? [];
  // start new game
  const startNewGame = async () => {
    controller.addPlayer("wangkech", "X");
    controller.addPlayer("Kelly", "O");
    controller.selectStartingPlayer();
    controller.startRound();
    console.log(controller.getSnapshot());
    setGame(controller.getSnapshot());
  };
  // determine starting player
  // handle cell click
  const updateCell = async (cell) => {
    const updated = await controller.updateBoard(cell);
    setGame(controller.getSnapshot());
    if (updated) {
      const win = controller.checkForWin();
      if (win) {
        controller.endCurrentRound();
        return "WIN";
      } else if (game.board.includes("")) {
        controller.switchPlayer();
        return "ON";
      } else {
        controller.endCurrentRound();
        return "TIE";
      }
    }
  };
  // handle tie
  // handle win
  //
  // record move
  // check for win & determine what next
  // end game if tie
  // switch player if no win

  return {
    game,
    gameOn,
    board,
    currentPlayer,
    players,
    startNewGame,
    updateCell,
  };
};
