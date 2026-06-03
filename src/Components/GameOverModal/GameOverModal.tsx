import { useEffect, useState } from "react";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Button' or its... Remove this comment to see the full error message
import Button from "react-bootstrap/Button";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Modal' or its ... Remove this comment to see the full error message
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { addScoresAndResetGame } from "../../util/utilsToAnimateCanvas";

export default function GameOverModal({
  handleStartNewGame
}: any) {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gameOver = useSelector((state) => state.gameOver);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gameOverClick = useSelector((state) => state.gameOverClick);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gameStart = useSelector((state) => state.startGame);

  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const handleCloseModal = () => setShowGameOverModal(false);

  useEffect(() => {
    if (gameOver && !gameOverClick) setShowGameOverModal(true);
  }, [gameOver, gameOverClick]);

  return (
    <div data-testid="gameOverModalID">
      <Modal show={showGameOverModal} onHide={handleCloseModal}>
        <Modal.Body>GAME OVER</Modal.Body>
        <Modal.Footer>
          {gameOverClick ? (
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={gameStart ? false : true}
              onClick={addScoresAndResetGame}
            >
              Reset game
            </Button>
          )}
          <Button
            variant="secondary"
            disabled={gameStart ? true : false}
            onClick={() => {
              handleStartNewGame();
              handleCloseModal();
            }}
          >
            Start new game
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
