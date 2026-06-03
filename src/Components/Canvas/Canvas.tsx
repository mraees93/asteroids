import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCanvas } from "../../state/actions";
// @ts-expect-error TS(2307): Cannot find module 'react-bootstrap/Container' or ... Remove this comment to see the full error message
import Container from "react-bootstrap/Container";
import {
  animateCanvas,
  eventListeners,
  keydownCallback,
  keyupCallback,
} from "../../util/animateCanvas";

export default function Canvas() {
  const canvasRef = useRef(null);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const context = useSelector((state) => state.canvas);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const canvasWidth = useSelector((state) => state.canvasWidth);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const canvasHeight = useSelector((state) => state.canvasHeight);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const startGame = useSelector((state) => state.startGame);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!context) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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
