import store from "../state/store";
import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import {
  setAsteroids,
  removeAsteroids,
  removeBullets,
  resetGame,
} from "../state/actions";

const canvasHeight = store.getState().canvasHeight;
const canvasWidth = store.getState().canvasWidth;

export function addScoresAndResetGame() {
  const score = store.getState().score;
  const scores = store.getState().scores;

  const addScoresToSessionStorage = (scores) => {
    sessionStorage.setItem("Scores", JSON.stringify(scores));
  };

  if (scores !== null) {
    let updatedScores = [];

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

export function bulletCollidesWithAsteroid(asteroid, bullet) {
  const xDifference = bullet.position.x - asteroid.position.x;
  const yDifference = bullet.position.y - asteroid.position.y;

  const distanceBetweenBulletAndAsteroid = Math.sqrt(
    xDifference * xDifference + yDifference * yDifference
  );

  if (distanceBetweenBulletAndAsteroid <= asteroid.radius + bullet.radius) {
    return true;
  }

  return false;
}

export function playerCollidesWithAsteroid(asteroid, player) {
  for (let i = 0; i < 3; i++) {
    const frontOfPlayer = player[i];
    const backOfPlayer = player[(i + 1) % 3];

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

export function checkPlayerInLineWithAsteroid(x, y, start, end) {
  return (
    x >= Math.min(start.x, end.x) &&
    x <= Math.max(start.x, end.x) &&
    y >= Math.min(start.y, end.y) &&
    y <= Math.max(start.y, end.y)
  );
}

export function removeObjectsIfOffCanvas(object, context, i) {
  if (
    object.position.x + object.radius < 0 ||
    object.position.x - object.radius > context.width ||
    object.position.y - object.radius > context.height ||
    object.position.y + object.radius < 0
  ) {
    if (object instanceof Bullet) store.dispatch(removeBullets(i));
    else store.dispatch(removeAsteroids(i));
  }
}

export function randomizeAsteroids(index, radius) {
  let x, y;
  let vx, vy;
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
        position: {
          x: x,
          y: y,
        },
        velocity: {
          x: vx,
          y: vy,
        },
        radius,
      })
    )
  );
}

export const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  forward: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  reverse: {
    pressed: false,
  },
};
