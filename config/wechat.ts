import { EggAppConfig, PowerPartial } from "egg";

export default (config: PowerPartial<EggAppConfig>) => {
  config.wechat = {
    appId: "",
    appSecret: "",
    accessToken: {
      disable: false,
      refreshInterval: (7200 - 60 * 30) * 1000
    }
  };
};

interface WeChatConfig {
  /**
   * 小程序appId
   */
  appId: string;
  /**
   * 小程序 appSecret
   */
  appSecret: string;
  /**
   * AccessToken配置
   */
  accessToken: {
    /**
     * 是否开启AccessToken定时获取
     */
    disable: boolean;
    /**
     * AccessToken刷新间隔时间(ms)
     */
    refreshInterval: number;
  };
}

declare module "egg" {
  // extend your config
  interface EggAppConfig {
    /**
     * wechat相关配置
     */
    wechat: WeChatConfig;
  }
}
