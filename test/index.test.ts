import * as index from "../src";

test("index", () => {
  expect(Object.keys(index).sort()).toEqual([
    "SchemaValidator",
    "Validator",
    "assert",
    "defaultTo",
    "each",
    "isBlank",
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
    "pass",
    "refute",
    "schema",
    "when"
  ]);
});
