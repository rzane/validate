import { Valid, Invalid, Problem } from "./types";

export const valid = <T>(value: T): Valid<T> => ({
  valid: true,
  value
});

export const invalid = (errors: Problem[]): Invalid => ({
  valid: false,
  errors
});

export const putPath = (problem: Problem, key: string | number): Problem => ({
  ...problem,
  path: [key, ...problem.path]
});
