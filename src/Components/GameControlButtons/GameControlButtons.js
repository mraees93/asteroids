import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setGameOver, startGame } from "../../state/actions";
import GameOverModal from "../GameOverModal/GameOverModal";
import { addScoresAndResetGame } from "../../util/utilsToAnimateCanvas";

export default function GameControlButtons() {
  const gameStart = useSelector((state) => state.startGame);

  const dispatch = useDispatch();

  const handleStartNewGame = () => {
    dispatch(setGameOver(false));
    dispatch(startGame(true));
  };

  return (
    <div data-testid="buttonsID">
      <Button
        variant="primary"
        size="sm"
        className="m-1"
        onClick={addScoresAndResetGame}
        disabled={gameStart ? false : true}
      >
        Stop / Reset game
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={handleStartNewGame}
        disabled={gameStart ? true : false}
      >
        Start new game
      </Button>
      <GameOverModal handleStartNewGame={handleStartNewGame} />
    </div>
  );
}
