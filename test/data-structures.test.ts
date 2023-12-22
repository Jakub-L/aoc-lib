import { DoublyLinkedList, MinHeap, Queue } from "../src/data-structures";

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
  describe("size", () => {
    it("returns 0 for an empty list", () => {
      expect(list.size).toBe(0);
      expect(list.isEmpty).toBe(true);
    });
    it("returns the correct size for a non-empty list", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      expect(list.size).toBe(3);
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
  describe("includesBy", () => {
    it("returns false for an empty list and any predicate", () => {
      expect(list.includesBy(val => val === "a")).toBe(false);
    });
    it("returns true for an element passing predicate in list", () => {
      list.add("a");
      expect(list.includesBy(val => val === "a")).toBe(true);
    });
    it("returns false for an element not passing predicate in list", () => {
      list.add("a");
      expect(list.includesBy(val => val === "b")).toBe(false);
    });
    it("allows checking nested properties of objects", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      objectList.add({ a: 1, b: 4 });
      expect(objectList.includesBy(val => val.b === 4)).toBe(true);
      expect(objectList.includesBy(val => val.b === 3)).toBe(false);
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
  describe("removeBy", () => {
    it("does nothing for an empty list", () => {
      list.removeBy(val => val === "a");
      expect(list.toString()).toBe("[ ]");
    });
    it("removes the only element passing a predicate in a list", () => {
      list.add("a");
      expect(list.toString()).toBe("[ a ]");
      list.removeBy(val => val === "a");
      expect(list.toString()).toBe("[ ]");
    });
    it("removes the all elements passing predicate in a list", () => {
      list.add("a");
      list.add("b");
      list.add("a");
      expect(list.toString()).toBe("[ a, b, a ]");
      list.removeBy(val => val === "a");
      expect(list.toString()).toBe("[ b ]");
    });
    it("remaps head if the first element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeBy(val => val === "a");
      expect(list.headValue).toBe("b");
    });
    it("remaps tail if the last element is removed", () => {
      list.add("a");
      list.add("b");
      expect(list.toString()).toBe("[ a, b ]");
      list.removeBy(val => val === "b");
      expect(list.tailValue).toBe("a");
    });
    it("allows checking nested properties of objects", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      objectList.add({ a: 1, b: 4 });
      objectList.add({ a: 2, b: 4 });
      objectList.removeBy(val => val.a === 1);
      expect(objectList.headValue).toEqual({ a: 2, b: 4 });
      expect(objectList.size).toBe(1);
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
    it("returns the value of the removed node", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      expect(list.removeAt(1)).toBe("b");
    });
  });
  describe("findBy", () => {
    it("returns null for an empty list", () => {
      expect(list.findBy(val => val === "a")).toBeNull();
    });
    it("returns null for list with no elements passing predicate", () => {
      list.add("a");
      expect(list.findBy(val => val === "b")).toBeNull();
    });
    it("returns the first element passing predicate", () => {
      list.add("a");
      list.add("b");
      list.add("c");
      expect(list.findBy(val => val === "b")).toBe("b");
    });
    it("allows checking nested properties of objects", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      objectList.add({ a: 1, b: 4 });
      expect(objectList.findBy(val => val.b === 4)).toEqual({ a: 1, b: 4 });
    });
    it("returns the first passing object", () => {
      const objectList = new DoublyLinkedList<Record<string, number>>();
      objectList.add({ a: 1, b: 2 });
      objectList.add({ a: 1, b: 4 });
      expect(objectList.findBy(val => val.a === 1)).toEqual({ a: 1, b: 2 });
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
  describe("reverse (iterator)", () => {
    it("returns an empty iterator for an empty list", () => {
      const iter = list.reverse();
      expect(iter.next().done).toBe(true);
    });
    it("iterates through a list", () => {
      const arr = ["a", "b", "c", "d"];
      arr.forEach(val => list.add(val));
      for (const value of list.reverse()) {
        expect(value).toBe(arr.pop());
      }
    });
    it("iterates through a list in order of nodes, not in order of insertion", () => {
      const expected = ["a", "c", "b"];
      list.addAt(0, "a").addAt(1, "b").addAt(1, "c");
      for (const value of list.reverse()) {
        expect(value).toBe(expected.pop());
      }
    });
  });
});
describe.only("MinHeap", () => {
  describe("constructor", () => {
    it("creates an empty heap if no arguments are provided", () => {
      const heap = new MinHeap();
      expect(heap.size).toBe(0);
    });
    it("creates a heap from an array of numbers", () => {
      const heap = new MinHeap([5, 3, 1, 4, 2]);
      expect(heap.size).toBe(5);
    });
    it("creates a heap from an array of nodes", () => {
      const heap = new MinHeap([
        { priority: 5, val: "a" },
        { priority: 3, val: "b" }
      ]);
      expect(heap.size).toBe(2);
    });
    it("orders elements if given array of numbers", () => {
      const heap = new MinHeap([5, 3, 1, 4, 2]);
      expect(heap.pop()).toBe(1);
      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(3);
    });
    it("orders elements if given array of nodes", () => {
      const heap = new MinHeap([
        { priority: 5, val: "a" },
        { priority: 3, val: "b" }
      ]);
      expect(heap.pop()).toEqual({ priority: 3, val: "b" });
      expect(heap.pop()).toEqual({ priority: 5, val: "a" });
    });
  });
  describe("add", () => {
    it("adds a new node to an empty heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.size).toBe(1);
      expect(heap.peek()).toBe(5);
    });
    it("inserts element to the front of heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.add(3);
      expect(heap.size).toBe(2);
      expect(heap.peek()).toBe(3);
    });
    it("inserts element to the middle of heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.add(3);
      heap.add(1);
      expect(heap.size).toBe(3);
      expect(heap.pop()).toBe(1);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(5);
    });
    it("inserts element to the end of heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.add(3);
      heap.add(1);
      heap.add(4);
      expect(heap.size).toBe(4);
      expect(heap.pop()).toBe(1);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(4);
      expect(heap.pop()).toBe(5);
    });
    it("updates size on insertion", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.size).toBe(1);
      heap.add(3);
      expect(heap.size).toBe(2);
      heap.add(1);
      expect(heap.size).toBe(3);
      heap.add(4);
      expect(heap.size).toBe(4);
    });
    it("handles Node additions", () => {
      const heap = new MinHeap<string>();
      heap.add({ priority: 5, val: "a" });
      expect(heap.size).toBe(1);
      expect(heap.peek()).toEqual({ priority: 5, val: "a" });
    });
  });
  describe("pop", () => {
    it("returns null for an empty heap", () => {
      const heap = new MinHeap();
      expect(heap.pop()).toBeNull();
    });
    it("returns the only element in a heap", () => {
      const heap = new MinHeap([5]);
      expect(heap.pop()).toBe(5);
    });
    it("reduces size on removal", () => {
      const heap = new MinHeap([5]);
      expect(heap.size).toBe(1);
      heap.pop();
      expect(heap.size).toBe(0);
    });
    it("returns whole node if element is a Node", () => {
      const heap = new MinHeap<string>([{ priority: 5, val: "a" }]);
      expect(heap.pop()).toEqual({ priority: 5, val: "a" });
    });
  });
  describe("peek", () => {
    it("returns null for empty heap", () => {
      const heap = new MinHeap();
      expect(heap.peek()).toBeNull();
    });
    it("returns number for number-type heap", () => {
      const heap = new MinHeap([5]);
      expect(heap.peek()).toBe(5);
    });
    it("returns Node for Node-type heap", () => {
      const heap = new MinHeap<string>([{ priority: 5, val: "a" }]);
      expect(heap.peek()).toEqual({ priority: 5, val: "a" });
    });
    it("returns first element in heap", () => {
      const heap = new MinHeap([5, 3, 1]);
      expect(heap.peek()).toBe(1);
    });
    it("does not affect size", () => {
      const heap = new MinHeap([5]);
      expect(heap.size).toBe(1);
      heap.peek();
      expect(heap.size).toBe(1);
    });
    it("does not remove element from heap", () => {
      const heap = new MinHeap([5]);
      expect(heap.peek()).toBe(5);
      expect(heap.peek()).toBe(5);
    });
  });
  describe("includes", () => {
    it("returns false for an empty heap", () => {
      const heap = new MinHeap();
      expect(heap.includes(5)).toBe(false);
    });
    it("returns true for a number present in a heap", () => {
      const heap = new MinHeap([5]);
      expect(heap.includes(5)).toBe(true);
    });
    it("returns false for a number not present in a heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.includes(6)).toBe(false);
    });
    it("returns true for a node present in a heap, by comparing values", () => {
      const heap = new MinHeap<string>();
      heap.add({ priority: 5, val: "a" });
      expect(heap.includes("a")).toBe(true);
    });
    it("returns false for a node not present in a heap, by comparing values", () => {
      const heap = new MinHeap<string>();
      heap.add({ priority: 5, val: "a" });
      expect(heap.includes("b")).toBe(false);
    });
    it("returns true for an object type node present in heap, deep-comparing by value", () => {
      const heap = new MinHeap<Record<string, number | Record<string, number>>>();
      heap.add({ priority: 1, val: { a: 1, b: { c: 1, d: 3 } } });
      expect(heap.includes({ a: 1, b: { c: 1, d: 3 } })).toBe(true);
    });
    it("returns false for an object type node not present in heap, deep-comparing by value", () => {
      const heap = new MinHeap<Record<string, number | Record<string, number>>>();
      heap.add({ priority: 1, val: { a: 1, b: { c: 1, d: 3 } } });
      expect(heap.includes({ a: 1, b: { c: 0, d: 3 } })).toBe(false);
    });
  });
  describe("remove", () => {
    it("returns false for an empty heap", () => {
      const heap = new MinHeap();
      expect(heap.remove(5)).toBe(false);
    });
    it("returns true for a number present in a heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.remove(5)).toBe(true);
    });
    it("returns false for a number not present in a heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.remove(6)).toBe(false);
    });
    it("returns true for a node present in a heap, by comparing values", () => {
      const heap = new MinHeap<string>();
      heap.add({ priority: 5, val: "a" });
      expect(heap.remove("a")).toBe(true);
    });
    it("returns false for a node not present in a heap, by comparing values", () => {
      const heap = new MinHeap<string>();
      heap.add({ priority: 5, val: "a" });
      expect(heap.remove("b")).toBe(false);
    });
    it("returns true for an object type node present in heap, deep-comparing by value", () => {
      const heap = new MinHeap<Record<string, number | Record<string, number>>>();
      heap.add({ priority: 1, val: { a: 1, b: { c: 1, d: 3 } } });
      expect(heap.remove({ a: 1, b: { c: 1, d: 3 } })).toBe(true);
    });
    it("returns false for an object type node not present in heap, deep-comparing by value", () => {
      const heap = new MinHeap<Record<string, number | Record<string, number>>>();
      heap.add({ priority: 1, val: { a: 1, b: { c: 1, d: 3 } } });
      expect(heap.remove({ a: 1, b: { c: 0, d: 3 } })).toBe(false);
    });
    it("correctly updates size on removal", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.size).toBe(1);
      expect(heap.isEmpty).toBe(false);
      heap.remove(5);
      expect(heap.size).toBe(0);
      expect(heap.isEmpty).toBe(true);
    });
    it("removes top of heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.add(3);
      heap.add(1);
      expect(heap.peek()).toBe(1);
      heap.remove(1);
      expect(heap.peek()).toBe(3);
    });
  });
  describe("size", () => {
    it("returns 0 for an empty heap", () => {
      const heap = new MinHeap();
      expect(heap.size).toBe(0);
    });
    it("returns the size for a non-empty heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.add(3);
      heap.add(1);
      expect(heap.size).toBe(3);
    });
  });
  describe("isEmpty", () => {
    it("returns true for an empty heap", () => {
      const heap = new MinHeap();
      expect(heap.isEmpty).toBe(true);
    });
    it("returns false for a non-empty heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      expect(heap.isEmpty).toBe(false);
    });
    it("returns true after popping all elements from heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.pop();
      expect(heap.isEmpty).toBe(true);
    });
    it("returns true after removing all elements from heap", () => {
      const heap = new MinHeap();
      heap.add(5);
      heap.remove(5);
      expect(heap.isEmpty).toBe(true);
    });
  });
});
describe("Queue", () => {
  let queue = new Queue<string>();
  beforeEach(() => {
    queue = new Queue();
  });
  describe("isEmpty", () => {
    it("returns true for an empty queue", () => {
      expect(queue.isEmpty).toBe(true);
    });
    it("returns false for a non-empty queue", () => {
      queue.enqueue("a");
      expect(queue.isEmpty).toBe(false);
    });
  });
  describe("size", () => {
    it("returns 0 for an empty queue", () => {
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });
    it("returns the correct size for a non-empty queue", () => {
      queue.enqueue("a");
      queue.enqueue("b");
      queue.enqueue("c");
      expect(queue.size).toBe(3);
    });
  });
  describe("enqueue", () => {
    it("adds an element to an empty queue", () => {
      queue.enqueue("a");
      expect(queue.toString()).toBe("[ a ]");
    });
    it("adds an element to a queue with elements", () => {
      queue.enqueue("a");
      queue.enqueue("b");
      queue.enqueue("c");
      expect(queue.toString()).toBe("[ a, b, c ]");
    });
    it("correctly updates size on insertion", () => {
      queue.enqueue("a");
      expect(queue.size).toBe(1);
      queue.enqueue("b");
      expect(queue.size).toBe(2);
      queue.enqueue("c");
      expect(queue.size).toBe(3);
    });
  });
  describe("dequeue", () => {
    it("returns undefined for an empty queue", () => {
      expect(queue.dequeue()).toBeUndefined();
    });
    it("returns the only element in a queue", () => {
      queue.enqueue("a");
      expect(queue.dequeue()).toBe("a");
    });
    it("returns the first element in a queue", () => {
      queue.enqueue("a");
      queue.enqueue("b");
      queue.enqueue("c");
      expect(queue.dequeue()).toBe("a");
    });
    it("dequeues elements in the correct order", () => {
      queue.enqueue("a");
      queue.enqueue("b");
      queue.enqueue("c");
      expect(queue.dequeue()).toBe("a");
      expect(queue.dequeue()).toBe("b");
      expect(queue.dequeue()).toBe("c");
    });
  });
  describe("peek", () => {
    it("returns undefined for an empty queue", () => {
      expect(queue.peek()).toBeUndefined();
    });
    it("returns the only element in a queue", () => {
      queue.enqueue("a");
      expect(queue.peek()).toBe("a");
    });
    it("does not remove the element from the queue", () => {
      queue.enqueue("a");
      expect(queue.peek()).toBe("a");
      expect(queue.size).toBe(1);
    });
  });
  describe("toString", () => {
    it("returns an empty string for an empty queue", () => {
      expect(queue.toString()).toBe("");
    });
    it("returns the first element, stringified, for single-element queue", () => {
      queue.enqueue("a");
      expect(queue.toString()).toBe("[ a ]");
    });
    it("joins node values with a comma and space", () => {
      queue.enqueue("a");
      queue.enqueue("b");
      expect(queue.toString()).toBe("[ a, b ]");
    });
    it("correctly traverses larger queues", () => {
      for (let i = 1; i <= 10; i++) queue.enqueue(i.toString());
      expect(queue.toString()).toBe("[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]");
    });
    it("correctly generates strings throughout queueing process", () => {
      expect(queue.toString()).toBe("");
      queue.enqueue("a");
      expect(queue.toString()).toBe("[ a ]");
      queue.enqueue("b");
      queue.enqueue("c");
      expect(queue.toString()).toBe("[ a, b, c ]");
      queue.dequeue();
      expect(queue.toString()).toBe("[ b, c ]");
    });
  });
});
