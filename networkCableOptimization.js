// Network Cable Optimization - Minimum Spanning Tree
// Implements both Kruskal's and Prim's algorithms

// Disjoint Set (Union-Find) for Kruskal's
class DisjointSet {
  constructor(vertices) {
    this.parent = {};
    this.rank = {};
    vertices.forEach(v => {
      this.parent[v] = v;
      this.rank[v] = 0;
    });
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// MinHeap for Prim's Algorithm
class MinHeap {
  constructor() { this.heap = []; }

  insert(node, cost) {
    this.heap.push({ node, cost });
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p].cost > this.heap[i].cost) {
        [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
        i = p;
      } else break;
    }
  }

  extractMin() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) { this.heap[0] = last; this.sinkDown(0); }
    return min;
  }

  sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let s = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.heap[l].cost < this.heap[s].cost) s = l;
      if (r < n && this.heap[r].cost < this.heap[s].cost) s = r;
      if (s !== i) { [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]]; i = s; }
      else break;
    }
  }

  isEmpty() { return this.heap.length === 0; }
}

// Kruskal's Algorithm
function kruskalMST(edges, vertices) {
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const ds = new DisjointSet(vertices);
  const mstEdges = [];
  let totalCost = 0;
  for (const edge of sorted) {
    if (ds.union(edge.from, edge.to)) {
      mstEdges.push(edge);
      totalCost += edge.weight;
      if (mstEdges.length === vertices.length - 1) break;
    }
  }
  return { mstEdges, totalCost };
}

// Prim's Algorithm
function primMST(graph, start) {
  const visited = new Set([start]);
  const heap = new MinHeap();
  const mstEdges = [];
  let totalCost = 0;
  for (const e of (graph[start] || [])) {
    heap.insert({ from: start, to: e.to, weight: e.weight }, e.weight);
  }
  while (!heap.isEmpty()) {
    const { node } = heap.extractMin();
    const { from, to, weight } = node;
    if (visited.has(to)) continue;
    visited.add(to);
    mstEdges.push({ from, to, weight });
    totalCost += weight;
    for (const e of (graph[to] || [])) {
      if (!visited.has(e.to)) {
        heap.insert({ from: to, to: e.to, weight: e.weight }, e.weight);
      }
    }
  }
  return { mstEdges, totalCost };
}

// Build adjacency list
function buildGraph(edges) {
  const graph = {};
  for (const { from, to, weight } of edges) {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    graph[from].push({ to, weight });
    graph[to].push({ to: from, weight });
  }
  return graph;
}

// Office Network Example
const officeConnections = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'C', weight: 5 },
  { from: 'B', to: 'D', weight: 10 },
  { from: 'C', to: 'D', weight: 3 },
  { from: 'C', to: 'E', weight: 8 },
  { from: 'D', to: 'E', weight: 7 }
];
const computers = ['A', 'B', 'C', 'D', 'E'];

console.log("=== Kruskal's Algorithm ===");
const { mstEdges: kEdges, totalCost: kCost } = kruskalMST(officeConnections, computers);
console.log("Selected connections:");
kEdges.forEach(e => console.log("  " + e.from + " -- " + e.to + ": " + e.weight + " meters"));
console.log("Total cable cost: " + kCost + " meters\n");

console.log("=== Prim's Algorithm ===");
const graph = buildGraph(officeConnections);
const { mstEdges: pEdges, totalCost: pCost } = primMST(graph, 'A');
console.log("Selected connections:");
pEdges.forEach(e => console.log("  " + e.from + " -- " + e.to + ": " + e.weight + " meters"));
console.log("Total cable cost: " + pCost + " meters\n");

// Bonus: Dynamic Network Optimizer
class NetworkOptimizer {
  constructor() {
    this.edges = [];
    this.vertices = new Set();
  }
  addConnection(from, to, cost) {
    this.vertices.add(from);
    this.vertices.add(to);
    this.edges.push({ from, to, weight: cost });
    console.log("Added: " + from + " -- " + to + " (cost: " + cost + ")");
  }
  optimize(algorithm = 'kruskal') {
    const vArray = Array.from(this.vertices);
    let result;
    if (algorithm === 'kruskal') {
      result = kruskalMST(this.edges, vArray);
    } else {
      const g = buildGraph(this.edges);
      result = primMST(g, vArray[0]);
    }
    console.log("\n=== Optimized Network (" + algorithm + ") ===");
    result.mstEdges.forEach(e => console.log("  " + e.from + " -- " + e.to + ": " + e.weight));
    console.log("Total cost: " + result.totalCost);
  }
}

const network = new NetworkOptimizer();
network.addConnection('Server', 'PC1', 3);
network.addConnection('Server', 'PC2', 6);
network.addConnection('PC1', 'PC2', 2);
network.addConnection('PC1', 'PC3', 5);
network.addConnection('PC2', 'PC3', 4);
network.optimize('kruskal');
network.optimize('prim');
