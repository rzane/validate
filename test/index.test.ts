import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "Validator",
    "assert",
    "each",
    "isBlank",
    "isBoolean",
    "isNil",
    "isNull",
    "isNumber",
    "isObject",
    "isPresent",
    "isString",
    "isUndefined",
    "map",
    "maybe",
    "nullable",
    "optional",
    "refute",
    "schema"
  ]);
});
