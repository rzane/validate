import { objectOf, assert, isNumber, map } from "../../src";

describe("objectOf", () => {
  const validator = objectOf(assert(isNumber).then(map(v => v * 2)));

  it("produces a value for valid values", async () => {
    expect(await validator.validate({ a: 2, b: 3 })).toEqual({
      valid: true,
      value: { a: 4, b: 6 }
    });
  });

  it("produces errors for invalid values", async () => {
    expect(await validator.validate({ a: 1, b: "" })).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: ["b"] }]
    });
  });

  it("produces an error when not given an object", async () => {
    expect(await validator.validate(1 as any)).toEqual({
      valid: false,
      errors: [{ message: "Must be an object", path: [] }]
    });
  });
});
