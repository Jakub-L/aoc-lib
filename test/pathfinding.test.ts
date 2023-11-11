import { getNeighbours, gridDijkstra } from "../src/pathfinding/dijkstra";

describe("dijkstra", () => {
  describe("getNeighbours", () => {
    it("returns 4 neighbours if allowDiagonals is false", () => {
      expect(getNeighbours(false)).toHaveLength(4);
    });
    it("returns 8 neighbours if allowDiagonals is true", () => {
      expect(getNeighbours(true)).toHaveLength(8);
    });
  });

  describe("gridDijkstra", () => {
    it("calculates distance if not allowed diagonal movement", () => {
      const grid = [
        [0, 1, 1],
        [5, 5, 1],
        [1, 1, 1]
      ];
      expect(gridDijkstra(grid)).toBe(4);
    });
    it("calculates distance if allowed diagonal movement", () => {
      const grid = [
        [0, 1, 1],
        [5, 5, 1],
        [1, 1, 1]
      ];
      const options = { allowDiagonals: true };
      expect(gridDijkstra(grid, options)).toBe(3);
    });
    it("returns -1 if target is outside the grid", () => {
      const grid = [
        [0, 1, 1],
        [5, 5, 1],
        [1, 1, 1]
      ];
      const options = { end: [5, 5] };
      expect(gridDijkstra(grid, options)).toBe(-1);
    });
    it("allows custom starting position", () => {
      const grid = [
        [0, 1, 1],
        [5, 5, 1],
        [1, 1, 1]
      ];
      const options = { start: [0, 1] };
      expect(gridDijkstra(grid, options)).toBe(3);
    });
    it("allows custom target position", () => {
      const grid = [
        [0, 1, 1],
        [5, 5, 1],
        [1, 1, 1]
      ];
      const options = { end: [1, 1] };
      expect(gridDijkstra(grid, options)).toBe(6);
    });
  });
});
