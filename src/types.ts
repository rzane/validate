export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface Problem {
  message: string;
  path: Array<string | number>;
}

export type Valid<T> = { valid: true; value: T };
export type Invalid = { valid: false; errors: Problem[] };
export type Result<T> = Valid<T> | Invalid;
export type Validation<T, R> = (input: T) => Result<R> | Promise<Result<R>>;

export type Schema<T> = {
  [K in keyof T]: Validator<T[K]>;
} & {
  [key: string]: Validator<unknown>;
};

export interface Validator<T> {
  then<R>(fn: Validation<T, R>): Validator<R>;
  validate(input: unknown): Promise<Result<T>>;
}
