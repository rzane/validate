import { Cast } from "./types";

export const cast = <T, R>(fn: Cast<T, R>, defaultValue?: R) => {
  return async (value: T) => {
    if (typeof value === "undefined") {
      return { value: defaultValue };
    } else {
      return { value: await fn(value) };
    }
  };
};
