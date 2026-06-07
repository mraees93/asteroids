import store from "../state/store";
import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { Vector2D } from "../state/reducer";
import {
  setAsteroids,
  removeAsteroids,
  removeBullets,
  resetGame,
} from "../state/actions";

const canvasHeight = store.getState().canvasHeight;
const canvasWidth = store.getState().canvasWidth;

// Define a structural interface for keyboard click states
interface KeyState {
  pressed: boolean;
}

interface InputKeys {
  w: KeyState;
  a: KeyState;
  d: KeyState;
  s: KeyState;
  forward: KeyState;
  left: KeyState;
  right: KeyState;
  reverse: KeyState;
}

export function addScoresAndResetGame(): void {
  const score = store.getState().score;
  const scores = store.getState().scores;

  const addScoresToSessionStorage = (scoresData: number[] | number) => {
    sessionStorage.setItem("Scores", JSON.stringify(scoresData));
  };

  if (scores !== null) {
    let updatedScores: number[] = [];

    if (typeof scores === "number") {
      updatedScores.push(scores, score);
      addScoresToSessionStorage(updatedScores);
    } else {
      updatedScores = [...scores];
      updatedScores.push(score);
      addScoresToSessionStorage(updatedScores);
    }
  } else {
    addScoresToSessionStorage(score);
  }

  store.dispatch(resetGame());
}

export function bulletCollidesWithAsteroid(asteroid: Asteroid, bullet: Bullet): boolean {
  const xDifference = bullet.position.x - asteroid.position.x;
  const yDifference = bullet.position.y - asteroid.position.y;

  const distanceBetweenBulletAndAsteroid = Math.sqrt(
    xDifference * xDifference + yDifference * yDifference
  );

  return distanceBetweenBulletAndAsteroid <= asteroid.radius + bullet.radius;
}

export function playerCollidesWithAsteroid(asteroid: Asteroid, playerVertices: Vector2D[]): boolean {
  for (let i = 0; i < 3; i++) {
    const frontOfPlayer = playerVertices[i];
    const backOfPlayer = playerVertices[(i + 1) % 3];

    if (!frontOfPlayer || !backOfPlayer) continue;

    let directionX = backOfPlayer.x - frontOfPlayer.x;
    let directionY = backOfPlayer.y - frontOfPlayer.y;

    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const middleOfPlayer =
      ((asteroid.position.x - frontOfPlayer.x) * directionX +
        (asteroid.position.y - frontOfPlayer.y) * directionY) /
      Math.pow(length, 2);

    let closestX = frontOfPlayer.x + middleOfPlayer * directionX;
    let closestY = frontOfPlayer.y + middleOfPlayer * directionY;

    if (
      !checkPlayerInLineWithAsteroid(
        closestX,
        closestY,
        frontOfPlayer,
        backOfPlayer
      )
    ) {
      closestX = closestX < frontOfPlayer.x ? frontOfPlayer.x : backOfPlayer.x;
      closestY = closestY < frontOfPlayer.y ? frontOfPlayer.y : backOfPlayer.y;
    }

    directionX = closestX - asteroid.position.x;
    directionY = closestY - asteroid.position.y;

    const distanceBetweenPlayerAndAsteroid = Math.sqrt(
      directionX * directionX + directionY * directionY
    );

    if (distanceBetweenPlayerAndAsteroid <= asteroid.radius) {
      return true;
    }
  }

  return false;
}

export function checkPlayerInLineWithAsteroid(x: number, y: number, start: Vector2D, end: Vector2D): boolean {
  return (
    x >= Math.min(start.x, end.x) &&
    x <= Math.max(start.x, end.x) &&
    y >= Math.min(start.y, end.y) &&
    y <= Math.max(start.y, end.y)
  );
}

export function removeObjectsIfOffCanvas(
  object: Asteroid | Bullet, 
  context: CanvasRenderingContext2D, 
  i: number
): void {
  // Use the canvas configuration element attributes to read actual board dimensions safely
  const boundaryWidth = context.canvas?.width || canvasWidth;
  const boundaryHeight = context.canvas?.height || canvasHeight;

  if (
    object.position.x + object.radius < 0 ||
    object.position.x - object.radius > boundaryWidth ||
    object.position.y - object.radius > boundaryHeight ||
    object.position.y + object.radius < 0
  ) {
    if (object instanceof Bullet) store.dispatch(removeBullets(i));
    else store.dispatch(removeAsteroids(i));
  }
}

export function randomizeAsteroids(index: number, radius: number): void {
  let x: number, y: number;
  let vx: number, vy: number;
  switch (index) {
    case 0:
      x = 0 - radius;
      y = Math.random() * canvasWidth;
      vx = 1;
      vy = 0;
      break;
    case 1:
      x = Math.random() * canvasHeight;
      y = canvasWidth + radius;
      vx = 0;
      vy = -1;
      break;
    case 2:
      x = canvasHeight + radius;
      y = Math.random() * canvasWidth;
      vx = -1;
      vy = 0;
      break;
    case 3:
      x = Math.random() * canvasHeight;
      y = 0 - radius;
      vx = 0;
      vy = 1;
      break;
    default:
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
  }

  store.dispatch(
    setAsteroids(
      new Asteroid({
        position: { x, y },
        velocity: { x: vx, y: vy },
        radius,
      }) as any
    )
  );
}

export const keys: InputKeys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
  s: { pressed: false },
  forward: { pressed: false },
  left: { pressed: false },
  right: { pressed: false },
  reverse: { pressed: false },
};
