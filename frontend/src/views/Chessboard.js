import m from "mithril";
import ChessPiece from "./ChessPiece";
import { isPlayerPiece } from "../utils";

/**
 * Figures out what colour the square given at coordinates x,y should be
 *
 * @param {number} x The row the square is on
 * @param {number} y The column the square is in
 **/
const calculateSquareColour = (x, y) => {
  const divByTwo = (z) => z % 2 == 0;

  const lightColour = 'bg-blue-100'
  const darkColour = 'bg-blue-200'

  if (divByTwo(x)) {
    return divByTwo(y) ? lightColour : darkColour
  }

  return divByTwo(y) ? darkColour : lightColour
};

/**
 * Figures out what rounding should be applied to the current square, if any
 *
 * @param {number} x The row the square is on
 * @param {number} y The column the square is in
 **/
const calculateSquareRounding = (x, y) => {
  if (x == 0 && y == 0) return " rounded-tl-xl";
  if (x == 0 && y == 7) return " rounded-tr-xl";
  if (x == 7 && y == 0) return " rounded-bl-xl";
  if (x == 7 && y == 7) return " rounded-br-xl";
  return "";
}

/**
 * The mouse down event for each chessboard square
 *
 * @param {number} pieceId
 * @param {number} x
 * @param {number} y
 */
const handleSquareDown = (pieceId, x, y,) => {
  if (pieceId == 0) return;
  Chessboard.selectedPiece = null;

  if (!isPlayerPiece(pieceId, Chessboard.player)) return;

  Chessboard.selectedPiece = { pieceId, x, y }
}

const Chessboard = {
  board: [
    [11, 10, 9,  8,  0,  11,  7, 0],
    [12, 12, 12, 12, 12, 0,  9, 12],
    [0,  0,  0,  0,  0,  10,  12,  0],
    [0,  0,  0,  0,  0,  12,  0,  0],
    [0,  0,  0,  6,  0,  3,  0,  0],
    [0,  0,  6,  3,  6,  4,  0,  0],
    [6,  6,  2,  4,  0,  6,  6,  6],
    [5,  0,  0,  0,  1,  0,  0,  5],
  ],
  player: null,
  selectedPiece: null,
  view: (vn) => {
    const squareSize = vn.attrs.size / 8;

    Chessboard.player = vn.attrs.player;

    return m("div", {
      class: "flex flex-col gap-0 rounded-xl shadow-2xl"
    }, Chessboard.board.map((row, x) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((pieceId, y) => {
      const isSelected = !!Chessboard.selectedPiece
        && x === Chessboard.selectedPiece.x
        && y === Chessboard.selectedPiece.y;

      return m("div." + calculateSquareColour(x, y) + calculateSquareRounding(x, y), {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;",
        onmousedown: () => handleSquareDown(pieceId, x, y)
      }, m(ChessPiece, { pieceId, isSelected }))
    }))))
  },
};

export default Chessboard;
