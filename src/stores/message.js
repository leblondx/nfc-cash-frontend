import { defineStore } from "pinia";

import axios from "axios";
import { DateTime } from "luxon";

import messageService from "../services/MessageService";

export const useMessageStore = defineStore("message", {
  state: () => {
    return {
      messages: [],
      isEmptyMessages: false,
      isSendMessage: false,
    };
  },
  getters: {},
  actions: {
    async actCreateMessage(formData) {
      try {
        const response = await messageService.createMessage(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.messages.push({
              id: this.messages[this.messages.length - 1].id + 1,
              uid_room: formData.uidRoom,
              uid_user: formData.uidUser,
              message: formData.message,
              created: DateTime.now().toFormat("dd-MM-yyyy hh:mm"),
            });
          }
        }
      } catch (error) {
        console.log("error in actCreateMessage -->", error);
      }
    },
    async actGetRoomMessages(formData) {
      try {
        const response = await messageService.getRoomMessage(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.messages = response.data.result.filter((e) => {
            const date = DateTime.fromISO(e.created);
            e.created = date.toFormat("dd-MM-yyyy hh:mm");
            return e;
          });
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
    async actReceiveMessage(formData) {
      try {
        this.messages.push({
          id: this.messages[this.messages.length - 1].id + 1,
          uid_room: formData.uidRoom,
          uid_user: formData.uidUser,
          message: formData.message,
          created: DateTime.now().toFormat("dd-MM-yyyy hh:mm"),
        });
      } catch (error) {
        console.log("error in actReceiveMessage -->", error);
      }
    },
  },
});
