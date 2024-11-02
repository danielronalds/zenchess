import m from "mithril";
import { getPieceString } from "../utils";

const ChessPiece = {
  view: (vn) => {
    if (vn.attrs.pieceId == 0) return;

    return m("div.chesspiece ." + getPieceString(vn.attrs.pieceId), !vn.attrs.isSelected ? "" :
      m("div", { class: "z-2 relative top-0 left-0 border-4 border-red-500 w-full h-full rounded" }))
  }
};

export default ChessPiece;
