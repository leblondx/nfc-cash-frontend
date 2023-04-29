import { defineStore } from "pinia";

import adminService from "../services/AdminService";

export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      users: [],
      usersUnConfirm: [],
      isEmptyUsers: false,
      isEmptyUsersUnConfirm: false,
    };
  },
  getters: {},
  actions: {
    async actGetUsersUnConfirm() {
      try {
        const response = await adminService.getUsersUnConfirm();
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.usersUnConfirm = response.data.result;
          if (response.data.result.length > 0) {
            this.isEmptyUsersUnConfirm = true;
          }
        }
      } catch (error) {
        console.log("error in actGetUsersUnConfirm -->", error);
      }
    },
    async actUserConfirmAccount(formData) {
      try {
        const response = await adminService.userConfirmAccount(formData);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.usersUnConfirm = this.usersUnConfirm.filter((e) => {
              return e.id !== formData.id;
            });
            if (this.usersUnConfirm.length === 0) {
              this.isEmptyUsersUnConfirm = false;
            }
          }
        }
      } catch (error) {
        console.log("error in actUserConfirmAccount -->", error);
      }
    },
  },
});
