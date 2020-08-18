import { Validate, Problem, Valid, Invalid } from "./types";
import { isString } from "./predicates";

export const putPath = (problem: Problem, key: string | number): Problem => ({
  ...problem,
  path: [key, ...problem.path]
});

export type InferType<V> = V extends Validator<any, infer S> ? S : never;

export class Validator<T, R> {
  public validate: Validate<T, R>;

  public constructor(validate: Validate<T, R>) {
    this.validate = validate;
  }

  public then<U>(next: Validator<R, U>): Validator<T, U> {
    return new Validator(async input => {
      const result = await this.validate(input);

      if (result.valid) {
        return next.validate(result.value);
      } else {
        return result;
      }
    });
  }

  public and(next: Validator<T, R>): Validator<T, R> {
    return new Validator(async input => {
      const [a, b] = await Promise.all([
        this.validate(input),
        next.validate(input)
      ]);

      if (b.valid && b.value !== (input as any)) {
        throw new Error(
          "The validator given to `and` should not transform the value."
        );
      }

      if (a.valid && b.valid) {
        return a;
      }

      const errors = [];
      if (!a.valid) errors.push(...a.errors);
      if (!b.valid) errors.push(...b.errors);
      return { valid: false, errors };
    });
  }

  public static resolve<T>(value: T): Valid<T> {
    return { valid: true, value };
  }

  public static reject(errors: string | Problem[]): Invalid {
    if (isString(errors)) {
      errors = [{ message: errors, path: [] }];
    }

    return { valid: false, errors };
  }
}
