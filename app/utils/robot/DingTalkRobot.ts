import { Application } from "egg";
import { Robot } from "../../interface/Robot.interface";

const DingTalkServerErrorRobotAddr =
  "https://oapi.dingtalk.com/robot/send?access_token=cdb7ab47e45adc9d9f4b5a367556aa9574a4de8d084b734f258e65646620823b";

const DingTalkUnknownErrorRobotAddr =
  "https://oapi.dingtalk.com/robot/send?access_token=f973167371f1bc381b22d6d7754a8090019d10cde38b32c8226aec314feb7034";

export default class DingTalkRobot implements Robot {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  sendText(url: string, log: string) {
    this.app.curl(url, {
      contentType: "json",
      data: {
        msgtype: "text",
        text: {
          content: log
        }
      },
      method: "POST"
    });
  }

  sendServerErrorRobot(log: string) {
    this.sendText(DingTalkServerErrorRobotAddr, log);
  }

  sendUnknownErrorRobot(log: string) {
    this.sendText(DingTalkUnknownErrorRobotAddr, log);
  }
}
