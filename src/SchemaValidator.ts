import { run } from "./collections/run";
import { map } from "./operators/map";
import { isObject } from "./predicates";
import { Validator } from "./Validator";

type Merge<Old, New> = Omit<Old, keyof New> & New;

export type Schema<T, R> = {
  [K in keyof R]: Validator<T extends Record<K, any> ? T[K] : unknown, R[K]>;
};

async function validate<T, R>(validators: Schema<T, R>, input: T) {
  if (!isObject(input)) {
    return Validator.reject("Must be an object");
  }

  return run(
    Object.keys(validators) as Array<keyof R>,
    key => {
      const validator = validators[key].then(map(value => [key, value]));
      return validator.validate((input as any)[key]);
    },
    key => key as string,
    values => Object.fromEntries(values)
  );
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
