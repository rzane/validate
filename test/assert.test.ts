import { assert, refute, Predicate } from "../src";

const isTrue: Predicate = (value) => value;

describe("assert", () => {
  test("when the predicate passes", async () => {
    const assertion = assert(isTrue);
    const error = await assertion(true);
    expect(error).toBeUndefined();
  });

  test("when the predicate fails", async () => {
    const assertion = assert(isTrue);
    const error = await assertion(false);
    expect(error).toEqual("is invalid");
  });

  test("when the predicate fails with a custom message", async () => {
    const assertion = assert(isTrue, "blah");
    const error = await assertion(false);
    expect(error).toEqual("blah");
  });
});

describe("refute", () => {
  test("when the predicate passes", async () => {
    const assertion = refute(isTrue);
    const error = await assertion(false);
    expect(error).toBeUndefined();
  });

  test("when the predicate fails", async () => {
    const assertion = refute(isTrue);
    const error = await assertion(true);
    expect(error).toEqual("is invalid");
  });

  test("when the predicate fails with a custom message", async () => {
    const assertion = refute(isTrue, "blah");
    const error = await assertion(true);
    expect(error).toEqual("blah");
  });
});
