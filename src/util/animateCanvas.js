import store from "../state/store";
import {
  addPoints,
  removeAsteroids,
  removeBullets,
  setBullets,
  setGameOver,
  setPlayer,
  setGameOverClick,
} from "../state/actions";
import { Player } from "./player";
import { Bullet } from "./bullet";
import {
  removeObjectsIfOffCanvas,
  keys,
  randomizeAsteroids,
  playerCollidesWithAsteroid,
  bulletCollidesWithAsteroid,
} from "./utilsToAnimateCanvas";

let asteroids = store.getState().asteroids;
const canvasHeight = store.getState().canvasHeight;
const canvasWidth = store.getState().canvasWidth;

const SPEED = 3;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.97;
const BULLET_SPEED = 3;
let player;
let asteroidID = 0;

export function animateCanvas(context) {
  asteroidID++;
  context = store.getState().canvas;
  const startGame = store.getState().startGame;
  const gameOver = store.getState().gameOver;
  const animationId = window.requestAnimationFrame(animateCanvas);
  const radius = 50 * Math.random() + 10;

  if (!player) {
    store.dispatch(
      setPlayer(
        new Player({
          position: { x: canvasWidth / 2, y: canvasHeight / 2 },
          velocity: { x: 0, y: 0 },
        })
      )
    );
    player = store.getState().player;
  }

  if (asteroidID % 50 === 0) {
    if (startGame) {
      const index = Math.floor(Math.random() * 4);
      randomizeAsteroids(index, radius);
    }
  }
  if (gameOver) {
    window.cancelAnimationFrame(animationId);
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  player.update(context);

  const bullets = store.getState().bullets;

  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.update(context);

    removeObjectsIfOffCanvas(bullet, context, i);
  }

  asteroids = store.getState().asteroids;

  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update(context);

    if (playerCollidesWithAsteroid(asteroid, player.getVertices())) {
      store.dispatch(setGameOver(true));
      store.dispatch(setGameOverClick(false));
    }

    removeObjectsIfOffCanvas(asteroid, context, i);

    for (let j = bullets.length - 1; j >= 0; j--) {
      const bullet = bullets[j];

      if (bulletCollidesWithAsteroid(asteroid, bullet)) {
        if (radius >= 1 && radius <= 30) {
          store.dispatch(addPoints(5));
        }
        if (radius > 30) {
          store.dispatch(addPoints(1));
        }
        store.dispatch(removeBullets(j));

        store.dispatch(removeAsteroids(i));
      }
    }
  }

  if (keys.w.pressed || keys.forward.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
    return;
  } else if (!keys.w.pressed || !keys.forward.pressed) {
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION;
  }

  if (keys.s.pressed || keys.reverse.pressed) {
    player.velocity.x = -Math.cos(player.rotation) * SPEED;
    player.velocity.y = -Math.sin(player.rotation) * SPEED;
    return;
  } else if (!keys.s.pressed || !keys.reverse.pressed) {
    player.velocity.x *= -FRICTION;
    player.velocity.y *= -FRICTION;
  }

  if (keys.d.pressed || keys.right.pressed) player.rotation += ROTATIONAL_SPEED;
  else if (keys.a.pressed || keys.left.pressed)
    player.rotation -= ROTATIONAL_SPEED;
}

export function keydownCallback(event) {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = true;
      break;
    case "ArrowUp":
      event.preventDefault();
      keys.forward.pressed = true;
      break;
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.left.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      keys.right.pressed = true;
      break;
    case "KeyS":
      keys.s.pressed = true;
      break;
    case "ArrowDown":
      event.preventDefault();
      keys.reverse.pressed = true;
      break;
    case "Space":
      event.preventDefault();
      store.dispatch(
        setBullets(
          new Bullet({
            position: {
              x: player.position.x + Math.cos(player.rotation) * 30,
              y: player.position.y + Math.sin(player.rotation) * 30,
            },
            velocity: {
              x: Math.cos(player.rotation) * BULLET_SPEED,
              y: Math.sin(player.rotation) * BULLET_SPEED,
            },
          })
        )
      );
      break;
    default:
      break;
  }
}

export function keyupCallback(event) {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "ArrowUp":
      keys.forward.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.left.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.right.pressed = false;
      break;
    case "KeyS":
      keys.s.pressed = false;
      break;
    case "ArrowDown":
      keys.reverse.pressed = false;
      break;
    default:
      break;
  }
}

export function eventListeners(window) {
  window.addEventListener("keydown", keydownCallback);

  window.addEventListener("keyup", keyupCallback);
}
