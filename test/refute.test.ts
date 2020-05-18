import { refute } from "../src/refute";

describe("assert", () => {
  test("produces an error for invalid values", async () => {
    expect(await refute(Boolean)(true)).toEqual({
      value: true,
      errors: [{ message: "is invalid", path: [] }]
    });
  });

  test("accepts a custom message", async () => {
    expect(await refute(Boolean, "must be false")(true)).toEqual({
      value: true,
      errors: [{ message: "must be false", path: [] }]
    });
  });

  test("does not produce an error for valid values", async () => {
    expect(await refute(Boolean)(false)).toEqual({ value: false });
  });

  test("does not run the assertion against `undefined`", async () => {
    const predicate = jest.fn();
    expect(await refute(Boolean)(undefined)).toEqual({ value: undefined });
    expect(predicate).not.toHaveBeenCalled();
  });
});
