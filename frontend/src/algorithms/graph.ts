
export type Edge = {
  to: string;
  distance: number;
};

export type Graph = Record<string, Edge[]>;

export type RouteResult = {
  path: string[];
  distance: number;
  visitedOrder: string[];
};

// Illustrative campus connections and distances in metres.
// Replace these with verified walkable campus paths later.
export const campusGraph: Graph = {
  "Main Gate": [
    { to: "Academic Block", distance: 300 },
    { to: "Admin Block", distance: 220 },
  ],

  "Academic Block": [
    { to: "Main Gate", distance: 300 },
    { to: "Library", distance: 180 },
    { to: "Technology Tower", distance: 150 },
    { to: "Food Court", distance: 250 },
  ],

  Library: [
    { to: "Academic Block", distance: 180 },
    { to: "Technology Tower", distance: 120 },
    { to: "Food Court", distance: 200 },
  ],

  "Food Court": [
    { to: "Academic Block", distance: 250 },
    { to: "Library", distance: 200 },
    { to: "Hostel Zone", distance: 350 },
    { to: "Sports Complex", distance: 400 },
  ],

  "Technology Tower": [
    { to: "Academic Block", distance: 150 },
    { to: "Library", distance: 120 },
    { to: "Admin Block", distance: 280 },
  ],

  "Hostel Zone": [
    { to: "Food Court", distance: 350 },
    { to: "Sports Complex", distance: 250 },
  ],

  "Sports Complex": [
    { to: "Hostel Zone", distance: 250 },
    { to: "Food Court", distance: 400 },
    { to: "Admin Block", distance: 300 },
  ],

  "Admin Block": [
    { to: "Main Gate", distance: 220 },
    { to: "Technology Tower", distance: 280 },
    { to: "Sports Complex", distance: 300 },
  ],
};

// Reconstruct a route using the parent of each visited node.
function buildPath(
  parent: Record<string, string | null>,
  destination: string
): string[] {
  const path: string[] = [];
  let current: string | null = destination;

  while (current !== null) {
    path.push(current);
    current = parent[current];
  }

  return path.reverse();
}

// Breadth-First Search: finds a path with the fewest edges.
// It does not guarantee minimum total distance.
export function bfs(start: string, destination: string): RouteResult {
  const queue: string[] = [start];
  let head = 0;

  const visited = new Set<string>([start]);
  const parent: Record<string, string | null> = { [start]: null };
  const visitedOrder: string[] = [];

  while (head < queue.length) {
    const current = queue[head++];
    visitedOrder.push(current);

    if (current === destination) break;

    for (const edge of campusGraph[current] ?? []) {
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        parent[edge.to] = current;
        queue.push(edge.to);
      }
    }
  }

  if (!visited.has(destination)) {
    return { path: [], distance: Infinity, visitedOrder };
  }

  const path = buildPath(parent, destination);
  const distance = calculatePathDistance(path);

  return { path, distance, visitedOrder };
}

// Depth-First Search: finds the first path reached by DFS.
export function dfs(start: string, destination: string): RouteResult {
  const visited = new Set<string>();
  const parent: Record<string, string | null> = { [start]: null };
  const visitedOrder: string[] = [];

  function explore(current: string): boolean {
    visited.add(current);
    visitedOrder.push(current);

    if (current === destination) return true;

    for (const edge of campusGraph[current] ?? []) {
      if (!visited.has(edge.to)) {
        parent[edge.to] = current;

        if (explore(edge.to)) {
          return true;
        }
      }
    }

    return false;
  }

  const found = explore(start);

  if (!found) {
    return { path: [], distance: Infinity, visitedOrder };
  }

  const path = buildPath(parent, destination);

  return {
    path,
    distance: calculatePathDistance(path),
    visitedOrder,
  };
}

// Calculate the total weight of a route.
export function calculatePathDistance(path: string[]): number {
  let total = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const edge = (campusGraph[path[i]] ?? []).find(
      (item) => item.to === path[i + 1]
    );

    if (!edge) return Infinity;

    total += edge.distance;
  }

  return total;
}

// Dijkstra: finds the minimum-distance path for non-negative weights.
export function dijkstra(
  start: string,
  destination: string
): RouteResult {
  const distances: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const unvisited = new Set(Object.keys(campusGraph));
  const visitedOrder: string[] = [];

  for (const node of unvisited) {
    distances[node] = Infinity;
    parent[node] = null;
  }

  if (!(start in campusGraph) || !(destination in campusGraph)) {
    return { path: [], distance: Infinity, visitedOrder };
  }

  distances[start] = 0;

  while (unvisited.size > 0) {
    let current: string | null = null;
    let minimum = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minimum) {
        minimum = distances[node];
        current = node;
      }
    }

    if (current === null) break;

    unvisited.delete(current);
    visitedOrder.push(current);

    if (current === destination) break;

    for (const edge of campusGraph[current] ?? []) {
      if (!unvisited.has(edge.to)) continue;

      const candidate = distances[current] + edge.distance;

      if (candidate < distances[edge.to]) {
        distances[edge.to] = candidate;
        parent[edge.to] = current;
      }
    }
  }

  if (!Number.isFinite(distances[destination])) {
    return { path: [], distance: Infinity, visitedOrder };
  }

  return {
    path: buildPath(parent, destination),
    distance: distances[destination],
    visitedOrder,
  };
}
