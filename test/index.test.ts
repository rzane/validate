import * as index from "../src";

test("index", () => {
  expect(Object.keys(index).sort()).toEqual([
    "SchemaValidator",
    "Validator",
    "arrayOf",
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
    "mapOf",
    "maybe",
    "nullable",
    "objectOf",
    "oneOf",
    "optional",
    "pass",
    "refute",
    "schema",
    "setOf",
    "tupleOf",
    "when"
  ]);
});
