import { Transport } from "egg-logger";
import { Application } from "egg";
import { ReqErrLogMsg } from "../../interface/Log.interface";
import { LogType } from "../../emun/log.enum";
import DingTalkRobot from "../robot/DingTalkRobot";

export default class ErrorReportTransport extends Transport {
  app: Application;

  constructor(options: any) {
    super(options);
    this.app = options.app;
  }

  // 定义 log 方法，在此方法中把日志上报给远端服务
  log(level: string, args: any) {
    if (level === "ERROR") {
      const err = args[0] as Error;
      const robot = new DingTalkRobot(this.app);
      try {
        const message = JSON.parse(err.message) as ReqErrLogMsg;
        const log = this.makeErrorLogMsg(message, err);
        if (message.type === LogType.server) {
          robot.sendServerErrorRobot(log);
        }
      } catch (error) {
        const log = this.makeUnknownErrorLogMsg(err);
        robot.sendUnknownErrorRobot(log);
      }
    }
  }

  /**
   * 制作错误日志信息
   * @param message 错误消息
   * @param err 错误信息
   */
  makeErrorLogMsg(message: ReqErrLogMsg, err: Error) {
    return (
      message.title +
      "\n\n" +
      `pid: ${process.pid}` +
      "\n\n" +
      `状态码: ${message.status}` +
      "\n\n" +
      `错误提示: ${message.hint}` +
      "\n\n" +
      `请求地址: ${message.url}` +
      "\n\n" +
      `请求体: ${JSON.stringify(message.reqbody)}` +
      "\n\n" +
      `响应体: ${JSON.stringify(message.resbody)}` +
      "\n\n" +
      "stack:" +
      "\n" +
      `${this.stackToString(err.stack as string)}`
    );
  }

  /**
   * 制作未知错误消息
   */
  makeUnknownErrorLogMsg(err: Error) {
    return (
      "未知错误" +
      "\n\n" +
      `pid: ${process.pid}` +
      "\n\n" +
      `错误提示: ${err.message}` +
      "\n\n" +
      "stack:" +
      "\n" +
      `${this.stackToString(err.stack as string)}`
    );
  }

  /**
   * 栈追踪文字处理
   * @param stack 栈追踪
   */
  stackToString(stack: string) {
    const arr = stack.split("\n");
    arr.shift();
    arr.map(item => item.trim());
    return arr.join("\n");
  }
}
