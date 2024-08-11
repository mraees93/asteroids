import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Canvas from "../Canvas/Canvas";
import Score from "../Score/Score";
import AllScoresModal from "../AllScoresModal/AllScoresModal";
import GameControlButtons from "../GameControlButtons/GameControlButtons";
import { getAllScores } from "../../state/actions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function GameBoard() {
  const dispatch = useDispatch();

  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  const handleCloseInstructionsModal = () => setShowInstructionsModal(false);

  useEffect(() => {
    dispatch(getAllScores(JSON.parse(sessionStorage.getItem("Scores"))));
  }, [dispatch]);

  return (
    <div data-testid="gameBoardID" style={{ height: "5vh" }}>
      <Modal show={showInstructionsModal} onHide={handleCloseInstructionsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Goal: Shoot as many asteroids as possible before dying(you die when
            you bump into an asteroid) and check your high scores{" "}
          </p>
          <p>W key - move player forward</p>
          <p>UP arrow key - move player forward</p>
          <p>A key - rotate player left</p>
          <p>LEFT arrow key - rotate player left</p>
          <p>S key - reverse player</p>
          <p>DOWN arrow key - reverse player</p>
          <p>D key - rotate player right</p>
          <p>RIGHT arrow key - rotate player right </p>
          <p>Spacebar - shoot bullets</p>
        </Modal.Body>
        <Button variant="secondary" onClick={handleCloseInstructionsModal}>
          Close
        </Button>
      </Modal>
      <GameControlButtons />
      <AllScoresModal />
      <Score />
      <Canvas />
    </div>
  );
}
