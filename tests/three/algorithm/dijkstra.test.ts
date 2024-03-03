import { expect, test } from 'vitest'
import { getShortestPathNodeIdArray, getShortestPathNodeIdArrayWithDirected } from "../../../src/three/utils/algorithm/findShortestRoad";

test('getShortestPathNodeIdArray', () => {
  const graph = {
    1: [2],
    2: [3],
    3: [4],
    4: [5],
    5: [6],
    6: [7],
    7: [8],
    8: [9],
    9: [10],
  }

  expect(getShortestPathNodeIdArrayWithDirected(graph, String(1), String(10))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})