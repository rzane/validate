import {
  isBoolean,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  isBlank
} from "../src";

test("isString", () => {
  expect(isString("")).toEqual(true);
});

test("isNumber", () => {
  expect(isNumber(0)).toEqual(true);
});

test("isBoolean", () => {
  expect(isBoolean(true)).toEqual(true);
  expect(isBoolean(false)).toEqual(true);
});

test("isObject", () => {
  class Foo {}

  expect(isObject({})).toEqual(true);
  expect(isObject(new Foo())).toEqual(true);
});

test("isUndefined", () => {
  expect(isUndefined(undefined)).toEqual(true);
});

test("isNull", () => {
  expect(isNull(null)).toEqual(true);
});

test("isNil", () => {
  expect(isNil(null)).toEqual(true);
  expect(isNil(undefined)).toEqual(true);
});

test("isBlank", () => {
  expect(isBlank("")).toEqual(true);
  expect(isBlank(" ")).toEqual(true);
  expect(isBlank(" \n")).toEqual(true);
  expect(isBlank(" a ")).toEqual(false);
});
