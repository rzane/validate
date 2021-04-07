import { assert } from "./assert";
import { Guard, Path } from "../types";
import { Validator } from "../Validator";
import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined
} from "../predicates";

const PREDICATES = {
  string: isString,
  number: isNumber,
  boolean: isBoolean,
  object: isObject,
  array: Array.isArray,
  null: isNull,
  undefined: isUndefined
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
