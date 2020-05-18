import { assert } from "./assert";
import { cast } from "./cast";
import { each } from "./each";
import { refute } from "./refute";
import { required } from "./required";
import { schema } from "./schema";
import { Validate, Result, Problem } from "./types";

type MaybeAsync<T> = T | Promise<T>;
type Operation = (input: any) => MaybeAsync<Result<any>>;

const create = <T>(operations: Operation[]): Validate<T> => {
  const next = <R>(operation: Operation): Validate<R> => {
    return create([...operations, operation]);
  };

  const validate = async (input: unknown): Promise<Result<T>> => {
    let value: any = input;
    const errors: Problem[] = [];

    for (const operation of operations) {
      const result = await operation(value);
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
  };

  return {
    validate,
    schema: (...args) => next(schema(...args)),
    each: (...args) => next(each(...args)),
    required: (...args) => next(required(...args)),
    cast: (...args) => next(cast(...args)),
    assert: (...args) => next(assert(...args)),
    refute: (...args) => next(refute(...args))
  };
};

export const validate = create<unknown>([]);
