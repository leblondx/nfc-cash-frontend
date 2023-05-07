import { api } from "boot/axios";

export default class VerifyService {
  static async checkEmailVerify(formData) {
    return api.post("verify/check-email-verify", formData);
  }

  static async emailVerify(uid) {
    return api.get(`verify/emailver/${uid}`);
  }
}
