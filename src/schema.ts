import { Validator } from "./Validator";
import { Problem } from "./types";
import { putPath, invalid, valid } from "./result";
import { isObject } from "./predicates";

export type Schema<T> = {
  [K in keyof T]: Validator<unknown, T[K]>;
} & {
  [key: string]: Validator<unknown, unknown>;
};

export const schema = <I, T>(validators: Schema<T>): Validator<I, T> => {
  const keys = Object.keys(validators);

  return new Validator(async input => {
    if (!isObject(input)) {
      return invalid([{ message: "is not an object", path: [] }]);
    }

    const values: any = {};
    const errors: Problem[] = [];

    const promises = keys.map(async key => {
      const rawValue = (input as any)[key];
      const validator = validators[key];
      const result = await validator.validate(rawValue);

      if (result.valid) {
        values[key] = result.value;
      } else {
        errors.push(...result.errors.map(problem => putPath(problem, key)));
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
