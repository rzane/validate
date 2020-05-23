<h1 align="center">@stackup/validate</h1>

<div align="center">

![Build](https://github.com/rzane/validate/workflows/Build/badge.svg)
![Size](https://img.shields.io/bundlephobia/minzip/@stackup/validate)
![Version](https://img.shields.io/npm/v/@stackup/validate)
![License](https://img.shields.io/npm/l/@stackup/validate)

</div>

A functional schema validation library.

- **Lightweight** - My data validation library shouldn't be bigger than React.
- **Tree-shakeable** - I don't want to take a hit for functionality that I'm not using.
- **Composable** - I want to validate my data with tiny, single-purpose functions.
- **Type-safe** - I want my validations to enforce my TypeScript types.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Example](#example)
- [Installation](#installation)
- [Operators](#operators)
    - [`schema(shape)`](#schemashape)
    - [`assert(predicate, message?)`](#assertpredicate-message)
    - [`refute(predicate, message?)`](#refutepredicate-message)
    - [`map(transform)`](#maptransform)
    - [`optional(validator)`](#optionalvalidator)
    - [`nullable(validator)`](#nullablevalidator)
    - [`maybe(validator)`](#maybevalidator)
    - [`when(predicate, validator)`](#whenpredicate-validator)
    - [`each(validator)`](#eachvalidator)
  - [`defaultTo(value)`](#defaulttovalue)
- [Validator](#validator)
    - [`validate(input)`](#validateinput)
    - [`then(validator)`](#thenvalidator)
- [Predicates](#predicates)
    - [`isString(value)`](#isstringvalue)
    - [`isNumber(value)`](#isnumbervalue)
    - [`isObject(value)`](#isobjectvalue)
    - [`isBoolean(value)`](#isbooleanvalue)
    - [`isUndefined(value)`](#isundefinedvalue)
    - [`isNull(value)`](#isnullvalue)
    - [`isNil(value)`](#isnilvalue)
    - [`isBlank(value)`](#isblankvalue)
- [TypeScript](#typescript)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Example

```javascript
import { schema, assert, isString, isBlank, isNumber } from "@stackup/validate";

const userSchema = schema({
  name: assert(isString).then(refute(isBlank, "Can't be blank")),
  age: assert(isNumber).then(assert(age => age >= 18, "Must be 18 or older"))
});

const result = await userSchema.validate(data);

if (result.valid) {
  console.log(result.value);
} else {
  console.log(result.errors);
}
```

## Installation

Install the package from NPM:

    $ yarn add @stackup/validate

## Operators

An operator is a function that returns a new [`Validator`](#validator). You can chain
together multiple operators with `then`:

```javascript
assert(isString)
  .then(refute(isBlank))
  .then(map(value => value.trim()))
  .validate("hello!")
  .then(result => {
    if (result.valid) {
      console.log(result.value);
    } else {
      console.log(result.errors);
    }
  });
```

#### `schema(shape)`

Describes an object's properties.

```javascript
schema({
  name: assert(isString),
  age: assert(isNumber)
});
```

#### `assert(predicate, message?)`

Produces an error if a condition is not met.

```javascript
assert(isString, "must be a string");
```

#### `refute(predicate, message?)`

Produces an error if a condition is met.

```javascript
refute(isBlank, "can't be blank");
```

#### `map(transform)`

Transforms the current value to a new value.

```javascript
map(value => value.trim());
```

#### `optional(validator)`

Runs the given validator unless the value is `undefined`.

```javascript
optional(assert(isString));
```

#### `nullable(validator)`

Runs the given validator unless the value is `null`.

```javascript
nullable(assert(isString));
```

#### `maybe(validator)`

Runs the given validator unless the value is either `null` or `undefined`.

```javascript
maybe(assert(isString));
```

#### `when(predicate, validator)`

Runs the given validator when the predicate is truthy.

```javascript
when(isString, refute(isBlank));
```

#### `each(validator)`

Runs the given validator against each item in an array.

```javascript
each(assert(isString));
```

### `defaultTo(value)`

Provide a default value to replace `null` or `undefined` values.

```javascript
defaultTo(0);
```

## Validator

A `Validator` represents a step in the validation sequence. You probably won't
create a validator directly, but you certainly could:

```javascript
const blankValidator = new Validator(input => {
  if (isBlank(value)) {
    return Validator.reject("can't be blank");
  } else {
    return Validator.resolve(value);
  }
});
```

#### `validate(input)`

Runs the validator against user input. This function returns a Promise.

```javascript
const result = await validator.validate(data);

if (result.valid) {
  console.log(result.value);
} else {
  console.log(result.errors);
}
```

#### `then(validator)`

Adds another validator to the current validation chain. This method returns an entirely new validator.

```javascript
validator.then(refute(isBlank));
```

## Predicates

A predicate is a function that takes a value and returns true or false.

```javascript
const isBlank = value => {
  return value.trim() === "";
};
```

This library only includes the most essential predicate functions, because you
can find thousands of predicate functions in the NPM ecosystem. Here are a few examples:

- [`lodash`](https://lodash.com/)
- [`ramda`](https://ramdajs.com/)
- [`is-email`](https://github.com/segmentio/is-email)
- [`is-url`](https://github.com/segmentio/is-url)

#### `isString(value)`

Checks if the value is a string.

#### `isNumber(value)`

Checks if the value is a number.

#### `isObject(value)`

Checks if the value is an object.

#### `isBoolean(value)`

Checks if the value is boolean.

#### `isUndefined(value)`

Checks if the value is `undefined`.

#### `isNull(value)`

Checks if the value is `null`.

#### `isNil(value)`

Checks if the value is `null` or `undefined`.

#### `isBlank(value)`

Checks if a string is blank.

## TypeScript

This library assumes that all input is `unknown` by default. You'll need to manually check the value with a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).

Here's an example:

```typescript
interface Values {
  a: number;
  b: number;
}

schema<Values>({
  // This works:
  a: assert(isNumber).then(assert(Number.isInteger)),

  // This will error:
  //   'unknown' is not assignable to type 'number'
  b: assert(Number.isInteger)
});
```

Here's an example of a custom type guard:

```typescript
const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === "string" || typeof value === "number";
};
```
