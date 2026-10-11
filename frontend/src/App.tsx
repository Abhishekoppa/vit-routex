import { useState } from "react";
import "./App.css";

import {
  bfs,
  dfs,
  dijkstra,
  type RouteResult,
} from "./algorithms/graph";


type Location = {
  name: string;
  category: string;
  icon: string;
};

const locations: Location[] = [
  { name: "Main Gate", category: "Entrance", icon: "🚪" },
  { name: "Academic Block", category: "Academic", icon: "🏛️" },
  { name: "Library", category: "Academic", icon: "📚" },
  { name: "Food Court", category: "Dining", icon: "🍽️" },
  { name: "Technology Tower", category: "Academic", icon: "💻" },
  { name: "Hostel Zone", category: "Residential", icon: "🏠" },
  { name: "Sports Complex", category: "Sports", icon: "🏟️" },
  { name: "Admin Block", category: "Administration", icon: "🏢" },
];

function App() {
  const [start, setStart] = useState("Main Gate");
  const [destination, setDestination] = useState("Library");
  const [algorithm, setAlgorithm] = useState("Dijkstra");

  
const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

function findRoute() {
  if (start === destination) {
    alert("Please select two different locations.");
    return;
  }

  let result: RouteResult;

  switch (algorithm) {
    case "BFS":
      result = bfs(start, destination);
      break;

    case "DFS":
      result = dfs(start, destination);
      break;

    default:
      result = dijkstra(start, destination);
  }

  setRouteResult(result);
}


  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">R</div>
          <div>
            <h2>RouteX</h2>
            <span>VIT CAMPUS NAVIGATOR</span>
          </div>
        </div>

        <div className="side-label">WORKSPACE</div>
        <button className="nav-item active">⌂ <span>Dashboard</span></button>
        <button className="nav-item">⌖ <span>Find a Route</span></button>
        <button className="nav-item">◈ <span>DSA Visualizer</span></button>
        <button className="nav-item">▤ <span>Locations</span></button>

        <div className="side-label algorithm-label">ALGORITHMS</div>
        <div className="algorithm-link"><span className="dot green" /> Breadth-First Search</div>
        <div className="algorithm-link"><span className="dot blue" /> Depth-First Search</div>
        <div className="algorithm-link"><span className="dot purple" /> Dijkstra's Algorithm</div>

        <div className="sidebar-bottom">
          <div className="campus-badge">V</div>
          <div>
            <strong>VIT Vellore</strong>
            <span>Campus Edition</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / <strong>Dashboard</strong></div>
            <h1>Campus Navigator</h1>
          </div>
          <div className="topbar-right">
            <span className="status"><span className="dot green" /> SYSTEM ONLINE</span>
            <div className="avatar">RX</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="eyebrow">SMART CAMPUS NAVIGATION</span>
            <h2>Every destination, <span>one optimal path.</span></h2>
            <p>Explore VIT Vellore with graph algorithms. Find routes, understand the logic, and watch data structures in action.</p>
            <div className="welcome-tags">
              <span>✦ Graph Theory</span>
              <span>⌁ Shortest Path</span>
              <span>◉ Live Visualization</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-node node-one">A</div>
            <div className="hero-node node-two">B</div>
            <div className="hero-node node-three">C</div>
            <div className="hero-node node-four">D</div>
            <div className="hero-node node-center">⌖</div>
            <svg viewBox="0 0 260 210" className="hero-lines">
              <path d="M45 55 L125 100 L210 38 M125 100 L205 165 L65 170 L45 55 M125 100 L210 38" />
            </svg>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top"><span>LOCATIONS</span><span className="stat-icon">⌖</span></div>
            <strong>08</strong>
            <p>Campus destinations</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>ALGORITHMS</span><span className="stat-icon">⌘</span></div>
            <strong>03</strong>
            <p>Traversal & shortest path</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>GRAPH TYPE</span><span className="stat-icon">◈</span></div>
            <strong className="stat-word">Weighted</strong>
            <p>Graph representation planned</p>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span>PROJECT STATUS</span><span className="stat-icon">✓</span></div>
            <strong className="stat-word">Building</strong>
            <p>Frontend development</p>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel route-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">PLAN YOUR JOURNEY</span>
                <h3>Find the best route</h3>
              </div>
              <span className="panel-icon">⌁</span>
            </div>

            <label htmlFor="start">STARTING LOCATION</label>
            <select id="start" value={start} onChange={(e) => {
              setStart(e.target.value);
              setRouteResult(null);
            }}>
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.icon} {location.name}
                </option>
              ))}
            </select>

            <div className="route-connector"><span /><span /><span /></div>

            <label htmlFor="destination">DESTINATION</label>
            <select id="destination" value={destination} onChange={(e) => {
              setDestination(e.target.value);
              setRouteResult(null);
            }}>
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.icon} {location.name}
                </option>
              ))}
            </select>

            <label htmlFor="algorithm">PATHFINDING ALGORITHM</label>
            <select id="algorithm" value={algorithm} onChange={(e) => {
              setAlgorithm(e.target.value);
              setRouteResult(null);
            }}>
              <option value="Dijkstra">Dijkstra's Algorithm</option>
              <option value="BFS">Breadth-First Search (BFS)</option>
              <option value="DFS">Depth-First Search (DFS)</option>
            </select>

            <button className="primary-button" onClick={findRoute}>
              Find Route <span>→</span>
            </button>

            
{routeResult && (
  <div className="result-panel">
    <div className="result-heading">
      <span className="eyebrow">ROUTE CALCULATION</span>
      <span className="result-status">CALCULATED</span>
    </div>

    {routeResult.path.length > 0 ? (
      <>
        <h4>Recommended route</h4>

        <div className="result-metric">
          <span>Total distance</span>
          <strong>{routeResult.distance} m</strong>
        </div>

        <div className="result-metric">
          <span>Locations in path</span>
          <strong>{routeResult.path.length}</strong>
        </div>

        <div className="result-metric">
          <span>Nodes visited</span>
          <strong>{routeResult.visitedOrder.length}</strong>
        </div>

        <div className="path-list">
          {routeResult.path.map((location, index) => (
            <div className="path-step" key={`${location}-${index}`}>
              <span className="path-number">{index + 1}</span>
              <span>{location}</span>
            </div>
          ))}
        </div>
      </>
    ) : (
      <p>No route exists between these locations.</p>
    )}

    <div className="visited-section">
      <strong>Traversal order</strong>
      <p>{routeResult.visitedOrder.join(" → ")}</p>
    </div>

    <small>
      Algorithm: {algorithm === "Dijkstra"
        ? "Dijkstra's Algorithm"
        : algorithm === "BFS"
          ? "Breadth-First Search"
          : "Depth-First Search"}
    </small>
  </div>
)}

          </div>

          <div className="panel map-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">CAMPUS OVERVIEW</span>
                <h3>Graph workspace</h3>
              </div>
              <span className="live-badge">● PREVIEW</span>
            </div>

            <div className="map-canvas">
              <div className="map-grid" />
              <svg className="graph-edges" viewBox="0 0 600 350" preserveAspectRatio="none">
                <path d="M75 175 L185 90 L300 140 L415 65 L520 125 M185 90 L175 250 L300 140 L360 270 L480 245 L520 125 M175 250 L300 305 L360 270 M300 140 L480 245" />
              </svg>
              <div className="map-node" style={{ left: "9%", top: "43%" }}><span>01</span><small>Main Gate</small></div>
              <div className="map-node" style={{ left: "28%", top: "18%" }}><span>02</span><small>Academic</small></div>
              <div className="map-node selected-node" style={{ left: "47%", top: "33%" }}><span>03</span><small>Library</small></div>
              <div className="map-node" style={{ left: "67%", top: "12%" }}><span>04</span><small>Tech Tower</small></div>
              <div className="map-node" style={{ left: "82%", top: "29%" }}><span>05</span><small>Food Court</small></div>
              <div className="map-node" style={{ left: "27%", top: "67%" }}><span>06</span><small>Hostels</small></div>
              <div className="map-node" style={{ left: "57%", top: "79%" }}><span>07</span><small>Sports</small></div>
              <div className="map-node" style={{ left: "76%", top: "67%" }}><span>08</span><small>Admin</small></div>
              <div className="map-caption">ILLUSTRATIVE GRAPH · NOT A GEOGRAPHICALLY ACCURATE MAP</div>
            </div>
            <div className="map-legend">
              <span><i className="legend-dot" /> Locations</span>
              <span><i className="legend-line" /> Connections</span>
              <span><i className="legend-selected" /> Selected node</span>
            </div>
          </div>
        </section>

        <section className="panel algorithm-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">LEARN BY VISUALIZING</span>
              <h3>Algorithm laboratory</h3>
            </div>
            <span className="lab-label">DSA MODULES</span>
          </div>
          <div className="algorithm-cards">
            <div className="algorithm-card">
              <div className="algo-symbol green-bg">BFS</div>
              <div><h4>Breadth-First Search</h4><p>Explore nodes level by level using a queue.</p><span className="complexity">O(V + E)</span></div>
              <span className="card-arrow">↗</span>
            </div>
            <div className="algorithm-card">
              <div className="algo-symbol blue-bg">DFS</div>
              <div><h4>Depth-First Search</h4><p>Explore deeper paths using a stack or recursion.</p><span className="complexity">O(V + E)</span></div>
              <span className="card-arrow">↗</span>
            </div>
            <div className="algorithm-card">
              <div className="algo-symbol purple-bg">D</div>
              <div><h4>Dijkstra's Algorithm</h4><p>Find minimum-cost paths with non-negative weights.</p><span className="complexity">O((V + E) log V)*</span></div>
              <span className="card-arrow">↗</span>
            </div>
          </div>
          <p className="footnote">* With an adjacency list and binary min-heap priority queue. Complexity depends on the implementation.</p>
        </section>

        <footer>RouteX <span>·</span> DSA Academic Project <span>·</span> MCA, VIT Vellore</footer>
      </main>
    </div>
  );
}

export default App;
