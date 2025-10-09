import type { Edge, EdgeInput, Legajo, ResponseInput } from './types';

export function normalizeName(s?: string): string {
return (s || '').trim().replace(/\s+/g, ' ');
}

export function toLegajo(x: unknown): Legajo {
const n = Number(x);
if (!Number.isInteger(n) || n < 1) throw new Error(`Legajo inválido: ${x}`);
return n;
}

export function responsesToEdges(responses: ResponseInput[]): Edge[] {
const out: Edge[] = [];
for (const r of responses) {
const from = toLegajo(r.legajo);
for (const e of r.edges) {
out.push({
pregunta: e.pregunta,
from_legajo: from,
to_legajo: toLegajo(e.to),
weight: e.weight
});
}
}
return out;
}

export function edgesToCsv(edges: Edge[]): string {
const header = 'pregunta,from_legajo,to_legajo,weight';
const rows = edges.map(
e => `${e.pregunta},${e.from_legajo},${e.to_legajo},${e.weight}`
);
return [header, ...rows].join('\n');
}

export function csvToEdges(csv: string): Edge[] {
const lines = csv.trim().split(/\r?\n/);
const header = lines.shift();
if (!header || header.replace(/\s/g, '') !== 'pregunta,from_legajo,to_legajo,weight') {
throw new Error('Cabecera CSV inválida. Esperado: pregunta,from_legajo,to_legajo,weight');
}
return lines
.filter(Boolean)
.map((line, i) => {
const [pregunta, from, to, w] = line.split(',');
const weight = Number(w);
if (!['colaboracion', 'consejo', 'inspiracion'].includes(pregunta))
throw new Error(`L${i + 2}: pregunta inválida: ${pregunta}`);
return {
pregunta: pregunta as Edge['pregunta'],
from_legajo: toLegajo(from),
to_legajo: toLegajo(to),
weight: (weight as Edge['weight'])
};
});
}

export function dedupeEdges(edges: Edge[]): Edge[] {
const key = (e: Edge) => `${e.pregunta}:${e.from_legajo}->${e.to_legajo}`;
const map = new Map<string, Edge>();
for (const e of edges) {
const k = key(e);
const existing = map.get(k);
if (!existing || e.weight > existing.weight) map.set(k, e);
}
return [...map.values()];
}

export function splitByPregunta(edges: Edge[]): Record<'colaboracion' | 'consejo' | 'inspiracion', Edge[]> {
return {
colaboracion: edges.filter(e => e.pregunta === 'colaboracion'),
consejo: edges.filter(e => e.pregunta === 'consejo'),
inspiracion: edges.filter(e => e.pregunta === 'inspiracion')
};
}

export function validateWithAjv(ajv: any, schemaId: string, data: unknown) {
const validate = ajv.getSchema(schemaId);
if (!validate) throw new Error(`Esquema no registrado: ${schemaId}`);
const ok = validate(data);
return { valid: !!ok, errors: ok ? null : validate.errors };
}