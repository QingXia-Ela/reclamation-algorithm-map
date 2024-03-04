import { expect, test } from 'vitest'
import { getShortestPathNodeIdArray, getShortestPathNodeIdArrayWithDirected } from "../../../src/three/utils/algorithm/findShortestRoad";

test('getShortestPathNodeIdArray', () => {
  const graph = {
    1: [2],
    2: [1],
  }

  expect(getShortestPathNodeIdArray(graph, String(1), String(2))).toEqual([String(1), String(2)])
})