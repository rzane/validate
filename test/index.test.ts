import * as index from "../src";

test("index", () => {
  expect(Object.keys(index).sort()).toEqual([
    "Validator",
    "assert",
    "each",
    "isBoolean",
    "isNil",
    "isNull",
    "isNumber",
    "isObject",
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
