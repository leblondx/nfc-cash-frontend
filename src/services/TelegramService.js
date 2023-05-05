import $api from "../http/index";

export default class TelegramService {
  static getBots() {
    return $api.get("api-v1/telegram/get-bots");
  }

  static createBot(formData) {
    return $api.post("api-v1/telegram/create-bot", formData);
  }

  static deleteBot(formData) {
    return $api.post("api-v1/telegram/delete-bot", formData);
  }

  static turnOnBot(formData) {
    return $api.post("api-v1/telegram/turn-on-bot", formData);
  }

  static switchOffBot(formData) {
    return $api.post("api-v1/telegram/switch-off-bot", formData);
  }
}
