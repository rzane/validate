import { isNil } from "../predicates";
import { Validator } from "../Validator";
import { map } from "./map";

/**
 * If the current value is `null` or `undefined`, it will be replaced
 * with a default value.
 */
export function defaultTo<T, R>(
  defaultValue: R
): Validator<T | null | undefined, T | R> {
  return map(value => (isNil(value) ? defaultValue : value));
}
