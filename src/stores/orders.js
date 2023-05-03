import { defineStore } from "pinia";

import axios from "axios";
import { DateTime } from "luxon";

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {
      orders: [],
      order: [],
      isEmptyOrders: false,
    };
  },
  getters: {},
  actions: {
    async actGetOrders() {
      try {
        const response = await axios.post(
          "http://localhost:8080/order/get-orders"
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.orders = response.data.result.filter((e) => {
            const date = DateTime.fromISO(e.created);
            e.created = date.toFormat("dd-MM-yyyy hh:mm");
            return e;
          });
          if (response.data.result.length > 0) {
            this.isEmptyOrders = true;
          } else {
            this.isEmptyOrders = false;
          }
        }
      } catch (error) {
        console.log("error in actGetOrders -->", error);
      }
    },
    async actGetOrder(formData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/order/get-order",
          formData
        );
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.order = response.data.result.filter((e) => {
            const date = DateTime.fromISO(e.created);
            e.created = date.toFormat("dd-MM-yyyy hh:mm");
            return e;
          });
        }
      } catch (error) {
        console.log("error in actGetOrder -->", error);
      }
    },
  },
});
