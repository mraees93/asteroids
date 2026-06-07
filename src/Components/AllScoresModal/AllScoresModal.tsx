import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllScores } from "../../state/actions";
import { RootState } from "../../state/store";

export default function AllScoresModal() {
  const [showAllScoresModal, setShowAllScoresModal] = useState<boolean>(false);

  const scores = useSelector((state: RootState) => state.scores);
  const gameStart = useSelector((state: RootState) => state.startGame);
  const gameOver = useSelector((state: RootState) => state.gameOver);

  const dispatch = useDispatch();

  const handleGetUsersScores = () => {
    const rawScores = sessionStorage.getItem("Scores");
    const parsedScores: number[] | null = rawScores ? JSON.parse(rawScores) : null;
    dispatch(getAllScores(parsedScores));
  };

  const handleCloseAllScoresModal = () => setShowAllScoresModal(false);
  const handleShowAllScoresModal = () => setShowAllScoresModal(true);

  return (
    <div>
      <div>
        <Button
          variant="primary"
          size="sm"
          className="m-1"
          onClick={() => {
            handleGetUsersScores();
            handleShowAllScoresModal();
          }}
          disabled={(!gameOver && !gameStart) || gameOver ? false : true}
        >
          See your scores
        </Button>
      </div>
      <div data-testid="allScoresModalID">
        <Modal
          show={showAllScoresModal}
          onHide={handleCloseAllScoresModal}
          scrollable={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>YOUR SCORES</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div data-testid="allScoresID">
              {scores === null ? (
                "No scores yet"
              ) : typeof scores === "number" ? (
                <p>
                  Score 1: <b style={{ color: "blue" }}>{scores}</b>
                </p>
              ) : (
                [...scores]
                  .sort((a: number, b: number) => b - a)
                  .map((score: number, idx: number) => (
                    <p key={idx}>
                      Score {idx + 1}: <b style={{ color: "blue" }}>{score}</b>
                    </p>
                  ))
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAllScoresModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
