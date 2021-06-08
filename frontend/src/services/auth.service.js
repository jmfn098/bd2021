/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
let baseURL = process.env.REACT_APP_DEV_PROXY;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_PROXY;
}
const API_URL = `${baseURL}/api/auth/`;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (correo, password) => {
  return axios
    .post(API_URL + "signin", {
      cedula: correo,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userComunidad", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
