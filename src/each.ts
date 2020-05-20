import { chain } from "./chain";
import { Validator, Problem } from "./types";
import { valid, invalid, putPath } from "./result";

export const each = <I, T>(validator: Validator<I, T>): Validator<I[], T[]> => {
  return chain(async input => {
    if (!Array.isArray(input)) {
      return invalid([{ message: "is not an array", path: [] }]);
    }

    const values: T[] = [];
    const errors: Problem[] = [];

    const promises = input.map(async (value, i) => {
      const result = await validator.validate(value);

      if (result.valid) {
        values[i] = result.value;
      } else {
        errors.push(...result.errors.map(problem => putPath(problem, i)));
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return invalid(errors);
    } else {
      return valid(values);
    }
  });
};
