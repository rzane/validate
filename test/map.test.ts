import { isNumber, map, assert } from "../src";

describe("map", () => {
  test("is chainable", async () => {
    const schema = assert(isNumber)
      .then(map(v => v + 1))
      .then(map(v => v + 1));

    expect(await schema.validate(1)).toEqual({
      valid: true,
      value: 3
    });
  });
});
