import { putPath, Validator } from "../Validator";
import { Problem, Result } from "../types";

export async function run<T, R, O>(
  entries: Iterable<T> | ArrayLike<T>,
  validate: (entry: T, index: number) => Promise<Result<R>>,
  getKey: (entry: T, index: number) => string | number,
  coerce: (values: R[]) => O
): Promise<Result<O>> {
  const values: R[] = [];
  const errors: Problem[] = [];

  const promises = Array.from(entries, async (entry, i) => {
    const result = await validate(entry, i);

    if (result.valid) {
      values[i] = result.value;
    } else {
      const key = getKey(entry, i);
      errors.push(...result.errors.map(e => putPath(e, key)));
    }
  });

  await Promise.all(promises);

  if (errors.length) {
    return Validator.reject(errors);
  } else {
    return Validator.resolve(coerce(values));
  }
}
