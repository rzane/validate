import { isObject } from "./predicates";
import { Problem } from "./types";
import { putPath, Validator } from "./Validator";

type AnySchema = Record<string, Validator<any, any>>;
type Merge<Old, New> = Omit<Old, keyof New> & New;

export type Schema<T, R> = {
  [K in keyof R]: Validator<T extends Record<K, any> ? T[K] : unknown, R[K]>;
};

async function validate<T, R>(validators: Schema<T, R>, input: T) {
  if (!isObject(input)) {
    return Validator.reject("Expected an object");
  }

  const values: any = {};
  const errors: Problem[] = [];

  const promises = Object.keys(validators).map(async key => {
    const value = (input as any)[key];
    const validator = (validators as AnySchema)[key];
    const result = await validator.validate(value);

    if (result.valid) {
      values[key] = result.value;
    } else {
      errors.push(...result.errors.map(problem => putPath(problem, key)));
    }
  });

  await Promise.all(promises);

  if (errors.length) {
    return Validator.reject(errors);
  } else {
    return Validator.resolve(values);
  }
}

export class SchemaValidator<T, R> extends Validator<T, R> {
  private validators: Schema<T, R>;

  public constructor(validators: Schema<T, R>) {
    super(input => validate(validators, input));
    this.validators = validators;
  }

  public extend<A, B>(
    overrides: Schema<A, B>
  ): SchemaValidator<Merge<T, A>, Merge<R, B>> {
    const validators: any = {
      ...this.validators,
      ...overrides
    };

    return new SchemaValidator(validators);
  }
}
