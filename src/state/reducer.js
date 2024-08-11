import types from "./types";

const initialState = {
  canvas: null,
  canvasWidth: 1000,
  canvasHeight: 500,
  player: null,
  bullets: [],
  asteroids: [],
  startGame: false,
  score: 0,
  scores: [],
  gameOver: false,
  gameOverClick: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_GAME:
      const updatedScores =
        state.scores === null
          ? null
          : typeof state.scores === "number"
          ? [state.scores, state.score]
          : [...state.scores, state.score];
      return {
        ...state,
        player: null,
        bullets: [],
        asteroids: [],
        startGame: false,
        scores: updatedScores,
        score: 0,
        gameOver: true,
        gameOverClick: true,
      };

    case types.SET_CANVAS:
      return { ...state, canvas: action.payload };

    case types.START_GAME:
      return { ...state, startGame: action.payload };

    case types.SET_PLAYER:
      return { ...state, player: action.payload };

    case types.SET_BULLETS:
      return { ...state, bullets: [...state.bullets, action.payload] };

    case types.SET_ASTEROIDS:
      return { ...state, asteroids: [...state.asteroids, action.payload] };

    case types.REMOVE_ASTEROIDS:
      const asteroids = [...state.asteroids];
      asteroids.splice(action.payload, 1);
      return { ...state, asteroids: asteroids };

    case types.REMOVE_BULLETS:
      const bullets = [...state.bullets];
      bullets.splice(action.payload, 1);
      return { ...state, bullets: bullets };

    case types.ADD_POINTS:
      return { ...state, score: state.score + action.payload };

    case types.GET_USERS_SCORES_SUCCESS:
      return {
        ...state,
        scores: action.payload,
      };

    case types.SET_GAME_OVER:
      return { ...state, gameOver: action.payload };

    case types.SET_GAME_OVER_CLICK:
      return { ...state, gameOverClick: action.payload };

    default:
      return state;
  }
};

export default reducer;
