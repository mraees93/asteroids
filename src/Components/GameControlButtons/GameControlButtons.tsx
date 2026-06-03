import React from "react";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Button' or its... Remove this comment to see the full error message
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setGameOver, startGame } from "../../state/actions";
import GameOverModal from "../GameOverModal/GameOverModal";
import { addScoresAndResetGame } from "../../util/utilsToAnimateCanvas";

export default function GameControlButtons() {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
