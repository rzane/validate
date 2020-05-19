import { Predicate } from "./types";
import { assert } from "./assert";

const negate = <T>(fn: Predicate<T>): Predicate<T> => {
  return async (...args) => !(await fn(...args));
};

export const refute = <T>(fn: Predicate<T>, message?: string) => {
  return assert(negate(fn), message);
};
