import { refute, Validator } from "../../src";

describe("refute", () => {
  it("is a validator", () => {
    expect(refute(Boolean)).toBeInstanceOf(Validator);
  });

  it("produces an error for invalid values", async () => {
    expect(await refute(Boolean).validate(true)).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid.", path: [] }]
    });
  });

  it("accepts a custom message", async () => {
    expect(await refute(Boolean, "must be true").validate(true)).toEqual({
      valid: false,
      errors: [{ message: "must be true", path: [] }]
    });
  });

  it("does not produce an error for valid values", async () => {
    expect(await refute(Boolean).validate(false)).toEqual({
      valid: true,
      value: false
    });
  });
});
