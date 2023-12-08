type Iterable = Array<any> | Record<any, number> | Counter;

export class Counter {
  private _counts: Map<any, number>;

  constructor(source?: Iterable) {
    this._counts = new Map<any, number>();
  }

  // Adds element to the counter
  increment(element: any) {}

  // Removes element from the counter (decrements the counter)
  decrement(element: any) {}

  // Deletes an element from the counter entirely
  delete(element: any) {}

  // Returns the count of a given element
  get(element: any) {}

  // Sets the count of a given element
  set(element: any, count: number) {}

  // Checks if the counter contains an element
  has(element: any) {}

  // Clears the counter
  clear() {}

  // Iterates over elements, repeating them as many times as their count
  elements() {}

  // Returns the n most common elements and their counts. If N is ommitted, returns all elements
  mostCommon(n?: number) {}

  // Removes elements from the other counter from this counter
  subtract(other: Iterable) {}

  // Adds elements from the other counter to this counter
  union(other: Iterable) {}

  // Returns the total count of all elements
  total() {}

  // Returns a string representation
  toString() {}

  // Returns the number of unique elements
  get size() {
    return null;
  }

  // Returns the elements, iterator
  keys() {}

  // Returns the counts, iterator
  values() {}

  // Returns the elements and counts, iterator
  entries() {}

  // Generic iterator, same as entries
  *[Symbol.iterator](): IterableIterator<[any, number]> {}
}
