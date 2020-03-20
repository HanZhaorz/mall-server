import { Application, Context } from "egg";
import AccessToken from "../utils/AccessToken";
import { RedisKey } from "../emun/redis.enum";
import { AgentEventName } from "../emun/agent.enum";

export default (app: Application) => {
  const { accessToken: AccessTokenConfig } = app.config.wechat;
  return {
    schedule: {
      disable: AccessTokenConfig.disable,
      interval: AccessTokenConfig.refreshInterval,
      immediate: true,
      type: "worker"
    },
    async task(ctx: Context) {
      ctx.logger.info("start 定时获取微信AccessToken");
      const at = new AccessToken(ctx);
      try {
        const { access_token, expires_in } = await at.fromWeChat();
        const { redis } = app;
        const promises = [
          redis.set(RedisKey.WeChatAccessToken, access_token),
          redis.set(RedisKey.WeChatAccessTokenExpires, expires_in)
        ];
        await Promise.all(promises);
        app.messenger.sendToAgent(AgentEventName.UpdateAccessToken, "update");
      } catch (error) {
        app.logger.error(error);
      }
    }
  };
};
