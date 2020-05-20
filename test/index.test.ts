import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "assert",
    "cast",
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
    "refute",
    "schema"
  ]);
});
