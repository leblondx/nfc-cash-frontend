import { defineStore } from "pinia";

import { DateTime } from "luxon";

import telegramService from "../services/TelegramService";

export const useTelegramStore = defineStore("telegram", {
  state: () => {
    return {
      telegramBots: [],
      isEmptyTelegramBots: true,
      isCreateBot: false,
      isDeleteBot: false,
      isTurnOnBot: false,
      isSwitchOffBot: false,
    };
  },
  getters: {},
  actions: {
    async actGetBots() {
      try {
        const response = await telegramService.getBots();
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          this.telegramBots = response.data.result.filter((e) => {
            const date = DateTime.fromISO(e.created);
            e.created = date.toFormat("dd-MM-yyyy hh:mm");
            return e;
          });
          if (response.data.result.length > 0) {
            this.isEmptyTelegramBots = false;
          }
        }
      } catch (error) {
        console.log("error in actGetBots -->", error);
      }
    },
    async actCreateBot(formData) {
      try {
        const response = await telegramService.createBot(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.isEmptyTelegramBots = false;
            this.isCreateBot = true;
            if (this.telegramBots.length === 0) {
              console.log("this.telegramBots 1-->", this.telegramBots);
              this.telegramBots.push({
                id: 1,
                name: formData.name,
                token: formData.token,
                chat_id: formData.chat_id,
                is_admin: false,
                is_work: true,
                created: DateTime.now().toFormat("dd-MM-yyyy hh:mm"),
              });
              console.log("this.telegramBots 2-->", this.telegramBots);
            } else {
              console.log("this.telegramBots 3-->", this.telegramBots);
              this.telegramBots.push({
                id: this.telegramBots[this.telegramBots.length - 1].id + 1,
                name: formData.name,
                token: formData.token,
                chat_id: formData.chat_id,
                is_admin: false,
                is_work: true,
                created: DateTime.now().toFormat("dd-MM-yyyy hh:mm"),
              });
              console.log("this.telegramBots 4-->", this.telegramBots);
            }
          }
        }
      } catch (error) {
        console.log("error in actCreateBot -->", error);
      }
    },
    async actDeleteBot(formData) {
      try {
        const response = await telegramService.deleteBot(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.isDeleteBot = true;
            this.telegramBots = this.telegramBots.filter((e) => {
              return e.token !== formData.token;
            });
            if (this.telegramBots.length === 0) {
              this.isEmptyTelegramBots = true;
            }
          }
        }
      } catch (error) {
        console.log("error in actDeleteBot -->", error);
      }
    },
    async actTurnOnBot(formData) {
      try {
        const response = await telegramService.turnOnBot(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.isTurnOnBot = true;
            this.telegramBots = this.telegramBots.filter((e) => {
              if (e.token === formData.token) {
                e.is_work = true;
              }
              return e;
            });
          }
        }
      } catch (error) {
        console.log("error in actTurnOnBot -->", error);
      }
    },
    async actSwitchOffBot(formData) {
      try {
        const response = await telegramService.switchOffBot(formData);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result === true) {
            this.isSwitchOffBot = true;
            this.telegramBots = this.telegramBots.filter((e) => {
              if (e.token === formData.token) {
                e.is_work = false;
              }
              return e;
            });
          }
        }
      } catch (error) {
        console.log("error in actTurnOnBot -->", error);
      }
    },
  },
});
