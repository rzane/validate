import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "all",
    "assert",
    "each",
    "isBlank",
    "isNil",
    "isNull",
    "isPromise",
    "isString",
    "isUndefined",
    "refute",
    "shape",
  ]);
});
