import { cast, isNumber, map, assert } from "../src";

describe("map", () => {
  test("is chainable", async () => {
    const schema = map(assert(isNumber))
      .then(cast(v => v + 1))
      .then(cast(v => v + 1));

    expect(await schema.validate(1)).toEqual({
      valid: true,
      value: 3
    });
  });
});
