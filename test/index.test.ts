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
    "isSet",
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
    "tupleOf",
    "when"
  ]);
});
