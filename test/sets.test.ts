import {
  intersection,
  union,
  difference,
  symmetricDifference,
  isDisjointFrom,
  isSubsetOf,
  isProperSubsetOf
} from "../src/sets";

describe("union", () => {
  it("returns empty set for two empty sets", () => {
    const A = new Set();
    const B = new Set();
    const result = new Set();
    expect(union(A, B)).toEqual(result);
  });
  it("returns set A for empty set B", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set();
    const result = new Set([1, 2, 3]);
    expect(union(A, B)).toEqual(result);
  });
  it("returns set B for empty set A", () => {
    const A = new Set();
    const B = new Set([1, 2, 3]);
    const result = new Set([1, 2, 3]);
    expect(union(A, B)).toEqual(result);
  });
  it("correctly combines two sets of the same type", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    const result = new Set([1, 2, 3, 4, 5, 6]);
    expect(union(A, B)).toEqual(result);
  });
  it("correctly combines two sets of different types", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set(["a", "b", "c"]);
    const result = new Set([1, 2, 3, "a", "b", "c"]);
    expect(union(A, B)).toEqual(result);
  });
  it("correctly combines two sets sharing some elements", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    const result = new Set([1, 2, 3, 4]);
    expect(union(A, B)).toEqual(result);
  });
  it("is commutative (A ∪ B = B ∪ A)", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    expect(union(A, B)).toEqual(union(B, A));
  });
  it("returns set A if given two copies of set A", () => {
    const A = new Set([1, 2, 3]);
    expect(union(A, A)).toEqual(A);
  });
});
