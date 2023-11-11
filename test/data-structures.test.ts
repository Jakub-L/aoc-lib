import { DoublyLinkedList } from "../src/data-structures";

describe("doubly-linked-list", () => {
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
  });
});
