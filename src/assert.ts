import { Predicate } from "./predicates";

export type Assertion<T> = (value: unknown) => Promise<T>;

/**
 * Produces an error when the predicate is not true.
 */
export const assert = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion<string | undefined> => async (value) => {
  const valid = await predicate(value);

  if (!valid) {
    return message;
  }
};

/**
 * Produces an error when the predicate is true.
 */
export const refute = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion<string | undefined> => async (value) => {
  const invalid = await predicate(value);

  if (invalid) {
    return message;
  }
};

/**
 * Produces an error when any of the assertions produce an error. This operation
 * will fail-fast, meaning that if the first assertion fails, the second will
 * not run.
 */
export const all = <T>(
  assertions: Assertion<T>[]
): Assertion<T | undefined> => async (value) => {
  for (const assertion of assertions) {
    const error = await assertion(value);

    if (error) {
      return error;
    }
  }
};

/**
 * Runs assertions against each item in an array.
 */
export const each = <T>(assertion: Assertion<T>): Assertion<Array<T>> => async (
  value
) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return Promise.all(value.map(assertion));
};
