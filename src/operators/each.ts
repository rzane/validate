import { Validator, putPath } from "../Validator";
import { Problem } from "../types";

export function each<T, R>(validator: Validator<T, R>): Validator<T[], R[]> {
  return new Validator(async input => {
    if (!Array.isArray(input)) {
      return Validator.reject("Expected an array");
    }

    const values: R[] = [];
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
      return Validator.reject(errors);
    } else {
      return Validator.resolve(values);
    }
  });
}
