import { defaultTo, Validator } from "../../src";

describe("defaultTo", () => {
  const validator = defaultTo<string | undefined, string>("hello");

  it("is a validator", () => {
    expect(validator).toBeInstanceOf(Validator);
  });

  it("replaces an `undefined` value", async () => {
    expect(await validator.validate(undefined)).toEqual({
      valid: true,
      value: "hello"
    });
  });

  it("replaces an `null` value", async () => {
    expect(await validator.validate(null)).toEqual({
      valid: true,
      value: "hello"
    });
  });

  it("does not replace an existing value", async () => {
    expect(await validator.validate("yo")).toEqual({
      valid: true,
      value: "yo"
    });
  });
});
