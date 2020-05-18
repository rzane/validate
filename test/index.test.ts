import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "isBlank",
    "isNil",
    "isNull",
    "isString",
    "isUndefined",
  ]);
});
