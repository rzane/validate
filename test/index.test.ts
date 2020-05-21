import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "Validator",
    "assert",
    "each",
    "isBlank",
    "isBoolean",
    "isNonNullable",
    "isNull",
    "isNumber",
    "isObject",
    "isString",
    "isUndefined",
    "map",
    "nullable",
    "optional",
    "refute",
    "schema"
  ]);
});
