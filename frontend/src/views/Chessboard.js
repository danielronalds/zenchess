import m from "mithril";
import ChessPiece from "./ChessPiece";

/**
 * Figures out what colour the square given at coordinates j,i should be
 *
 * @param {number} i The row the square is on
 * @param {number} j The column the square is in
 **/
const calculateSquareColour = (i, j) => {
  const divByTwo = (x) => x % 2 == 0;

  const lightColour = 'bg-blue-50'
  const darkColour = 'bg-blue-100'

  if (divByTwo(i)) {
    return divByTwo(j) ? lightColour : darkColour
  }

  return divByTwo(j) ? darkColour : lightColour
};

/**
 * Figures out what rounding should be applied to the current square, if any
 *
 * @param {number} i The row the square is on
 * @param {number} j The column the square is in
 **/
const calculateSquareRounding = (i, j) => {
  if (i == 0 && j == 0) return " rounded-tl-xl";
  if (i == 0 && j == 7) return " rounded-tr-xl";
  if (i == 7 && j == 0) return " rounded-bl-xl";
  if (i == 7 && j == 7) return " rounded-br-xl";
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
  view: (vn) => {
    const squareSize = vn.attrs.size / 8;

    return m("div", {
      class: "flex flex-col gap-0 rounded-xl shadow-2xl"
    }, Chessboard.board.map((row, i) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((piece, j) => {
      const colour = calculateSquareColour(i,j);
      const rounding = calculateSquareRounding(i,j);
      
      return m("div." + colour + rounding, {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;"
      }, m(ChessPiece, { piece }))
    }))))
  },
};

export default Chessboard;
