import { Predicate } from "./predicates";

export type Assertion = (value: unknown) => Promise<string | undefined>;

export const assert = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion => async (value) => {
  const valid = await predicate(value);

  if (!valid) {
    return message;
  }
};

export const refute = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion => async (value) => {
  const invalid = await predicate(value);

  if (invalid) {
    return message;
  }
};
