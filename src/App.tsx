import "./App.css";
import GameBoard from "./Components/GameBoard/GameBoard";

function App() {
  // @ts-expect-error TS(2749): 'GameBoard' refers to a value, but is being used a... Remove this comment to see the full error message
  return <GameBoard />;
}

export default App;
