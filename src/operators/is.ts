import { assert } from "./assert";
import { Guard, Path } from "../types";
import { Validator } from "../Validator";
import {
  isBoolean,
  isDate,
  isMap,
  isNull,
  isNumber,
  isObject,
  isSet,
  isString,
  isUndefined
} from "../predicates";

const PREDICATES = {
  string: isString,
  number: isNumber,
  boolean: isBoolean,
  date: isDate,
  object: isObject,
  array: Array.isArray,
  null: isNull,
  undefined: isUndefined,
  map: isMap,
  set: isSet
};

type Predicates = typeof PREDICATES;
type Types = {
  [K in keyof Predicates]: Predicates[K] extends Guard<any, infer V>
    ? V
    : never;
};

export function is<K extends keyof Types>(
  type: K,
  message?: string,
  path?: Path
): Validator<any, Types[K]> {
  return assert(PREDICATES[type], message, path);
}
