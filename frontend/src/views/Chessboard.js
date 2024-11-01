import m from "mithril";
import ChessPiece from "./ChessPiece";

const calculateSquareColour = (i, j) => {
  const divByTwo = (x) => x % 2 == 0;

  const lightColour = 'bg-blue-50'
  const darkColour = 'bg-blue-100'

  if (divByTwo(i)) {
    return divByTwo(j) ? lightColour : darkColour
  }

  return divByTwo(j) ? darkColour : lightColour
};

const squareSize = 90;

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
  view: () => {
    return m("div", {
      class: "flex flex-col gap-0 shadow"
    }, Chessboard.board.map((row, i) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((piece, j) => {
      const colour = calculateSquareColour(i,j);
      return m("div." + colour, {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;"
      }, m(ChessPiece, { piece }))
    }))))
  },
};

export default Chessboard;
