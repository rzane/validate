import { valid, invalid } from "./result";
import { Predicate, Validation, Cast, Assertion } from "./types";

const negate = <T>(fn: Predicate<T>): Predicate<T> => {
  return async (...args) => !(await fn(...args));
};

const isBlank = (value: unknown) => {
  return (
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

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
  return assert(negate(fn), message);
};

export const cast = <T, R>(fn: Cast<T, R>): Validation<T, R> => {
  return async value => valid(await fn(value));
};

export const required = <T>(
  message: string = "This field can't be blank"
): Validation<T, NonNullable<T>> => {
  return refute(isBlank, message) as any;
};
