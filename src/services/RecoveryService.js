import $api from "../http/index";

export default class RecoveryService {
  static async recoveryPasswordSendMessage(formData) {
    return $api.post("recovery/recovery-password-send-message", formData);
  }

  static async checkRecoveryPassword(formData) {
    return $api.post("recovery/check-recovery-password", formData);
  }

  static async recoveryPasswordComplete(formData) {
    return $api.post("recovery/recovery-password-complete", formData);
  }

  static async recoveryPasswordCompare(formData) {
    return $api.post("recovery/recovery-password-compare", formData);
  }

  static async recoveryPassword(formData) {
    return $api.post("recovery/recovery-password", formData);
  }
}
