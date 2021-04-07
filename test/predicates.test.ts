import {
  isBoolean,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  isBlank,
  oneOf,
  isDate,
  isMap,
  isSet
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

test("isMap", () => {
  expect(isMap(new Map())).toBe(true);
  expect(isMap({})).toBe(false);
  expect(isMap([])).toBe(false);
});

test("isSet", () => {
  expect(isSet(new Set())).toBe(true);
  expect(isSet({})).toBe(false);
  expect(isSet([])).toBe(false);
});

test("isDate", () => {
  expect(isDate(new Date())).toBe(true);
  expect(isDate(undefined)).toBe(false);
  expect(isDate(null)).toBe(false);
  expect(isDate(100)).toBe(false);
  expect(isDate("crap")).toBe(false);
  expect(isDate(new Date("2021-04-39"))).toBe(false);
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

describe("oneOf", () => {
  test("array", () => {
    const fn = oneOf([1, 2]);
    expect(fn(1)).toBe(true);
    expect(fn(2)).toBe(true);
    expect(fn(3)).toBe(false);
  });

  test("object", () => {
    const fn = oneOf({ a: 1, b: 2 });
    expect(fn(1)).toBe(true);
    expect(fn(2)).toBe(true);
    expect(fn(3)).toBe(false);
  });

  test("enum", () => {
    enum Values {
      A
    }

    const fn = oneOf(Values);
    expect(fn(Values.A)).toBe(true);
    expect(fn(0)).toBe(true);
    expect(fn("Other")).toBe(false);
  });

  test("string enum", () => {
    enum Values {
      A = "A"
    }

    const fn = oneOf(Values);
    expect(fn(Values.A)).toBe(true);
    expect(fn("A")).toBe(true);
    expect(fn("Other")).toBe(false);
  });
});
