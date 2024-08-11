import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllScores } from "../../state/actions";

export default function AllScoresModal() {
  const [showAllScoresModal, setShowAllScoresModal] = useState(false);

  const scores = useSelector((state) => state.scores);
  const gameStart = useSelector((state) => state.startGame);
  const gameOver = useSelector((state) => state.gameOver);

  const dispatch = useDispatch();

  const handleGetUsersScores = () => {
    dispatch(getAllScores(JSON.parse(sessionStorage.getItem("Scores"))));
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
                scores
                  .sort((a, b) => b - a)
                  .map((score, idx) => (
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
