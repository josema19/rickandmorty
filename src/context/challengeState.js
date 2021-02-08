// Importar librerías
import React, { useReducer } from 'react';
import ChallengeContext from './challengeContext';
import ChallengeReducer from './challengeReducer';

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

// Importar cliente axios
import axiosClient from '../config';

// Importar utilidades
import characterCounter from '../utils/characterCounter';

const ChallengeState = ({ children }) => {
  // Definir state inicial
  const initialState = {
    locations: [],
    countLocations: {},
    episodes: [],
    countEpisodes: {},
    characters: [],
    countCharacters: {},
    globalSerie: [],
    challenge: null,
    char: null,
    message: null,
    loading: null,
    startTime: null,
    endTime: null,
  };

  // Definir reducer
  const [state, dispach] = useReducer(ChallengeReducer, initialState);

  // Definir funciones
  /**
   * Hace las tres consultas a la api y almacena la información en el state.
   */
  const getApiInformation = async () => {
    try {
      // Obtener información de la api
      const [characters, locations, episodes] = await Promise.all([
        axiosClient.get('/character'),
        axiosClient.get('/location'),
        axiosClient.get('/episode'),
      ]);

      // Actualizar state
      dispach({
        type: SUCCESSFUL_GET_API_INFORMATION,
        payload: {
          characters: characters.data.results,
          locations: locations.data.results,
          episodes: episodes.data.results,
        }
      });
    } catch (error) {
      console.log(error.response.data);

      // Actualizar state
      dispach({
        type: FAILED_GET_API_INFORMATION,
        payload: 'Hubo un error al intentar consultar alguna de las APIs dadas'
      });

      // Inicializar state.message
      setTimeout(() => {
        dispach({
          type: CLEAN_MESSAGE,
        });

      }, 3000);
    }
  };

  /**
   *
   * @param {*} name
   * @param {*} char
   * Actualiza los campos challenge y char del state. Y realiza el cálculo correspondiente
   */
  const selectedChallenge = (name, char) => {
    // Inicializar tiempo
    dispach({
      type: SET_INITIAL_TIME
    });

    // Actualizar state
    dispach({
      type: SET_CHALLENGE_STATE,
      payload: {
        name,
        char,
      }
    });

    // Usar función helper según sea el caso
    let countLocations = {}, countEpisodes = {}, countCharacters = {}, globalSerie = [];
    switch (char) {
      case 'l':
        countLocations = characterCounter(state.locations, char);
        break;
      case 'e':
        countEpisodes = characterCounter(state.episodes, char);
        break;
      case 'c':
        countCharacters = characterCounter(state.characters, char);
        break;
      case 'l-e-c':
        countLocations = characterCounter(state.locations, 'l');
        countEpisodes = characterCounter(state.episodes, 'e');
        countCharacters = characterCounter(state.characters, 'c');
        break;
      default:
        break;
    };

    // Actualizar state
    dispach({
      type: SET_COUNTERS,
      payload: {
        countLocations,
        countEpisodes,
        countCharacters,
        globalSerie,
      }
    });

    // Finalizar tiempo
    dispach({
      type: SET_END_TIME
    });
  };

  // Renderizar componente
  return (
    <ChallengeContext.Provider
      value={{
        characters: state.characters,
        locations: state.locations,
        episodes: state.episodes,
        challenge: state.challenge,
        char: state.char,
        message: state.message,
        loading: state.loading,
        startTime: state.startTime,
        endTime: state.endTime,
        countLocations: state.countLocations,
        countEpisodes: state.countEpisodes,
        countCharacters: state.countCharacters,
        globalSerie: state.globalSerie,
        getApiInformation,
        selectedChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )

};

export default ChallengeState;