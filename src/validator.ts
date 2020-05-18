import { isUndefined, isBlank } from "./predicates";
import { Validator, ValidationResult, ValidationError } from "./types";

type MaybeAsync<T> = T | Promise<T>;
type Step = (input: any) => MaybeAsync<ValidationResult<any>>;

const create = <T>(steps: Step[]): Validator<T> => {
  const next = <R>(step: Step): Validator<R> => {
    return create([...steps, step]);
  };

  const validator: Validator<T> = {
    async validate(input) {
      let value: any = input;
      let errors: ValidationError[] = [];

      for (const step of steps) {
        const result = await step(value);
        value = result.value;

        if (result.errors) {
          errors.push(...result.errors);
        }
      }

      if (errors.length) {
        return { value, errors };
      } else {
        return { value };
      }
    },

    required(message = "can't be blank") {
      return next(async value => {
        if (isBlank(value)) {
          return { value, errors: [{ message, path: [] }] };
        } else {
          return { value };
        }
      });
    },

    cast(caster, defaultValue) {
      return next(async value => {
        if (isUndefined(value)) {
          return { value: defaultValue };
        } else {
          return { value: await caster(value) };
        }
      });
    },

    assert(predicate, message = "is invalid") {
      return next(async value => {
        if (isUndefined(value) || (await predicate(value))) {
          return { value };
        } else {
          return { value, errors: [{ message, path: [] }] };
        }
      });
    },

    refute(predicate, message = "is invalid") {
      return next(async value => {
        if (isUndefined(value) || !(await predicate(value))) {
          return { value };
        } else {
          return { value, errors: [{ message, path: [] }] };
        }
      });
    }
  };

  return validator;
};

export const { cast, assert, refute, required } = create<unknown>([]);
