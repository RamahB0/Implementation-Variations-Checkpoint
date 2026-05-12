/**
 * Dijkstra's Algorithm Implementation in JavaScript
 */

function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const previousVertices = {};

  for (const vertex in graph) {
    distances[vertex] = Infinity;
    previousVertices[vertex] = null;
  }
  distances[start] = 0;

  while (true) {
    let currentVertex = null;
    let minDistance = Infinity;

    for (const vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        currentVertex = vertex;
      }
    }

    if (currentVertex === null) break;

    visited.add(currentVertex);

    const neighbors = graph[currentVertex];
    for (const neighbor in neighbors) {
      if (!visited.has(neighbor)) {
        const newDistance = distances[currentVertex] + neighbors[neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previousVertices[neighbor] = currentVertex;
        }
      }
    }
  }

  return distances;
}

// Test Cases

// Test 1: Basic graph from the problem description
const graph1 = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'C': 5, 'D': 10 },
  'C': { 'A': 2, 'B': 5, 'D': 3 },
  'D': { 'B': 10, 'C': 3 }
};

console.log("Test 1: Basic graph");
const result1 = dijkstra(graph1, 'A');
console.log("Shortest distances from A:", result1);
// Expected: { A: 0, B: 4, C: 2, D: 5 }

// Test 2: More complex graph
const graph2 = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'C': 1, 'D': 5 },
  'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
  'D': { 'B': 5, 'C': 8, 'E': 2, 'F': 6 },
  'E': { 'C': 10, 'D': 2, 'F': 3 },
  'F': { 'D': 6, 'E': 3 }
};

console.log("\nTest 2: Complex graph");
const result2 = dijkstra(graph2, 'A');
console.log("Shortest distances from A:", result2);
// Expected: A:0, B:3, C:2, D:8, E:10, F:13

// Test 3: Single vertex
const graph3 = {
  'A': {}
};

console.log("\nTest 3: Single vertex");
const result3 = dijkstra(graph3, 'A');
console.log("Shortest distances from A:", result3);
// Expected: { A: 0 }
