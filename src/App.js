import { useState, useEffect } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [index, setIndex] = useState(0);
  const [turnsPlayed, setTurnsPlayed] = useState(0);

  var relations = {
    0: [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8]
    ],
    1: [
      [0, 1, 2],
      [1, 4, 7]
    ],
    2: [
      [0, 1, 2],
      [2, 5, 8],
      [2, 4, 6]
    ],
    3: [
      [3, 4, 5],
      [0, 3, 6]
    ],
    4: [
      [3, 4, 5],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6]
    ],
    5: [
      [3, 4, 5],
      [2, 5, 8]
    ],
    6: [
      [6, 7, 8],
      [0, 3, 6],
      [2, 4, 6]
    ],
    7: [
      [6, 7, 8],
      [1, 4, 7]
    ],
    8: [
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8]
    ]
  };

  function isWinner(i) {
    const curSquares = squares.slice();
    const player = curSquares[i];
    var win;

    for (const list of relations[i]) {
      win = true;
      for (const val of list) {
        if (curSquares[val] != player) {
          win = false;
          break;
        }
      }
      if (win) return player;
    }
    return null;
  }

  useEffect(() => {
    var winner = turnsPlayed < 9 ? isWinner(index) : null;
    if (turnsPlayed >= 9) setWinner(null);
    if (winner && turnsPlayed < 9) setWinner(winner);
  }, [turnsPlayed, index]);

  function onClick(i) {
    const curSquares = squares.slice();
    curSquares[i] = turn ? "X" : "O";
    setSquares(curSquares);
    setTurn(!turn);
    setIndex(i);
    setTurnsPlayed(turnsPlayed + 1);
  }

  return (
    <>
      <div className="status">
        {winner && <p>Player {winner} won the game</p>}
      </div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onClick={() => {
            onClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onClick={() => {
            onClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onClick={() => {
            onClick(2);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onClick={() => {
            onClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onClick={() => {
            onClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onClick={() => {
            onClick(5);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onClick={() => {
            onClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onClick={() => {
            onClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onClick={() => {
            onClick(8);
          }}
        />
      </div>
    </>
  );
}
