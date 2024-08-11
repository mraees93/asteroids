import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCanvas } from "../../state/actions";
import Container from "react-bootstrap/Container";
import {
  animateCanvas,
  eventListeners,
  keydownCallback,
  keyupCallback,
} from "../../util/animateCanvas";

export default function Canvas() {
  const canvasRef = useRef(null);
  const context = useSelector((state) => state.canvas);
  const canvasWidth = useSelector((state) => state.canvasWidth);
  const canvasHeight = useSelector((state) => state.canvasHeight);
  const startGame = useSelector((state) => state.startGame);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!context) {
      dispatch(setCanvas(canvasRef.current.getContext("2d")));
    }
  }, [dispatch, context]);

  useEffect(() => {
    if (context && startGame) {
      animateCanvas(context);
    }
  }, [context, startGame]);

  useEffect(() => {
    eventListeners(window);
    return () => {
      window.removeEventListener("keydown", keydownCallback);
      window.removeEventListener("keyup", keyupCallback);
    };
  }, []);

  return (
    <Container className="container">
      <canvas
        data-testid="canvasID"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </Container>
  );
}
