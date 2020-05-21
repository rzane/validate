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
    "isBlank",
    "isBoolean",
    "isNil",
    "isNull",
    "isNumber",
    "isObject",
    "isPresent",
    "isString",
    "isUndefined"
  ]);
});
