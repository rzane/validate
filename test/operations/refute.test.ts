import { refute } from "../../src";

describe("refute", () => {
  test("produces an error for invalid values", async () => {
    expect(await refute(Boolean).validate(true)).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid.", path: [] }]
    });
  });

  test("accepts a custom message", async () => {
    expect(await refute(Boolean, "must be false").validate(true)).toEqual({
      valid: false,
      errors: [{ message: "must be false", path: [] }]
    });
  });

  test("does not produce an error for valid values", async () => {
    expect(await refute(Boolean).validate(false)).toEqual({
      valid: true,
      value: false
    });
  });
});
