import {
  union,
  difference,
  symmetricDifference,
  intersection,
  isDisjointFrom,
  isSubsetOf,
  isProperSubsetOf,
  Counter
} from "../src/collections";

describe("sets", () => {
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
  describe("isSubsetOf", () => {
    it("returns true for two empty sets", () => {
      const A = new Set();
      const B = new Set();
      expect(isSubsetOf(A, B)).toEqual(true);
    });
    it("returns true for empty set as a subset of any set", () => {
      const A = new Set();
      const B = new Set([1, 2, 3]);
      expect(isSubsetOf(A, B)).toEqual(true);
    });
    it("returns true for two equal sets", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([1, 2, 3]);
      expect(isSubsetOf(A, B)).toEqual(true);
    });
    it("returns true for two copies of the same set", () => {
      const A = new Set([1, 2, 3]);
      expect(isSubsetOf(A, A)).toEqual(true);
    });
    it("returns true for subset", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([1, 2, 3, 4]);
      expect(isSubsetOf(A, B)).toEqual(true);
    });
    it("returns false for if A has some, but not all elements in B", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([2, 3, 4]);
      expect(isSubsetOf(A, B)).toEqual(false);
    });
    it("returns false for disjoint sets", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([4, 5, 6]);
      expect(isSubsetOf(A, B)).toEqual(false);
    });
  });
  describe("isProperSubsetOf", () => {
    it("returns false for two empty sets", () => {
      const A = new Set();
      const B = new Set();
      expect(isProperSubsetOf(A, B)).toEqual(false);
    });
    it("returns true for empty set as a subset of any non-empty set", () => {
      const A = new Set();
      const B = new Set([1, 2, 3]);
      expect(isProperSubsetOf(A, B)).toEqual(true);
    });
    it("returns false for two equal sets", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([1, 2, 3]);
      expect(isProperSubsetOf(A, B)).toEqual(false);
    });
    it("returns false for two copies of the same set", () => {
      const A = new Set([1, 2, 3]);
      expect(isProperSubsetOf(A, A)).toEqual(false);
    });
    it("returns true for proper subset", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([1, 2, 3, 4]);
      expect(isProperSubsetOf(A, B)).toEqual(true);
    });
    it("returns false for if A has some, but not all elements in B", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([2, 3, 4]);
      expect(isProperSubsetOf(A, B)).toEqual(false);
    });
    it("returns false for disjoint sets", () => {
      const A = new Set([1, 2, 3]);
      const B = new Set([4, 5, 6]);
      expect(isProperSubsetOf(A, B)).toEqual(false);
    });
  });
});

describe("Counter", () => {
  describe("constructor", () => {
    it("creates an empty counter with no arguments", () => {
      expect(() => new Counter()).not.toThrow();
    });
    it("creates a counter from an array", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.get(1)).toEqual(2);
    });
    it("creates a counter from an object", () => {
      const counter = new Counter({ a: 1, b: 2, c: 3 });
      expect(counter.get("c")).toEqual(3);
    });
    it("creates a counter from another counter", () => {
      const counter1 = new Counter([1, 1, 3]);
      const counter2 = new Counter(counter1);
      expect(counter2.get(1)).toEqual(counter1.get(1));
      expect(counter1).not.toBe(counter2);
    });
  });
  describe("add", () => {
    it("adds an element to the counter if it wasn't present", () => {
      const counter = new Counter();
      counter.add(1);
      expect(counter.get(1)).toEqual(1);
    });
    it("increments the count of an element if it was present", () => {
      const counter = new Counter([1]);
      counter.add(1);
      expect(counter.get(1)).toEqual(2);
    });
    it("adds elements by reference, not by value", () => {
      const counter = new Counter();
      const obj = {};
      counter.add(obj);
      expect(counter.get(obj)).toEqual(1);
      counter.add(obj);
      expect(counter.get(obj)).toEqual(2);
      counter.add({});
      expect(counter.get(obj)).toEqual(2);
    });
    it("increments the size if the element was not present", () => {
      const counter = new Counter();
      expect(counter.size).toEqual(0);
      counter.add(1);
      expect(counter.size).toEqual(1);
    });
    it("increments the total if the element was not present", () => {
      const counter = new Counter();
      expect(counter.total).toEqual(0);
      counter.add(1);
      expect(counter.total).toEqual(1);
    });
    it("does not increment the size if the element was already present", () => {
      const counter = new Counter([1]);
      expect(counter.size).toEqual(1);
      counter.add(1);
      expect(counter.size).toEqual(1);
    });
    it("increments the total if the element was present", () => {
      const counter = new Counter([1]);
      expect(counter.total).toEqual(1);
      counter.add(1);
      expect(counter.total).toEqual(2);
    });
  });
  describe("get", () => {
    it("returns the count of an element", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.get(1)).toEqual(2);
    });
    it("returns 0 for an element that doesn't exist in the element", () => {
      const counter = new Counter();
      expect(counter.get(1)).toEqual(0);
    });
  });
  describe("set", () => {
    it("sets the count of an element", () => {
      const counter = new Counter();
      counter.set(1, 2);
      expect(counter.get(1)).toEqual(2);
    });
    it("allows setting the count to negative values", () => {
      const counter = new Counter();
      counter.set(1, -2);
      expect(counter.get(1)).toEqual(-2);
    });
    it("allows setting of elements not yet present in the counter", () => {
      const counter = new Counter();
      expect(counter.get(2)).toEqual(0);
      counter.set(2, 2);
      expect(counter.get(2)).toEqual(2);
    });
    it("overwrites counts for existing keys", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.get(1)).toEqual(2);
      counter.set(1, 5);
      expect(counter.get(1)).toEqual(5);
    });
    it("updates the size if the element was not present", () => {
      const counter = new Counter();
      expect(counter.size).toEqual(0);
      counter.set(1, 2);
      expect(counter.size).toEqual(1);
    });
    it("updates the total if the element was not present", () => {
      const counter = new Counter();
      expect(counter.total).toEqual(0);
      counter.set(1, 2);
      expect(counter.total).toEqual(2);
    });
    it("does not update the size if the element was already present", () => {
      const counter = new Counter([1]);
      expect(counter.size).toEqual(1);
      counter.set(1, 2);
      expect(counter.size).toEqual(1);
    });
    it("updates the total if the element was present", () => {
      const counter = new Counter([1]);
      expect(counter.total).toEqual(1);
      counter.set(1, 2);
      expect(counter.total).toEqual(2);
    });
  });
  describe("delete", () => {
    it("deletes an element from the counter", () => {
      const counter = new Counter([1, 1, 3]);
      counter.delete(1);
      expect(counter.get(1)).toEqual(0);
    });
    it("does nothing if the element doesn't exist", () => {
      const counter = new Counter();
      counter.delete(1);
      expect(counter.get(1)).toEqual(0);
    });
    it("decrements the size if the element was present", () => {
      const counter = new Counter([1]);
      expect(counter.size).toEqual(1);
      counter.delete(1);
      expect(counter.size).toEqual(0);
    });
    it("decrements the total if the element was present", () => {
      const counter = new Counter([1, 1, 1]);
      expect(counter.total).toEqual(3);
      counter.delete(1);
      expect(counter.total).toEqual(0);
    });
    it("does not decrement the size if the element was not present", () => {
      const counter = new Counter();
      expect(counter.size).toEqual(0);
      counter.delete(1);
      expect(counter.size).toEqual(0);
    });
  });
  describe("has", () => {
    it("returns true if the element exists", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.has(1)).toEqual(true);
    });
    it("returns false if the element doesn't exist", () => {
      const counter = new Counter();
      expect(counter.has(1)).toEqual(false);
    });
    it("compares values by reference", () => {
      const counter = new Counter();
      const obj = {};
      counter.add(obj);
      expect(counter.has(obj)).toEqual(true);
      expect(counter.has({})).toEqual(false);
    });
  });
  describe("clear", () => {
    it("clears the counter", () => {
      const counter = new Counter([1, 1, 3]);
      counter.clear();
      expect(counter.get(1)).toEqual(0);
      expect(counter.get(3)).toEqual(0);
    });
    it("resets the size to zero", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.size).toEqual(2);
      counter.clear();
      expect(counter.size).toEqual(0);
    });
    it("resets the total to zero", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.total).toEqual(3);
      counter.clear();
      expect(counter.total).toEqual(0);
    });
  });
  describe("mostCommon", () => {
    it("returns an empty array for empty counter", () => {
      const counter = new Counter();
      expect(counter.mostCommon()).toEqual([]);
    });
    it("returns array of [element, count] pairs", () => {
      const counter = new Counter(["a", "a", "b"]);
      expect(counter.mostCommon()).toEqual([
        ["a", 2],
        ["b", 1]
      ]);
    });
    it("returns the top n elements", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon(2)).toEqual([
        ["a", 2],
        ["b", 2]
      ]);
    });
    it("returns all elements if n is greater than size", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon(5)).toEqual([
        ["a", 2],
        ["b", 2],
        ["c", 1]
      ]);
    });
    it("returns empty array if n is zero", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon(0)).toEqual([]);
    });
    it("returns empty array if n is negative", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon(-1)).toEqual([]);
    });
    it("returns all elements if n is not provided", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon()).toEqual([
        ["a", 2],
        ["b", 2],
        ["c", 1]
      ]);
    });
    it("returns elements in order of insertion if counts are equal", () => {
      const counter = new Counter(["a", "a", "b", "b", "c"]);
      expect(counter.mostCommon()).toEqual([
        ["a", 2],
        ["b", 2],
        ["c", 1]
      ]);
    });
  });
  describe("subtract", () => {
    it("accepts array as argument", () => {
      const counter = new Counter([1, 1, 3]);
      counter.subtract([1, 2]);
      expect(counter.get(1)).toEqual(1);
      expect(counter.get(2)).toEqual(-1);
      expect(counter.get(3)).toEqual(1);
    });
    it("accepts object as argument", () => {
      const counter = new Counter([1, 1, 3]);
      counter.subtract({ 1: 1, 2: 2 });
      expect(counter.get(1)).toEqual(0);
      expect(counter.get(2)).toEqual(-2);
      expect(counter.get(3)).toEqual(1);
    });
    it("accepts another counter as argument", () => {
      const counter1 = new Counter([1, 1, 3]);
      const counter2 = new Counter([1, 2]);
      counter1.subtract(counter2);
      expect(counter1.get(1)).toEqual(1);
      expect(counter1.get(2)).toEqual(-1);
      expect(counter1.get(3)).toEqual(1);
    });
    it("does not change the original counter if argument is empty", () => {
      const counter = new Counter([1, 1, 3]);
      counter.subtract([]);
      expect(counter.get(1)).toEqual(2);
      counter.subtract({});
      expect(counter.get(1)).toEqual(2);
      counter.subtract(new Counter());
      expect(counter.get(1)).toEqual(2);
    });
    it("updates the size", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.size).toEqual(2);
      counter.subtract([1, 2]);
      expect(counter.size).toEqual(3);
    });
    it("updates the total", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.total).toEqual(3);
      counter.subtract([1]);
      expect(counter.total).toEqual(2);
    });
  });
  describe("combine", () => {});
  describe("toString", () => {});
  describe("elements", () => {});
  describe("keys", () => {});
  describe("values", () => {});
  describe("entries", () => {});
  describe("Generic iterator", () => {});
  describe("size", () => {
    it("returns 0 for empty counter", () => {
      const counter = new Counter();
      expect(counter.size).toEqual(0);
    });
    it("returns the number of unique elements", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.size).toEqual(2);
    });
    it("counts elements with zero value", () => {
      const counter = new Counter([1, 1, 3]);
      counter.set(2, 0);
      expect(counter.size).toEqual(3);
    });
    it("counts elements with negative value", () => {
      const counter = new Counter([1, 1, 3]);
      counter.set(2, -1);
      expect(counter.size).toEqual(3);
    });
  });
  describe("total", () => {
    it("returns 0 for empty counter", () => {
      const counter = new Counter();
      expect(counter.total).toEqual(0);
    });
    it("returns the total count of all elements", () => {
      const counter = new Counter([1, 1, 3]);
      expect(counter.total).toEqual(3);
    });
    it("elements with zero value don't change total", () => {
      const counter = new Counter([1, 1, 3]);
      counter.set(2, 0);
      expect(counter.total).toEqual(3);
    });
    it("counts negative value elements", () => {
      const counter = new Counter([1, 1, 3]);
      counter.set(2, -1);
      expect(counter.total).toEqual(2);
    });
  });
});
