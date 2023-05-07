import { api } from "boot/axios";

export default class UserService {
  static getUserProfile() {
    return api.get("api-v1/user/get-user-profile");
  }

  static checkIsAdmin() {
    return api.get("api-v1/user/check-is-admin");
  }
}
