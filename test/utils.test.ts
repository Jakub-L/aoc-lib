import { deepEqual } from "../src/utils/deep-equal";

describe("deepEqual", () => {
  describe("compares primitives of the same type", () => {
    it("returns true for equal numbers", () => {
      expect(deepEqual(1, 1)).toBe(true);
    });
    it("returns false for unequal numbers", () => {
      expect(deepEqual(1, 2)).toBe(false);
    });
    it("returns true for integer equal to float", () => {
      expect(deepEqual(1, 1.0)).toBe(true);
    });
    it("returns true for equal strings", () => {
      expect(deepEqual("a", "a")).toBe(true);
    });
    it("returns false for unequal strings", () => {
      expect(deepEqual("a", "b")).toBe(false);
    });
    it("returns true for equal booleans", () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });
    it("returns false for unequal booleans", () => {
      expect(deepEqual(true, false)).toBe(false);
      expect(deepEqual(false, true)).toBe(false);
    });
    it("returns true for two nulls", () => {
      expect(deepEqual(null, null)).toBe(true);
    });
    it("returns false for null and undefined", () => {
      expect(deepEqual(null, undefined)).toBe(false);
    });
    it("returns true for two NaNs", () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
    });
    it("returns true for two Infinity", () => {
      expect(deepEqual(Infinity, Infinity)).toBe(true);
    });
    it("returns false for Inifity and -Infinity", () => {
      expect(deepEqual(Infinity, -Infinity)).toBe(false);
    });
    it("returns true for 0 and -0", () => {
      expect(deepEqual(0, -0)).toBe(true);
    });
    it("returns false for two symbols", () => {
      expect(deepEqual(Symbol("a"), Symbol("a"))).toBe(false);
      expect(deepEqual(Symbol("a"), Symbol("b"))).toBe(false);
    });
    it("returns true for two equal BigInts", () => {
      expect(deepEqual(BigInt(1), BigInt(1))).toBe(true);
    });
    it("returns false for two unequal BigInts", () => {
      expect(deepEqual(BigInt(1), BigInt(2))).toBe(false);
    });
    it("returns false for BigInt and number of the same value", () => {
      expect(deepEqual(BigInt(1), 1)).toBe(false);
    });
  });
  describe("does not coerce falsy values", () => {
    it("returns false for null and undefined", () => {
      expect(deepEqual(null, undefined)).toBe(false);
    });
    it("returns false for null and false", () => {
      expect(deepEqual(null, false)).toBe(false);
    });
    it("returns false for null and NaN", () => {
      expect(deepEqual(null, NaN)).toBe(false);
    });
    it("returns false for null and empty string", () => {
      expect(deepEqual(null, "")).toBe(false);
    });
    it("returns false for null and 0, -0 and BigInt(0)", () => {
      expect(deepEqual(null, 0)).toBe(false);
      expect(deepEqual(null, -0)).toBe(false);
      expect(deepEqual(null, BigInt(0))).toBe(false);
    });
    it("returns false for undefined and false", () => {
      expect(deepEqual(undefined, false)).toBe(false);
    });
    it("returns false for undefined and NaN", () => {
      expect(deepEqual(undefined, NaN)).toBe(false);
    });
    it("returns false for undefined and empty string", () => {
      expect(deepEqual(undefined, "")).toBe(false);
    });
    it("returns false for undefined and 0, -0 and BigInt(0)", () => {
      expect(deepEqual(undefined, 0)).toBe(false);
      expect(deepEqual(undefined, -0)).toBe(false);
      expect(deepEqual(undefined, BigInt(0))).toBe(false);
    });
    it("returns false for false and NaN", () => {
      expect(deepEqual(false, NaN)).toBe(false);
    });
    it("returns false for false and empty string", () => {
      expect(deepEqual(false, "")).toBe(false);
    });
    it("returns false for false and 0, -0 and BigInt(0)", () => {
      expect(deepEqual(false, 0)).toBe(false);
      expect(deepEqual(false, -0)).toBe(false);
      expect(deepEqual(false, BigInt(0))).toBe(false);
    });
    it("returns false for NaN and empty string", () => {
      expect(deepEqual(NaN, "")).toBe(false);
    });
    it("returns false for NaN and 0, -0 and BigInt(0)", () => {
      expect(deepEqual(NaN, 0)).toBe(false);
      expect(deepEqual(NaN, -0)).toBe(false);
      expect(deepEqual(NaN, BigInt(0))).toBe(false);
    });
    it("returns false for empty string and 0, -0 and BigInt(0)", () => {
      expect(deepEqual("", 0)).toBe(false);
      expect(deepEqual("", -0)).toBe(false);
      expect(deepEqual("", BigInt(0))).toBe(false);
    });
  });
  describe("compares objects", () => {
    it("returns true for two empty objects", () => {
      expect(deepEqual({}, {})).toBe(true);
    });
    it("returns true for objects with same keys and values", () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });
    it("returns true for objects with same keys and values in different order", () => {
      expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });
    it("returns false if one object has extra keys", () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
    });
    it("returns false with unequal key values", () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });
    it("returns false with different keys", () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
    });
    it("returns true for two equal nested objects", () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    });
    it("returns false for nested objects with different nested values", () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    });
    it("returns false for nested objects with different nested keys", () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { c: 1 } })).toBe(false);
    });
    it("returns false for empty object and empty array", () => {
      expect(deepEqual({}, [])).toBe(false);
    });
    it("returns false for empty object and null", () => {
      expect(deepEqual({}, null)).toBe(false);
    });
    it("returns false for empty object and undefined", () => {
      expect(deepEqual({}, undefined)).toBe(false);
    });
    it("returns false for objects with extra undefined properties", () => {
      expect(deepEqual({ a: 1, b: undefined }, { a: 1 })).toBe(false);
    });
    it("returns true for objects with custom toString methods that return the same value", () => {
      expect(deepEqual({ toString: () => "a" }, { toString: () => "a" })).toBe(true);
    });
    it("returns false for objects with custom toString methods that return differnt values", () => {
      expect(deepEqual({ toString: () => "a" }, { toString: () => "b" })).toBe(false);
    });
  });
  describe("compares arrays", () => {
    it("returns true for two empty arrays", () => {
      expect(deepEqual([], [])).toBe(true);
    });
    it("returns true for equal arrays", () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });
    it("returns false for arrays with different values", () => {
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });
    it("returns false for arrays of different length", () => {
      expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    });
    it("returns false for arrays with same elements in different order", () => {
      expect(deepEqual([1, 2, 3], [1, 3, 2])).toBe(false);
    });
    it("returns true for equal arrays of objects", () => {
      expect(deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    });
    it("returns true for arrays of objects with keys in different order", () => {
      expect(deepEqual([{ a: 1, b: 2 }], [{ b: 2, a: 1 }])).toBe(true);
    });
    it("returns false for arrays of objects with different values", () => {
      expect(deepEqual([{ a: 1, b: 2 }], [{ a: 1, b: 3 }])).toBe(false);
    });
    it("returns false for arrays of objects with different keys", () => {
      expect(deepEqual([{ a: 1, b: 2 }], [{ a: 1, c: 2 }])).toBe(false);
    });
    it("returns false for array and array-like objects", () => {
      expect(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3, length: 3 })).toBe(false);
    });
    it("returns false for array and empty object", () => {
      expect(deepEqual([], {})).toBe(false);
    });
    it("returns false for array and null", () => {
      expect(deepEqual([], null)).toBe(false);
    });
    it("returns false for array and undefined", () => {
      expect(deepEqual([], undefined)).toBe(false);
    });
  });
  describe("compares Dates", () => {
    it("returns true for equal dates from strings", () => {
      expect(deepEqual(new Date("2020-01-01"), new Date("2020-01-01"))).toBe(true);
    });
    it("returns true for equal dates from description", () => {
      expect(deepEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true);
    });
    it("returns true for equal dates from different constructors", () => {
      expect(deepEqual(new Date("2020-01-01"), new Date(2020, 0, 1))).toBe(true);
    });
    it("returns false for unequal dates", () => {
      expect(deepEqual(new Date("2020-01-01"), new Date("2020-01-02"))).toBe(false);
    });
    it("returns false for date and date-time string", () => {
      expect(deepEqual(new Date("2020-01-01"), "2020-01-01T00:00:00.000Z")).toBe(false);
    });
    it("returns false for date and empty object", () => {
      expect(deepEqual(new Date("2020-01-01"), {})).toBe(false);
    });
    it("returns false for date and date-like object", () => {
      expect(deepEqual(new Date("2020-01-01"), { valueOf: () => 1577836800000 })).toBe(false);
    });
  });
  describe("compares RegExps", () => {
    it("returns true for equal regex patterns", () => {
      expect(deepEqual(/a/, /a/)).toBe(true);
    });
    it("returns false for equal regex patterns with different flags", () => {
      expect(deepEqual(/a/, /a/i)).toBe(false);
    });
    it("returns false for unequal regex patterns", () => {
      expect(deepEqual(/a/, /b/)).toBe(false);
    });
    it("returns false for regex and string", () => {
      expect(deepEqual(/a/, "a")).toBe(false);
    });
    it("returns false for regex and empty object", () => {
      expect(deepEqual(/a/, {})).toBe(false);
    });
  });
  describe("compares functions", () => {
    it("returns true for the same function", () => {
      const func = () => {};
      expect(deepEqual(func, func)).toBe(true);
    });
    it("returns false for two different functions with the same return", () => {
      const funcA = () => 1;
      const funcB = () => 1;
      expect(deepEqual(funcA, funcB)).toBe(false);
    });
  });
  describe("compares Maps", () => {
  });
  describe("compares Sets", () => {});
});
