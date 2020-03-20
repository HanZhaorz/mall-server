import { ReqErrLogMsg } from "../interface/Log.interface";

export default {
  /**
   * 制作服务器请请求错误日志消息
   */
  makeReqErrLogMsg(options: ReqErrLogMsg) {
    return JSON.stringify(options);
  }
};
