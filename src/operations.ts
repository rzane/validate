import { Validator } from "./Validator";
import { isUndefined, isNull, isNil } from "./predicates";
import { Predicate, Transform, Assertion, Forbid } from "./types";

/**
 * Transform the input value to a new value.
 */
export const map = <T, R>(fn: Transform<T, R>): Validator<T, R> => {
  return new Validator(async value => Validator.valid(await fn(value)));
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
      return Validator.valid(value as R);
    } else {
      return Validator.invalid(message);
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
        return Validator.valid<R | E>(input);
      } else {
        return validator.validate(input as any);
      }
    });
  };
};

/**
 * Ignore undefined values when validating.
 */
export const optional = createMaybe(isUndefined);

/**
 * Ignore null values when validating.
 */
export const nullable = createMaybe(isNull);

/**
 * Ignore null or undefined values when validating
 */
export const maybe = createMaybe(isNil);
