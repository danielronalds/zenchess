import ChessGame from "./models/ChessGame"

/**
 * Translates a piece id into the string of what the piece is
 *
 * @param {number} pieceId
 */
export const getPieceString = (pieceId) => {
  switch (pieceId) {
    case 1:
      return "whiteKing";
    case 2:
      return "whiteQueen";
    case 3:
      return "whiteBishop";
    case 4:
      return "whiteKnight";
    case 5:
      return "whiteRook";
    case 6:
      return "whitePawn";
    case 7:
      return "blackKing";
    case 8:
      return "blackQueen";
    case 9:
      return "blackBishop";
    case 10:
      return "blackKnight";
    case 11:
      return "blackRook";
    case 12:
      return "blackPawn";
    default:
      return "";
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
