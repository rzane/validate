import { nullable, map, Validator } from "../../src";

describe("nullable", () => {
  const validator = nullable<number, number>(map(v => v * 2));

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
});
