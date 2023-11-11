import * as fs from "fs";
import { split, readFile } from "../src/input-parsing/read-file";

describe("read-file", () => {
  describe("readFile", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("splits file by line if no delimiters provided", () => {
      jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => "Hello World\nHello Mum");
      expect(readFile("")).toEqual(["Hello World", "Hello Mum"]);
    });
    it("uses an identity function as default converter", () => {
      jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => "1\n2");
      expect(readFile("", ["\n"])).toEqual(["1", "2"]);
    });
    it("allows custom converter function", () => {
      jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => "1\n2");
      expect(readFile("", ["\n"], Number)).toEqual([1, 2]);
    });
  });

  describe("split", () => {
    it("returns the original string if given no delimiters", () => {
      expect(split("Hello World")).toBe("Hello World");
    });
    it("returns the original string if given empty array of delimiters", () => {
      expect(split("Hello World", [])).toBe("Hello World");
    });
    it("returns array with original string if delimiter not in string", () => {
      expect(split("Hello World", ["\n"])).toEqual(["Hello World"]);
    });
    it("splits string by delimiter if given single delimiter", () => {
      expect(split("Hello World Today", [" "])).toEqual(["Hello", "World", "Today"]);
    });
    it("splits string by multiple delimiters", () => {
      expect(split("Hello World\nHello Mum", ["\n", " "])).toEqual([
        ["Hello", "World"],
        ["Hello", "Mum"]
      ]);
    });
    it("returns 1-dimensional array if provided 1-length delimiter", () => {
      expect(split("Hello World", [" "])).toBeInstanceOf(Array);
    });
    it("returns 2-dimensional array if provided 2-length delimiter", () => {
      const result = split("Hello World", [" ", " "]);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Array);
    });
    it("returns 3-dimensional array if provided 3-length delimiter", () => {
      const result = split("Hello World", [" ", " ", " "]);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][0]).toBeInstanceOf(Array);
    });
    it("applies converter function to input string if given no delimiters", () => {
      expect(split("Hello World", [], s => s.toUpperCase())).toBe("HELLO WORLD");
    });
    it("applies converter function only once all splitting completes", () => {
      expect(split("123 456", [" ", ""], Number)).toEqual([
        [1, 2, 3],
        [4, 5, 6]
      ]);
    });
  });
});
