import { api } from "boot/axios";

export default class AdminService {
  static getUsersConfirm() {
    return api.get("api-v1/admin/get-users-confirm");
  }

  static getUsersUnConfirm() {
    return api.get("api-v1/admin/get-users-un-confirm");
  }

  static userConfirmAccount(formData) {
    return api.post("api-v1/admin/user-confirm-account", formData);
  }

  static changeUser(formData) {
    return api.post("api-v1/admin/change-user", formData);
  }
}
