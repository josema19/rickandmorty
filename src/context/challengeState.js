// Importar librerías
import React, { useReducer } from 'react';
import ChallengeContext from './challengeContext';
import ChallengeReducer from './challengeReducer';

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

// Importar cliente axios
import axiosClient from '../config';

// Importar utilidades
import characterCounter from '../utils/characterCounter';
import episodeInformation from '../utils/episodeInformation';

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
   *
   * @param {*} path
   * Obtiene la información de una en función del path dado.
   */
  const getApiInformation = async (path) => {
    try {
      // Definir arreglo que contendrá toda la información
      let itemsPages = [];

      // Obtener información de la api
      let response = await axiosClient.get(path);

      // Contatenar información
      itemsPages = itemsPages.concat(response.data.results);

      // Consultar resto de la información
      while (response.data.info.next) {
        response = await axiosClient.get(response.data.info.next);
        itemsPages = itemsPages.concat(response.data.results);
      };

      // Actualizar state según sea el path de entrada
      switch (path) {
        case '/location':
          dispach({
            type: SUCCESSFUL_GET_LOCATION_INFORMATION,
            payload: itemsPages,
          });
          break;
        case '/episode':
          dispach({
            type: SUCCESSFUL_GET_EPISODE_INFORMATION,
            payload: itemsPages,
          });
          break;
        case '/character':
          dispach({
            type: SUCCESSFUL_GET_CHARACTER_INFORMATION,
            payload: itemsPages,
          });
          break;
        default:
          break;
      };
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
    };

    return Promise.resolve();
  };

  /**
   *
   * @param {*} name
   * @param {*} char
   * Actualiza los campos challenge y char del state. Y realiza el cálculo correspondiente
   */
  const selectedChallenge = async (name, char) => {
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

    // Obtener información de la BD en función de los parámetros de entrada
    // y de ser necesario
    let promises = [];
    if ((name === '1-locations') && (state.locations.length === 0)) {
      await getApiInformation('/location');
    } else if ((name === '1-episodes') && (state.episodes.length === 0)) {
      await getApiInformation('/episode');
    } else if ((name === '1-characters') && (state.characters.length === 0)) {
      await getApiInformation('/character');
    } else if (name === '1-all') {
      if (state.locations.length === 0) {
        promises.push(getApiInformation('/location'));
      };
      if (state.episodes.length === 0) {
        promises.push(getApiInformation('/episode'));
      };
      if (state.characters.length === 0) {
        promises.push(getApiInformation('/character'));
      };
      await Promise.all(promises);
    } else {
      if (state.episodes.length === 0) {
        promises.push(getApiInformation('/episode'));
      };
      if (state.characters.length === 0) {
        promises.push(getApiInformation('/character'));
      };
      await Promise.all(promises);
    };

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
        globalSerie = episodeInformation(state.episodes, state.characters);
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
        selectedChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )

};

export default ChallengeState;