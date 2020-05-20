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

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isNonNullable = <T>(value: T | undefined | null): value is T => {
  return !isUndefined(value) && !isNull(value);
};

export const isBlank = (value: string): boolean => {
  return value.trim() === "";
};
