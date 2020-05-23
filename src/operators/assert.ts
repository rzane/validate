import { Validator } from "../Validator";
import { Guard, Path, Predicate } from "../types";

const MESSAGE = "This field is invalid";

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
