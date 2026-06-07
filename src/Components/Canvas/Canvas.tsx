import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCanvas } from "../../state/actions";
import Container from "react-bootstrap/Container";
import { RootState } from "../../state/store";
import {
  animateCanvas,
  eventListeners,
  keydownCallback,
  keyupCallback,
} from "../../util/animateCanvas";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const context = useSelector((state: RootState) => state.canvas);
  const canvasWidth = useSelector((state: RootState) => state.canvasWidth);
  const canvasHeight = useSelector((state: RootState) => state.canvasHeight);
  const startGame = useSelector((state: RootState) => state.startGame);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!context && canvasRef.current) {
      dispatch(setCanvas(canvasRef.current.getContext("2d")));
    }
  }, [dispatch, context]);

  useEffect(() => {
    if (context && startGame) {
      animateCanvas(0);
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
