import { each, assert, isNumber, map } from "../../src";

describe("each", () => {
  const validator = each(assert(isNumber).then(map(v => v * 2)));

  it("produces a value for valid values", async () => {
    expect(await validator.validate([2, 3])).toEqual({
      valid: true,
      value: [4, 6]
    });
  });

  it("produces errors for invalid values", async () => {
    expect(await validator.validate([1, ""])).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: [1] }]
    });
  });

  it("produces an error when not given an array", async () => {
    // @ts-expect-error
    expect(await validator.validate(1)).toEqual({
      valid: false,
      errors: [{ message: "Expected an array", path: [] }]
    });
  });
});
