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
import { schema, assert, isString, isNumber } from "@stackup/validate";

const isBlank = value => value.trim() === "";
const isGte = min => value => value >= min;

const userSchema = schema({
  name: assert(isString).then(refute(isBlank, "Can't be blank")),
  age: assert(isNumber).then(assert(isGte(18), "Must be 18 or older to join"))
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
