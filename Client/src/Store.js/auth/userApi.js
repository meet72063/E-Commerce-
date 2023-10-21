import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_URL;

export const signUp = async (userData) => {
  return axios.post(`${baseURL}/api/user`, userData);
};
export const login = async (userData) => {
  return axios.post(`${baseURL}/api/user/login`, userData);
};

export const addReview = async (productId, review) => {
  return axios.post(`${baseURL}/api/products/Review/${productId}`, review);
};
export const getReview = async (productId) => {
  return axios.get(`${baseURL}/api/products/Review/${productId}`);
};
