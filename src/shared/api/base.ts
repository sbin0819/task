import axios from 'axios';

export const baseApi = axios.create({
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
