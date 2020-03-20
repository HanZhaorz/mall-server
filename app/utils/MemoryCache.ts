import { Application } from "egg";

/**
 * 内存缓存
 */
export default class MemoryCache {
  app: Application;

  static store = {};

  constructor(app: Application) {
    this.app = app;
  }

  get(key: string) {
    return MemoryCache.store[key];
  }

  set(key: string, value: any) {
    MemoryCache.store[key] = value;
  }

  has(key: string) {
    return !!MemoryCache.store[key];
  }

  getStore() {
    return MemoryCache.store;
  }

  /**
   * 对应redis的key 和 value 缓存到内存中
   * @param key redis key
   */
  async setFromRedis(key: string) {
    const { app } = this;
    const value = await app.redis.get(key);
    this.set(key, value);
    app.logger.info(`内存缓存： ${key}------${value}`);
  }
}
