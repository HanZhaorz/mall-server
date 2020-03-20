const crypto = require("crypto");

export default class WeChatDataCrypt {
  /**
   * 小程序appId
   */
  appId: string;
  /**
   * 会话密钥
   */
  sessionKey: string;

  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData(encryptedData: string, iv: string) {
    // base64 decode
    const sessionKey = new Buffer(this.sessionKey, "base64");
    const encryptedDataBuffer = new Buffer(encryptedData, "base64");
    const ivBuffer = new Buffer(iv, "base64");
    let decoded: any;

    try {
      // 解密
      const decipher = crypto.createDecipheriv("aes-128-cbc", sessionKey, ivBuffer);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedDataBuffer, "binary", "utf8");
      decoded += decipher.final("utf8");
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error("Illegal Buffer");
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error("Illegal Buffer");
    }

    return decoded;
  }
}
