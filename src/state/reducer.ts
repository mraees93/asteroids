import types from "./types";

export interface Vector2D {
  x: number;
  y: number;
}

export interface GameEntity {
  x: Vector2D;
  y: Vector2D;
  radius: number;
  [key: string]: any; 
}

export interface GameState {
  canvas: CanvasRenderingContext2D | null;
  canvasWidth: number;
  canvasHeight: number;
  player: GameEntity | null;
  bullets: GameEntity[];
  asteroids: GameEntity[];
  startGame: boolean;
  score: number;
  scores: number[] | null;
  gameOver: boolean;
  gameOverClick: boolean;
}

export interface GameAction {
  type: string;
  payload?: any; 
}

const initialState: GameState = {
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

const reducer = (state: GameState = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case types.RESET_GAME:
      let updatedScores: number[] | null = null;
      
      if (state.scores !== null) {
        updatedScores = [...state.scores, state.score];
      } else {
        updatedScores = [state.score];
      }

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
