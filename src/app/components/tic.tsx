/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
// State Use
const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isPlayingWithCPU, setIsPlayingWithCPU] = useState(false);
  // to play witch CPU
  useEffect(() => {
    if (isPlayingWithCPU && !isXNext && !calculateWinner(board)) {
      const timeoutId = setTimeout(() => {
        makeCPUMove();
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, isPlayingWithCPU, board]); // Added 'board' as a dependency
  // valid movenments and game integrity
  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  // game logic depends on this part
  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  // handles CPU moves
  const makeCPUMove = () => {
    const availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    if (availableMoves.length > 0) {
      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleClick(randomMove);
    }
  };
  // decides winner
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Current player: ${isXNext ? "X" : "O"}`;
  // to restart the game
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const toggleCPU = () => {
    setIsPlayingWithCPU(!isPlayingWithCPU);
    handleRestart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 px-10">
      <h1 className="  text-5xl underline-offset-4 text-gray-950 font-black tracking-tighter mb-6 ">
        Tic-Tac-Toe
      </h1>
      <h1 className="text-3xl text-gray-900 font-black tracking-tight mb-6">
        {status}
      </h1>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isPlayingWithCPU}
            onChange={toggleCPU}
            className="form-checkbox"
          />
          <span className="ml-2 font-semibold tracking-tight text-gray-700">
            Play against CPU
          </span>
        </label>
      </div>
      <div className="grid grid-cols-3  gap-4">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 active:scale-90 duration-500 h-24 bg-white border-2 rounded-2xl  border-gray-400 text-7xl font-bold flex items-center justify-center"
          >
            {value}
          </button>
        ))}
      </div>
      <button
        onClick={handleRestart}
        className="mt-6 transition-all duration-300 hover:scale-90 active:scale-105 active:translate-y-1  px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
