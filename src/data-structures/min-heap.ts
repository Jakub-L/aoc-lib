import { deepEqual } from "../utils/deep-equal";

/** A node in a min-heap, containing a priority used for sorting and a value for additional information */
interface Node<T> {
  priority: number;
  val: T;
}

/** A min-heap data structure */
export class MinHeap<T = number> {
  /** The underlying data structure used to store the heap */
  private _heap: Map<number, Node<T>> = new Map();

  /**
   * Creates a new min-heap. If an array of numbers is provided, each number will be added to the
   * heap with a priority equal to its value.
   * @param {number | Node<T>} [array=[]] - An array of numbers or nodes to add to the heap
   */
  constructor(array: number[] | Node<T>[] = []) {
    for (const element of array) {
      if (typeof element === "number") this.add({ priority: element, val: element as T });
      else this.add(element);
    }
    for (let i = Math.max(0, Math.ceil(array.length / 2) - 1); i >= 0; i--) this._sink(i);
  }

  /**
   * Adds a new node to the heap. If a number is provided, the node's priority will be equal to its value.
   * @param {number | Node<T>} elem - A number or node to add to the heap
   */
  add(elem: number | Node<T>) {
    if (typeof elem === "number") elem = { priority: elem, val: elem as T };
    this._heap.set(this.size, elem);
    this._swim(this.size - 1);
  }

  /**
   * Returns the root of the heap (the value with the lowest priority) and removes it from the heap.
   * @returns {number | Node<T> | null} The node with the lowest priority, or null if the heap is empty
   */
  pop(): number | Node<T> | null {
    if (this.isEmpty) return null;
    const result = this._removeAt(0);
    if (result.priority === result.val) return result.priority;
    return result;
  }

  /**
   * Returns the root of the heap (the value with the lowest priority) without removing it from the heap.
   * @returns {number | Node<T> | null} The node with the lowest priority, or null if the heap is empty
   */
  peek(): number | Node<T> | null {
    if (this.isEmpty) return null;
    const value = this._heap.get(0);
    return value.priority === value.val ? value.priority : value;
  }

  /**
   * Checks if a value is present in the min-heap (performs a deep equality check).
   * @param {T} value - The value to search for
   * @returns {boolean} True if the value exists in the heap, false otherwise
   */
  includes(value: T): boolean {
    for (const node of this._heap.values()) {
      if (deepEqual(node.val, value)) return true;
    }
    return false;
  }

  /**
   * Removes a value from the min-heap (performs a deep equality check). Removes the
   * first instance of the value found.
   * @param {T} value - The value to remove
   * @returns {boolean} True if the value was removed, false otherwise
   */
  remove(value: T): boolean {
    for (const [index, node] of this._heap) {
      if (deepEqual(node.val, value)) {
        this._removeAt(index);
        return true;
      }
    }
    return false;
  }

  /**
   * Removes a node at a specific index, then reorders the heap to maintain the heap property.
   * @param {number} index - The index of the node to remove
   * @returns {Node<T> | null} The removed node, or null if the index is out of bounds
   */
  private _removeAt(index: number): Node<T> | null {
    const lastIndex = this.size - 1;
    const removedNode = this._heap.get(index);
    this._swap(index, lastIndex);
    this._heap.delete(lastIndex);

    // If the node removed was already the last node, we're done
    if (index === lastIndex) return removedNode;

    // Otherwise, we need to sink or swim the node at index
    const node = this._heap.get(index);
    this._sink(index);
    if (deepEqual(this._heap.get(index), node)) this._swim(index);

    return removedNode;
  }

  /**
   * Moves a node up the heap until it is in the correct position.
   * @param {number} index - The index of the node to swim
   */
  private _swim(index: number) {
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this._less(index, parentIndex)) {
      this._swap(index, parentIndex);
      [index, parentIndex] = [parentIndex, Math.floor((parentIndex - 1) / 2)];
    }
  }

  /**
   * Moves a node down the heap until it is in the correct position.
   * @param {number} index - The index of the node to sink
   */
  private _sink(index: number) {
    while (true) {
      const [left, right] = [2 * index + 1, 2 * index + 2];
      const smallest = right < this.size && this._less(right, left) ? right : left;
      if (left >= this.size || this._less(index, smallest)) return;
      this._swap(smallest, index);
      index = smallest;
    }
  }

  /**
   * Swaps the nodes at indices i and j
   * @param {number} i - The index of the first node to swap
   * @param {number} j - The index of the second node to swap
   * @throws {RangeError} If either index is out of bounds
   */
  private _swap(i: number, j: number) {
    const [a, b] = [this._heap.get(i), this._heap.get(j)];
    this._heap.set(i, b);
    this._heap.set(j, a);
  }

  /**
   * Checks if the priority of node i is less than the priority of node j
   * @param {number} i - The index of the first node to compare
   * @param {number} j - The index of the second node to compare
   * @returns {boolean} True if the priority of node i is less than the priority of node j
   * @throws {RangeError} If either index is out of bounds
   */
  private _less(i: number, j: number): boolean {
    return this._heap.get(i).priority < this._heap.get(j).priority;
  }

  /** The number of elements in the heap */
  get size(): number {
    return this._heap.size;
  }

  /** Whether there are any elements in the heap */
  get isEmpty(): boolean {
    return this.size === 0;
  }
}
