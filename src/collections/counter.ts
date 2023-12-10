import { sum } from "../math";
type Iterable = Array<any> | Record<any, number> | Counter;

export class Counter {
  private _counts: Map<any, number>;

  constructor(source?: Iterable) {
    this._counts = new Map<any, number>();
    if (Array.isArray(source)) {
      for (const element of source) {
        this.add(element);
      }
    } else if (source instanceof Counter) {
      this.combine(source);
    } else if (source) {
      for (const [element, count] of Object.entries(source)) {
        this.set(element, count);
      }
    }
  }

  // Adds element to the counter
  add(element: any) {
    this.set(element, this.get(element) + 1);
  }

  // Returns the count of a given element
  get(element: any): number {
    return this._counts.get(element) ?? 0;
  }

  // Sets the count of a given element
  set(element: any, count: number) {
    this._counts.set(element, count);
  }

  // Deletes an element from the counter entirely
  delete(element: any): boolean {
    return this._counts.delete(element);
  }

  // Checks if the counter contains an element
  has(element: any): boolean {
    return this._counts.has(element);
  }

  // Clears the counter
  clear() {
    this._counts.clear();
  }

  // Returns the n most common elements and their counts. If N is ommitted, returns all elements
  mostCommon(n?: number): Array<[any, number]> {
    if (n < 0) return [];
    return Array.from(this.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);
  }

  // Removes elements from the other counter from this counter
  subtract(other: Iterable) {
    if (Array.isArray(other)) {
      for (const element of other) this.set(element, this.get(element) - 1);
    } else if (other instanceof Counter) {
      for (const [element, count] of other.entries()) {
        this.set(element, this.get(element) - count);
      }
    } else {
      for (const [element, count] of Object.entries(other)) this.set(element, this.get(element) - count);
    }
  }

  // Adds elements from the other counter to this counter
  combine(other: Iterable) {
    if (Array.isArray(other)) {
      for (const element of other) this.add(element);
    } else if (other instanceof Counter) {
      for (const [element, count] of other.entries()) {
        this.set(element, this.get(element) + count);
      }
    } else {
      for (const [element, count] of Object.entries(other)) this.set(element, this.get(element) + count);
    }
  }

  // Returns a string representation
  toString(): string {
    return `Counter({${Array.from(this.entries())
      .map(([element, count]) => `${element}: ${count}`)
      .join(", ")}})`;
  }

  // Iterates over elements, repeating them as many times as their count
  *elements(): IterableIterator<any> {
    for (const [element, count] of this.entries()) {
      for (let i = 0; i < count; i++) {
        yield element;
      }
    }
  }

  // Returns the elements, iterator
  keys(): IterableIterator<any> {
    return this._counts.keys();
  }

  // Returns the counts, iterator
  values(): IterableIterator<any> {
    return this._counts.values();
  }

  // Returns the elements and counts, iterator
  entries(): IterableIterator<[any, number]> {
    return this._counts.entries();
  }

  // Generic iterator, same as entries
  *[Symbol.iterator](): IterableIterator<[any, number]> {
    return this.entries();
  }

  // Returns the number of unique elements, even if their value is zero
  get size() {
    return this._counts.size;
  }

  // Returns the total count of all elements
  get total() {
    return sum(Array.from(this.values()));
  }
}
