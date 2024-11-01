import m from "mithril";
import Chessboard from "./Chessboard";

const App = {
  view: () => {
    return m("div", {
      class: "h-screen w-screen flex justify-center items-center"
    }, m(Chessboard))
  }
};

export default App;
