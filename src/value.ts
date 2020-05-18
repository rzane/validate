export type Cast<T, R> = (value: T) => R | Promise<R>;
export type Predicate<T> = (value: T) => boolean | Promise<boolean>;

export interface Chain<T> {
  cast<R>(fn: Cast<T, R>): Chain<R>;
  assert(fn: Predicate<T>, message?: string): Chain<T>;
  refute(fn: Predicate<T>, message?: string): Chain<T>;
}

type Step = (value: any) => Promise<[any, any]>;

const next = <T>(steps: Step[]): Chain<T> => ({
  cast(fn) {
    const step: Step = async (value) => {
      return [await fn(value), undefined];
    };

    return next([...steps, step]);
  },
  assert(fn, message = "is invalid") {
    const step: Step = async (value) => {
      const valid = await fn(value);
      const error = valid ? undefined : message;
      return [value, error];
    };

    return next([...steps, step]);
  },
  refute(fn, message = "is invalid") {
    const step: Step = async (value) => {
      const invalid = await fn(value);
      const error = invalid ? message : undefined;
      return [value, error];
    };

    return next([...steps, step]);
  },
});

export const { cast, assert, refute } = next<unknown>([]);
