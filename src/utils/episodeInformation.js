/**
 *
 * @param {*} episodes
 * @param {*} characters
 * Devuelve un arreglo con la información de los episodios, el número de locations y los nombres de los * mismos.
 */
const episodeInformation = (episodes, characters) => {
  // Definir arreglo que será devuelto como respuesta
  let episodesCharactersArr = [];

  // Comenzar a revisar la información de cada episodio
  episodes.forEach(episode => {
    // Definir arreglo para las localizaciones
    let originLocations = [];

    // Recorrer información de los personajes únicos en cada episodio
    episode.characters.forEach(character => {
      // Obtener datos del personaje, validar que exista y almacenar
      // el nombre de la localización de origen si es el caso
      const characterInfo = characters.find(item => item.url === character);

      if (characterInfo && !originLocations.includes(characterInfo.origin.name)) {
        originLocations.push(characterInfo.origin.name);
      };
    });

    // Construir y almacenar objeto en el arreglo
    episodesCharactersArr.push({
      name: episode.name,
      totalOriginLocations: originLocations.length,
      originLocations,
    });
  });

  return episodesCharactersArr;
};

export default episodeInformation;