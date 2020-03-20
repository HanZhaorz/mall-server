import { LogType } from "../emun/log.enum";

export interface ReqErrLogMsg {
  /**
   * 日志类型
   */
  type: LogType;
  /**
   * 标题
   */
  title: string;
  /**
   * 提示
   */
  hint: string;
  /**
   * 状态码
   */
  status: number;
  /**
   * 请求地址
   */
  url: string;
  /**
   * 请求体
   */
  reqbody: object;
  /**
   * 响应体
   */
  resbody: object;
}
