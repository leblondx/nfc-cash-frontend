import $api from "../http/index";

export default class AdminService {
  static getUsersUnConfirm() {
    return $api.get("api-v1/admin/get-users-un-confirm");
  }

  static userConfirmAccount(formData) {
    return $api.post("api-v1/admin/user-confirm-account", formData);
  }
}
