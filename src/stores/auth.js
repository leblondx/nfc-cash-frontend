import { defineStore } from "pinia";

import axios from "axios";

import authService from "../services/AuthService";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuth: false,
      isRegister: false,
      tokenUser: "",
    };
  },
  getters: {},
  actions: {
    async actSignUpUser(formData) {
      // регистрация пользователя
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/sign-up",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRegister = true;
          return {
            message: response.data.message,
            result: true,
          };
        }
      } catch (error) {
        console.log("error in actRegisterUser -->", error);
      }
    },
    async actSignInUser(formData) {
      // авторизация пользователя
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/sign-in",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isAuth = true;
          localStorage.setItem("token", response.data.token);
          this.tokenUser = response.data.token;
        }
      } catch (error) {
        console.log("error in actAuthorizationUser -->", error);
      }
    },
    async actCheckEmailExist(formData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/check-email-exist",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          return {
            message: response.data.message,
            result: response.data.result,
          };
        }
      } catch (error) {
        console.log("error in actCheckEmailExist -->", error);
      }
    },
    async actCheckUsernameExist(formData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/check-username-exist",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          return {
            message: response.data.message,
            result: response.data.result,
          };
        }
      } catch (error) {
        console.log("error in actCheckUsernameExist -->", error);
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
