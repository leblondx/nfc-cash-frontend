import { defineStore } from "pinia";

import axios from "axios";

import roomService from "../services/RoomService";

export const useRoomStore = defineStore("room", {
  state: () => {
    return {
      room: [],
      isLeaveRoom: false,
    };
  },
  getters: {},
  actions: {
    async actGetRoom(formData) {
      try {
        const response = await roomService.getRoom(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.room = response.data.result;
        }
      } catch (error) {
        console.log("error in actGetRoom -->", error);
      }
    },
    async actLeaveRoom(formData) {
      try {
        const response = await roomService.leaveRoom(formData);
        if (response.data.status === 200) {
          this.isLeaveRoom = true;
        }
      } catch (error) {
        console.log("error in actLeaveRoom -->", error);
      }
    },
  },
});
