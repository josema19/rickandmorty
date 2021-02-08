// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const ListCountCharacter = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { challenge, loading, globalSerie, startTime, endTime } = challengeContext;

  // Renderizar componente
  return (
    !loading && challenge && challenge === '2-all' && (
      <div className="menu-container">
        <h1>Episodios - Personajes</h1>
        <div className="container-titles">
          <h3>Tiempo estimado de la ejecución: {endTime - startTime || 0} milisegundos</h3>
        </div>
        <div className="container-boxes">
          {globalSerie.map((item, index) => (
            <div className="container-box" key={item.name + '-' + index.toString()}>
              <div className="box-item">
                <p>Nombre</p><span>{item.name}</span>
              </div>
              <div className="box-item">
                <p>Cantidad</p><span>{item.totalOriginLocations}</span>
              </div>
              <div className="container-box-item-map">
                <p>Localizaciones</p>
                <div className="content-box-item-map">
                  {item.originLocations.map((location, index) => (
                    <div key={location + '-' + index.toString()}>
                      <p>{location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default ListCountCharacter;