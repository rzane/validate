import { map } from "../operators/map";
import { isObject } from "../predicates";
import { Validator } from "../Validator";
import { validateEach } from "./validateEach";

export function objectOf<T extends Record<string, unknown>, R>(
  validator: Validator<T, R>
): Validator<T, Record<string, R>> {
  return new Validator(async (input: T) => {
    if (!isObject(input)) {
      return Validator.reject("Must be an object");
    }

    return validateEach(
      Object.entries(input),
      ([key, value]) => validator.then(map(v => [key, v])).validate(value as T),
      ([key]) => key,
      values => Object.fromEntries(values)
    );
  });
}
