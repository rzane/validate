import { assert } from "../src/assert";

describe("assert", () => {
  it("produces an error for invalid values", async () => {
    expect(await assert(Boolean)(false)).toEqual({
      value: false,
      errors: [{ message: "is invalid", path: [] }]
    });
  });

  it("accepts a custom message", async () => {
    expect(await assert(Boolean, "must be true")(false)).toEqual({
      value: false,
      errors: [{ message: "must be true", path: [] }]
    });
  });

  it("does not produce an error for valid values", async () => {
    expect(await assert(Boolean)(true)).toEqual({ value: true });
  });

  it("does not run the assertion against `undefined`", async () => {
    const predicate = jest.fn();
    expect(await assert(Boolean)(undefined)).toEqual({ value: undefined });
    expect(predicate).not.toHaveBeenCalled();
  });
});
