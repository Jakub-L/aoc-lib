import { deepEqual } from "../utils/deep-equal";

/**
 * @class DoublyLinkedNode
 * Represents a node in a doubly linked list.
 * @template T The type of the value stored in the node.
 */
class DoublyLinkedNode<T> {
  /** The value stored in the node. */
  value: T;
  /** The next node in the list. */
  next: DoublyLinkedNode<T> | null;
  /** The previous node in the list. */
  prev: DoublyLinkedNode<T> | null;

  /**
   *
   * Creates a new instance of `DoublyLinkedNode`.
   * @param {T} value The value to store in the node.
   * @param {DoublyLinkedNode | null} next The next node in the list.
   * @param {DoublyLinkedNode | null} prev The previous node in the list.
   */
  constructor(value: T, prev: DoublyLinkedNode<T> | null, next: DoublyLinkedNode<T> | null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  /**
   * Returns a string representation of the node's value.
   * @returns A string representation of the node's value.
   */
  toString() {
    return this.value.toString();
  }
}

/**
 * @class DoublyLinkedList
 * A doubly linked list data structure.
 * @template T The type of the elements stored in the list.
 */
export class DoublyLinkedList<T> {
  private _size: number = 0;
  private _head: DoublyLinkedNode<T> | null = null;
  private _tail: DoublyLinkedNode<T> | null = null;

  /**
   * Adds an element to the end of the list
   * @param {T} value The value to add.
   * @returns {DoublyLinkedList<T>} The list after insertion
   */
  add(value: T): DoublyLinkedList<T> {
    return this._addLast(value);
  }

  /**
   * Adds an element at a specific index
   * @param {number} index The index to insert at
   * @param {T} value The value to add
   * @returns {DoublyLinkedList<T>} The list after insertion
   * @throws {Error} If index is less than 0 or greater than list size
   */
  addAt(index: number, value: T): DoublyLinkedList<T> {
    if (index < 0 || index > this.size) throw new Error("Index out of bounds");
    if (index === 0) return this._addFirst(value);
    if (index === this.size) return this._addLast(value);
    else {
      let oldNode = this._head;
      for (let i = 0; i < index; i++) oldNode = oldNode.next;
      const newNode = new DoublyLinkedNode(value, oldNode.prev, oldNode);
      oldNode.prev.next = oldNode.prev = newNode;
      this._size++;
      return this;
    }
  }

  /**
   * Removes all nodes with a specific value from the list
   * @param {T} value The value to remove
   * @returns {DoublyLinkedList<T>} The list after removal
   */
  removeValue(value: T): DoublyLinkedList<T> {
    let node = this._head;
    while (node) {
      if (deepEqual(value, node.value)) {
        if (node === this._head) this._head = node.next;
        if (node === this._tail) this._tail = node.prev;
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        this._size--;
      }
      node = node.next;
    }
    return this;
  }

  /**
   * Removes a node at a particular index from the list
   * @param {number} index The index of the node to remove
   * @returns {DoublyLinkedList<T>} The list after removal
   */
  removeAt(index: number): DoublyLinkedList<T> {
    if (index < 0 || index >= this.size) throw new Error("Index out of bounds");
    if (index === 0) {
      this._head = this._head.next;
      if (this._head) this._head.prev = null;
    } else if (index === this.size - 1) {
      this._tail = this._tail.prev;
      if (this._tail) this._tail.next = null;
    } else {
      let node = this._head;
      for (let i = 0; i < index; i++) node = node.next;
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    this._size--;
    return this;
  }

  /**
   * Finds the index of a value in the list. Performs a deep comparison by value.
   * @param {T} value Value to find
   * @returns {number} Index of value if found, -1 otherwise
   */
  indexOf(value: T): number {
    let node = this._head;
    let index = 0;
    while (node) {
      if (deepEqual(value, node.value)) return index;
      node = node.next;
      index++;
    }
    return -1;
  }

  /**
   * Checks if a value exists in the list. Performs a deep comparison by value.
   * @param {T} value Value to find in the list
   * @returns {boolean} True if value exists in the list, false otherwise
   */
  includes(value: T): boolean {
    let node = this._head;
    while (node) {
      if (deepEqual(value, node.value)) return true;
      node = node.next;
    }
    return false;
  }

  /**
   * Returns a string representation of the list.
   * @returns {string} Comma-separated list of node values stringified
   */
  toString(): string {
    if (this.isEmpty) return "[ ]";
    const results = [];
    let node = this._head;
    while (node) {
      results.push(node.toString());
      node = node.next;
    }
    return `[ ${results.join(", ")} ]`;
  }

  /**
   * Returns a forward iterator for the list.
   * @returns {IterableIterator<T>} An iterator for the list.
   */
  forward(): IterableIterator<T> {
    let node = this._head;
    return (function* (): IterableIterator<T> {
      while (node) {
        yield node.value;
        node = node.next;
      }
    })();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this._head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * Adds a new node with the given value to the end of the list.
   * @param {T} value The value to add to the list.
   * @returns {DoublyLinkedList<T>} The list after insertion
   */
  private _addLast(value: T): DoublyLinkedList<T> {
    if (this.isEmpty) this._head = this._tail = new DoublyLinkedNode(value, null, null);
    else {
      this._tail.next = new DoublyLinkedNode(value, this._tail, null);
      this._tail = this._tail.next;
    }
    this._size++;
    return this;
  }

  /**
   * Adds a new node with the given value to the beginning of the list.
   * @param {T} value The value to add to the list.
   * @returns {DoublyLinkedList<T>} The list after insertion
   */
  private _addFirst(value: T): DoublyLinkedList<T> {
    if (this.isEmpty) this._head = this._tail = new DoublyLinkedNode(value, null, null);
    else {
      this._head.prev = new DoublyLinkedNode(value, null, this._head);
      this._head = this._head.prev;
    }
    this._size++;
    return this;
  }

  /**
   * Gets the size of the list
   * @returns {number} The size of the list.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Gets a value indicating whether the list is empty.
   * @returns {boolean} True if list is empty.
   */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Gets the value of the first node in the list.
   * @returns {T} The value of the first node in the list.
   * @throws {Error} If list is empty.
   */
  get headValue(): T {
    if (this.isEmpty) throw new Error("List is empty");
    return this._head.value;
  }

  /**
   * Gets the value of the last node in the list.
   * @returns {T} The value of the last node in the list.
   * @throws {Error} If list is empty.
   */
  get tailValue(): T {
    if (this.isEmpty) throw new Error("List is empty");
    return this._tail.value;
  }
}
