export type Forbid<T, X> = T extends X ? never : T;

export type Transform<T, R> = (value: T) => R | Promise<R>;

export type Assert<T, S extends T> = (value: T) => value is S;
export type Refute<T, S> = (value: T | S) => value is S;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface Problem {
  message: string;
  path: Array<string | number>;
}

export type Valid<T> = { valid: true; value: T };
export type Invalid = { valid: false; errors: Problem[] };
export type Result<T> = Valid<T> | Invalid;
export type Validate<T, R> = (input: T) => Promise<Result<R>>;
