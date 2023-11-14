// NOTE: This is required because the Partial<T> utility type only makes the first layer of properties in an object conditional
// (https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript)
export type TDeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? TDeepPartial<U>[] : T[P] extends object | undefined ? TDeepPartial<T[P]> : T[P];
};
