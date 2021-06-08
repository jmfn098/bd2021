/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
let baseURL = process.env.REACT_APP_DEV_PROXY;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_PROXY;
}
const API_URL = `${baseURL}/api/suscriptores`;
const getSuscriptores = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};
export default {
  getSuscriptores,
};
