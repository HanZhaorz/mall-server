import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.logger = {
    level: "DEBUG"
  };
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "wuhanzhao1",
    database: "mall_development"
  };
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "",
      db: 0
    }
  };
  return config;
};
