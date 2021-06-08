/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
let baseURL = process.env.REACT_APP_DEV_PROXY;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_PROXY;
}
const API_URL = `${baseURL}/api/clientes`;
const getClientes = (id) => {
  return axios.get(API_URL, { headers: authHeader(), params: { empresa: id } });
};
const getCliente = (id) => {
  return axios.get(API_URL + "/" + id, { headers: authHeader() });
};
const createCliente = (cliente) => {
  return axios.post(API_URL + "/", cliente, { headers: authHeader() });
};
const updateCliente = (id, cliente) => {
  return axios.put(API_URL + "/" + id, cliente, { headers: authHeader() });
};
const deleteCliente = (id) => {
  return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};
export default {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
};
