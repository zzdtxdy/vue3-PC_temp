import { PersistenceOptions } from 'pinia-plugin-persistedstate'

/**
 * @description pinia 持久化参数配置
 * @param {string} key - 存储到持久化的 name
 * @param {string[]} [pick] - 需要持久化的 state name，可选
 * @param {Storage} [storage=localStorage] - 存储方式，默认使用 localStorage
 * @return {PersistenceOptions} persist - 持久化配置对象
 */
const piniaPersistConfig = (
  key: string,
  pick?: string[],
  storage: Storage = localStorage
): PersistenceOptions => {
  return {
    key,
    storage,
    pick
  }
}
export default piniaPersistConfig
/* const persistConfig = piniaPersistConfig('myStore', ['count', 'user'], sessionStorage);
// 或者
const persistConfig = piniaPersistConfig('myStore');
 */
