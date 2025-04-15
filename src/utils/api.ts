import axios from 'axios';

/**
 * Aquí puedes configurar la instancia de Axios para
 * gestionar tokens, interceptores, cabeceras, etc.
 */
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // timeout: 5000,  // Ejemplo para agregar un timeout
});

export default api;
