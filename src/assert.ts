import { Predicate } from "./predicates";

/**
 * Produces an error when the predicate is not true.
 */
export const assert = (
  predicate: Predicate,
  message: string = "is invalid"
) => async (value: unknown): Promise<string | undefined> => {
  const valid = await predicate(value);

  if (!valid) {
    return message;
  }
};

/**
 * Produces an error when the predicate is true.
 */
export const refute = (
  predicate: Predicate,
  message: string = "is invalid"
) => async (value: unknown): Promise<string | undefined> => {
  const invalid = await predicate(value);

  if (invalid) {
    return message;
  }
};

/**
 * Produces an error when any of the assertions produce an error. This operation
 * will fail-fast, meaning that if the first assertion fails, the second will
 * not run.
 */
export const all = <T>(assertions: Array<(value: unknown) => Promise<T>>) => {
  return async (value: unknown): Promise<T | undefined> => {
    for (const assertion of assertions) {
      const error = await assertion(value);

      if (error) {
        return error;
      }
    }
  };
};

/**
 * Runs assertions against each item in an array.
 */
export const each = <T>(assertion: (value: unknown) => Promise<T>) => {
  return async (value: unknown): Promise<T[] | undefined> => {
    if (!Array.isArray(value)) {
      return;
    }

    let valid = true;
    const errors: T[] = [];

    const promises = value.map(async (value, i) => {
      const error = await assertion(value);

      if (error) {
        valid = false;
        errors[i] = error;
      }
    });

    await Promise.all(promises);

    if (!valid) {
      return errors;
    }
  };
};

/**
 * Runs assertions against each of an object's properties.
 */
export const shape = (assertions: any) => async (values: any) => {
  let valid = true;
  const errors: any = {};

  const promises = Object.keys(assertions).map(async (key) => {
    const value = values[key];
    const assertion = assertions[key];
    const error = await assertion(value);

    if (error) {
      valid = false;
      errors[key] = error;
    }
  });

  await Promise.all(promises);

  if (!valid) {
    return errors;
  }
};
