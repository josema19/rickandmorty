// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const CountChar = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { challenge, loading, countLocations, countEpisodes, countCharacters, char, startTime, endTime } = challengeContext;

  // Definir componente extra
  const ExtraComponent = () => {
    // Definir string y arreglo según el valor del char
    let title = '', selectedArray = null;

    switch (challenge) {
      case '1-locations':
        title = 'Localizaciones';
        selectedArray = countLocations;
        break;
      case '1-episodes':
        title = 'Episodios';
        selectedArray = countEpisodes;
        break;
      case '1-characters':
        title = 'Personajes';
        selectedArray = countCharacters;
        break;
      default:
        return null;
    };

    // Renderizar componente
    return (
      <>
        <h1>{title}</h1>
        <div className="container-titles">
          <h3>Número total de ocurrencias de {char}: {selectedArray.totalCount}</h3>
          <h3>Tiempo estimado de la ejecución: {endTime - startTime || 0}</h3>
        </div>
        <div className="container-boxes">
          {selectedArray.data.map((item, index) => (
            <div className="container-box" key={item.name + '-' + index.toString()}>
              <div className="box-item">
                <p>Nombre</p><span>{item.name}</span>
              </div>
              <div className="box-item">
                <p>Ocurrencias</p><span>{item.ocurrences}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  // Renderizar componente
  return (
    !loading && challenge && challenge !== '2-all' && (
      <div className="menu-container">
        <ExtraComponent />
        {challenge === '1-all' && (
          <>
            <h1>Localizaciones - Episodios - Personajes</h1>
            <div className="container-titles">
              <h3>Número total de ocurrencias de {char}: {countLocations.totalCount + countEpisodes.totalCount + countCharacters.totalCount}</h3>
              <h3>Tiempo estimado de ejecución: {endTime - startTime || 0} milisegundos</h3>
            </div>
          </>
        )}
      </div>
    )
  );
}

export default CountChar;