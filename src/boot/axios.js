import { boot } from "quasar/wrappers";
import axios from "axios";

const API_URL = "https://data.humaco.io/";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      } catch (error) {
        console.log(
          "Non autorisé. Erreur dans les intercepteurs axios.js -->",
          error
        );
      }
    }
    return error.response;
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
