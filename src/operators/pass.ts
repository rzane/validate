import { Validator } from "../Validator";

/**
 * Skip validation for this field.
 */
export function pass<T>(): Validator<T, T> {
  return new Validator(async value => Validator.resolve(value));
}
