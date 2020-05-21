import { Validator, putPath } from "./Validator";
import { Problem } from "./types";

export const each = <I, T>(validator: Validator<I, T>): Validator<I[], T[]> => {
  return new Validator(async input => {
    if (!Array.isArray(input)) {
      return Validator.invalid("is not an array");
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
      return Validator.invalid(errors);
    } else {
      return Validator.valid(values);
    }
  });
};
