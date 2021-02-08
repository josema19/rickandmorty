// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../context/challengeContext';

const EmptyComponent = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { loading, challenge } = challengeContext;

  // Renderizar componente
  return (
    !loading && !challenge && (
      <div className="empty-component">
        <h1>AÚN NO HAS VISTO ALGUNA SOLUCIÓN DE LOS RETOS DE RICK AND MORTY</h1>
        <p>Por favor selecciona alguna </p>
      </div>
    )
  );
}

export default EmptyComponent;