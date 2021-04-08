import { setOf, assert, isNumber, map } from "../../src";

describe("setOf", () => {
  const validator = setOf(assert(isNumber).then(map(v => v * 2)));

  it("produces a value for valid values", async () => {
    expect(await validator.validate(new Set([2, 3]))).toEqual({
      valid: true,
      value: new Set([4, 6])
    });
  });

  it("produces errors for invalid values", async () => {
    expect(await validator.validate(new Set([1, ""]))).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: [1] }]
    });
  });

  it("produces an error when not given a set", async () => {
    expect(await validator.validate(1 as any)).toEqual({
      valid: false,
      errors: [{ message: "Must be a set", path: [] }]
    });
  });
});
