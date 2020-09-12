import { Validator, putPath } from "../Validator";
import { Problem } from "../types";
import { isObject } from "../predicates";

type AnySchema = Record<string, Validator<any, any>>;

export type Schema<T, R> = {
  [K in keyof R]: Validator<T extends Record<K, any> ? T[K] : unknown, R[K]>;
};

export function schema<T, R>(validators: Schema<T, R>): Validator<T, R> {
  const keys = Object.keys(validators);

  return new Validator(async input => {
    if (!isObject(input)) {
      return Validator.reject("Expected an object");
    }

    const values: any = {};
    const errors: Problem[] = [];

    const promises = keys.map(async key => {
      const value = (input as any)[key];
      const validator = (validators as AnySchema)[key];
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
}
