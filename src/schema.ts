import { Schema, Problem } from "./types";

const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === "object";
};

export const schema = <T>(validators: Schema<T>) => {
  const keys = Object.keys(validators);

  return async (input: any) => {
    if (!isObject(input)) {
      return { value: input };
    }

    const values: any = {};
    const errors: Problem[] = [];

    const promises = keys.map(async key => {
      const rawValue = input[key];
      const validator = validators[key];
      const field = await validator.validate(rawValue);

      values[key] = field.value;

      if (field.errors) {
        for (const error of field.errors) {
          errors.push({ ...error, path: [key, ...error.path] });
        }
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return { value: values, errors };
    } else {
      return { value: values };
    }
  };
};
