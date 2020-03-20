import { Context } from "egg";
import { CurlResponse } from "../interface/Curl.interface";
import { WeChatError } from "../interface/WeChat.interface";
import { LogType } from "../emun/log.enum";

/**
 * 微信调用凭据成功参数
 */
interface WeChatAccessTokenSuccess {
  /**
   * 获取调用凭证
   */
  access_token: string;
  /**
   * 凭证有效时间，单位：秒
   */
  expires_in: number;
}

// 微信请求地址
const WeChatAddr = "https://api.weixin.qq.com/cgi-bin/token";

/**
 * AccessToken utils
 */
export default class AccessToken {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }
  /**
   * 获取来自微信调用凭证
   */
  async fromWeChat() {
    const { ctx } = this;
    const { wechat } = ctx.app.config;
    const reqbody = {
      grant_type: "client_credential",
      appid: wechat.appId,
      secret: wechat.appSecret
    };

    const { data, status } = await ctx.curl<CurlResponse<WeChatAccessTokenSuccess & WeChatError>>(WeChatAddr, {
      dataType: "json",
      timeout: 10000,
      data: reqbody
    });

    const { access_token, expires_in, errcode } = data;
    if (access_token) {
      return { access_token, expires_in };
    }

    throw new Error(
      ctx.helper.makeReqErrLogMsg({
        type: LogType.server,
        title: "获取微信AccessToken失败",
        hint: ctx.helper.parseWeChatErrorCode(errcode),
        status,
        url: WeChatAddr,
        reqbody,
        resbody: data
      })
    );
  }
}
