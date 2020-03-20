import { Application } from "egg";
import ErrorReportTransport from "./app/utils/transport/ErrorReport";
import { AppEventName } from "./app/emun/app.enum";
import MemoryCache from "./app/utils/MemoryCache";
import { RedisKey } from "./app/emun/redis.enum";

export default (app: Application) => {
  app.getLogger("errorLogger").set("robot", new ErrorReportTransport({ level: "ERROR", app }));

  app.messenger.on(AppEventName.UpdateAccessToken, () => {
    const cache = new MemoryCache(app);
    cache.setFromRedis(RedisKey.WeChatAccessToken);
  });

  // app.messenger.on("WeChatAccessToken", () => {
  //   const ctx = app.createAnonymousContext();
  //   ctx.runInBackground(async () => {
  //     // 获取过期时间
  //     const expiresTime = await app.redis.get(RedisKey.WeChatAccessTokenExpiresTime);
  //     // 当前时间
  //     const currentTime = new Date().getTime();
  //     // 如果 time 不存在 或 time超时
  //     if (!expiresTime || +expiresTime < currentTime) {
  //       const { access_token } = await ctx.service.accessToken.fromWeChat();
  //       app.redis.set(RedisKey.WeChatAccessToken, access_token);
  //     }
  //   });
  // });
};
