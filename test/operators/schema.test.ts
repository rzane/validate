import { schema, assert, optional } from "../../src";
import { isNumber, isString } from "../../src/predicates";

const assertAge = (n: number) => {
  return assert<number>(age => age >= n, `Must be ${n} or older`);
};

describe("schema", () => {
  const validator = schema({
    name: assert(isString, "Must be a string"),
    age: optional(assert(isNumber, "Must be a number").then(assertAge(21)))
  });

  it("produces an error when given a non-object", async () => {
    expect(await validator.validate(1)).toEqual({
      valid: false,
      errors: [{ message: "Expected an object", path: [] }]
    });
  });

  it("produces errors when invalid", async () => {
    expect(await validator.validate({ name: null, age: 20 })).toEqual({
      valid: false,
      errors: [
        { message: "Must be a string", path: ["name"] },
        { message: "Must be 21 or older", path: ["age"] }
      ]
    });
  });

  it("produces no errors when valid", async () => {
    const value = { name: "Rick", age: 30 };

    expect(await validator.validate(value)).toEqual({
      valid: true,
      value
    });
  });
});
