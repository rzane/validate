import { required } from "../../src";

describe("required", () => {
  test("produces an error for `undefined`", async () => {
    expect(await required()(undefined)).toEqual({
      valid: false,
      errors: [{ message: "This field can't be blank", path: [] }]
    });
  });

  test("produces an error for `null`", async () => {
    expect(await required()(null)).toEqual({
      valid: false,
      errors: [{ message: "This field can't be blank", path: [] }]
    });
  });

  test("produces an error for a blank string", async () => {
    expect(await required()(" ")).toEqual({
      valid: false,
      errors: [{ message: "This field can't be blank", path: [] }]
    });
  });

  test("accepts a custom error message", async () => {
    expect(await required("boom")(" ")).toEqual({
      valid: false,
      errors: [{ message: "boom", path: [] }]
    });
  });
});
