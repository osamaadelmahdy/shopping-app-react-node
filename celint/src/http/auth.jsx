import jwtDecode from "jwt-decode";
const key = "token";
const setToken = (token) => {
  localStorage.setItem(key, token);
};
const deleteToken = () => localStorage.removeItem(key);
const getToken = () => localStorage.getItem(key);
const getUser = () => {
  const token = getToken();
  console.log("token", token);
  return token && jwtDecode(token);
};
export { setToken, deleteToken, getToken, getUser };
