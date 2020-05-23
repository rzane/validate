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

### `when(predicate, validator)`

Runs the given validator when the predicate is truthy.

```javascript
when(isString, refute(isBlank));
```

#### `each(validator)`

Runs the given validator against each item in an array.

```javascript
each(assert(isString));
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

A validator has two methods:

- **`validate(input)`** - Runs the validator against user input.
- **`then(validator)`** - Adds another validator to the chain.

## Predicates

A predicate is a function that takes a value and returns true or false. Predicate
functions can be passed to `assert` and `refute`.

- **`isString(value)`** - Checks if the value is a string
- **`isNumber(value)`** - Checks if the value is a number
- **`isObject(value)`** - Checks if the value is an object
- **`isBoolean(value)`** - Checks if the value is boolean
- **`isUndefined(value)`** - Checks if the value is `undefined`
- **`isNull(value)`** - Checks if the value is `null`
- **`isNil(value)`** - Checks if the value is `null` or `undefined`
- **`isBlank(value)`** - Checks if a string is blank.

This library only includes the most essential predicate functions, because you can find thousands of predicate functions in the NPM ecosystem. Here are a few examples:

- [`lodash`](https://lodash.com/)
- [`ramda`](https://ramdajs.com/)
- [`is-email`](https://github.com/segmentio/is-email)
- [`is-url`](https://github.com/segmentio/is-url)

You can also write your own predicates:

```javascript
const isBlank = value => {
  return value.trim() === "";
};
```

## TypeScript

This library assumes that all input is `unknown` by default. You'll need to manually check the value with a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).

For example:

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
