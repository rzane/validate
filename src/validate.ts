import { Validator, Validation } from "./types";

const create = <T>(validate: Validation<unknown, T>): Validator<T> => {
  const map = <R>(nextValidation: Validation<T, R>): Validator<R> => {
    return create(async input => {
      const result = await validate(input);

      if (result.ok) {
        return nextValidation(result.value);
      } else {
        return result;
      }
    });
  };

  return { map, validate };
};

export const validate = create<unknown>(value =>
  Promise.resolve({ value, ok: true })
);
