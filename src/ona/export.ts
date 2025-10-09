// Export util: serializar network/metrics a JSON strings y CSV. XLSX opcional via SheetJS global.
import type { Network } from '../core/types';
import type { MetricsResult, NodeMetrics } from './metrics';

export function networkToJSON(network: Network): string {
return JSON.stringify(network, null, 2);
}

export function metricsToJSON(metrics: MetricsResult): string {
// Reducir precisión de floats
const out = {
summary: {
...metrics.summary,
density: Number(metrics.summary.density.toFixed(6)),
avg_degree: Number(metrics.summary.avg_degree.toFixed(3))
},
nodes: metrics.nodes.map(n => ({
...n,
betweenness: Number(n.betweenness.toFixed(6)),
closeness: Number(n.closeness.toFixed(6)),
eigenvector: Number(n.eigenvector.toFixed(6))
}))
};
return JSON.stringify(out, null, 2);
}

export function edgesToCSV(network: Network): string {
const header = 'from,to,weight';
const rows = network.edges.map(e => `${e.from},${e.to},${e.weight}`);
return [header, ...rows].join('\n');
}

/** XLSX opcional: requiere SheetJS (global XLSX en el navegador). */
export function toXlsxOrThrow(metrics: MetricsResult): any {
const g: any = (globalThis as any);
if (!g || !g.XLSX) throw new Error('SheetJS (XLSX) no está disponible en globalThis.XLSX');

const headers = [
'legajo','degreeIn','degreeOut','degreeTotal','inWeighted','outWeighted',
'betweenness','closeness','eigenvector','isIsolate','isArticulation'
];
const data = [headers, ...metrics.nodes.map(n => [
n.legajo, n.degreeIn, n.degreeOut, n.degreeTotal, n.inWeighted, n.outWeighted,
n.betweenness, n.closeness, n.eigenvector, n.isIsolate, n.isArticulation
])];

const ws = g.XLSX.utils.aoa_to_sheet(data);
const wb = g.XLSX.utils.book_new();
g.XLSX.utils.book_append_sheet(wb, ws, 'metrics');
return wb; // usar XLSX.writeFile(wb, 'metrics.xlsx') en el browser
}