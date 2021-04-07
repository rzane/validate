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
    "isDate",
    "isMap",
    "isNil",
    "isNull",
    "isNumber",
    "isObject",
    "isString",
    "isUndefined",
    "map",
    "maybe",
    "nullable",
    "oneOf",
    "optional",
    "pass",
    "refute",
    "schema",
    "when"
  ]);
});
