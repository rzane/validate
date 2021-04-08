import { mapOf, assert, isNumber, map, isString } from "../../src";

describe("mapOf", () => {
  const validator = mapOf(
    assert(isString),
    assert(isNumber).then(map(v => v * 2))
  );

  it("produces a value for valid values", async () => {
    const input = new Map([
      ["a", 2],
      ["b", 3]
    ]);

    const output = new Map([
      ["a", 4],
      ["b", 6]
    ]);

    expect(await validator.validate(input)).toEqual({
      valid: true,
      value: output
    });
  });

  it("produces errors for invalid values", async () => {
    const input = new Map<string, any>([
      ["a", 1],
      ["b", ""]
    ]);

    expect(await validator.validate(input)).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: [1, 1] }]
    });
  });

  it("produces errors for invalid keys", async () => {
    const input = new Map<any, number>([
      ["a", 1],
      [1, 2]
    ]);

    expect(await validator.validate(input)).toEqual({
      valid: false,
      errors: [{ message: "This field is invalid", path: [1, 0] }]
    });
  });

  it("produces an error when not given a map", async () => {
    expect(await validator.validate(1 as any)).toEqual({
      valid: false,
      errors: [{ message: "Must be a map", path: [] }]
    });
  });
});
