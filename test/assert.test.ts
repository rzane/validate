import { assert, refute, Predicate, all, each, shape, isString } from "../src";

const isTrue: Predicate = (value) => value;

describe("assert", () => {
  test("when the predicate passes", async () => {
    const validate = assert(isTrue);
    const error = await validate(true);
    expect(error).toBeUndefined();
  });

  test("when the predicate fails", async () => {
    const validate = assert(isTrue);
    const error = await validate(false);
    expect(error).toEqual("is invalid");
  });

  test("when the predicate fails with a custom message", async () => {
    const validate = assert(isTrue, "blah");
    const error = await validate(false);
    expect(error).toEqual("blah");
  });
});

describe("refute", () => {
  test("when the predicate passes", async () => {
    const validate = refute(isTrue);
    const error = await validate(false);
    expect(error).toBeUndefined();
  });

  test("when the predicate fails", async () => {
    const validate = refute(isTrue);
    const error = await validate(true);
    expect(error).toEqual("is invalid");
  });

  test("when the predicate fails with a custom message", async () => {
    const validate = refute(isTrue, "blah");
    const error = await validate(true);
    expect(error).toEqual("blah");
  });
});

describe("all", () => {
  test("when all of the assertions passes", async () => {
    const validate = all([assert(isTrue)]);
    const error = await validate(true);
    expect(error).toBeUndefined();
  });

  test("when one of the assertions fails", async () => {
    const validate = all([assert(isTrue)]);
    const error = await validate(false);
    expect(error).toEqual("is invalid");
  });

  test("does not run the second assertion if the first fails", async () => {
    const first = jest.fn(() => Promise.resolve("boom"));
    const second = jest.fn();
    const assertion = all([first, second]);
    const error = await assertion(true);

    expect(error).toEqual("boom");
    expect(second).not.toHaveBeenCalled();
  });
});

describe("each", () => {
  const validate = each(assert(isTrue));

  test("when all of the assertions pass", async () => {
    const errors = await validate([true, true]);
    expect(errors).toEqual(undefined);
  });

  test("when some of the assertions fail", async () => {
    const errors = await validate([true, false]);
    expect(errors).toEqual([undefined, "is invalid"]);
  });
});

describe("shape", () => {
  const validate = shape({
    name: assert(isString),
    age: assert((value) => value >= 18, "must be 18 or older"),
  });

  test("when all of the assertions pass", async () => {
    const errors = await validate({ name: "Rick", age: 18 });
    expect(errors).toBeUndefined();
  });

  test("when some of the assertions fail", async () => {
    const errors = await validate({ name: "Rick", age: 1 });
    expect(errors).toEqual({ age: "must be 18 or older" });
  });
});
