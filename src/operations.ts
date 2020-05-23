import { Validator } from "./Validator";
import { isUndefined, isNull, isNil } from "./predicates";
import { Transform, Guard, Predicate, Path } from "./types";

const MESSAGE = "This field is invalid";

const exclude = <E>(test: Guard<any, E>) => {
  return <T, R>(
    validator: Validator<Exclude<T, E>, R>
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
 * Runs the given validator unless the value is either `null` or `undefined`.
 */
export const maybe = exclude(isNil);

/**
 * Runs the given validator unless the value is `undefined`
 */
export const optional = exclude(isUndefined);

/**
 * Runs the given validator unless the value is `null`
 */
export const nullable = exclude(isNull);

/**
 * Run then given validator when the value passes the test.
 */
export function when<T, S extends T, R>(
  fn: Guard<T, S>,
  validator: Validator<S, R>
): Validator<T, T | R>;
export function when<T, R>(
  fn: Predicate<T>,
  validator: Validator<T, R>
): Validator<T, T | R>;
export function when(
  fn: Predicate<any>,
  validator: Validator<any, any>
): Validator<any, any> {
  return new Validator(async value => {
    if (await fn(value)) {
      return validator.validate(value);
    } else {
      return Validator.resolve(value);
    }
  });
}

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
  fn: Guard<T, S>,
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
