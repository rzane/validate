import { Predicate } from "./predicates";

export type Assertion = (value: unknown) => Promise<string | undefined>;

/**
 * Produces an error when the predicate is not true.
 */
export const assert = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion => async (value) => {
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
): Assertion => async (value) => {
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
export const all = (assertions: Assertion[]): Assertion => async (value) => {
  for (const assertion of assertions) {
    const error = await assertion(value);

    if (error) {
      return error;
    }
  }
};
