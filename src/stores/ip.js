import { defineStore } from "pinia";

import axios from "axios";

import ipService from "../services/IpService";

export const useIpStore = defineStore("ip", {
  state: () => {
    return {
      isBlockIp: false,
      isCheckIpBlock: false,
    };
  },
  getters: {},
  actions: {
    async actBlockIp(formData) {
      try {
        const response = await ipService.blockIp(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isBlockIp = response.data.result;
        }
      } catch (error) {
        console.log("error in actBlockIp -->", error);
      }
    },
    async actCheckIpBlock(formData) {
      try {
        const response = await ipService.checkIpBlock(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.isCheckIpBlock = response.data.result;
        }
      } catch (error) {
        console.log("error in actCheckIpBlock -->", error);
      }
    },
  },
});
