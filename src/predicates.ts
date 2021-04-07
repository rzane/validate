export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

export const isMap = (value: unknown): value is Map<unknown, unknown> => {
  return value instanceof Map;
};

export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
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

export const isBlank = (value: string) => {
  return value.trim() === "";
};

export function oneOf<T>(values: T[] | Record<string | number, T>) {
  const allowed = Object.values(values);

  return (value: unknown): value is T => {
    return allowed.includes(value as any);
  };
}
