/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
let baseURL = process.env.REACT_APP_DEV_PROXY;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_PROXY;
}
const API_URL = `${baseURL}/api/funcionarios`;
const getFuncionarios = (id) => {
  return axios.get(API_URL, { headers: authHeader() });
};
const getFuncionario = (id) => {
  return axios.get(API_URL + "/" + id, { headers: authHeader() });
};
const createFuncionario = (empresa) => {
  return axios.post(API_URL + "/", empresa, { headers: authHeader() });
};
const updateFuncionario = (id, funcionario) => {
  return axios.put(API_URL + "/" + id, funcionario, { headers: authHeader() });
};
const deleteFuncionario = (id) => {
  return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};
export default {
  getFuncionarios,
  getFuncionario,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
