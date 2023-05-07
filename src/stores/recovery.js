import { defineStore } from "pinia";

import axios from "axios";

import recoveryService from "../services/RecoveryService";

export const useRecoveryStore = defineStore("recovery", {
  state: () => {
    return {
      isRecoveryPasswordSendMessage: false,
      isCheckRecoveryPassword: false,
      isPasswordsCompare: false,
      isRecoveryPassword: false,
      isRecoveryPasswordComplete: false,
    };
  },
  getters: {},
  actions: {
    async actRecoveryPasswordSendMessage(formData) {
      try {
        const response = await recoveryService.recoveryPasswordSendMessage(
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRecoveryPasswordSendMessage = response.data.result;
        }
      } catch (error) {
        console.log("error in actRecoveryPasswordSendMessage -->", error);
      }
    },
    async actCheckRecoveryPassword(formData) {
      try {
        const response = await recoveryService.checkRecoveryPassword(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isCheckRecoveryPassword = response.data.result;
        }
      } catch (error) {
        console.log("error in actCheckRecoveryPassword -->", error);
      }
    },
    async actRecoveryPasswordComplete(formData) {
      try {
        const response = await recoveryService.recoveryPasswordComplete(
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRecoveryPasswordComplete = true;
        }
      } catch (error) {
        console.log("error in actRecoveryPasswordComplete -->", error);
      }
    },
    async actRecoveryPasswordCompare(formData) {
      try {
        const response = await recoveryService.recoveryPasswordCompare(
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isPasswordsCompare = response.data.result;
        }
      } catch (error) {
        console.log("error in actRecoveryPasswordCompare -->", error);
      }
    },
    async actRecoveryPassword(formData) {
      try {
        const response = await recoveryService.recoveryPassword(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isRecoveryPassword = response.data.result;
        }
      } catch (error) {
        console.log("error in actRecoveryPassword -->", error);
      }
    },
  },
});
