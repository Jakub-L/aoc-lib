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
    xit("", () => {});
  });
});
