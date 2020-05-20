import * as validate from "../src";

test("exports", () => {
  expect(Object.keys(validate).sort()).toEqual([
    "assert",
    "cast",
    "each",
    "map",
    "refute",
    "required",
    "schema"
  ]);
});
