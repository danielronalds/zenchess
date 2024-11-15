import ChessGame from "./models/ChessGame"

export const WhiteKingId = 1;
export const WhiteQueenId = 2;
export const WhiteBishopId = 3;
export const WhiteKnightId = 4;
export const WhiteRookId = 5;
export const WhitePawnId = 6;
export const BlackKingId = 7;
export const BlackQueenId = 8;
export const BlackBishopId = 9;
export const BlackKnightId = 10;
export const BlackRookId = 11;
export const BlackPawnId = 12;

/**
 * Translates a piece id into the string of what the piece is
 *
 * @param {number} pieceId
 */
export const getPieceString = (pieceId) => {
  switch (pieceId) {
    case WhiteKingId:
      return "whiteKing";
    case WhiteQueenId:
      return "whiteQueen";
    case WhiteBishopId:
      return "whiteBishop";
    case WhiteKnightId:
      return "whiteKnight";
    case WhiteRookId:
      return "whiteRook";
    case WhitePawnId:
      return "whitePawn";
    case BlackKingId:
      return "blackKing";
    case BlackQueenId:
      return "blackQueen";
    case BlackBishopId:
      return "blackBishop";
    case BlackKnightId:
      return "blackKnight";
    case BlackRookId:
      return "blackRook";
    case BlackPawnId:
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
