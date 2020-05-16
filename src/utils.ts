export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isNil = (value: unknown): value is null | undefined => {
  return isNull(value) || isUndefined(value);
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isBlank = (value: string): boolean => {
  return value.trim() == "";
};
