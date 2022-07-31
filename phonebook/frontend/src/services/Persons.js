import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const updateNumber = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person).then((res) => res.data);
};

export default {
  getAll,
  create,
  deletePerson,
  updateNumber,
};
