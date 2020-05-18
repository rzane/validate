export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface ValidationError {
  message: string;
  path: string[];
}

export interface ValidationResult<T> {
  value: T;
  errors?: ValidationError[];
}

export interface Validator<T> {
  cast<R>(fn: Cast<T, R>): Validator<R>;
  required(): Validator<NonNullable<T>>;
  assert(fn: Predicate<NonNullable<T>>, message?: string): Validator<T>;
  refute(fn: Predicate<NonNullable<T>>, message?: string): Validator<T>;
  validate(input: unknown): Promise<ValidationResult<T>>;
}

export type ValidationSchema<T> = {
  [K in keyof T]: Validator<T[K]>;
};
