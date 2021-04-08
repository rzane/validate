import { Validator } from "../Validator";
import { run } from "./run";

export function arrayOf<T extends any[], R>(
  validator: Validator<T, R>
): Validator<T, R[]> {
  return new Validator(async (input: T) => {
    if (!Array.isArray(input)) {
      return Validator.reject("Must be an array");
    }

    return run(
      input,
      value => validator.validate(value),
      (_value, i) => i,
      values => values
    );
  });
}
