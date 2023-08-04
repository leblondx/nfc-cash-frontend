import { defineStore } from "pinia";

import axios from "axios";

import authService from "../services/AuthService";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuth: false,
      isRegister: false,
      isConfirmAccount: false,
      tokenUser: "",
    };
  },
  getters: {},
  actions: {
    async actSignUpUser(formData) {
      // Enregistrement de l'utilisateur
      try {
        const response = await authService.signUp(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRegister = true;
        }
      } catch (error) {
        console.log("error in actRegisterUser -->", error);
      }
    },
    async actSignInUser(formData) {
      // Autorisation de l'utilisateur
      try {
        const response = await authService.signIn(formData);
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
        const response = await authService.checkEmailExist(formData);
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
        const response = await authService.checkUsernameExist(formData);
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
    async actCheckConfirmAccount(formData) {
      try {
        const response = await authService.checkConfirmAccount(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isConfirmAccount = response.data.result;
        }
      } catch (error) {
        console.log("error in actCheckConfirmAccount -->", error);
      }
    },
  },
});
