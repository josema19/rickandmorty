// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const Alert = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { message } = challengeContext;

  // Renderizar componente
  return (
    message && (
      <div className="alert">
        {message}
      </div>
    )
  );
}

export default Alert;