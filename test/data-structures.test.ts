import { DoublyLinkedList } from "../src/data-structures";

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<string | string[]>;
  beforeEach(() => {
    list = new DoublyLinkedList();
  });
  describe("isEmpty", () => {
    it("returns true for an empty list", () => {
      expect(list.isEmpty).toBe(true);
      expect(list.size).toBe(0);
    });
    it("returns false for a non-empty list", () => {
      list.add("a");
      expect(list.isEmpty).toBe(false);
    });
  });
  describe("headValue", () => {
    it("throws an error for an empty list", () => {
      expect(() => list.headValue).toThrowError();
    });
    it("returns the head value for a single-element list", () => {
      list.add("a");
      expect(list.headValue).toBe("a");
    });
    it("returns the head value for a multi-element list", () => {
      list.add("a");
      list.add("b");
      expect(list.headValue).toBe("a");
    });
    it("returns head node value by reference", () => {
      const arr = ["a", "b", "c"];
      list.add(arr);
      expect(list.headValue).toBe(arr);
    });
  });
  describe("tailValue", () => {
    it("throws an error for an empty list", () => {
      expect(() => list.tailValue).toThrowError();
    });
    it("returns the tail value for a single-element list", () => {
      list.add("a");
      expect(list.tailValue).toBe("a");
    });
    it("returns the tail value for a multi-element list", () => {
      list.add("a");
      list.add("b");
      expect(list.tailValue).toBe("b");
    });
    it("returns tail node value by reference", () => {
      const arr = ["a", "b", "c"];
      list.add(arr);
      expect(list.tailValue).toBe(arr);
    });
  });
  describe("add", () => {
    it("sets head and tail to the same value for an empty list", () => {
      list.add("a");
      expect(list.headValue).toBe("a");
      expect(list.tailValue).toBe("a");
    });
    it("updates tail for multi-element list", () => {
      list.add("a");
      list.add("b");
      expect(list.headValue).toBe("a");
      expect(list.tailValue).toBe("b");
    });
    it("correctly updates size on insertion", () => {
      list.add("a");
      expect(list.size).toBe(1);
      list.add("b");
      expect(list.size).toBe(2);
    });
    it("allows chaining of insertions", () => {
      list.add("a").add("b").add("c");
      expect(list.toString()).toBe("[ a, b, c ]");
      expect(list.size).toBe(3);
    });
  });
  describe("addAt", () => {
    it("throws an error if given index lower than zero", () => {
      expect(() => list.addAt(-1, "a")).toThrow();
    });
    it("throws an error if given index greater than size", () => {
      list.add("a");
      list.add("b");
      expect(() => list.addAt(5, "c")).toThrow();
    });
    it("sets head and tail to the same value for an empty list", () => {
      list.addAt(0, "a");
      expect(list.headValue).toBe("a");
      expect(list.tailValue).toBe("a");
    });
    it("adds to the beginning of the list if index is 0", () => {
      list.addAt(0, "a");
      expect(list.headValue).toBe("a");
      list.addAt(0, "b");
      expect(list.headValue).toBe("b");
      list.addAt(0, "c");
      expect(list.headValue).toBe("c");
      expect(list.tailValue).toBe("a");
    });
    it("adds to the end of the list if index is list size", () => {
      list.add("a");
      list.add("b");
      list.addAt(2, "c");
      expect(list.tailValue).toBe("c");
    });
    it("inserts at the correct index", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      list.addAt(1, "d");
      expect(list.toString()).toBe("[ a, d, b, c ]");
    });
    it("shifts elements with consecutive inserts at the same index", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      list.addAt(1, "d");
      list.addAt(1, "e");
      expect(list.toString()).toBe("[ a, e, d, b, c ]");
    });
    it("correctly updates size on insertion", () => {
      list.addAt(0, "a");
      expect(list.size).toBe(1);
      list.addAt(1, "b");
      expect(list.size).toBe(2);
      list.addAt(1, "c");
      expect(list.size).toBe(3);
    });
    it("allows chaining of insertions", () => {
      list.addAt(0, "a").addAt(0, "b").addAt(1, "c");
      expect(list.toString()).toBe("[ b, c, a ]");
      expect(list.size).toBe(3);
    });
  });
  describe("includes", () => {
    it("returns false for an empty list", () => {
      expect(list.includes("a")).toBe(false);
    });
    it("returns true for an element present in a list", () => {
      list.add("a");
      expect(list.includes("a")).toBe(true);
    });
    it("returns false for an element not present in a list", () => {
      list.add("a");
      expect(list.includes("b")).toBe(false);
    });
    it("checks reference types by value", () => {
      const arr = ["a", "b", "c"];
      list.add(arr);
      expect(list.includes(arr)).toBe(true);
      expect(list.includes(["a", "b", "c"])).toBe(true);
    });
    it("order of keys does not matter for objects", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      expect(objectList.includes({ b: 2, a: 1 })).toBe(true);
    });
  });
  describe("indexOf", () => {
    it("returns -1 for an empty list", () => {
      expect(list.indexOf("a")).toBe(-1);
    });
    it("returns the index of an element present in a list", () => {
      list.add("a");
      expect(list.indexOf("a")).toBe(0);
    });
    it("returns -1 for an element not present in a list", () => {
      list.add("a");
      expect(list.indexOf("b")).toBe(-1);
    });
    it("checks reference types by value", () => {
      const arr = ["a", "b", "c"];
      list.add(arr);
      expect(list.indexOf(arr)).toBe(0);
      expect(list.indexOf(["a", "b", "c"])).toBe(0);
    });
    it("order of keys does not matter for objects", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      expect(objectList.indexOf({ b: 2, a: 1 })).toBe(0);
    });
    it("returns the first index of a value if it appears multiple times", () => {
      list.add("a");
      list.add("b");
      list.add("a");
      expect(list.indexOf("a")).toBe(0);
    });
  });
  describe("removeValue", () => {
    it("does nothing for an empty list", () => {
      list.removeValue("a");
      expect(list.toString()).toBe("[ ]");
    });
    it("removes the only element in a list", () => {
      list.add("a");
      expect(list.toString()).toBe("[ a ]");
      list.removeValue("a");
      expect(list.toString()).toBe("[ ]");
    });
    it("removes the first element in a list", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeValue("a");
      expect(list.toString()).toBe("[ b ]");
    });
    it("remaps head if the first element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeValue("a");
      expect(list.headValue).toBe("b");
    });
    it("removes the last element in a list", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeValue("b");
      expect(list.toString()).toBe("[ a ]");
    });
    it("remaps tail if the last element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeValue("b");
      expect(list.tailValue).toBe("a");
    });
    it("removes the middle element in a list", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      expect(list.toString()).toBe("[ a, b, c ]");
      list.removeValue("b");
      expect(list.toString()).toBe("[ a, c ]");
    });
    it("removes all occurences of a value", () => {
      list.add("a");
      list.add("b");
      list.add("a");
      list.add("c");
      list.add("a");
      expect(list.toString()).toBe("[ a, b, a, c, a ]");
      list.removeValue("a");
      expect(list.toString()).toBe("[ b, c ]");
    });
    it("removes reference types by value", () => {
      list.add(["a", "b", "c"]);
      expect(list.toString()).toBe("[ a,b,c ]");
      list.removeValue(["a", "b", "c"]);
      expect(list.toString()).toBe("[ ]");
    });
    it("allows chaining of removals", () => {
      list.add("a");
      list.add("b");
      list.add("a");
      list.add("c");
      list.add("a");
      expect(list.toString()).toBe("[ a, b, a, c, a ]");
      list.removeValue("a").removeValue("b").removeValue("c");
      expect(list.toString()).toBe("[ ]");
    });
  });
  describe("removeAt", () => {
    it("throws an error if given index lower than zero", () => {
      expect(() => list.removeAt(-1)).toThrow();
    });
    it("throws an error if given index greater than size", () => {
      list.add("a");
      list.add("b");
      expect(() => list.removeAt(5)).toThrow();
    });
    it("throws an error for an empty list", () => {
      expect(() => list.removeAt(0)).toThrow();
    });
    it("removes the only element in a list", () => {
      list.add("a");
      expect(list.toString()).toBe("[ a ]");
      list.removeAt(0);
      expect(list.toString()).toBe("[ ]");
    });
    it("removes the first element in a list", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeAt(0);
      expect(list.toString()).toBe("[ b ]");
    });
    it("remaps head if the first element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeAt(0);
      expect(list.headValue).toBe("b");
    });
    it("removes the last element in a list", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeAt(1);
      expect(list.toString()).toBe("[ a ]");
    });
    it("remaps tail if the last element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeAt(1);
      expect(list.tailValue).toBe("a");
    });
    it("removes the middle element in a list", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      expect(list.toString()).toBe("[ a, b, c ]");
      list.removeAt(1);
      expect(list.toString()).toBe("[ a, c ]");
    });
  });
  describe("toString", () => {
    it("returns an empty string for an empty list", () => {
      expect(list.toString()).toBe("[ ]");
    });
    it("returns the head, stringified, for single-element list", () => {
      list.add("Hello World");
      expect(list.toString()).toBe("[ Hello World ]");
    });
    it("joins node values with a comma and space", () => {
      list.add("Hello");
      list.add("World");
      expect(list.toString()).toBe("[ Hello, World ]");
    });
    it("correctly traverses larger lists", () => {
      for (let i = 1; i <= 10; i++) list.add(i.toString());
      expect(list.toString()).toBe("[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]");
    });
    it("correctly generates strings throughout insertion process", () => {
      expect(list.toString()).toBe("[ ]");
      list.add("a");
      expect(list.toString()).toBe("[ a ]");
      list.add("b");
      list.add("c");
      list.add("d");
      expect(list.toString()).toBe("[ a, b, c, d ]");
    });
  });
  describe("forward (iterator)", () => {
    it("returns an empty iterator for an empty list", () => {
      const iter = list.forward();
      expect(iter.next().done).toBe(true);
    });
    it("iterates through a list", () => {
      const arr = ["a", "b", "c", "d"];
      arr.forEach(val => list.add(val));
      for (const value of list.forward()) {
        expect(value).toBe(arr.shift());
      }
    });
    it("iterates through a list in order of nodes, not in order of insertion", () => {
      const expected = ["a", "c", "b"];
      list.addAt(0, "a").addAt(1, "b").addAt(1, "c");
      for (const value of list.forward()) {
        expect(value).toBe(expected.shift());
      }
    });
  });
});
