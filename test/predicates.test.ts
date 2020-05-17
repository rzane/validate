import { isUndefined, isNull, isNil, isString, isBlank } from "../src";

test("isUndefined", () => {
  expect(isUndefined("")).toBe(false);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(undefined)).toBe(true);
});

test("isNull", () => {
  expect(isNull("")).toBe(false);
  expect(isNull(undefined)).toBe(false);
  expect(isNull(null)).toBe(true);
});

test("isNil", () => {
  expect(isNil("")).toBe(false);
  expect(isNil(undefined)).toBe(true);
  expect(isNil(null)).toBe(true);
});

test("isString", () => {
  expect(isString(null)).toBe(false);
  expect(isString(undefined)).toBe(false);
  expect(isString("")).toBe(true);
});

test("isBlank", () => {
  expect(isBlank("")).toEqual(true);
  expect(isBlank("  ")).toEqual(true);
  expect(isBlank(" \n ")).toEqual(true);
  expect(isBlank(" \r ")).toEqual(true);
  expect(isBlank("a")).toEqual(false);
});
