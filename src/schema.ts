import { Validator, putPath } from "./Validator";
import { Problem } from "./types";
import { isObject } from "./predicates";

export type Schema<T> = {
  [K in keyof T]: Validator<unknown, T[K]>;
} & {
  [key: string]: Validator<unknown, unknown>;
};

export const schema = <T>(validators: Schema<T>): Validator<unknown, T> => {
  const keys = Object.keys(validators);

  return new Validator(async input => {
    if (!isObject(input)) {
      return Validator.reject("Expected an object");
    }

    const values: any = {};
    const errors: Problem[] = [];

    const promises = keys.map(async key => {
      const value = (input as any)[key];
      const validator = validators[key];
      const result = await validator.validate(value);

      if (result.valid) {
        values[key] = result.value;
      } else {
        errors.push(...result.errors.map(problem => putPath(problem, key)));
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return Validator.reject(errors);
    } else {
      return Validator.resolve(values);
    }
  });
};
