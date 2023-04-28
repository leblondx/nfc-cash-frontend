import $api from "../http/index";

export default class UserService {
  static getUserProfile() {
    return $api.get("api-v1/user/get-user-profile");
  }
}
