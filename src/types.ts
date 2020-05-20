export type Transform<T, R> = (value: T) => R | Promise<R>;

export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export type Assertion<T, S extends T> =
  | ((value: T) => value is S)
  | Predicate<T>;

export interface Problem {
  message: string;
  path: Array<string | number>;
}

export type Valid<T> = { valid: true; value: T };
export type Invalid = { valid: false; errors: Problem[] };
export type Result<T> = Valid<T> | Invalid;
export type Validate<T, R> = (input: T) => Promise<Result<R>>;

export type Schema<T> = {
  [K in keyof T]: Validator<unknown, T[K]>;
} & {
  [key: string]: Validator<unknown, unknown>;
};

export interface Validator<Input, Value> {
  then<NextValue>(
    next: Validator<Value, NextValue>
  ): Validator<Input, NextValue>;

  validate(input: Input): Promise<Result<Value>>;
}
