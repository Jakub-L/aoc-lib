import { expect } from "chai";
import { split } from "../src/input-parsing/read-file";

describe("split", () => {
  it("returns the original string if given no delimiters", () => {
    expect(split("Hello World")).to.equal("Hello World");
  });
});
