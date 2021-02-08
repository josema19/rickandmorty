// Importar librerías
import React, { useEffect, useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const Header = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { challenge, getApiInformation, selectedChallenge } = challengeContext;

  // Definir effect para obtener la información de la BD
  useEffect(() => {
    getApiInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderizar componente
  return (
    <>
      <div className="site-name" onClick={() => selectedChallenge(null, null)}>
        <h1>Rick And Morty Retos</h1>
      </div>
      <div className="menu-challenge-one">
        <h2>Contador de Caracteres (l - e - c)</h2>
        <div className="challenge-one-content">
          <div className={challenge && challenge === '1-locations' ? 'location' : null} onClick={() => selectedChallenge('1-locations', 'l')}>
            <p>Contar l</p><span>(Localización)</span>
          </div>
          <div className={challenge && challenge === '1-episodes' ? 'episode' : null} onClick={() => selectedChallenge('1-episodes', 'e')}>
            <p>Contar e</p><span>(Episodio)</span>
          </div>
          <div className={challenge && challenge === '1-characters' ? 'character' : null} onClick={() => selectedChallenge('1-characters', 'c')}>
            <p>Contar c</p><span>(Personaje)</span>
          </div>
          <div className={challenge && challenge === '1-all' ? 'first-all' : null} onClick={() => selectedChallenge('1-all', 'l-e-c')}>
            <p>Contar</p><span>(Todo)</span>
          </div>
        </div>
      </div>
      <div className="menu-challenge-two">
        <h2>Información de los Episodios</h2>
        <div className="challenge-two-content">
          <div className={challenge && challenge === '2-all' ? 'second-all' : null} onClick={() => selectedChallenge('2-all', null)}>
            <p>Mostrar Cantidad y Listado</p><span>(Episodio - Localización - Personaje)</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;