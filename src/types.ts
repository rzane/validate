export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface Problem {
  message: string;
  path: Array<string | number>;
}

export interface Result<T> {
  value: T;
  errors?: Problem[];
}

export type Schema<T> = {
  [K in keyof T]: Validator<T[K]>;
} & {
  [key: string]: Validator<unknown>;
};

export interface Validator<T> {
  cast<R>(fn: Cast<T, R>): Validator<R>;
  assert(fn: Predicate<T>, message?: string): Validator<T>;
  refute(fn: Predicate<T>, message?: string): Validator<T>;
  required(message?: string): Validator<T>;
  schema<R>(fields: Schema<R>): Validator<R>;
  each<R>(validator: Validator<R>): Validator<R[]>;
  validate(input: unknown): Promise<Result<T>>;
}
