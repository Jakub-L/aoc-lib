import { MinHeap } from "../data-structures";

type GridDijkstraOptions = {
  start?: number[];
  end?: number[];
  allowDiagonals?: boolean;
};

type QueueValue = { x: number; y: number; dist: number };
type QueueNode = { priority: number; val: QueueValue };

/**
 * Searches through a grid of numbers using Dijkstra's algorithm to find the shortest path between
 * the start and end. Assumes only vertical and horizontal movement is allowed.
 * @param {number[][]} grid - 2D array of numbers representing the cost to enter a grid point
 * @param {GridDijkstraOptions} options - Options for the search
 * @param {number[]} [options.start=[0,0]] - The starting coordinates of the search [y, x]
 * @param {number[]} [options.end=[grid.length - 1, grid[0].length - 1]] - The end coordinates of the search [y, x]
 * @param {boolean} [options.allowDiagonals=false] - Whether or not to allow diagonal movement
 * @returns {number} The distance from start to end, or -1 if no path could be found
 */
export const gridDijkstra = (grid: number[][], options: GridDijkstraOptions = {}): number => {
  const { start = [0, 0], end = [grid.length - 1, grid[0].length - 1], allowDiagonals = false } = options;
  const neighbours = getNeighbours(allowDiagonals);
  const visited = new Set();
  const [y0, x0] = start;
  const [yt, xt] = end;
  const queue: MinHeap<QueueValue> = new MinHeap([{ priority: 0, val: { x: x0, y: y0, dist: 0 } }]);

  while (!queue.isEmpty) {
    const { x, y, dist } = (queue.pop() as QueueNode).val;
    // If we made it to the end, return distance to it
    if (x === xt && y === yt) return dist;
    // Otherwise, check every neighbour
    for (let [dx, dy] of neighbours) {
      const [xx, yy] = [x + dx, y + dy];
      // If point is outside grid bounds or has been visited, skip it
      if (grid[yy]?.[xx] === undefined || visited.has(`${xx},${yy}`)) continue;
      // Otherwise mark the point as visited and add it to the queue of vertices to check
      visited.add(`${xx},${yy}`);
      const newDist = dist + grid[yy][xx];
      queue.add({ priority: newDist, val: { x: xx, y: yy, dist: newDist } });
    }
  }
  return -1;
};

/**
 * Returns an array of neighbouring coordinates for a given cell, optionally including diagonals.
 * @param allowDiagonals - Whether or not to include diagonal neighbours.
 * @returns An array of neighbouring coordinates.
 */
export const getNeighbours = (allowDiagonals: boolean) => {
  // prettier-ignore
  return allowDiagonals
    ? [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    : [[-1, 0], [0, -1], [0, 1], [1, 0]];
};
