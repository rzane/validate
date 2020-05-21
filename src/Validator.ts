import { Validate, Problem, Valid, Invalid } from "./types";
import { isString } from "./predicates";

export const putPath = (problem: Problem, key: string | number): Problem => ({
  ...problem,
  path: [key, ...problem.path]
});

export class Validator<I, T> {
  public validate: Validate<I, T>;

  public constructor(validate: Validate<I, T>) {
    this.validate = validate;
  }

  public then<R>(next: Validator<T, R>): Validator<I, R> {
    return new Validator(async input => {
      const result = await this.validate(input);

      if (result.valid) {
        return next.validate(result.value);
      } else {
        return result;
      }
    });
  }

  public static valid<T>(value: T): Valid<T> {
    return { valid: true, value };
  }

  public static invalid(errors: string | Problem[]): Invalid {
    if (isString(errors)) {
      errors = [{ message: errors, path: [] }];
    }

    return { valid: false, errors };
  }
}
