// Importar acciones
import {
  SUCCESSFUL_GET_API_INFORMATION,
  FAILED_GET_API_INFORMATION,
  SET_CHALLENGE_STATE,
  CLEAN_MESSAGE,
  SET_COUNTERS,
  SET_INITIAL_TIME,
  SET_END_TIME,
} from '../types';

// Definir reducer
const challengeReducer = (state, action) => {
  switch (action.type) {
    case CLEAN_MESSAGE:
      return {
        ...state,
        message: null,
      }
    case FAILED_GET_API_INFORMATION:
      return {
        ...state,
        message: action.payload,
      };
    case SUCCESSFUL_GET_API_INFORMATION:
      return {
        ...state,
        characters: action.payload.characters,
        locations: action.payload.locations,
        episodes: action.payload.episodes,
      };
    case SET_CHALLENGE_STATE:
      return {
        ...state,
        challenge: action.payload.name,
        char: action.payload.char,
        loading: true,
      };
    case SET_COUNTERS:
      return {
        ...state,
        countLocations: action.payload.countLocations,
        countEpisodes: action.payload.countEpisodes,
        countCharacters: action.payload.countCharacters,
        loading: false,
      };
    case SET_INITIAL_TIME:
      return {
        ...state,
        startTime: performance.now(),
      };
    case SET_END_TIME:
      return {
        ...state,
        endTime: performance.now(),
      };
    default:
      return state;
  }
}

export default challengeReducer;