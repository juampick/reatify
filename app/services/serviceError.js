export default class ServiceError {
  constructor(code, message, method, url, fullUrl, requireAuth, payload) {
    this.code = code;
    this.message = message;
    this.details = {
      method,
      url,
      fullUrl,
      requireAuth
    };
    this.payload = payload;
  }

  setPayload(payload) {
    this.payload = payload;
  }
}
