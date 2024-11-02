import m from "mithril";
import ChessPiece from "./ChessPiece";

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

const Chessboard = {
  board: [
    [11, 10, 9, 8, 7, 9, 10, 11],
    [12, 12, 12, 12, 12, 12, 12, 12],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [5, 4, 3, 2, 1, 3, 4, 5],
  ],
  selectedPiece: null,
  view: (vn) => {
    const squareSize = vn.attrs.size / 8;

    return m("div", {
      class: "flex flex-col gap-0 rounded-xl shadow-2xl"
    }, Chessboard.board.map((row, x) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((piece, y) => {
      const colour = calculateSquareColour(x, y);
      const rounding = calculateSquareRounding(x, y);

      const isSelected = !!Chessboard.selectedPiece && x === Chessboard.selectedPiece.x && y === Chessboard.selectedPiece.y;
      console.log(isSelected);

      return m("div." + colour + rounding, {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;",
        onclick: () => {
          if (piece == 0) return;

          Chessboard.selectedPiece = { piece, x, y }
          console.log(Chessboard.selectedPiece)
        }
      }, m(ChessPiece, { piece, isSelected }))
    }))))
  },
};

export default Chessboard;
