import { Validator, Validation } from "./types";

const create = <T>(validate: Validation<unknown, T>): Validator<T> => {
  const then = <R>(nextValidation: Validation<T, R>): Validator<R> => {
    return create(async input => {
      const result = await validate(input);

      if (result.ok) {
        return nextValidation(result.value);
      } else {
        return result;
      }
    });
  };

  return { then, validate };
};

export const { then: map } = create<unknown>((value: unknown) =>
  Promise.resolve({ value, ok: true })
);
