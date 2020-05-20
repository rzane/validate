import { cast } from "../../src";

describe("cast", () => {
  it("converts a value to the specified type", async () => {
    expect(await cast(Number)("1")).toEqual({
      valid: true,
      value: 1
    });
  });
});
