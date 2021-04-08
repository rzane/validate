import { isMap } from "../predicates";
import { Validator } from "../Validator";
import { tupleOf } from "./tupleOf";
import { run } from "./run";

type MapKey<T> = T extends Map<infer K, any> ? K : never;
type MapValue<T> = T extends Map<any, infer V> ? V : never;

export function mapOf<T extends Map<any, any>, K, V>(
  keyValidator: Validator<MapKey<T>, K>,
  valueValidator: Validator<MapValue<T>, V>
): Validator<T, Map<K, V>> {
  const validator = tupleOf(keyValidator, valueValidator);

  return new Validator(async input => {
    if (!isMap(input)) {
      throw new Error("Expected a map");
    }

    return run(
      input,
      value => validator.validate(value),
      (_value, i) => i,
      values => new Map(values)
    );
  });
}
