import m from "mithril";
import { getPieceString } from "../utils";

const ChessSquare = {
  view: (vn) => {
    if (vn.attrs.pieceId == 0 && !vn.attrs.isSelected && !vn.attrs.isAvailableMove) return;

    let child = "";
    if (vn.attrs.isSelected) {
      child = m("div", { class: "z-100 relative top-0 left-0 border-4 border-red-500 w-full h-full rounded" })
    }
    if (vn.attrs.isAvailableMove) {
      child = m("div", { class: "z-100 relative top-0 left-0 border-4 border-blue-500 w-full h-full rounded" })
      if (vn.attrs.pieceId == 0) return child; // If there is no piece, don't render one
    }

    return m("div.chesspiece .z-4 ." + getPieceString(vn.attrs.pieceId), child)
  }
};

export default ChessSquare;
