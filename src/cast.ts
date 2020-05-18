import { Cast, Result } from "./types";

export const cast = <T, R>(fn: Cast<T, R>) => {
  return async (value: T): Promise<Result<R>> => {
    return { value: await fn(value) };
  };
};
