import m from "mithril";
import ChessSquare from "./ChessSquare";
import { isPlayerPiece, calculateSquareColour, calculateSquareRounding } from "../utils";
import ChessGame from "../models/ChessGame";
import calculateAvailableSquares from "../movementCalculation";


/**
 * The mouse down event for each chessboard square
 *
 * @param {number} pieceId
 * @param {number} x
 * @param {number} y
 */
const handleSquareDown = (pieceId, x, y,) => {
  const isPieceMove = ChessGame.availableSquares.find(z => z.x === x && z.y === y) !== undefined;
  if (isPieceMove) {
    ChessGame.movePiece(x, y);
    return;
  }

  ChessGame.selectedPiece = null;
  ChessGame.availableSquares = [];

  if (pieceId == 0) return;

  if (!isPlayerPiece(pieceId, ChessGame.player)) return;

  ChessGame.selectedPiece = { pieceId, x, y }
  ChessGame.availableSquares = calculateAvailableSquares(ChessGame.board, pieceId, x, y);
}

const Chessboard = {
  view: (vn) => {
    const squareSize = vn.attrs.size / 8;

    ChessGame.player = vn.attrs.player;

    const board = ChessGame.board.map((row, y) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((pieceId, x) => {
      const isSelected = !!ChessGame.selectedPiece
        && x === ChessGame.selectedPiece.x
        && y === ChessGame.selectedPiece.y;

      const isAvailableMove = ChessGame.availableSquares
        .find(z => z.x === x && z.y === y) !== undefined;

      return m("div." + calculateSquareColour(x, y) + calculateSquareRounding(x, y), {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;",
        onmousedown: () => handleSquareDown(pieceId, x, y)
      }, m(ChessSquare, { pieceId, isSelected, isAvailableMove }))
    })))

    return m("div", {
      class: "flex flex-col gap-0 rounded-xl shadow-2xl"
    }, ChessGame.player === "black" ? board.map(x => {
      x.children.reverse();
      return x
    }).reverse() : board);
  },
};

export default Chessboard;
