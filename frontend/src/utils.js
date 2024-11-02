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
