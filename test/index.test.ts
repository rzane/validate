import * as index from "../src";
import * as predicates from "../src/predicates";

test("index", () => {
  expect(Object.keys(index).sort()).toEqual([
    "Validator",
    "assert",
    "each",
    "map",
    "maybe",
    "nullable",
    "optional",
    "refute",
    "schema"
  ]);
});

test("predicates", () => {
  expect(Object.keys(predicates).sort()).toEqual([
    "isArray",
    "isBlank",
    "isBoolean",
    "isGt",
    "isGte",
    "isInteger",
    "isLt",
    "isLte",
    "isNaN",
    "isNil",
    "isNull",
    "isNumber",
    "isObject",
    "isString",
    "isUndefined",
    "not"
  ]);
});
