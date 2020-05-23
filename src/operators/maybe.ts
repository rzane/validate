import { Guard } from "../types";
import { Validator } from "../Validator";
import { isNil, isUndefined, isNull } from "../predicates";

const exclude = <E>(test: Guard<unknown, E>) => {
  return <T, R>(
    validator: Validator<Exclude<T, E>, R>
  ): Validator<T | E, R | E> => {
    return new Validator(async input => {
      if (test(input)) {
        return Validator.resolve<R | E>(input);
      } else {
        return validator.validate(input as any);
      }
    });
  };
};

/**
 * Runs the given validator unless the value is either `null` or `undefined`.
 */
export const maybe = exclude(isNil);

/**
 * Runs the given validator unless the value is `undefined`
 */
export const optional = exclude(isUndefined);

/**
 * Runs the given validator unless the value is `null`
 */
export const nullable = exclude(isNull);
