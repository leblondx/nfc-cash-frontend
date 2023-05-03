import { defineStore } from "pinia";

import axios from "axios";

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
        const response = await axios.post(
          "http://localhost:8080/ip/block-ip",
          formData
        );
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
        const response = await axios.post(
          "http://localhost:8080/ip/check-ip-block",
          formData
        );
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

// ip/block-ip
// ip/check-ip-block
