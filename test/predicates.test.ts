import { isString, not } from "../src/predicates";

test("isString", () => {
  expect(isString("")).toBe(true);
});

test("not", () => {
  expect(not(isString)(1)).toBe(true);
});
