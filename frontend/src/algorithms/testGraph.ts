
import { bfs, dfs, dijkstra } from "./graph";

const start = "Main Gate";
const destination = "Library";

console.log("\n--- BFS ---");
console.log(bfs(start, destination));

console.log("\n--- DFS ---");
console.log(dfs(start, destination));

console.log("\n--- Dijkstra ---");
console.log(dijkstra(start, destination));
