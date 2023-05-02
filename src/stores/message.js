import { defineStore } from "pinia";

import axios from "axios";

export const useMessageStore = defineStore("message", {
  state: () => {
    return {
      messages: [],
      isEmptyMessages: false,
    };
  },
  getters: {},
  actions: {
    async actGetRoomMessages(formData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/message/get-room-messages",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.messages = response.data.result;
          if (response.data.result.length > 0) {
            this.isEmptyMessages = true;
          } else {
            this.isEmptyMessages = false;
          }
        }
      } catch (error) {
        console.log("error in actGetRoomMessages -->", error);
      }
    },
  },
});

// get-room-messages
