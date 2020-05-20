import * as validate from "../src";
import { isString } from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
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
    "refute",
    "schema"
  ]);
});

validate.schema({
  name: validate.maybe(validate.assert(isString)).then(validate.map(v => v))
});
