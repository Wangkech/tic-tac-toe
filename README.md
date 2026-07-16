# Tic Tac Toe App Documentation

This document explains the current implementation of `app.js` in the `tic-tac-toe` project. It focuses only on the existing JavaScript code as it stands, describing how each object and function is built and how they are intended to work together.

## Overview

The app is structured around a single factory function, `Game(player1, player2)`, which creates a game controller object for a tic-tac-toe match between two players. The object contains:

- a board state array
- player objects for X and O
- a current player pointer
- game state tracking
- all game behavior methods

The current implementation is primarily console/prompt-driven and is designed for turn-based play in a simple environment.

## `Game(player1, player2)`

### Purpose

`Game` is the main factory function. It is called with two player names and returns a game object containing the board state, players, and methods needed to run a round of tic-tac-toe.

### Parameters

- `player1` - The name of the first player.
- `player2` - The name of the second player.

### Internal helpers

`Game` defines two helper functions inside its scope:

#### `gameBoard()`

- Creates the initial tic-tac-toe board.
- Uses a nested helper `board(boardSize)` to construct an array of exactly 9 empty strings.
- Returns the empty board array.

Implementation details:

- `boardSize` is fixed at `9`.
- A for loop populates `initialBoard` with `""` for each of the 9 positions.

#### `createPlayers(player1, player2)`

- Creates the two player objects used in the game.
- Uses an inner helper `createPlayer(name, symbol)` to build each player.

Each player object has:

- `name`: the player name string.
- `symbol`: either `"X"` or `"O"`.

It returns an array: `[playerX, playerO]`.

### Internal state

Inside `Game`, the following state variables are created and captured by closure:

- `board`: the game board array returned by `gameBoard()`.
- `players`: the array returned by `createPlayers(player1, player2)`.
- `initialPlayer`: the first player in the array, who starts the game.
- `currentPlayer`: set to `initialPlayer` initially.
- `currentPlayerMove`: declared for later storage of the active move.
- `gameOn`: boolean flag initialized to `true`.
- `possibilities`: an array of all winning index combinations for tic-tac-toe.

### Returned object

The game object returned by `Game` exposes the following properties and methods:

#### Properties

- `players`: Array containing the two player objects.
- `board`: The current board state array.
- `currentPlayer`: The player whose turn it is.
- `currentPlayerMove`: The most recent move object for the current player.
- `possibilities`: The static list of winning combinations.
- `gameOn`: Boolean intended to represent whether the game is active.

#### Methods

##### `switchPlayer()`

- Switches `currentPlayer` between the two players.
- Uses `this.players.indexOf(this.currentPlayer)` to determine which player is active.
- If the active player is the first player, it switches to the second player, otherwise it switches back to the first.

##### `getPlayerMove()`

- Prompts the active player for a move.
- Uses `prompt()` and `parseInt()` to read a numeric move.
- Continues prompting until the move is a valid number inside the board range.
- Returns an object with:
  - `symbol`: the current player's symbol.
  - `move`: the selected board index.

Note: The current validation only checks numeric range. It does not verify whether the selected board cell is empty.

##### `updateBoard()`

- Writes the current player's symbol into the board at the selected move index.
- Reads `move` from `this.currentPlayerMove.move` and `symbol` from `this.currentPlayer.symbol`.
- Updates `this.board[move]`.
- Logs the placement to the console.

##### `checkForWin()`

- Determines whether the current player has won.
- Iterates over each winning possibility in `possibilities`.
- For each possibility, checks whether all three referenced board positions contain the current player's symbol.
- Uses a `playerWon` flag and increments a `matches` counter.
- Returns `true` if a winning combination is found, otherwise `false`.

Implementation note:

- The method uses `possibilities.map(...)` and `possibility.map(...)` for iteration, which works but is semantically better as `forEach` or a loop for this purpose.

##### `resetBoard()`

- Intended to clear the board.
- Uses `this.board.map((box) => { box = ""; });`.
- Important: This does not actually mutate `this.board` because `Array.prototype.map` returns a new array and the callback only reassigns its local variable.
- In the current implementation, the board remains unchanged.

##### `makePlay()`

- Intended to execute one turn of the game.
- Declares a nested helper `isMoveValid()` that checks if the current move is inside the board range and the board cell is empty.
- If the board still contains empty strings, it attempts to validate the move.
- If `this.isMoveValid` exists, it calls `this.updateBoard()`, then `checkForWin()`.
- If a win is detected, it logs the winner and calls `resetBoard()`.
- If the move is invalid, it alerts the player that the spot is unavailable.

Current issues in this method:

- It checks `this.isMoveValid` instead of calling it (`this.isMoveValid()`), so validation does not run.
- `break` is used inside an object method body, which is invalid syntax in this context.
- It does not set or use `this.currentPlayerMove` before validation.
- It does not return a value or update `gameOn`.

## Global execution

At the bottom of `app.js`, the current code creates a game instance:

```js
const game = Game("wangkech", "kelly");
console.log(game.currentPlayer);
```

This creates a game object with player names `wangkech` and `kelly`, and logs the starting player object.

## Notes on current code quality

- The module is built as a factory function returning a stateful object, which is good for encapsulation.
- Some methods rely on `this`, so the returned object must be used directly or bound correctly.
- The current implementation has a few bugs and incomplete features:
  - `resetBoard()` does not actually clear the board.
  - `makePlay()` contains syntax and logic errors.
  - `getPlayerMove()` does not ensure the selected cell is empty.

## Suggested next steps

1. Fix `resetBoard()` to either mutate `this.board` in place or replace it with a new empty array.
2. Correct `makePlay()` to call its validation helper and remove the invalid `break` statement.
3. Set `this.currentPlayerMove` before using it, and implement a proper game loop.
4. Add comments or documentation directly in `app.js` if the implementation is expected to change often.

---

This README is intentionally focused solely on the current `app.js` state and does not cover `index.html`, `index.css`, or any other files.
