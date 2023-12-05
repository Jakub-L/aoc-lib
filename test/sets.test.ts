import {
  union,
  difference,
  symmetricDifference,
  intersection,
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
describe("difference", () => {
  it("returns empty set for two empty sets", () => {
    const A = new Set();
    const B = new Set();
    const result = new Set();
    expect(difference(A, B)).toEqual(result);
  });
  it("returns set A for empty set B", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set();
    expect(difference(A, B)).toEqual(A);
  });
  it("returns empty set for empty set A", () => {
    const A = new Set();
    const B = new Set([1, 2, 3]);
    expect(difference(A, B)).toEqual(A);
  });
  it("returns empty set for two equal sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([1, 2, 3]);
    const result = new Set();
    expect(difference(A, B)).toEqual(result);
  });
  it("returns empty set for two copies of the same set", () => {
    const A = new Set([1, 2, 3]);
    const result = new Set();
    expect(difference(A, A)).toEqual(result);
  });
  it("returns set A for disjoint sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    const result = new Set([1, 2, 3]);
    expect(difference(A, B)).toEqual(result);
  });
  it("returns set difference for sets with shared elements", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    const result = new Set([1]);
    expect(difference(A, B)).toEqual(result);
  });
});
describe("symmetricDifference", () => {
  it("returns empty set for two empty sets", () => {
    const A = new Set();
    const B = new Set();
    const result = new Set();
    expect(symmetricDifference(A, B)).toEqual(result);
  });
  it("returns set A for empty set B", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set();
    expect(symmetricDifference(A, B)).toEqual(A);
  });
  it("is commutative", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    expect(symmetricDifference(A, B)).toEqual(symmetricDifference(B, A));
  });
  it("returns empty set for two equal sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([1, 2, 3]);
    const result = new Set();
    expect(symmetricDifference(A, B)).toEqual(result);
  });
  it("returns empty set for two copies of the same set", () => {
    const A = new Set([1, 2, 3]);
    const result = new Set();
    expect(symmetricDifference(A, A)).toEqual(result);
  });
  it("returns union of sets for disjoint sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    const result = new Set([1, 2, 3, 4, 5, 6]);
    expect(symmetricDifference(A, B)).toEqual(result);
  });
  it("returns elements in A and B but not both", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    const result = new Set([1, 4]);
    expect(symmetricDifference(A, B)).toEqual(result);
  });
});
describe("intersection", () => {
  it("returns empty set for two empty sets", () => {
    const A = new Set();
    const B = new Set();
    const result = new Set();
    expect(intersection(A, B)).toEqual(result);
  });
  it("returns empty set for empty set B", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set();
    const result = new Set();
    expect(intersection(A, B)).toEqual(result);
  });
  it("returns empty set for empty set A", () => {
    const A = new Set();
    const B = new Set([1, 2, 3]);
    const result = new Set();
    expect(intersection(A, B)).toEqual(result);
  });
  it("returns set A for two equal sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([1, 2, 3]);
    expect(intersection(A, B)).toEqual(A);
  });
  it("returns set A for two copies of the same set", () => {
    const A = new Set([1, 2, 3]);
    expect(intersection(A, A)).toEqual(A);
  });
  it("returns elements shared by both sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    const result = new Set([2, 3]);
    expect(intersection(A, B)).toEqual(result);
  });
  it("is commutative", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    expect(intersection(A, B)).toEqual(intersection(B, A));
  });
});
describe("isDisjointFrom", () => {
  it("returns true for two empty sets", () => {
    const A = new Set();
    const B = new Set();
    expect(isDisjointFrom(A, B)).toEqual(true);
  });
  it("returns true for empty set B", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set();
    expect(isDisjointFrom(A, B)).toEqual(true);
  });
  it("returns true for empty set A", () => {
    const A = new Set();
    const B = new Set([1, 2, 3]);
    expect(isDisjointFrom(A, B)).toEqual(true);
  });
  it("returns false for two equal sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([1, 2, 3]);
    expect(isDisjointFrom(A, B)).toEqual(false);
  });
  it("returns false for two copies of the same set", () => {
    const A = new Set([1, 2, 3]);
    expect(isDisjointFrom(A, A)).toEqual(false);
  });
  it("returns true for disjoint sets", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([4, 5, 6]);
    expect(isDisjointFrom(A, B)).toEqual(true);
  });
  it("returns false for sets with shared elements", () => {
    const A = new Set([1, 2, 3]);
    const B = new Set([2, 3, 4]);
    expect(isDisjointFrom(A, B)).toEqual(false);
  });
});
xdescribe("isSubsetOf", () => {});
xdescribe("isProperSubsetOf", () => {});
