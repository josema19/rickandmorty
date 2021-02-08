/**
 *
 * @param {*} array
 * @param {*} char
 * Devuelve un objeto con información relevante (personaje, episodio, ubicación) y el número total de * ocurrencias.
 */
const characterCounter = (array, char) => {
  // Definir arreglo de respuesta
  let newArray = [], totalCount = 0;

  array.forEach(element => {
    // Contar ocurrencias
    let count = 0;
    let position = element['name'].toLowerCase().indexOf(char);
    while (position !== -1) {
      count++;
      totalCount++;
      position = element['name'].toLowerCase().indexOf(char, position + 1);
    };

    // Agregar elemento al arreglo newArray
    newArray.push({ name: element.name, ocurrences: count })
  });

  // Devolver objeto con las respuestas
  return { data: newArray, totalCount }
};

export default characterCounter;