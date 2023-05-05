import axios from "axios";

export const API_URL = "https://localhost:8080/";

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  return config;
});

// $api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("error.response -->", error.response);
//     console.log("originalRequest -->", originalRequest);
//     // if (
//     //   error.response.status === 401 &&
//     //   error.config &&
//     //   !error.config._isRetry
//     // ) {
//     //   originalRequest._isRetry = true;
//     //   try {
//     //     const response = await axios.get(`${API_URL}/refresh`, {
//     //       withCredentials: true,
//     //     });
//     //     localStorage.setItem("token", response.data.result.accessToken);
//     //     return $api.request(originalRequest);
//     //   } catch (error) {
//     //     console.log(
//     //       "Не авторизован. error in interceptors.response error callback -->",
//     //       error
//     //     );
//     //   }
//     // }
//     return error.response;
//   }
// );

export default $api;
