import { defineStore } from "pinia";

import axios from "axios";

export const useChatsStore = defineStore("chats", {
  state: () => {
    return {
      chats: [
        {
          id: 1,
          name: "9hcpyuib22a",
          date: "20:30:56 06.10.21",
          status: "Action required",
        },
        {
          id: 2,
          name: "9hcpyuib22a2",
          date: "20:32:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 3,
          name: "9hcpyuib22a23",
          date: "20:34:56 06.10.21",
          status: "Action required",
        },
        {
          id: 4,
          name: "9hcpyuib22a23",
          date: "20:44:56 06.10.21",
          status: "Waiting for user",
        },
        {
          id: 5,
          name: "9hcpyuib22a23",
          date: "20:46:56 06.10.21",
          status: "Action required",
        },
        {
          id: 6,
          name: "9hcpyuib22a2",
          date: "20:49:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 7,
          name: "9hcpyuib22a2",
          date: "20:55:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 8,
          name: "9hcpyuib22a2",
          date: "20:56:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 9,
          name: "9hcpyuib22a2",
          date: "20:57:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 10,
          name: "9hcpyuib22a2",
          date: "20:58:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 11,
          name: "9hcpyuib22a2",
          date: "20:59:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 12,
          name: "9hcpyuib22a2",
          date: "21:00:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 13,
          name: "9hcpyuib22a2",
          date: "21:01:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 14,
          name: "9hcpyuib22a2",
          date: "21:02:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 15,
          name: "9hcpyuib22a2",
          date: "21:03:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 16,
          name: "9hcpyuib22a2",
          date: "21:04:56 06.10.21",
          status: "Chat closed",
        },
        {
          id: 17,
          name: "9hcpyuib22a2",
          date: "21:05:56 06.10.21",
          status: "Chat closed",
        },
      ],
    };
  },
  getters: {
    getChats: (state) => {
      return state.chats;
    },
  },
  actions: {},
});
