// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const Loading = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { loading } = challengeContext;

  // Renderizar componente
  return (
    loading && (
      <div className="container-loading">
        <div className="loading-animation"></div>
        <h1>Cargando...</h1>
      </div>
    )
  );
}

export default Loading;