import { Validate } from "./types";

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
}
