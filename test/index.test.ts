import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "assert",
    "isBlank",
    "isNil",
    "isNull",
    "isPromise",
    "isString",
    "isUndefined",
    "refute",
  ]);
});
