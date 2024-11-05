import m from "mithril";
import ChessPiece from "./ChessPiece";
import { isPlayerPiece, calculateSquareColour, calculateSquareRounding, calculateAvailableSquares } from "../utils";
import ChessGame from "../models/ChessGame";


/**
 * The mouse down event for each chessboard square
 *
 * @param {number} pieceId
 * @param {number} x
 * @param {number} y
 */
const handleSquareDown = (pieceId, x, y,) => {
  console.log("Clicked x: " + x + " y: " + y);
  const isPieceMove = ChessGame.availableSquares.find(z => z.x === x && z.y === y) !== undefined;
  console.log("Is it a piece move? " + isPieceMove);
  if (isPieceMove) {
    console.log("moving piece!")
    ChessGame.movePiece(x, y);
    return;
  }

  if (pieceId == 0) return;
  ChessGame.selectedPiece = null;

  if (!isPlayerPiece(pieceId, ChessGame.player)) return;

  ChessGame.selectedPiece = { pieceId, x, y }
  ChessGame.availableSquares = calculateAvailableSquares(ChessGame.board, pieceId, x, y);
  console.log(ChessGame.availableSquares);
}

const Chessboard = {
  view: (vn) => {
    const squareSize = vn.attrs.size / 8;

    ChessGame.player = vn.attrs.player;

    return m("div", {
      class: "flex flex-col gap-0 rounded-xl shadow-2xl"
    }, ChessGame.board.map((row, y) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((pieceId, x) => {
      const isSelected = !!ChessGame.selectedPiece
        && x === ChessGame.selectedPiece.x
        && y === ChessGame.selectedPiece.y;

      return m("div." + calculateSquareColour(x, y) + calculateSquareRounding(x, y), {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;",
        onmousedown: () => handleSquareDown(pieceId, x, y)
      }, m(ChessPiece, { pieceId, isSelected }))
    }))))
  },
};

export default Chessboard;
