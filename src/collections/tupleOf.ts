import { Problem } from "../types";
import { putPath, Validator } from "../Validator";

type Validators = Array<Validator<any, any>>;

type Input<S extends Validators> = {
  [K in keyof S]: S[K] extends Validator<infer T, any> ? T : never;
};

type Output<S extends Validators> = {
  [K in keyof S]: S[K] extends Validator<any, infer R> ? R : never;
};

type Result<S extends Validators> = Validator<Input<S>, Output<S>>;

export function tupleOf<S extends Validators>(...validators: S): Result<S> {
  return new Validator(async input => {
    if (!Array.isArray(input)) {
      throw new Error("Expected input to be a tuple");
    }

    if (input.length !== validators.length) {
      throw new Error(
        `Expected tuple to contain ${validators.length} elements, got: ${input.length}`
      );
    }

    const values: any = [];
    const errors: Problem[] = [];

    const promises = input.map(async (value, i) => {
      const validator = validators[i];
      const result = await validator.validate(value);

      if (result.valid) {
        values[i] = result.value;
      } else {
        errors.push(...result.errors.map(e => putPath(e, i)));
      }
    });

    await Promise.all(promises);

    if (errors.length) {
      return Validator.reject(errors);
    } else {
      return Validator.resolve(values);
    }
  });
}
