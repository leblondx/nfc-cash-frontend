import $api from "../http/index";

export default class MessageService {
  static async createMessage(formData) {
    return $api.post("message/create-message", formData);
  }
  static async getRoomMessage(formData) {
    return $api.post("message/get-room-messages", formData);
  }
}
