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
import { Asteroid } from "./asteroid";
import { GameEntity } from "../state/reducer";
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

let playerInstance: Player | null = null;
let asteroidID = 0;

export function animateCanvas(timestamp: number): void {
  asteroidID++;
  
  const activeCanvas = store.getState().canvas;
  const startGame = store.getState().startGame;
  const gameOver = store.getState().gameOver;
  
  const animationId = window.requestAnimationFrame(animateCanvas);
  const radius = 50 * Math.random() + 10;

  if (!playerInstance) {
    playerInstance = new Player({
      position: { x: canvasWidth / 2, y: canvasHeight / 2 },
      velocity: { x: 0, y: 0 },
    });
    store.dispatch(setPlayer(playerInstance as any));
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

  if (activeCanvas && playerInstance) {
    activeCanvas.fillStyle = "black";
    activeCanvas.fillRect(0, 0, canvasWidth, canvasHeight);
    playerInstance.update(activeCanvas);

    const bullets = store.getState().bullets;

    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i] as unknown as Bullet;
      if (bullet && typeof bullet.update === "function") {
        bullet.update(activeCanvas);
      }
      removeObjectsIfOffCanvas(bullet, activeCanvas, i);
    }

    asteroids = store.getState().asteroids;

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i] as unknown as Asteroid;
      if (asteroid && typeof asteroid.update === "function") {
        asteroid.update(activeCanvas);
      }

      if (asteroid && playerCollidesWithAsteroid(asteroid, playerInstance.getVertices())) {
        store.dispatch(setGameOver(true));
        store.dispatch(setGameOverClick(false));
      }

      removeObjectsIfOffCanvas(asteroid, activeCanvas, i);

      for (let j = bullets.length - 1; j >= 0; j--) {
        const bullet = bullets[j] as unknown as Bullet;
        if (asteroid && bullet && bulletCollidesWithAsteroid(asteroid, bullet)) {
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
      playerInstance.velocity.x = Math.cos(playerInstance.rotation) * SPEED;
      playerInstance.velocity.y = Math.sin(playerInstance.rotation) * SPEED;
      return;
    } else {
      playerInstance.velocity.x *= FRICTION;
      playerInstance.velocity.y *= FRICTION;
    }

    if (keys.s.pressed || keys.reverse.pressed) {
      playerInstance.velocity.x = -Math.cos(playerInstance.rotation) * SPEED;
      playerInstance.velocity.y = -Math.sin(playerInstance.rotation) * SPEED;
      return;
    } else {
      playerInstance.velocity.x *= -FRICTION;
      playerInstance.velocity.y *= -FRICTION;
    }

    if (keys.d.pressed || keys.right.pressed) playerInstance.rotation += ROTATIONAL_SPEED;
    else if (keys.a.pressed || keys.left.pressed)
      playerInstance.rotation -= ROTATIONAL_SPEED;
  }
}

export function keydownCallback(event: KeyboardEvent): void {
  if (!playerInstance) return;

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
              x: playerInstance.position.x + Math.cos(playerInstance.rotation) * 30,
              y: playerInstance.position.y + Math.sin(playerInstance.rotation) * 30,
            },
            velocity: {
              x: Math.cos(playerInstance.rotation) * BULLET_SPEED,
              y: Math.sin(playerInstance.rotation) * BULLET_SPEED,
            },
          }) as unknown as GameEntity
        )
      );
      break;
    default:
      break;
  }
}

export function keyupCallback(event: KeyboardEvent): void {
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

export function eventListeners(windowElement: Window): void {
  windowElement.addEventListener("keydown", keydownCallback);
  windowElement.addEventListener("keyup", keyupCallback);
}
