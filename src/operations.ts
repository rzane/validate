import { Validator } from "./Validator";
import { isUndefined, isNull, isNil, not } from "./predicates";
import { Transform, Forbid, Assert, Predicate } from "./types";

const MESSAGE = "This field is invalid.";

const exclude = <E>(test: Assert<any, E>) => {
  return <T, R>(validator: Validator<Forbid<T, E>, R>): Validator<T, R | E> => {
    return new Validator(async input => {
      if (test(input)) {
        return Validator.resolve<R | E>(input);
      } else {
        return validator.validate(input as any);
      }
    });
  };
};

/**
 * Ignore undefined values when validating.
 */
export const optional = exclude(isUndefined);

/**
 * Ignore null values when validating.
 */
export const nullable = exclude(isNull);

/**
 * Ignore null or undefined values when validating
 */
export const maybe = exclude(isNil);

/**
 * Transform the input value to a new value.
 */
export const map = <T, R>(fn: Transform<T, R>): Validator<T, R> => {
  return new Validator(async value => Validator.resolve(await fn(value)));
};

/**
 * Produce an error if the value does not pass the test.
 */
export function assert<T, S extends T>(
  fn: Assert<T, S>,
  msg?: string
): Validator<T, S>;
export function assert<T>(fn: Predicate<T>, msg?: string): Validator<T, T>;
export function assert(fn: Predicate<any>, msg = MESSAGE): Validator<any, any> {
  return new Validator(async value => {
    if (await fn(value)) {
      return Validator.resolve(value);
    } else {
      return Validator.reject(msg);
    }
  });
}

/**
 * Produce an error if the value passes the test.
 */
export const refute = <T>(fn: Predicate<T>, msg?: string): Validator<T, T> => {
  return assert(not(fn), msg);
};
