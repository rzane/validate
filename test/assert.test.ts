import { assert, refute, Predicate, all, each } from "../src";

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

describe("all", () => {
  test("when all of the assertions passes", async () => {
    const assertion = all([assert(isTrue)]);
    const error = await assertion(true);
    expect(error).toBeUndefined();
  });

  test("when one of the assertions fails", async () => {
    const assertion = all([assert(isTrue)]);
    const error = await assertion(false);
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
  test("when all of the assertions pass", async () => {
    const assertion = each(assert(isTrue));
    const errors = await assertion([true, true]);
    expect(errors).toEqual([undefined, undefined]);
  });

  test("when some of the assertions fail", async () => {
    const assertion = each(assert(isTrue));
    const errors = await assertion([true, false]);
    expect(errors).toEqual([undefined, "is invalid"]);
  });
});
