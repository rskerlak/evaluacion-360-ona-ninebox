// Bootstrap utilitario para páginas estáticas: expone helpers en window.ona (si corre en browser)
import type { Network, Person, ResponseInput } from './core/types';
import { buildNetworkFromEdges, buildFromResponses, buildFromEdgesCsv, parsePeopleCsv } from './ona/buildGraph';
import { computeAllMetrics, type MetricsResult } from './ona/metrics';
import * as ranking from './ona/ranking';
import * as exp from './ona/export';
import { responsesToEdges } from './core/utils';

export const ONA = {
// Build
buildNetworkFromEdges,
buildFromResponses,
buildFromEdgesCsv,
parsePeopleCsv,

// Metrics
computeAllMetrics,

// Ranking helpers
ranking,

// Export
export: exp,

// Transforms
responsesToEdges
};

// Exponer en navegador para debugging/uso desde consola
declare const window: any;
try {
if (typeof window !== 'undefined') {
window.ona = ONA;
// Ejemplo rápido desde consola:
// const net = ona.buildFromEdgesCsv(csvString);
// const m = ona.computeAllMetrics(net);
// console.table(ona.ranking.topInfluencers(m.nodes, 5));
}
} catch { /* noop */ }

export default ONA;