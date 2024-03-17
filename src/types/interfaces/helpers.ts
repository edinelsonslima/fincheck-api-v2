type SnakeToCamel<S extends string> =
  S extends `${infer P}_${infer Q}${infer R}`
    ? `${Lowercase<P>}${Uppercase<Q>}${SnakeToCamel<R>}`
    : Lowercase<S>;

export type ISnakeToCamel<T> = {
  [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K];
};
