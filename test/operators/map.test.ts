import { map } from "../../src";

describe("map", () => {
  it("converts a value to a new value", async () => {
    expect(await map(Number).validate("1")).toEqual({
      valid: true,
      value: 1
    });
  });
});
