import ChessGame from "./models/ChessGame"

/**
 * Translates a piece id into the string of what the piece is
 *
 * @param {number} pieceId
 */
export const getPieceString = (pieceId) => {
  switch (pieceId) {
    case 1:
      return "whiteKing"
    case 2:
      return "whiteQueen"
    case 3:
      return "whiteBishop"
    case 4:
      return "whiteKnight"
    case 5:
      return "whiteRook"
    case 6:
      return "whitePawn"
    case 7:
      return "blackKing"
    case 8:
      return "blackQueen"
    case 9:
      return "blackBishop"
    case 10:
      return "blackKnight"
    case 11:
      return "blackRook"
    case 12:
    default:
      return "blackPawn"
  }
}

/**
 * Returns true if the piece with the id belongs to the player
 *
 * @param {number} pieceId The id of the piece to check
 * @param {string} The pieces the player is using either "black" or "white"
 */
export const isPlayerPiece = (pieceId, player) => {
  const piece = getPieceString(pieceId);

  const pieceColour = piece.substring(0, 5);

  return pieceColour === player.toLowerCase();
}

/**
 * Figures out what colour the square given at coordinates x,y should be
 *
 * @param {number} x The row the square is on
 * @param {number} y The column the square is in
 **/
export const calculateSquareColour = (x, y) => {
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
export const calculateSquareRounding = (x, y) => {
  if (x == 0 && y == 0) return " rounded-tl-xl";
  if (x == 0 && y == 7) return " rounded-tr-xl";
  if (x == 7 && y == 0) return " rounded-bl-xl";
  if (x == 7 && y == 7) return " rounded-br-xl";
  return "";
}

/**
 * Figures out what sqaures are available to the piece in the given location
 */
export const calculateAvailableSquares = (board, pieceId, x, y) => {
  const piece = getPieceString(pieceId);
  const isWhite = isPlayerPiece(pieceId, "white");

  switch (piece) {
    case "whitePawn":
    case "blackPawn":
      return calculateAvailableSquaresPawn(board, x, y, isWhite);
    case "whiteKnight":
    case "blackKnight":
      return calculateAvailableSquaresKnight(board, x, y, isWhite);
    default:
      return [];
  }
}

const calculateAvailableSquaresPawn = (board, x, y, isWhite) => {
  const availableSqaures = []

  if (isWhite) {
    if (y == 7) {// second rank
      const longY = y - 2;
      if (board[longY][x] == 0) availableSqaures.push({ x, y: longY });
    }

    const newY = y - 1;
    if (newY > 0 && board[newY][x] == 0) availableSqaures.push({ x, y: newY });
    return availableSqaures;
  }

  if (y == 1) {// 7th rank
    const longY = y + 2;
    if (board[longY][x] == 0) availableSqaures.push({ x, y: longY });
  }

  const newY = y + 1;
  if (newY < board.length && board[newY][x] == 0) availableSqaures.push({ x, y: longY });

  console.log(availableSqaures);
  return availableSqaures;
}

const calculateAvailableSquaresKnight = (board, x, y, isWhite) => {
  const possibleMoves = [];

  const chessboardSize = 8;

  // Creating the cross, then filtering options based on whether the square is available
  //
  // 0  x x
  // 1 x   x
  // 2   k
  // 3 x   x
  // 4  x x

  if (y - 2 >= 0) {
    if (x - 1 >= 0) possibleMoves.push({ x: x - 1, y: y - 2})
    if (x + 1 < chessboardSize) possibleMoves.push({ x: x + 1, y: y - 2})
  }

  if (y - 1 >= 0) {
    if (x - 2 >= 0) possibleMoves.push({ x: x - 2, y: y - 1})
    if (x + 2 < chessboardSize) possibleMoves.push({ x: x + 2, y: y - 1})
  }

  if (y + 1 < chessboardSize) {
    if (x - 2 >= 0) possibleMoves.push({ x: x - 2, y: y + 1})
    if (x + 2 < chessboardSize) possibleMoves.push({ x: x + 2, y: y + 1})
  }

  if (y + 2 < chessboardSize) {
    if (x - 1 >= 0) possibleMoves.push({ x: x - 1, y: y + 2})
    if (x + 1 < chessboardSize) possibleMoves.push({ x: x + 1, y: y + 2})
  }

  return possibleMoves.filter(p => {
    square = ChessGame.board[p.y][p.x];
    if (isWhite) {
      return square == 0 || square > 6; // > 6 is black pieces
    }

    return square < 7; // < 7 is white pieces
  });
}
