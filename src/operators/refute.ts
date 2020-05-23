import { assert } from "./assert";
import { Validator } from "../Validator";
import { Predicate, Path } from "../types";

/**
 * Produce an error if the value passes the test.
 *
 * Note: This operator does not perform any type-narrowing.
 */
export function refute<T>(
  fn: Predicate<T>,
  message?: string,
  path?: Path
): Validator<T, T> {
  return assert(async value => !(await fn(value)), message, path);
}
