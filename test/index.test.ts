import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "assert",
    "cast",
    "isBlank",
    "isNil",
    "isNull",
    "isString",
    "isUndefined",
    "refute",
    "required"
  ]);
});
