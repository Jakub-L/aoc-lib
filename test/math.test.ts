import { gcd, prod, sum } from "../src/math";

describe("sum", () => {
  it("returns 0 for empty array", () => {
    expect(sum([])).toEqual(0);
  });
  it("returns element if given array of length 1", () => {
    expect(sum([1])).toEqual(1);
  });
  it("sums positive integers", () => {
    expect(sum([1, 2, 3])).toEqual(6);
  });
  it("sums positive and negative integers", () => {
    expect(sum([-1, 2, -3])).toEqual(-2);
  });
  it("sums floats", () => {
    expect(sum([1.5, 2.5, 3.5])).toEqual(7.5);
    expect(sum([1.5, -2.5, 3.5])).toEqual(2.5);
  });
});

describe("prod", () => {
  it("returns 0 for empty array", () => {
    expect(prod([])).toEqual(1);
  });
  it("returns element if given array of length 1", () => {
    expect(prod([5])).toEqual(5);
  });
  it("sums positive integers", () => {
    expect(prod([8, 3, 5])).toEqual(120);
  });
  it("sums positive and negative integers", () => {
    expect(prod([-3, 2, -5])).toEqual(30);
    expect(prod([3, 2, -5])).toEqual(-30);
    expect(prod([3, 2, 5])).toEqual(30);
  });
  it("sums floats", () => {
    expect(prod([1.5, 2.5, 3.5])).toEqual(13.125);
    expect(prod([1.5, -2.5, 3.5])).toEqual(-13.125);
  });
});

describe("gcd", () => {
  it("returns 1 for coprime numbers", () => {
    expect(gcd(5, 7)).toEqual(1);
  });
  it("returns 1 for 1 and any number", () => {
    expect(gcd(1, 7)).toEqual(1);
  });
  it("returns largest number if one is multiple of the other", () => {
    expect(gcd(5, 10)).toEqual(5);
  });
  it("returns gcd for two numbers", () => {
    expect(gcd(12, 18)).toEqual(6);
  });
  it("returns the number if both are equal", () => {
    expect(gcd(5, 5)).toEqual(5);
  });
  it("returns positive gcd for negative numbers", () => {
    expect(gcd(-12, 18)).toEqual(6);
    expect(gcd(12, -18)).toEqual(6);
    expect(gcd(-12, -18)).toEqual(6);
  });
  it("returns the same gcd regardless of order", () => {
    expect(gcd(12, 18)).toEqual(gcd(18, 12));
  });
  it("returns gcd for floats", () => {
    expect(gcd(1.5, 4.5)).toEqual(1.5);
  })
});
