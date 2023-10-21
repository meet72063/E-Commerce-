import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_URL;
//syncing  localStorage cart with user's cart in database
export const syncCart = async (data) => {
  const { userId, batchingProduct } = data;
  return axios.post(`${baseURL}/api/user/bachingCart/${userId}`, {
    batchingProduct,
  });
};

//function to get user cart from database
export const getUserCart = async (userId) => {
  return axios.get(`${baseURL}/api/user/bachingCart/${userId}`);
};
