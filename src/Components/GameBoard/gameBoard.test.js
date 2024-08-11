import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import { Player } from "../../util/player";
import { Asteroid } from "../../util/asteroid";
import { Bullet } from "../../util/bullet";
import GameBoard from "./GameBoard";
import {
  setPlayer,
  setAsteroids,
  setBullets,
  addPoints,
} from "../../state/actions";

let gameBoardComponent;

beforeEach(() => {
  gameBoardComponent = (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
});

describe("GameBoard component", () => {
  test("should be rendered in the dom", () => {
    render(gameBoardComponent);
    expect(screen.queryByTestId("gameBoardID")).toBeVisible();
  });

  test("should start the game when the start new game button is clicked", () => {
    render(gameBoardComponent);
    const startNewGameButton = screen.queryByText("Start new game");

    fireEvent.click(startNewGameButton);

    expect(store.getState().startGame).toBeTruthy();
  });

  test("should set the players position on the canvas", () => {
    render(gameBoardComponent);

    const canvasWidth = store.getState().canvasWidth;
    const canvasHeight = store.getState().canvasHeight;

    const player = new Player({
      position: { x: canvasWidth / 2, y: canvasHeight / 2 },
      velocity: { x: 0, y: 0 },
    });

    act(() => {
      store.dispatch(setPlayer(player));
    });

    expect(store.getState().player).toBe(player);
  });

  test("should populate the stores asteroids array", () => {
    render(gameBoardComponent);

    const asteroid = new Asteroid({
      position: {
        x: 1,
        y: 2,
      },
      velocity: {
        x: 3,
        y: 4,
      },
      radius: 5,
    });

    expect(store.getState().asteroids.includes(asteroid)).toBeFalsy();

    act(() => {
      store.dispatch(setAsteroids(asteroid));
    });

    expect(store.getState().asteroids[0]).toBe(asteroid);
  });

  test("should populate the stores bullets array", () => {
    render(gameBoardComponent);

    const bullet = new Bullet({
      position: {
        x: 1,
        y: 2,
      },
      velocity: {
        x: 3,
        y: 4,
      },
    });

    expect(store.getState().bullets.includes(bullet)).toBeFalsy();

    act(() => {
      store.dispatch(setBullets(bullet));
    });

    expect(store.getState().bullets[0]).toBe(bullet);
  });

  test("should increment the store and the dom's score by 5 points", () => {
    render(gameBoardComponent);

    expect(store.getState().score).toBe(0);

    act(() => {
      store.dispatch(addPoints(5));
    });

    const score = screen.getByTestId("scoreID").textContent;

    expect(score).toBe("Score: 5");
    expect(store.getState().score).toBe(5);
  });

  test("should stop/reset the game and some of the stores properties when the 'Stop / Reset game' button is clicked", () => {
    render(gameBoardComponent);
    const resetButton = screen.queryByText("Stop / Reset game");

    fireEvent.click(resetButton);

    expect(store.getState().gameOverClick).toBeTruthy();
    expect(store.getState().startGame).toBeFalsy();

    expect(store.getState().player).toBeNull();
    expect(store.getState().bullets.length).toBe(0);

    expect(store.getState().asteroids.length).toBe(0);
    expect(store.getState().gameOver).toBeTruthy();

    expect(store.getState().score).toBe(0);
  });

  test("should display the scores text 'Score 1: 5' in the dom and 5 in the store when 'See your scores' button is clicked", () => {
    render(gameBoardComponent);
    const seeYourScoresButton = screen.queryByText("See your scores");

    fireEvent.click(seeYourScoresButton);

    const scoresModalText = screen.getByTestId("allScoresID").textContent;

    expect(scoresModalText).toBe("Score 1: 5");
    expect(store.getState().scores).toBe(5);
  });
});
