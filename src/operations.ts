import { isUndefined } from "./predicates";
import { chain } from "./chain";
import { valid, invalid } from "./result";
import { Predicate, Transform, Assertion, Validator } from "./types";

/**
 * Transform the input value to a new value.
 */
export const map = <T, R>(fn: Transform<T, R>): Validator<T, R> => {
  return chain(async value => valid(await fn(value)));
};

/**
 * Produce an error if the value does not pass the test.
 */
export const assert = <T, R extends T>(
  fn: Assertion<T, R>,
  message: string = "This field is invalid"
): Validator<T, R> => {
  return chain(async value => {
    if (await fn(value)) {
      return valid(value as R);
    } else {
      return invalid([{ message, path: [] }]);
    }
  });
};

/**
 * Produce an error if the value passes the test.
 */
export const refute = <T>(
  fn: Predicate<T>,
  message?: string
): Validator<T, T> => {
  return assert(async value => !(await fn(value)), message);
};

/**
 * Ignore `undefined` values when validating.
 */
export const maybe = <I, T>(
  validator: Validator<I extends undefined ? never : I, T>
): Validator<I, T | undefined> => {
  return chain(async input => {
    if (isUndefined(input)) {
      return valid<undefined>(input);
    } else {
      return validator.validate(input as any);
    }
  });
};
