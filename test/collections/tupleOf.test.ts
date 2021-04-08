import {
  Validator,
  assert,
  isBoolean,
  isNumber,
  isString,
  map,
  tupleOf
} from "../../src";

describe("tupleOf", () => {
  const validator = tupleOf(
    assert(isNumber).then(map(v => v * 2)),
    assert(isString).then(assert(v => v.length >= 3, "Too short")),
    assert(isBoolean)
  );

  it("is a validator", () => {
    expect(validator).toBeInstanceOf(Validator);
  });

  it("produces a value when successful", async () => {
    expect(await validator.validate([1, "foo", true])).toEqual({
      valid: true,
      value: [2, "foo", true]
    });
  });

  it("produces an error when it fails", async () => {
    expect(await validator.validate([1, "f", true])).toEqual({
      valid: false,
      errors: [{ message: "Too short", path: [1] }]
    });
  });
});
