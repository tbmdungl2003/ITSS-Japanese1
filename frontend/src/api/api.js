import axios from "./axios.js";

export const loginAction = ({ email, password }) => {
  const URL = "/auth/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL, data);
};

export const register = ({ email, password, username }) => {
  const URL = "/auth/register";
  const data = {
    email,
    password,
    username,
  };
  return axios.post(URL, data);
};

export const getFoods = () => {
  const URL = "/foods";
  return axios.get(URL);
};

export const updateUserProfile = (profileData) => {
  const URL = "/auth/profile";
  // Gửi dữ liệu profile mới lên server
  return axios.put(URL, profileData);
};

export const getFoodById = (id) => axios.get(`/foods/${id}`);
