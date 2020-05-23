<h1 align="center">@stackup/validate</h1>

<div align="center">

![Build](https://github.com/rzane/validate/workflows/Build/badge.svg)
![Size](https://img.shields.io/bundlephobia/minzip/@stackup/validate)
![Version](https://img.shields.io/npm/v/@stackup/validate)
![License](https://img.shields.io/npm/l/@stackup/validate)

</div>

A set of functional, tree-shakeable, data validation utilities built with bundle size in mind.

This library offers strict TypeScript types, so you can ensure that your validations will enforce your types.

```javascript
import { schema, assert, isString, isNumber } from "@stackup/validate";

const UserSchema = schema({
  name: assert(isString).then(
    refute(name => name.trim() !== "", "Can't be blank")
  ),
  age: assert(isNumber).then(
    assert(age => age >= 18, "Must be 18 or older to join)
  ),
});
```

## Installation

Install the package from NPM:

    $ yarn add @stackup/validate
