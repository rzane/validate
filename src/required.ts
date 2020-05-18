import { Result } from "./types";

export const required = <T>(message: string = "can't be blank") => {
  return (value: T): Result<T> => {
    if (
      typeof value === "undefined" ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return { value, errors: [{ message, path: [] }] };
    } else {
      return { value };
    }
  };
};
