/**
 * @class DoublyLinkedNode
 * Represents a node in a doubly linked list.
 * @template T The type of the value stored in the node.
 */
class DoublyLinkedNode<T> {
  /** The value stored in the node. */
  value: T;
  /** The next node in the list. */
  next: DoublyLinkedNode<T> | null = null;
  /** The previous node in the list. */
  prev: DoublyLinkedNode<T> | null = null;

  /**
   * Creates a new instance of `DoublyLinkedNode`.
   * @param value The value to store in the node.
   * @param next The next node in the list.
   * @param prev The previous node in the list.
   */
  constructor(value: T, next: DoublyLinkedNode<T> | null = null, prev: DoublyLinkedNode<T> | null = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
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
   * Adds an element to the list (to the end of it)
   * @param {T} value The value to add to the list.
   */
  add(value: T) {
    this._addLast(value);
  }

  addAt(index: number, value: T) {}

  removeValue(value: T) {}

  removeAt(index: number) {}

  indexOf(value: T) {}

  includes(value: T) {}

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
   * Adds a new node with the given value to the end of the list.
   * @param value The value to add to the list.
   */
  private _addLast(value: T) {
    if (this.isEmpty) {
      const node = new DoublyLinkedNode(value, null, null);
      this._head = node;
      this._tail = node;
    } else {
      const node = new DoublyLinkedNode(value, null, this._tail);
      this._tail.next = node;
      this._tail = node;
    }
    this._size++;
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
   */
  get headValue(): T {
    if (this.isEmpty) throw new Error("List is empty");
    return this._head.value;
  }

  /**
   * Gets the value of the last node in the list.
   * @returns {T} The value of the last node in the list.
   */
  get tailValue(): T {
    if (this.isEmpty) throw new Error("List is empty");
    return this._tail.value;
  }
}
