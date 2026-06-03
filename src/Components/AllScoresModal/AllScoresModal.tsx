import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Button' or its... Remove this comment to see the full error message
import Button from "react-bootstrap/Button";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Modal' or its ... Remove this comment to see the full error message
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllScores } from "../../state/actions";

export default function AllScoresModal() {
  const [showAllScoresModal, setShowAllScoresModal] = useState(false);

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const scores = useSelector((state) => state.scores);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gameStart = useSelector((state) => state.startGame);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gameOver = useSelector((state) => state.gameOver);

  const dispatch = useDispatch();

  const handleGetUsersScores = () => {
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
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
                  .sort((a: any, b: any) => b - a)
                  .map((score: any, idx: any) => (
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
