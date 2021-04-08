import { Validator } from "../Validator";
import { run } from "./run";

type Validators = Array<Validator<any, any>>;

type Input<S extends Validators> = {
  [K in keyof S]: S[K] extends Validator<infer T, any> ? T : never;
};

type Output<S extends Validators> = {
  [K in keyof S]: S[K] extends Validator<any, infer R> ? R : never;
};

export function tupleOf<S extends Validators>(
  ...validators: S
): Validator<Input<S>, Output<S>> {
  return new Validator(async input => {
    if (!Array.isArray(input)) {
      throw new Error("Expected input to be a tuple");
    }

    if (input.length !== validators.length) {
      throw new Error(
        `Expected tuple to contain ${validators.length} elements, got: ${input.length}`
      );
    }

    return run<Input<S>, Output<S>, any>(
      input,
      (value, i) => validators[i].validate(value),
      (_value, i) => i,
      values => values
    );
  });
}
