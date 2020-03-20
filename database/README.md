# [[Migrations](https://sequelize.org/master/manual/migrations.html)

## 初始化表文件

npx sequelize migration:generate --name=init-users

## 升级数据库

npx sequelize db:migrate

## 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更

npx sequelize db:migrate:undo

## 可以通过 `db:migrate:undo:all` 回退到初始状态

npx sequelize db:migrate:undo:all
