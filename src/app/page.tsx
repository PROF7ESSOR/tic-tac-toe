"use client";
// import <globals className="css"></globals>
import React from "react";
import TicTacToe from "./components/tic";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center">
      <TicTacToe />
    </div>
  );
};

export default Page;
