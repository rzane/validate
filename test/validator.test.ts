import { cast, assert, refute, required } from "../src";

const toInteger = (value: unknown): number => {
  return parseInt(value as string, 10);
};

const isTruthy = (value: unknown): boolean => {
  return Boolean(value);
};

describe("cast", () => {
  test("converts a value to the specified type", async () => {
    const { validate } = cast(toInteger);
    expect(await validate("1")).toEqual({ value: 1 });
  });

  test("accepts a default value", async () => {
    const { validate } = cast(toInteger, 7);
    expect(await validate(undefined)).toEqual({ value: 7 });
  });
});

describe("assert", () => {
  test("produces an error for invalid values", async () => {
    const { validate } = assert(isTruthy);

    expect(await validate(false)).toEqual({
      value: false,
      errors: [{ message: "is invalid", path: [] }]
    });
  });

  test("accepts a custom message", async () => {
    const { validate } = assert(isTruthy, "must be true");

    expect(await validate(false)).toEqual({
      value: false,
      errors: [{ message: "must be true", path: [] }]
    });
  });

  test("does not produce an error for valid values", async () => {
    const { validate } = assert(isTruthy);
    expect(await validate(true)).toEqual({ value: true });
  });

  test("does not run the assertion against `undefined`", async () => {
    const predicate = jest.fn();
    const { validate } = assert(predicate);
    expect(await validate(undefined)).toEqual({ value: undefined });
    expect(predicate).not.toHaveBeenCalled();
  });
});

describe("assert", () => {
  test("produces an error for invalid values", async () => {
    const { validate } = refute(isTruthy);

    expect(await validate(true)).toEqual({
      value: true,
      errors: [{ message: "is invalid", path: [] }]
    });
  });

  test("accepts a custom message", async () => {
    const { validate } = refute(isTruthy, "must be false");

    expect(await validate(true)).toEqual({
      value: true,
      errors: [{ message: "must be false", path: [] }]
    });
  });

  test("does not produce an error for valid values", async () => {
    const { validate } = refute(isTruthy);
    expect(await validate(false)).toEqual({ value: false });
  });

  test("does not run the assertion against `undefined`", async () => {
    const predicate = jest.fn();
    const { validate } = refute(predicate);
    expect(await validate(undefined)).toEqual({ value: undefined });
    expect(predicate).not.toHaveBeenCalled();
  });
});

describe("required", () => {
  test("produces an error for `undefined`", async () => {
    const { validate } = required();

    expect(await validate(undefined)).toEqual({
      value: undefined,
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("produces an error for `null`", async () => {
    const { validate } = required();

    expect(await validate(null)).toEqual({
      value: null,
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("produces an error for a blank string", async () => {
    const { validate } = required();

    expect(await validate(" ")).toEqual({
      value: " ",
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("accepts a custom error message", async () => {
    const { validate } = required("boom");

    expect(await validate(" ")).toEqual({
      value: " ",
      errors: [{ message: "boom", path: [] }]
    });
  });
});
