import { defineStore } from "pinia";

import axios from "axios";

import authService from "../services/AuthService";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuth: false,
      isRegister: false,
    };
  },
  getters: {},
  actions: {
    async actSignUpUser(formData) {
      // регистрация пользователя
      try {
        console.log("formData in action actRegisterUser -->", formData);
        const response = await axios.post(
          "http://localhost:8080/auth/sign-up",
          formData
        );
        console.log("response -->", response);
        console.log("response.status -->", response.status);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRegister = true;
          return {
            message: response.data.message,
            result: true,
          };
        }
        // const response = await authService.registration(formData);
        // console.log("response -->", response);
      } catch (error) {
        console.log("error in actRegisterUser -->", error);
      }
    },
    async actSignInUser(formData) {
      // авторизация пользователя
      try {
        console.log("formData -->", formData);
        // запрос на авторизацию пользователя
      } catch (error) {
        console.log("error in actAuthorizationUser -->", error);
      }
    },
  },
});

/**
 *
 *  getPostAuthor: (state) => {
      const postStore = usePostStore()
      return state.authors.find((author) => author.id === postStore.post.userId)
    }
 */
