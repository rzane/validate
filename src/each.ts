import { Validate, Problem, Result } from "./types";

export const each = <T>(validator: Validate<T>) => {
  return async (input: unknown): Promise<Result<T[]>> => {
    if (!Array.isArray(input)) {
      return { value: input as any };
    }

    const value: T[] = [];
    const errors: Problem[] = [];

    const promises = input.map(async (value, i) => {
      const field = await validator.validate(value);

      value[i] = field.value;

      for (const error of field.errors || []) {
        errors.push({ ...error, path: [i, ...error.path] });
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return { value, errors };
    } else {
      return { value };
    }
  };
};
