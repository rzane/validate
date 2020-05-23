import { Validator } from "./../src/Validator";
import { Problem } from "../src/types";

describe("Validator", () => {
  test("validate", () => {
    const validate = jest.fn();
    const validator = new Validator(validate);
    expect(validator.validate).toEqual(validate);
  });

  test("resolve", () => {
    expect(Validator.resolve(1)).toEqual({
      valid: true,
      value: 1
    });
  });

  test("reject (string)", () => {
    expect(Validator.reject("boom")).toEqual({
      valid: false,
      errors: [{ message: "boom", path: [] }]
    });
  });

  test("reject (problems)", () => {
    const problem: Problem = {
      message: "boom",
      path: []
    };

    expect(Validator.reject([problem])).toEqual({
      valid: false,
      errors: [problem]
    });
  });

  describe("then", () => {
    test("returns a new validator", () => {
      const validator = new Validator(jest.fn()).then(new Validator(jest.fn()));
      expect(validator).toBeInstanceOf(Validator);
    });

    test("runs each validation", async () => {
      const a = jest.fn(value => Promise.resolve(Validator.resolve(value * 2)));
      const b = jest.fn(value => Promise.resolve(Validator.resolve(value * 3)));

      const validator = new Validator(a).then(new Validator(b));

      expect(await validator.validate(1)).toEqual({ value: 6, valid: true });
      expect(a).toHaveBeenCalledWith(1);
      expect(b).toHaveBeenCalledWith(2);
    });

    test("stops the chain when a validation fails", async () => {
      const error = Validator.reject("fail");
      const stop = jest.fn(() => Promise.resolve(error));
      const next = jest.fn();

      const validator = new Validator(stop).then(new Validator(next));

      expect(await validator.validate(1)).toEqual(error);
      expect(stop).toHaveBeenCalledWith(1);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
