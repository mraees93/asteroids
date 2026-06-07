import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addScoresAndResetGame } from "../../util/utilsToAnimateCanvas";

interface GameOverModalProps {
  handleStartNewGame: () => void;
}

export default function GameOverModal({ handleStartNewGame }: GameOverModalProps) {
  const gameOver = useSelector((state: RootState) => state.gameOver);
  const gameOverClick = useSelector((state: RootState) => state.gameOverClick);
  const gameStart = useSelector((state: RootState) => state.startGame);

  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

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
