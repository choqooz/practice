import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = async () => {
  const request = axios.get(baseUrl);
  const r = await request;
  return r.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const r = await request;
  return r.data;
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    // Esto es para asegurarse de que el error sea enviado de vuelta a la función
    throw error;
  }
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const r = await request;
  return r.data;
};

export default { getAll, create, update, deletePerson };
