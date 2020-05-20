import { Validator, Validation } from "./types";

export const map = <T>(validate: Validation<unknown, T>): Validator<T> => ({
  validate(value) {
    return Promise.resolve(validate(value));
  },

  then(next) {
    return map(async input => {
      const result = await validate(input);

      if (result.valid) {
        return next(result.value);
      } else {
        return result;
      }
    });
  }
});
