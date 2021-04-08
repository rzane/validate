import { isSet } from "../predicates";
import { Validator } from "../Validator";
import { validateEach } from "./validateEach";

export function setOf<T extends Set<any>, R>(
  validator: Validator<T, R>
): Validator<T, Set<R>> {
  return new Validator(async (input: T) => {
    if (!isSet(input)) {
      return Validator.reject("Must be a set");
    }

    return validateEach(
      input,
      value => validator.validate(value),
      (_value, i) => i,
      values => new Set(values)
    );
  });
}
