import { MockApplication } from "egg-mock";
// @ts-ignore
import { factory } from "factory-girl";

export default (app: MockApplication) => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  factory.define("user", app.model.User, {
    name: factory.sequence("User.name", n => `name_${n}`),
    age: 18
  });
};

declare module "egg" {
  interface Application {
    factory: factory;
  }
}
