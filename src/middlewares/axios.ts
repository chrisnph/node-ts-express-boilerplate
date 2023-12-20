import axios from "axios";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    return new Promise((resolve) => resolve(config));
  },
  async (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosApiInstance;
