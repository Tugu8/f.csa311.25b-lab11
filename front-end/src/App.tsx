/// <reference types="react" />

import { useState, useEffect } from "react";
import "./App.css";
import { GameState, Cell } from "./game";
import BoardCell from "./Cell";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    cells: [],
    instructions: "Loading...",
  });
  const [moveHistory, setMoveHistory] = useState<GameState[]>([]);

  const newGame = async () => {
    const response = await fetch("/newgame");
    const json = await response.json();
    setGameState({ cells: json.cells, instructions: json.instructions });
    setMoveHistory([]); // Reset history on new game
  };

  const undo = async () => {
    if (moveHistory.length === 0) return;

    const response = await fetch("/undo");
    const json = await response.json();
    setGameState({ cells: json.cells, instructions: json.instructions });
    setMoveHistory(moveHistory.slice(0, -1));
  };

  const play = (x: number, y: number) => async (e: any) => {
    e.preventDefault();
    // Store current state in history before making the move
    setMoveHistory([...moveHistory, gameState]);

    const response = await fetch(`/play?x=${x}&y=${y}`);
    const json = await response.json();
    setGameState({ cells: json.cells, instructions: json.instructions });
  };

  const createCell = (cell: Cell, index: number): any => {
    if (cell.playable)
      return (
        <div key={index}>
          <a href="/" onClick={play(cell.x, cell.y)}>
            <BoardCell cell={cell}></BoardCell>
          </a>
        </div>
      );
    else
      return (
        <div key={index}>
          <BoardCell cell={cell}></BoardCell>
        </div>
      );
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>

      <div id="instructions">{gameState.instructions}</div>

      <div id="board">
        {gameState.cells.map((cell: Cell, i: number) => createCell(cell, i))}
      </div>

      <div id="bottombar">
        <button className="btn new-game" onClick={newGame}>
          New Game
        </button>
        <button className="btn undo" onClick={undo}>
          Undo
        </button>
      </div>
    </div>
  );
}

export default App;
