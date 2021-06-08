export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("userComunidad"));
  if (user && user.token) {
    // for Node.js Express back-end
    return { "x-access-token": user.token };
  } else {
    return {};
  }
}
