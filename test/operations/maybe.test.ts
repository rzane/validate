import { maybe, map, Validator } from "./../../src";

describe("maybe", () => {
  const validator = maybe<number, number>(map(v => v * 2));

  it("is a validator", () => {
    expect(validator).toBeInstanceOf(Validator);
  });

  test("runs the validator against other values", async () => {
    expect(await validator.validate(1)).toEqual({
      valid: true,
      value: 2
    });
  });

  test("does not run the validator against `null` values", async () => {
    expect(await validator.validate(null)).toEqual({
      valid: true,
      value: null
    });
  });

  test("does not run the validator against `undefined` values", async () => {
    expect(await validator.validate(undefined)).toEqual({
      valid: true,
      value: undefined
    });
  });
});
