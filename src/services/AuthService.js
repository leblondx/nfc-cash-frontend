import $api from "../http/index";

export default class AuthService {
  static async signUp(formData) {
    return $api.post("auth/sign-up", formData);
  }

  static async signIn(formData) {
    return $api.post("auth/sign-in", formData);
  }

  static async checkEmailExist(formData) {
    return $api.post("auth/check-email-exist", formData);
  }

  static async checkUsernameExist(formData) {
    return $api.post("auth/check-username-exist", formData);
  }

  static async checkConfirmAccount(formData) {
    return $api.post("auth/check-confirm-account", formData);
  }
}
