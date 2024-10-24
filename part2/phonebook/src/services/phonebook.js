import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((r) => r.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((r) => r.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
    .catch((error) => {
      // Esto es para asegurarse de que el error sea enviado de vuelta a la función
      throw error;
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((r) => r.data);
};

export default { getAll, create, update, deletePerson };
