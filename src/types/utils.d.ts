/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-16 16:45:54
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-16 17:21:57
 * @FilePath: \zzd\vue3-PC_temp\src\types\utils.d.ts
 */
type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] }
}[keyof T]

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

type ObjToSelectedValueUnion<T> = {
  [K in keyof T]: T[K]
}[keyof T]

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P]
}
type UpdatePayload<T> = {
  [K in keyof T]?: T[K]
}
