import axios from "axios";
import { getToken } from "./auth";
const path = "http://localhost:5000/api";

export const handlepost = (data) => {
  axios.defaults.headers.common["X-Auth-Token"] = getToken();
  return axios.post(`${path}/products`, data);
};

export const getProduct = (id) => {
  return axios.get(`${path}/products/${id}`);
};

export const addProduct = (id) => {
  axios.defaults.headers.common["X-Auth-Token"] = getToken();
  return axios.put(`${path}/cart/add`, { id });
};

export const getCart = () => {
  axios.defaults.headers.common["X-Auth-Token"] = getToken();
  return axios.get(`${path}/cart`);
};

export const deleteCart = (id) => {
  axios.defaults.headers.common["X-Auth-Token"] = getToken();
  return axios.delete(`${path}/cart/${id}`);
};
