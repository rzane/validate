import { Validator, putPath } from "../Validator";
import { Problem } from "../types";

export function each<T>(
  validator: Validator<unknown, T>
): Validator<unknown, T[]> {
  return new Validator(async input => {
    if (!Array.isArray(input)) {
      return Validator.reject("Expected an array");
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
      return Validator.reject(errors);
    } else {
      return Validator.resolve(values);
    }
  });
}
