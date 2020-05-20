import { Validator, Validate } from "./types";

export const chain = <I, T>(validate: Validate<I, T>): Validator<I, T> => ({
  validate,

  then(next) {
    return chain(async input => {
      const result = await validate(input);

      if (result.valid) {
        return next.validate(result.value);
      } else {
        return result;
      }
    });
  }
});
