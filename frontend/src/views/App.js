import m from "mithril";
import Chessboard from "./Chessboard";

const App = {
  view: () => {
    return m("div", {
      class: "h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200"
    }, m(Chessboard, { size: 90 * 8, player: "black" }))
  }
};

export default App;
