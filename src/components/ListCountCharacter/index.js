// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ChallengeContext from '../../context/challengeContext';

const ListCountCharacter = () => {
  // Definir context
  const challengeContext = useContext(ChallengeContext);
  const { challenge, loading } = challengeContext;

  // Renderizar componente
  return (
    !loading && challenge && challenge === '2-all' && (
      <h1>Listar y Contar Personajes</h1>
    )
  );
}

export default ListCountCharacter;