import { map } from "./map";
import { Validator, Problem } from "./types";
import { valid, invalid, putPath } from "./result";

export const each = <T>(validator: Validator<T>): Validator<T[]> => {
  return map(async input => {
    if (!Array.isArray(input)) {
      return invalid([{ message: "is not an array", path: [] }]);
    }

    const value: T[] = [];
    const errors: Problem[] = [];

    const promises = input.map(async (value, i) => {
      const result = await validator.validate(value);

      if (result.ok) {
        value[i] = result.value;
      } else {
        errors.push(...result.errors.map(problem => putPath(problem, i)));
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return invalid(errors);
    } else {
      return valid(value);
    }
  });
};
