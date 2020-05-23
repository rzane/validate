import { when, map, isNumber, Validator } from "../src";

describe("when", () => {
  const validator = when(
    isNumber,
    map(v => v * 2)
  );

  it("is a validator", () => {
    expect(validator).toBeInstanceOf(Validator);
  });

  it("runs the validator when the condition is met", async () => {
    expect(await validator.validate(1)).toEqual({
      valid: true,
      value: 2
    });
  });

  it("does not run the validator otherwise", async () => {
    expect(await validator.validate("hello")).toEqual({
      valid: true,
      value: "hello"
    });
  });
});
