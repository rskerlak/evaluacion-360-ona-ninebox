// Merge de feedback (responses) + métricas de red para el dashboard del líder
import type { ResponseInput, Person, Legajo } from '../core/types';
import type { MetricsResult, NodeMetrics } from '../ona/metrics';

export interface LeaderViewRow {
legajo: Legajo;
nombre?: string;
apellido?: string;
area?: string;
sector?: string;
rol?: string;

// Feedback (última declaración disponible por persona)
recibioFeedback?: boolean;
fortaleza?: string;
desarrollo?: string;
trainings?: string[];
movilidad?: 'si' | 'no' | 'quizas';

// Métricas ONA
degreeIn: number;
degreeOut: number;
inWeighted: number;
outWeighted: number;
betweenness: number;
closeness: number;
eigenvector: number;
isIsolate: boolean;
isArticulation: boolean;
}

export function indexPeople(people?: Person[]): Map<Legajo, Person> {
const m = new Map<Legajo, Person>();
for (const p of (people || [])) m.set(p.legajo, p);
return m;
}

export function indexLastFeedback(responses: ResponseInput[]): Map<Legajo, ResponseInput> {
// Si hay múltiples entradas por legajo, quedate con la de timestamp más reciente (si existe)
const m = new Map<Legajo, ResponseInput>();
for (const r of responses) {
const prev = m.get(r.legajo);
if (!prev) { m.set(r.legajo, r); continue; }
const tPrev = prev.timestamp ? Date.parse(prev.timestamp) : -Infinity;
const tCurr = r.timestamp ? Date.parse(r.timestamp) : -Infinity;
if (tCurr >= tPrev) m.set(r.legajo, r);
}
return m;
}

export function metricsIndex(metrics: MetricsResult): Map<Legajo, NodeMetrics> {
const m = new Map<Legajo, NodeMetrics>();
for (const n of metrics.nodes) m.set(n.legajo, n);
return m;
}

/** Fusiona people + feedback + métricas en filas listas para el dashboard del líder */
export function buildLeaderView(
people: Person[] | undefined,
responses: ResponseInput[],
metrics: MetricsResult
): LeaderViewRow[] {
const byPerson = indexPeople(people);
const byFeedback = indexLastFeedback(responses);
const byMetrics = metricsIndex(metrics);

// universo: unión de legajos presentes en people, feedback o métricas
const legajos = new Set<Legajo>();
for (const p of (people || [])) legajos.add(p.legajo);
for (const r of responses) legajos.add(r.legajo);
for (const m of metrics.nodes) legajos.add(m.legajo);

const rows: LeaderViewRow[] = [];
for (const id of legajos) {
const p = byPerson.get(id);
const f = byFeedback.get(id);
const mm = byMetrics.get(id);

rows.push({
  legajo: id,
  nombre: p?.nombre,
  apellido: p?.apellido,
  area: p?.area,
  sector: p?.sector,
  rol: p?.rol,
  recibioFeedback: f?.recibioFeedback,
  fortaleza: f?.fortaleza,
  desarrollo: f?.desarrollo,
  trainings: f?.trainings,
  movilidad: f?.movilidad,
  degreeIn: mm?.degreeIn || 0,
  degreeOut: mm?.degreeOut || 0,
  inWeighted: mm?.inWeighted || 0,
  outWeighted: mm?.outWeighted || 0,
  betweenness: mm?.betweenness || 0,
  closeness: mm?.closeness || 0,
  eigenvector: mm?.eigenvector || 0,
  isIsolate: !!mm?.isIsolate,
  isArticulation: !!mm?.isArticulation
});

}
// Orden sugerido: más influyentes primero (inWeighted, luego eigen)
rows.sort((a, b) => (b.inWeighted - a.inWeighted) || (b.eigenvector - a.eigenvector));
return rows;
}