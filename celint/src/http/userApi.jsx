import axios from "axios";

const path = "http://localhost:5000/api";

export const handlepost = (data) => {
  return axios.post(`${path}/users`, data);
};

export const loginUser = (data) => {
  return axios.post(`${path}/auth`, data);
};
