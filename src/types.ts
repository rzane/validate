export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface ValidationError {
  message: string;
  path: Array<string | number>;
}

export interface Result<T> {
  value: T;
  errors?: ValidationError[];
}

export type ValidationSchema<T> = {
  [K in keyof T]: Validate<T[K]>;
} & {
  [key: string]: Validate<unknown>;
};

export interface Validate<T> {
  cast<R>(fn: Cast<T, R>, defaultValue?: R): Validate<R>;
  assert(fn: Predicate<T>, message?: string): Validate<T>;
  refute(fn: Predicate<T>, message?: string): Validate<T>;
  required(message?: string): Validate<T>;
  schema<R>(fields: ValidationSchema<R>): Validate<R>;
  each<R>(validator: Validate<R>): Validate<R[]>;
  validate(input: unknown): Promise<Result<T>>;
}
