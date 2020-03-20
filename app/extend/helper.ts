import { CodeStatus } from "../emun/response.enum";
import LogUtils from "../utils/Log";

export default {
  ...LogUtils,
  /**
   * 字符串转数字
   * @param str 解析字符串或数字
   */
  parseInt(str: string | number) {
    if (typeof str === "number") return str;
    if (!str) return 0;
    return parseInt(str) || 0;
  },

  /**
   * 解析微信错误码
   * @param code 错误码
   */
  parseWeChatErrorCode(code: number) {
    if (code === -1) return "系统繁忙，此时请开发者稍候再试";
    if (code === 0) return "请求成功";
    if (code === 40001) return "AppSecret 错误或者 AppSecret 不属于这个小程序，请开发者确认 AppSecret 的正确性";
    if (code === 40002) return "请确保 grant_type 字段值为 client_credential";
    if (code === 40013) return "不合法的 AppID，请开发者检查 AppID 的正确性，避免异常字符，注意大小写";
    return "未知错误";
  },
  /**
   * 构建普通响应体
   * @param data 响应数据
   * @param msg 可以端使用的提示信息
   * @param sysMsg 系统使用的提示信息
   * @param code 响应状态码
   */
  resMsg(data: any, msg: string, sysMsg = "success", code = CodeStatus.success) {
    return {
      code,
      msg,
      sysMsg,
      data
    };
  }
};
