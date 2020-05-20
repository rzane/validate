import { valid, invalid } from "./result";
import { Predicate, Validation, Cast, Assertion } from "./types";

export const assert = <T, S extends T>(
  fn: Assertion<T, S>,
  message: string = "This field is invalid"
): Validation<T, S> => {
  return async value => {
    if (await fn(value)) {
      return valid(value as any);
    } else {
      return invalid([{ message, path: [] }]);
    }
  };
};

export const refute = <T>(
  fn: Predicate<T>,
  message?: string
): Validation<T, T> => {
  return assert(async value => !(await fn(value)), message);
};

export const cast = <T, R>(fn: Cast<T, R>): Validation<T, R> => {
  return async value => valid(await fn(value));
};
