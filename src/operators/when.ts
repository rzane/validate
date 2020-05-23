import { Guard, Predicate } from "../types";
import { Validator } from "../Validator";

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
