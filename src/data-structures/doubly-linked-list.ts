/**
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

export class DoublyLinkedList<T> {
  private _size: number = 0;
  private _head: DoublyLinkedNode<T> | null = null;
  private _tail: DoublyLinkedNode<T> | null = null;

  /**
   * Adds a new node with the given value to the end of the list.
   * @param value The value to add to the list.
   */
  addLast(value: T) {
    if (this.isEmpty) {
      const node = new DoublyLinkedNode(value, null, null);
      this._head = node;
      this._tail = node;
    } else {
      const node = new DoublyLinkedNode(value, this._tail, null);
      this._tail.next = node;
      this._tail = node;
    }
    this._size++;
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  get headValue(): T {
    return this._head.value;
  }

  get tailValue(): T {
    return this._tail.value;
  }
}
