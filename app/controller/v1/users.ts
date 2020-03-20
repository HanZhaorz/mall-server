import { Controller } from "egg";

export default class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.parseInt(ctx.query.limit), offset: ctx.helper.parseInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(ctx.helper.parseInt(ctx.params.id));
  }

  async ani() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.parseInt(ctx.query.limit), offset: ctx.helper.parseInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}
