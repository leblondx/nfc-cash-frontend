import { defineStore } from "pinia";

import userService from "../services/UserService";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userProfile: [],
      isAdmin: false,
      isSuperAdmin: false,
    };
  },
  getters: {},
  actions: {
    async actGetUserProfile() {
      try {
        if (this.userProfile.length === 0) {
          const response = await userService.getUserProfile();
          console.log("response.data -->", response.data);
          if (response.data.status === 200) {
            this.userProfile = response.data.result;
            const roleUser = response.data.result[0].role;
            if (roleUser === "admin") {
              this.isAdmin = true;
            }
            if (roleUser === "super-admin") {
              this.isSuperAdmin = true;
            }
          }
        }
      } catch (error) {
        console.log("error in actGetUserProfile -->", error);
      }
    },
  },
});
