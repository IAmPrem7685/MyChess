import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const Home = () => {
  // const game = new Chess();
  // console.log(game.fen());
  const [game, setgame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  return (
    <div>
      <Chessboard position="start" draggable={false} />
    </div>
  );
};

export default Home;
