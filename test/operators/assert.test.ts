import { assert, Validator } from "../../src";

describe("assert", () => {
  it("is a validator", () => {
    expect(assert(Boolean)).toBeInstanceOf(Validator);
  });

  it("produces an error for invalid values", async () => {
    expect(await assert(Boolean).validate(false)).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: [] }]
    });
  });

  it("accepts a custom message", async () => {
    expect(await assert(Boolean, "must be true").validate(false)).toEqual({
      valid: false,
      errors: [{ message: "must be true", path: [] }]
    });
  });

  it("does not produce an error for valid values", async () => {
    expect(await assert(Boolean).validate(true)).toEqual({
      valid: true,
      value: true
    });
  });
});
