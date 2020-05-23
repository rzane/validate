import { Validator } from "./Validator";
import { isUndefined, isNull, isNil } from "./predicates";
import { Transform, Forbid, Guard, Predicate, Path } from "./types";

const MESSAGE = "This field is invalid";

const exclude = <E>(test: Guard<any, E>) => {
  return <T, R>(
    validator: Validator<Forbid<T, E>, R>
  ): Validator<T | E, R | E> => {
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
 * Ignore null or undefined values when validating
 */
export const maybe = exclude(isNil);

/**
 * Ignore undefined values when validating.
 */
export const optional = exclude(isUndefined);

/**
 * Ignore null values when validating.
 */
export const nullable = exclude(isNull);

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
  fn: (value: T) => value is S,
  message?: string,
  path?: Path
): Validator<T, S>;
export function assert<T>(
  fn: Predicate<T>,
  message?: string,
  path?: Path
): Validator<T, T>;
export function assert(
  fn: Predicate<any>,
  message: string = MESSAGE,
  path: Path = []
): Validator<any, any> {
  return new Validator(async value => {
    if (await fn(value)) {
      return Validator.resolve(value);
    } else {
      return Validator.reject([{ message, path }]);
    }
  });
}

/**
 * Produce an error if the value passes the test.
 *
 * Note: This operation does not perform any type-narrowing.
 */
export const refute = <T>(
  fn: Predicate<T>,
  message?: string,
  path?: Path
): Validator<T, T> => {
  return assert(async value => !(await fn(value)), message, path);
};
