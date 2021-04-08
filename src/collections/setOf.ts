import { isSet } from "../predicates";
import { Validator } from "../Validator";
import { run } from "./run";

export function setOf<T extends Set<any>, R>(
  validator: Validator<T, R>
): Validator<T, Set<R>> {
  return new Validator(async (input: T) => {
    if (!isSet(input)) {
      throw new Error("Expected a set");
    }

    return run(
      input,
      value => validator.validate(value),
      (_value, i) => i,
      values => new Set(values)
    );
  });
}
