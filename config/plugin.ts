import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: "egg-sequelize"
  },
  validate: {
    enable: true,
    package: "egg-validate"
  },
  redis: {
    enable: true,
    package: "egg-redis"
  }
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

export default plugin;
