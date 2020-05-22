import { Assert, Refute, Predicate } from "./types";

export function not<T, S extends T>(fn: Assert<T, S>): Refute<T, S>;
export function not<T>(fn: Predicate<T>): Predicate<T>;
export function not(fn: any): any {
  return (...args: any) => !fn(...args);
}

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isObject = (value: unknown): value is object => {
  return value !== null && typeof value === "object";
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isNil = (value: unknown): value is null | undefined => {
  return isNull(value) || isUndefined(value);
};

export const isBlank = (value: string): boolean => {
  return value.trim() === "";
};

export const isInteger = Number.isInteger;
export const isNaN = Number.isNaN;

export const isGt = (n: number) => (v: number) => v > n;
export const isGte = (n: number) => (v: number) => v >= n;
export const isLt = (n: number) => (v: number) => v < n;
export const isLte = (n: number) => (v: number) => v <= n;
