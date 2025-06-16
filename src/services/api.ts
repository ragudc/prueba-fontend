import axios from 'axios';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/';

// Crear una instancia de axios con la URL base de la API
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // tiempo de espera opcional
});

// Ejemplo: función para obtener lista de usuarios
export async function fetchUsers() {
  const response = await apiClient.get('/users');
  return response.data;
}

// Ejemplo: función para obtener lista de posts
export async function fetchPosts() {
  const response = await apiClient.get('/posts');
  return response.data;
}
