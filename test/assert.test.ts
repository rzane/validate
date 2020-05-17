import { assert, refute, Predicate } from "../src";

const predicate: Predicate = () => true;

test("assert", () => {
  const assertion = assert(predicate);
  expect(assertion.message).toEqual("is invalid");
  expect(assertion.predicate(1)).toEqual(true);
});

test("assert with a custom message", () => {
  const assertion = assert(predicate, "bad");
  expect(assertion.message).toEqual("bad");
  expect(assertion.predicate(1)).toEqual(true);
});

test("refute", () => {
  const assertion = refute(predicate);
  expect(assertion.message).toEqual("is invalid");
  expect(assertion.predicate(1)).toEqual(false);
});

test("refute with a custom message", () => {
  const assertion = refute(predicate, "bad");
  expect(assertion.message).toEqual("bad");
  expect(assertion.predicate(1)).toEqual(false);
});
