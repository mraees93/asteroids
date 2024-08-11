import types from "./types";

export function setCanvas(canvas) {
  return { type: types.SET_CANVAS, payload: canvas };
}

export function resetGame() {
  return { type: types.RESET_GAME };
}

export function startGame(payload) {
  return { type: types.START_GAME, payload: payload };
}

export function setPlayer(payload) {
  return { type: types.SET_PLAYER, payload: payload };
}

export function setBullets(payload) {
  return { type: types.SET_BULLETS, payload: payload };
}

export function setAsteroids(payload) {
  return { type: types.SET_ASTEROIDS, payload: payload };
}

export function addPoints(points) {
  return { type: types.ADD_POINTS, payload: points };
}

export function removeAsteroids(index) {
  return { type: types.REMOVE_ASTEROIDS, payload: index };
}

export function removeBullets(index) {
  return { type: types.REMOVE_BULLETS, payload: index };
}

export function getAllScores(scores) {
  return { type: types.GET_USERS_SCORES, payload: scores };
}

export function setGameOver(payload) {
  return { type: types.SET_GAME_OVER, payload: payload };
}

export function setGameOverClick(payload) {
  return { type: types.SET_GAME_OVER_CLICK, payload: payload };
}
