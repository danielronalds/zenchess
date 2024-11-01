import m from "mithril";

const calculateSquareColour = (i, j) => {
  const divByTwo = (x) => x % 2 == 0;

  const lightColour = 'bg-blue-50'
  const darkColour = 'bg-blue-100'

  if (divByTwo(i)) {
    return divByTwo(j) ? lightColour : darkColour
  }

  return divByTwo(j) ? darkColour : lightColour
};

const squareSize = 80;

const Chessboard = {
  board: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  view: () => {
    return m("div", {
      class: "flex flex-col gap-0 shadow"
    }, Chessboard.board.map((row, i) => m("div", {
      class: "flex flex-row gap-0"
    }, row.map((peice, j) => {
      const colour = calculateSquareColour(i,j);
      return m("div." + colour, {
        style: "width: " + squareSize + "px; height: " + squareSize + "px;"
      })
    }))))
  },
};

export default Chessboard;
