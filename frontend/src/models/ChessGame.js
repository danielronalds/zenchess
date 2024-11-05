const ChessGame = {
  player: null,
  selectedPiece: null,
  availableSquares: [],
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
  movePiece: (newX, newY) => {
    if (ChessGame.selectedPiece == null) return;

    const x = ChessGame.selectedPiece.x;
    const y = ChessGame.selectedPiece.y;
    const pieceId = ChessGame.board[y][x];

    ChessGame.board[y][x] = 0;
    ChessGame.board[newY][newX] = pieceId;

    ChessGame.selectedPiece == null;
    ChessGame.availableSquares = [];
  }
}

export default ChessGame
