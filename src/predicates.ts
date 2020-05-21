const negatePredicate = <T>(fn: (value: T) => boolean) => {
  return (value: T): boolean => !fn(value);
};

const negateGuard = <S>(fn: (value: unknown) => value is S) => {
  return <T>(value: T | S): value is T => !fn(value);
};

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

export const isNotString = negateGuard(isString);
export const isNotNumber = negateGuard(isNumber);
export const isNotBoolean = negateGuard(isBoolean);
export const isNotObject = negateGuard(isObject);
export const isNotArray = negateGuard(isArray);
export const isNotUndefined = negateGuard(isUndefined);
export const isNotNull = negateGuard(isNull);
export const isNotNil = negateGuard(isNil);
export const isNotBlank = negatePredicate(isBlank);
