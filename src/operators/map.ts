import { Transform } from "../types";
import { Validator } from "../Validator";

/**
 * Transform the input value to a new value.
 */
export function map<T, R>(fn: Transform<T, R>): Validator<T, R> {
  return new Validator(async value => Validator.resolve(await fn(value)));
}
