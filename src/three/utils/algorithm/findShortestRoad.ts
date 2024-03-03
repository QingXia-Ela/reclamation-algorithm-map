import MapCore from "@/three/core";
import Line from "@/three/object/components/line";

type NodeId = string;
type AdjacencyList = Record<NodeId, number[]>;

function getShortestPathNodeIdArray(graph: AdjacencyList, start: NodeId, end: NodeId): NodeId[] {
  const distances: Record<NodeId, number> = {};
  const previous: Record<NodeId, NodeId | null> = {};
  const nodes: NodeId[] = [];

  // Initialize distances, previous, and nodes array
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
    nodes.push(node);
  }

  while (nodes.length > 0) {
    // Sort nodes by distance
    nodes.sort((a, b) => distances[a] - distances[b]);

    // Choose the node with the smallest distance
    const closestNode = nodes.shift()!;
    if (closestNode === end) {
      break; // We've reached the destination
    }

    // Explore neighbours
    const neighbours = graph[closestNode];
    for (const neighbour of neighbours) {
      const alt = distances[closestNode] + 1; // Assuming each edge has a weight of 1
      if (alt < distances[neighbour]) {
        distances[neighbour] = alt;
        previous[neighbour] = closestNode;
      }
    }
  }

  // Reconstruct the shortest path
  const path: NodeId[] = [];
  let currentNode: NodeId | null = end;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return path;
}

// A helper function to find the shortest path using Dijkstra's algorithm
function dijkstra(adjancyList: AdjacencyList, nodeMap: Record<string, Node>, sourceEdges: Record<string, Line>, startId: number, endId: number): {
  nodes: Node[],
  edges: Line[],
} {
  const ids = getShortestPathNodeIdArray(adjancyList, startId.toString(), endId.toString())

  const nodes = ids.map(id => nodeMap[id])
  const edges = ids.map((id, index) => {
    if (index === 0) {
      return null
    }
    return sourceEdges[`${ids[index - 1]}-${id}`]
  }).filter(Boolean) as Line[]

  return { nodes, edges }
}

/**
 * 查询两个节点间的最短路径
 * 
 * @param core 地图核心
 * @param start 起点ID
 * @param end 终点ID
 * 
 * @returns 路径上的所有3D对象 (节点和边)，你可以对所有的对象调用高亮方法进行高亮展示
 */
export default function findShortestRoad(core: MapCore, start: number, end: number) {
  const { edges, nodeMap, adjancyList } = core.DataHandle
  return dijkstra(adjancyList, nodeMap, edges, start, end)
}