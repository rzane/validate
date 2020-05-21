import { isUndefined, isNull } from "./predicates";
import { Validator } from "./Validator";
import { valid, invalid } from "./result";
import { Predicate, Transform, Assertion, Forbid } from "./types";

/**
 * Transform the input value to a new value.
 */
export const map = <T, R>(fn: Transform<T, R>): Validator<T, R> => {
  return new Validator(async value => valid(await fn(value)));
};

/**
 * Produce an error if the value does not pass the test.
 */
export const assert = <T, R extends T>(
  fn: Assertion<T, R>,
  message: string = "This field is invalid"
): Validator<T, R> => {
  return new Validator(async value => {
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

const createMaybe = <E>(test: Assertion<any, E>) => {
  return <T, R>(validator: Validator<Forbid<T, E>, R>): Validator<T, R | E> => {
    return new Validator(async input => {
      if (test(input)) {
        return valid<R | E>(input);
      } else {
        return validator.validate(input as any);
      }
    });
  };
};

/**
 * Ignore `undefined` values when validating.
 */
export const optional = createMaybe(isUndefined);

/**
 * Ignore null values when validating.
 */
export const nullable = createMaybe(isNull);
