import types from "./types";
import { GameEntity } from "./reducer";

export function setCanvas(canvas: CanvasRenderingContext2D | null) {
  return { type: types.SET_CANVAS, payload: canvas };
}

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function startGame(payload: boolean) {
  return { type: types.START_GAME, payload: payload };
}

export function setPlayer(payload: GameEntity | null) {
  return { type: types.SET_PLAYER, payload: payload };
}

export function setBullets(payload: GameEntity) {
  return { type: types.SET_BULLETS, payload: payload };
}

export function setAsteroids(payload: GameEntity) {
  return { type: types.SET_ASTEROIDS, payload: payload };
}

export function addPoints(points: number) {
  return { type: types.ADD_POINTS, payload: points };
}

export function removeAsteroids(index: number) {
  return { type: types.REMOVE_ASTEROIDS, payload: index };
}

export function removeBullets(index: number) {
  return { type: types.REMOVE_BULLETS, payload: index };
}

export function getAllScores(scores: number[] | null) {
  return { type: types.GET_USERS_SCORES, payload: scores };
}

export function setGameOver(payload: boolean) {
  return { type: types.SET_GAME_OVER, payload: payload };
}

export function setGameOverClick(payload: boolean) {
  return { type: types.SET_GAME_OVER_CLICK, payload: payload };
}
