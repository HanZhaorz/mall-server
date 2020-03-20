export interface Robot {
  /**
   * 机器人发送消息
   * @param url 钉钉机器人地址
   * @param log 发送信息
   */
  sendText: (url: string, log: string) => void;
  /**
   * 将自定义服务器端错误发送到服务器错误机器人
   * @param log 日志信息
   */
  sendServerErrorRobot: (log: string) => void;
  /**
   * 将位置错误发送到服务器错误机器人
   * @param log 日志信息
   */
  sendUnknownErrorRobot: (log: string) => void;
}
