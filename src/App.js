import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Chessboard from "chessboardjsx";

function App() {
  const Chess = require("chess.js");

  const [chess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [position, setposition] = useState("start");
  const [history, sethistory] = useState([]);
  const [dropSquareStyle, setdropSquareStyle] = useState({});
  const [squareStyles, setsquareStyles] = useState({});

  const [pieceSquare, setpieceSquare] = useState("");

  const handleMove = (move) => {
    // Line 29 validates the user move.
    if (chess.move(move)) {
      setposition(chess.fen());
      sethistory(chess.history({ verbos: true }));
      console.log(history);
      setsquareStyles();
    }
  };

  const onDragOverSquare = (square) => {
    setdropSquareStyle(
      square === "e4" || square === "d4" || square === "e5" || square === "d5"
        ? { backgroundColor: "cornFlowerBlue" }
        : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    );
  };

  const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
    };
  };

  const highlightSquare = (square, squaresToHighlight) => {
    const highlightStyle = [square, ...squaresToHighlight];

    let stlyledSquare = {};

    for (let i = 0; i < highlightStyle.length; i++) {
      stlyledSquare[highlightStyle[i]] = {
        background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
        borderRadius: "50%",
      };
    }

    setsquareStyles(stlyledSquare);
  };

  const removeHighlightSquare = () => {
    setsquareStyles({
      squareStyles: squareStyling({
        pieceeSquare: pieceSquare,
        history: history,
      }),
    });
  };

  const onMouseOutSquare = (square) => removeHighlightSquare(square);

  const onSquareClick = (square) => {
    setsquareStyles(squareStyling({ pieceSquare: square, history: history }));
    setpieceSquare(square);

    let move = chess.move({
      from: pieceSquare,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });
    console.log(pieceSquare);

    // illegal move
    if (move === null) return;

    setposition(chess.fen());
    sethistory(chess.history({ verbose: true }));
    setpieceSquare("");
  };

  const onMouseOverSquare = (square) => {
    // get list of possible moves for this square
    let moves = chess.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (let i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

  const onSquareRightClick = (square) =>
    setsquareStyles({ [square]: { backgroundColor: "deepPink" } });

  const renderBoard = () => {
    return (
      <div>
        <Chessboard
          position={position}
          draggable={true}
          width={450}
          onDrop={(move) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })
          }
          squareStyles={squareStyles}
          onMouseOverSquare={onMouseOverSquare}
          onSquareClick={onSquareClick}
          onMouseOutSquare={onMouseOutSquare}
          onDragOverSquare={onDragOverSquare}
          dropSquareStyle={dropSquareStyle}
          onSquareRightClick={onSquareRightClick}
          boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <h1>premmmj</h1>
      {renderBoard()}
    </div>
  );
}

export default App;
