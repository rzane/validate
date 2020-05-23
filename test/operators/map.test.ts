import { map, Validator } from "../../src";

describe("map", () => {
  const validator = map(Number);

  it("is a validator", () => {
    expect(validator).toBeInstanceOf(Validator);
  });

  it("converts a value to a new value", async () => {
    expect(await validator.validate("1")).toEqual({
      valid: true,
      value: 1
    });
  });
});
