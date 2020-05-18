import { Predicate, Result } from "./types";

export const refute = <T>(fn: Predicate<T>, message: string = "is invalid") => {
  return async (value: T): Promise<Result<T>> => {
    if (typeof value === "undefined") {
      return { value };
    }

    if (await fn(value)) {
      return { value, errors: [{ message, path: [] }] };
    }

    return { value };
  };
};
