export type Transform<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;
export type Guard<T, S extends T> = (value: T) => value is S;

export type Path = Array<string | number>;

export interface Problem {
  path: Path;
  message: string;
}

export interface Valid<T> {
  valid: true;
  value: T;
}

export interface Invalid {
  valid: false;
  errors: Problem[];
}

export type Result<T> = Valid<T> | Invalid;
export type Validate<T, R> = (input: T) => Promise<Result<R>>;
