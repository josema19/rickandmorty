// Importar librerías
import axios from 'axios';

// Definir cliente axios
const axiosClient = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
});

export default axiosClient;
