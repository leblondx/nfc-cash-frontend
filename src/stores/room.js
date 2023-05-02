import { defineStore } from "pinia";

import axios from "axios";

export const useRoomStore = defineStore("room", {
  state: () => {
    return {
      room: [],
    };
  },
  getters: {},
  actions: {
    async actGetRoom(formData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/room/get-room",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.room = response.data.result;
        }
      } catch (error) {
        console.log("error in actGetRoom -->", error);
      }
    },
  },
});
