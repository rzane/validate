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
export function when<T, S extends T, R, O>(
  fn: Guard<T, S>,
  validator: Validator<S, R>,
  elseValidator: Validator<T, O>
): Validator<T, R | O>;
export function when<T, R, O>(
  fn: Predicate<T>,
  validator: Validator<T, R>,
  elseValidator: Validator<T, O>
): Validator<T, R | O>;
export function when(
  fn: Predicate<any>,
  validator: Validator<any, any>,
  elseValidator?: Validator<any, any>
): Validator<any, any> {
  return new Validator(async value => {
    if (await fn(value)) {
      return validator.validate(value);
    } else if (elseValidator) {
      return elseValidator.validate(value);
    } else {
      return Validator.resolve(value);
    }
  });
}
