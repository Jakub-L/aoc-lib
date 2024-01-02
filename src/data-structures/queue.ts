/**
 * @class Queue
 * Represents a queue data structure.
 * @template T The type of the elements stored in the queue.
 */
export class Queue<T> {
  private _queue: T[] = [];

  constructor(initialValues?: T[]) {
    if (initialValues) this._queue = initialValues;
  }

  /**
   * Adds an element to the end of the queue.
   * @param {T} value The value to add.
   */
  enqueue(value: T): void {
    this._queue.push(value);
  }

  /**
   * Removes an element from the front of the queue.
   * @returns {T} The removed element.
   */
  dequeue(): T {
    return this._queue.shift();
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @returns {T} The element at the front of the queue.
   */
  peek(): T {
    return this._queue[0];
  }

  /**
   * Returns a string representation of the queue.
   * @returns {string} Comma-separated list of queue elements.
   */
  toString(): string {
    if (this.isEmpty) return "";
    return `[ ${this._queue.join(", ")} ]`;
  }

  /**
   * Size of the queue.
   * @returns {number} The number of enqueued elements.
   */
  get size(): number {
    return this._queue.length;
  }

  /**
   * Whether the queue is empty.
   * @returns {boolean} True if there is no element in the queue, false otherwise.
   */
  get isEmpty(): boolean {
    return this._queue.length === 0;
  }
}
