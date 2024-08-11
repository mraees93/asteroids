import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Canvas from "../Canvas/Canvas";
import Score from "../Score/Score";
import AllScoresModal from "../AllScoresModal/AllScoresModal";
import GameControlButtons from "../GameControlButtons/GameControlButtons";
import { getAllScores } from "../../state/actions";

export default function GameBoard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllScores(JSON.parse(sessionStorage.getItem("Scores"))));
  }, [dispatch]);

  return (
    <div data-testid="gameBoardID" style={{ height: "5vh" }}>
      <GameControlButtons />
      <AllScoresModal />
      <Score />
      <Canvas />
    </div>
  );
}
