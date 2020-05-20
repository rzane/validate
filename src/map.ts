import { Validator, Validation } from "./types";

export const map = <T>(validate: Validation<unknown, T>): Validator<T> => ({
  validate(value) {
    return Promise.resolve(validate(value));
  },

  then(nextValidation) {
    return map(async input => {
      const result = await validate(input);

      if (result.ok) {
        return nextValidation(result.value);
      } else {
        return result;
      }
    });
  }
});
