// Métricas de red: densidad, grados, betweenness, closeness, eigenvector, aislados, articulación
import type { Network, NetworkEdge, NetworkNode, Legajo } from '../core/types';

export interface DegreeMetrics {
in: Map<Legajo, number>;
out: Map<Legajo, number>;
total: Map<Legajo, number>;
inWeighted: Map<Legajo, number>;
outWeighted: Map<Legajo, number>;
}

export interface NodeMetrics {
legajo: Legajo;
degreeIn: number;
degreeOut: number;
degreeTotal: number;
inWeighted: number;
outWeighted: number;
betweenness: number;
closeness: number;       // closeness armónica
eigenvector: number;     // centralidad por potencia (sobre in-links)
isIsolate: boolean;
isArticulation: boolean; // nodo de articulación (en versión no dirigida)
}

export interface MetricsResult {
nodes: NodeMetrics[];
summary: {
n_nodes: number;
n_edges: number;
density: number;
avg_degree: number;
};
}

/** Construye listas auxiliares */
function uniqueNodes(network: Network): Legajo[] {
return [...new Set(network.nodes.map(n => n.legajo))];
}

function adjacency(network: Network) {
const adj = new Map<Legajo, Legajo[]>();
const inAdj = new Map<Legajo, Legajo[]>();
for (const n of network.nodes) {
adj.set(n.legajo, []);
inAdj.set(n.legajo, []);
}
for (const e of network.edges) {
adj.get(e.from)?.push(e.to);
inAdj.get(e.to)?.push(e.from);
}
return { adj, inAdj };
}

function undirectedAdjacency(network: Network) {
const adj = new Map<Legajo, Set<Legajo>>();
for (const n of network.nodes) adj.set(n.legajo, new Set<Legajo>());
for (const e of network.edges) {
adj.get(e.from)?.add(e.to);
adj.get(e.to)?.add(e.from);
}
return adj;
}

/** Densidad para grafo dirigido sin loops */
export function density(network: Network): number {
const n = network.nodes.length;
const m = network.edges.length;
return n > 1 ? m / (n * (n - 1)) : 0;
}

/** Grados in/out (+ ponderados) */
export function degree(network: Network): DegreeMetrics {
const din = new Map<Legajo, number>();
const dout = new Map<Legajo, number>();
const dtotal = new Map<Legajo, number>();
const inW = new Map<Legajo, number>();
const outW = new Map<Legajo, number>();

for (const n of network.nodes) {
din.set(n.legajo, 0); dout.set(n.legajo, 0); dtotal.set(n.legajo, 0);
inW.set(n.legajo, 0); outW.set(n.legajo, 0);
}
for (const e of network.edges) {
din.set(e.to, (din.get(e.to) || 0) + 1);
dout.set(e.from, (dout.get(e.from) || 0) + 1);
dtotal.set(e.to, (dtotal.get(e.to) || 0) + 1);
dtotal.set(e.from, (dtotal.get(e.from) || 0) + 1);
inW.set(e.to, (inW.get(e.to) || 0) + e.weight);
outW.set(e.from, (outW.get(e.from) || 0) + e.weight);
}
return { in: din, out: dout, total: dtotal, inWeighted: inW, outWeighted: outW };
}

/** Betweenness (Brandes) para grafo dirigido no ponderado */
export function betweennessCentrality(network: Network): Map<Legajo, number> {
const V = uniqueNodes(network);
const { adj } = adjacency(network);
const Cb = new Map<Legajo, number>(); V.forEach(v => Cb.set(v, 0));

for (const s of V) {
const S: Legajo[] = [];
const P = new Map<Legajo, Legajo[]>();
const sigma = new Map<Legajo, number>();
const d = new Map<Legajo, number>();
V.forEach(v => { P.set(v, []); sigma.set(v, 0); d.set(v, -1); });
sigma.set(s, 1); d.set(s, 0);

const Q: Legajo[] = [s];
while (Q.length) {
  const v = Q.shift()!;
  S.push(v);
  for (const w of (adj.get(v) || [])) {
    if (d.get(w)! < 0) { Q.push(w); d.set(w, d.get(v)! + 1); }
    if (d.get(w)! === d.get(v)! + 1) {
      sigma.set(w, sigma.get(w)! + sigma.get(v)!);
      P.get(w)!.push(v);
    }
  }
}

const delta = new Map<Legajo, number>(); V.forEach(v => delta.set(v, 0));
while (S.length) {
  const w = S.pop()!;
  for (const v of (P.get(w) || [])) {
    const c = (sigma.get(v)! / sigma.get(w)!) * (1 + delta.get(w)!);
    delta.set(v, delta.get(v)! + c);
  }
  if (w !== s) Cb.set(w, Cb.get(w)! + delta.get(w)!);
}

}
// normalización opcional: dividir por ((n-1)(n-2)) para dirigido
const n = V.length;
const norm = (n > 2) ? (1 / ((n - 1) * (n - 2))) : 1;
V.forEach(v => Cb.set(v, Cb.get(v)! * norm));
return Cb;
}

/** Closeness armónica (suma de 1/dist) para manejar no-conectados */
export function harmonicCloseness(network: Network): Map<Legajo, number> {
const V = uniqueNodes(network);
const { adj } = adjacency(network);
const C = new Map<Legajo, number>(); V.forEach(v => C.set(v, 0));

function bfsDistances(source: Legajo): Map<Legajo, number> {
const dist = new Map<Legajo, number>();
V.forEach(v => dist.set(v, Infinity));
dist.set(source, 0);
const Q: Legajo[] = [source];
while (Q.length) {
const v = Q.shift()!;
const dv = dist.get(v)!;
for (const w of (adj.get(v) || [])) {
if (dist.get(w)! === Infinity) { dist.set(w, dv + 1); Q.push(w); }
}
}
return dist;
}

for (const s of V) {
const dist = bfsDistances(s);
let sum = 0;
for (const t of V) {
if (t === s) continue;
const d = dist.get(t)!;
if (Number.isFinite(d) && d > 0) sum += 1 / d;
}
C.set(s, sum);
}
// normalización opcional por n-1
const n = V.length;
if (n > 1) V.forEach(v => C.set(v, C.get(v)! / (n - 1)));
return C;
}

/** Eigenvector centrality por iteración de potencia (sobre in-links) */
export function eigenvectorCentrality(network: Network, maxIter = 100, tol = 1e-6): Map<Legajo, number> {
const V = uniqueNodes(network);
const { inAdj } = adjacency(network);
const x = new Map<Legajo, number>(); V.forEach(v => x.set(v, 1 / V.length));

for (let it = 0; it < maxIter; it++) {
// y = A^T x  (por eso usamos inAdj)
const y = new Map<Legajo, number>(); V.forEach(v => y.set(v, 0));
for (const v of V) {
let sum = 0;
for (const u of (inAdj.get(v) || [])) sum += x.get(u)!;
y.set(v, sum);
}
// normalizar
const norm = Math.hypot(...V.map(v => y.get(v)!)) || 1;
let delta = 0;
for (const v of V) {
const nv = y.get(v)! / norm;
delta = Math.max(delta, Math.abs(nv - x.get(v)!));
x.set(v, nv);
}
if (delta < tol) break;
}
return x;
}

/** Nodos aislados (grado total 0) */
export function isolates(network: Network): Set<Legajo> {
const deg = new Map<Legajo, number>();
for (const n of network.nodes) deg.set(n.legajo, 0);
for (const e of network.edges) {
deg.set(e.from, (deg.get(e.from) || 0) + 1);
deg.set(e.to, (deg.get(e.to) || 0) + 1);
}
const out = new Set<Legajo>();
for (const [id, d] of deg) if (d === 0) out.add(id);
return out;
}

/** Nodos de articulación (versión no dirigida) por DFS (Tarjan) */
export function articulationPoints(network: Network): Set<Legajo> {
const adj = undirectedAdjacency(network);
const disc = new Map<Legajo, number>();
const low = new Map<Legajo, number>();
const parent = new Map<Legajo, Legajo | null>();
const ap = new Set<Legajo>();
let time = 0;

for (const u of adj.keys()) {
disc.set(u, -1); low.set(u, -1); parent.set(u, null);
}

function dfs(u: Legajo) {
disc.set(u, ++time);
low.set(u, disc.get(u)!);
let children = 0;

for (const v of adj.get(u)!) {
  if (disc.get(v)! === -1) {
    parent.set(v, u); children++;
    dfs(v);
    low.set(u, Math.min(low.get(u)!, low.get(v)!));
    // regla 1: u es raíz con >=2 hijos
    if (parent.get(u) === null && children > 1) ap.add(u);
    // regla 2: u no raíz y low[v] >= disc[u]
    if (parent.get(u) !== null && low.get(v)! >= disc.get(u)!) ap.add(u);
  } else if (v !== parent.get(u)) {
    // back-edge
    low.set(u, Math.min(low.get(u)!, disc.get(v)!));
  }
}

}

for (const u of adj.keys()) {
if (disc.get(u)! === -1) dfs(u);
}
return ap;
}

/** Calcula todas las métricas nodales y resumen */
export function computeAllMetrics(network: Network): MetricsResult {
const V = uniqueNodes(network);
const dens = density(network);
const deg = degree(network);
const btw = betweennessCentrality(network);
const cls = harmonicCloseness(network);
const eig = eigenvectorCentrality(network);
const iso = isolates(network);
const ap = articulationPoints(network);

const nodes: NodeMetrics[] = V.map(v => ({
legajo: v,
degreeIn: deg.in.get(v) || 0,
degreeOut: deg.out.get(v) || 0,
degreeTotal: deg.total.get(v) || 0,
inWeighted: deg.inWeighted.get(v) || 0,
outWeighted: deg.outWeighted.get(v) || 0,
betweenness: btw.get(v) || 0,
closeness: cls.get(v) || 0,
eigenvector: eig.get(v) || 0,
isIsolate: iso.has(v),
isArticulation: ap.has(v)
}));

const avgDeg = nodes.reduce((s, n) => s + n.degreeTotal, 0) / (V.length || 1);
return {
nodes,
summary: {
n_nodes: V.length,
n_edges: network.edges.length,
density: dens,
avg_degree: avgDeg
}
};
}