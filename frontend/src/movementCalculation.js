import { getPieceString, isPlayerPiece } from "./utils";

/**
 * Simple function for determing if a square is a valid square to move
 * @param {number} x
 * @param {number} y
 * @returns {boolean} True if the square is empty, or an enemy piece occupies it
 */
const isValidSquare = (board, x, y, isWhite) => board[y][x] === 0 || isEnemyPiece(board, x, y, isWhite)

/**
 * Determines if there is an enemy piece at the given square
 * @param {number} x
 * @param {number} y
 * @returns {boolean} True if the given square contains an enemy piece
 */
const isEnemyPiece = (board, x, y, isWhite) => (isWhite && board[y][x] > 6)
                                 || (!isWhite && board[y][x] < 7 && board[y][x] !== 0)


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

// FIXME: this could be refactored to be wayyyy nicer
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

const calculateAvailableSquaresRook = (board, x, y, isWhite) => {
  const availableSquares = [];

  leftX = x - 1;
  while (leftX >= 0 && isValidSquare(board, leftX, y, isWhite)) {
    availableSquares.push({ x: leftX, y })
    if (isEnemyPiece(board, leftX, y, isWhite)) break;
    leftX -= 1;
  }

  rightX = x + 1;
  while (rightX < board.length && isValidSquare(board, rightX, y, isWhite)) {
    availableSquares.push({ x: rightX, y })
    if (isEnemyPiece(board, rightX, y)) break;
    rightX += 1;
  }

  upY = y - 1;
  while (upY >= 0 && isValidSquare(board, x, upY, isWhite)) {
    availableSquares.push({ x, y: upY })
    if (isEnemyPiece(board, x, upY, isWhite)) break;
    upY -= 1;
  }

  downY = y + 1;
  while (downY < board.length && isValidSquare(board, x, downY, isWhite)) {
    availableSquares.push({ x, y: downY })
    if (isEnemyPiece(board, x, downY, isWhite)) break;
    downY += 1;
  }

  return availableSquares;
}

const calculateAvailableSquaresBishop = (board, x, y, isWhite) => {
  //  x      x
  //   x   x
  //     B
  //   P   x
  //         P
  const availableSquares = [];

  topLeftX = x - 1;
  topLeftY = y - 1;
  while (topLeftX >= 0 && topLeftY >= 0 && isValidSquare(board, topLeftX, topLeftY, isWhite)) {
    availableSquares.push({x: topLeftX, y: topLeftY});
    if (isEnemyPiece(board, topLeftX, topLeftY, isWhite)) break;
    topLeftX -= 1;
    topLeftY -= 1;
  }

  // Shorthand constant for board length
  const L = board.length;

  topRightX = x + 1;
  topRightY = y - 1;
  while (topRightX < L && topRightY >= 0 && isValidSquare(board, topRightX, topRightY, isWhite)) {
    availableSquares.push({x: topRightX, y: topRightY});
    if (isEnemyPiece(board, topRightX, topRightY, isWhite)) break;
    topRightX += 1;
    topRightY -= 1;
  }

  bottomRightX = x + 1;
  bottomRightY = y + 1;
  while (bottomRightX < L && bottomRightY < L && isValidSquare(board, bottomRightX, bottomRightY, isWhite)) {
    availableSquares.push({x: bottomRightX, y: bottomRightY});
    if (isEnemyPiece(board, bottomRightX, bottomRightY, isWhite)) break;
    bottomRightX += 1;
    bottomRightY += 1;
  }

  bottomLeftX = x - 1;
  bottomLeftY = y + 1;
  while (bottomLeftX >= 0 && bottomLeftY < L && isValidSquare(board, bottomLeftX, bottomLeftY, isWhite)) {
    availableSquares.push({x: bottomLeftX, y: bottomLeftY});
    if (isEnemyPiece(board, bottomLeftX, bottomLeftY, isWhite)) break;
    bottomLeftX -= 1;
    bottomLeftY += 1;
  }

  return availableSquares;
}

const calculateAvailableSquaresQueen = (board, x, y, isWhite) => []
  .concat(calculateAvailableSquaresRook(board, x, y, isWhite))
  .concat(calculateAvailableSquaresBishop(board, x, y, isWhite))

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
    case "whiteRook":
    case "blackRook":
      return calculateAvailableSquaresRook(board, x, y, isWhite);
    case "whiteBishop":
    case "blackBishop":
      return calculateAvailableSquaresBishop(board, x, y, isWhite);
    case "whiteQueen":
    case "blackQueen":
      return calculateAvailableSquaresQueen(board, x, y, isWhite);
    default:
      return [];
  }
}

export default calculateAvailableSquares;
