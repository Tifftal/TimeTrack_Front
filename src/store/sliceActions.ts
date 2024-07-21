export type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => infer A ? A : never;
}[keyof T];
