import { cast } from "../src/cast";

describe("cast", () => {
  it("converts a value to the specified type", async () => {
    expect(await cast(Number)("1")).toEqual({ value: 1 });
  });
});
