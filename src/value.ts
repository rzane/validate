export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface Validator<T> {
  cast<R>(fn: Cast<T, R>): Validator<R>;
  assert(fn: Predicate<T>, message?: string): Validator<T>;
  refute(fn: Predicate<T>, message?: string): Validator<T>;
}

type Validation = (value: any) => Promise<[any, any]>;

const next = <T>(validations: Validation[]): Validator<T> => ({
  cast(fn) {
    const validation: Validation = async (value) => {
      return [await fn(value), undefined];
    };

    return next([...validations, validation]);
  },
  assert(fn, message = "is invalid") {
    const validation: Validation = async (value) => {
      const valid = await fn(value);
      const error = valid ? undefined : message;
      return [value, error];
    };

    return next([...validations, validation]);
  },
  refute(fn, message = "is invalid") {
    const validation: Validation = async (value) => {
      const invalid = await fn(value);
      const error = invalid ? message : undefined;
      return [value, error];
    };

    return next([...validations, validation]);
  },
});

export const { cast, assert, refute } = next<unknown>([]);
