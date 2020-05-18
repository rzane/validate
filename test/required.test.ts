import { required } from "../src/required";

describe("required", () => {
  test("produces an error for `undefined`", () => {
    expect(required()(undefined)).toEqual({
      value: undefined,
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("produces an error for `null`", () => {
    expect(required()(null)).toEqual({
      value: null,
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("produces an error for a blank string", () => {
    expect(required()(" ")).toEqual({
      value: " ",
      errors: [{ message: "can't be blank", path: [] }]
    });
  });

  test("accepts a custom error message", () => {
    expect(required("boom")(" ")).toEqual({
      value: " ",
      errors: [{ message: "boom", path: [] }]
    });
  });
});
