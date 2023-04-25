import $api from "../http/index";

export default class AuthService {
  static async registration(formData) {
    return $api.post("/auth/sign-up", formData);
  }

  static async login(formData) {
    return $api.post("/login", formData);
  }

  static async logout() {
    return $api.post("/logout");
  }

  static async recovery(formData) {
    return $api.post("/recovery", formData);
  }
}
