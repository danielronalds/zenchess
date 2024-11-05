import { getPieceString, isPlayerPiece } from "./utils";

const calculateAvailableSquaresPawn = (board, x, y, isWhite) => {
  // NOTE: Add prompotion and en passant
  const availableSquaresWhitePawn = () => {
    const availableSqaures = []

    // x
    // x
    // p
    if (y == 6) {// second rank
      const longY = y - 2;
      if (board[longY][x] == 0) availableSqaures.push({ x, y: longY });
    }

    const newY = y - 1;
    if (newY > 0 && board[newY][x] == 0) availableSqaures.push({ x, y: newY });

    // x x  if pieces that can be taken are there
    //  p
    if (y - 1 >= 0) {
      if (x - 1 > 0 && board[y - 1][x - 1] > 6) availableSqaures.push({ x: x - 1, y: y - 1 });
      if (x + 1 < board.length && board[y - 1][x + 1] > 6) availableSqaures.push({ x: x + 1, y: y - 1 });
    }

    return availableSqaures;
  }

  const availableSqauresBlackPawn = () => {
    const availableSqaures = []

    // x
    // x
    // p
    if (y == 1) {// 7th rank
      const longY = y + 2;
      if (board[longY][x] == 0) availableSqaures.push({ x, y: longY });
    }

    const newY = y + 1;
    if (newY < board.length && board[newY][x] == 0) availableSqaures.push({ x, y: newY });

    // x x  if pieces that can be taken are there
    //  p
    if (y + 1 < board.length) {
      if (x - 1 > 0 && board[y + 1][x - 1] < 7 && board[y + 1][x - 1] !== 0)
        availableSqaures.push({ x: x - 1, y: y + 1 });
      if (x + 1 < board.length && board[y + 1][x + 1] < 7 && board[y + 1][x + 1] !== 0)
        availableSqaures.push({ x: x + 1, y: y + 1 });
    }

    return availableSqaures;
  }

  return isWhite ? availableSquaresWhitePawn() : availableSqauresBlackPawn();
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
    if (x - 1 >= 0) possibleMoves.push({ x: x - 1, y: y - 2 })
    if (x + 1 < chessboardSize) possibleMoves.push({ x: x + 1, y: y - 2 })
  }

  if (y - 1 >= 0) {
    if (x - 2 >= 0) possibleMoves.push({ x: x - 2, y: y - 1 })
    if (x + 2 < chessboardSize) possibleMoves.push({ x: x + 2, y: y - 1 })
  }

  if (y + 1 < chessboardSize) {
    if (x - 2 >= 0) possibleMoves.push({ x: x - 2, y: y + 1 })
    if (x + 2 < chessboardSize) possibleMoves.push({ x: x + 2, y: y + 1 })
  }

  if (y + 2 < chessboardSize) {
    if (x - 1 >= 0) possibleMoves.push({ x: x - 1, y: y + 2 })
    if (x + 1 < chessboardSize) possibleMoves.push({ x: x + 1, y: y + 2 })
  }

  return possibleMoves.filter(p => {
    square = board[p.y][p.x];
    if (isWhite) {
      return square == 0 || square > 6; // > 6 is black pieces
    }

    return square < 7; // < 7 is white pieces
  });
}

/**
 * Figures out what sqaures are available to the piece in the given location
 */
const calculateAvailableSquares = (board, pieceId, x, y) => {
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

export default calculateAvailableSquares;
