import { isObject } from "../predicates";
import { Validator } from "../Validator";
import { run } from "./run";

export function objectOf<T extends Record<string, unknown>, R>(
  validator: Validator<T, R>
): Validator<T, Record<string, R>> {
  return new Validator(async (input: T) => {
    if (!isObject(input)) {
      throw new Error("Expected an object");
    }

    return run(
      Object.entries(input),
      async ([key, value]) => {
        const result = await validator.validate(value as T);

        if (result.valid) {
          return { valid: true, value: [key, result.value] };
        } else {
          return result;
        }
      },
      ([key]) => key,
      values => Object.fromEntries(values)
    );
  });
}
