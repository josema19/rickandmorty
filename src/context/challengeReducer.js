// Importar acciones
import {
  SUCCESSFUL_GET_LOCATION_INFORMATION,
  SUCCESSFUL_GET_EPISODE_INFORMATION,
  SUCCESSFUL_GET_CHARACTER_INFORMATION,
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
    case SUCCESSFUL_GET_LOCATION_INFORMATION:
      return {
        ...state,
        locations: action.payload,
      };
    case SUCCESSFUL_GET_EPISODE_INFORMATION:
      return {
        ...state,
        episodes: action.payload,
      };
    case SUCCESSFUL_GET_CHARACTER_INFORMATION:
      return {
        ...state,
        characters: action.payload,
      };
    case SET_CHALLENGE_STATE:
      return {
        ...state,
        challenge: action.payload.name,
        char: action.payload.char,
      };
    case SET_COUNTERS:
      return {
        ...state,
        countLocations: action.payload.countLocations,
        countEpisodes: action.payload.countEpisodes,
        countCharacters: action.payload.countCharacters,
        globalSerie: action.payload.globalSerie,
      };
    case SET_INITIAL_TIME:
      return {
        ...state,
        startTime: performance.now(),
        loading: true,
      };
    case SET_END_TIME:
      return {
        ...state,
        endTime: performance.now(),
        loading: false,
      };
    default:
      return state;
  }
}

export default challengeReducer;