import jwtDecode from "jwt-decode";
const initialUser = {};
export default function authReducer(state = initialUser, { type }) {
  switch (type) {
    case "auth/setUser":
      const token = JSON.parse(localStorage.getItem("userComunidad"));
      if (token) {
        return jwtDecode(token.token).dataValues;
      } else {
        return null;
      }

    case "auth/logOut":
      return null;
    default:
      return state;
  }
}
