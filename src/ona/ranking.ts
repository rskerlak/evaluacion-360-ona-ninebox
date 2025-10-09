// Rankings y extracción de insights: top influencers, puentes y aislados
import type { Legajo } from '../core/types';
import type { NodeMetrics } from './metrics';

/** Top N por una métrica numérica de NodeMetrics */
export function topNBy<T extends keyof NodeMetrics>(
nodes: NodeMetrics[],
key: T,
n = 5
): NodeMetrics[] {
const arr = [...nodes].sort((a, b) => (b[key] as number) - (a[key] as number));
return arr.slice(0, n);
}

/** Percentil de un arreglo numérico */
export function percentile(values: number[], p: number): number {
if (!values.length) return 0;
const sorted = [...values].sort((a, b) => a - b);
const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))));
return sorted[idx];
}

/** Puentes: nodos con betweenness >= pctl o marcados como articulación */
export function bridgeNodes(nodes: NodeMetrics[], pctl = 0.85): NodeMetrics[] {
const bvals = nodes.map(n => n.betweenness);
const thr = percentile(bvals, pctl);
return nodes.filter(n => n.isArticulation || n.betweenness >= thr);
}

/** Aislados: grado total 0 */
export function isolatedNodes(nodes: NodeMetrics[]): NodeMetrics[] {
return nodes.filter(n => n.isIsolate);
}

/** Influencers (por defecto: inWeighted, fallback eigenvector) */
export function topInfluencers(nodes: NodeMetrics[], n = 5): NodeMetrics[] {
const arr = [...nodes].sort((a, b) => {
const d = (b.inWeighted - a.inWeighted);
if (Math.abs(d) > 1e-9) return d;
return (b.eigenvector - a.eigenvector);
});
return arr.slice(0, n);
}