/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
let baseURL = process.env.REACT_APP_DEV_PROXY;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_PROXY;
}
const API_URL = `${baseURL}/api/temperaturas`;
const getTemperaturas = () => {
  return axios.get(API_URL, { headers: authHeader() });
};
const getTemperatura = (id) => {
  return axios.get(API_URL + "/" + id, { headers: authHeader() });
};
const createTemperatura = (cedula) => {
  return axios.post(
    API_URL + "/",
    { cedula: cedula },
    { headers: authHeader() }
  );
};
const updateTemperatura = (id, temperatura) => {
  return axios.put(API_URL + "/" + id, temperatura, {
    headers: authHeader(),
  });
};
const deleteTemperatura = (id) => {
  return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};
const deleteTemperaturas = () => {
  return axios.delete(API_URL + "/" , { headers: authHeader() });
};
export default {
  getTemperaturas,
  getTemperatura,
  createTemperatura,
  updateTemperatura,
  deleteTemperatura,
  deleteTemperaturas
};
