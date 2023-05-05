import { defineStore } from "pinia";

import adminService from "../services/AdminService";

export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      usersConfirm: [],
      usersUnConfirm: [],
      isEmptyUsersConfirm: false,
      isEmptyUsersUnConfirm: false,
      isChangeUser: false,
    };
  },
  getters: {},
  actions: {
    async actGetUsersConfirm() {
      try {
        const response = await adminService.getUsersConfirm();
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.usersConfirm = response.data.result;
          if (response.data.result.length > 0) {
            this.isEmptyUsersConfirm = true;
          }
        }
      } catch (error) {
        console.log("error in actGetUsersConfirm -->", error);
      }
    },
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
    async actChangeUser(formData) {
      try {
        const response = await adminService.changeUser(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.isChangeUser = true;
            this.usersConfirm = this.usersConfirm.filter((e) => {
              if (e.id === formData.id) {
                e.username = formData.username;
                e.tele_id = formData.tele_id;
                e.email = formData.email;
                e.role = formData.role;
              }
              return e;
            });
          }
        }
      } catch (error) {
        console.log("error in actChangeUser -->", error);
      }
    },
  },
});
