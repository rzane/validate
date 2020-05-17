import { Predicate } from "./predicates";

export interface Assertion {
  message: string;
  predicate: Predicate;
}

export const assert = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion => ({
  message,
  predicate,
});

export const refute = (
  predicate: Predicate,
  message: string = "is invalid"
): Assertion => ({
  message,
  predicate: (value) => !predicate(value),
});
