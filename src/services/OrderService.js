import $api from "../http/index";

export default class OrderService {
  static async getOrders() {
    return $api.post("order/get-orders");
  }
  static async getOrder(formData) {
    return $api.post("order/get-order", formData);
  }
}
