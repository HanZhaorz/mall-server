import { Application } from "egg";

export default (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define("user", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(30),
    age: INTEGER
  });

  return class extends User {};
};
