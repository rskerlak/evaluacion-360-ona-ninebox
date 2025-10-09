// Construcción de grafos desde edges/responses/CSV
import type { Edge, ResponseInput, Person, Network, NetworkNode, NetworkEdge, Legajo } from '../core/types';
import { responsesToEdges, csvToEdges } from '../core/utils';

export interface BuildOptions {
/** Si true, mantiene nodos aún si no tienen aristas. */
keepIsolates?: boolean;
/** Estrategia al combinar múltiples aristas (from->to): 'max' (default) o 'sum'. */
combineStrategy?: 'max' | 'sum';
}

/** Crea Network.nodes a partir de people si existe, o de los legajos que aparecen en edges. */
export function nodesFromPeopleOrEdges(edges: Edge[], people?: Person[]): NetworkNode[] {
const nodes: Map<Legajo, NetworkNode> = new Map();

if (people && people.length) {
for (const p of people) {
nodes.set(p.legajo, {
legajo: p.legajo,
label: `${p.legajo} - ${p.nombre} ${p.apellido}`.trim(),
area: p.area,
sector: p.sector,
rol: p.rol
});
}
}

// Garantiza nodos para cualquier legajo referenciado en edges
for (const e of edges) {
if (!nodes.has(e.from_legajo)) {
nodes.set(e.from_legajo, { legajo: e.from_legajo, label: `${e.from_legajo}` });
}
if (!nodes.has(e.to_legajo)) {
nodes.set(e.to_legajo, { legajo: e.to_legajo, label: `${e.to_legajo}` });
}
}

return [...nodes.values()];
}

/** Combina duplicados (from->to) aplicando max o sum sobre weight. */
export function combineEdges(edges: Edge[], strategy: 'max' | 'sum' = 'max'): Edge[] {
const map = new Map<string, Edge>();
for (const e of edges) {
const k = `${e.from_legajo}->${e.to_legajo}`;
const prev = map.get(k);
if (!prev) {
map.set(k, { ...e });
} else {
map.set(k, {
...prev,
weight: strategy === 'sum' ? (Math.max(1, Math.min(3, (prev.weight + e.weight) as any)) as 1|2|3)
: (prev.weight >= e.weight ? prev.weight : e.weight)
});
}
}
return [...map.values()];
}

/** Construye el Network a partir de un arreglo de Edge plano. */
export function buildNetworkFromEdges(edges: Edge[], people?: Person[], opts: BuildOptions = {}): Network {
const { keepIsolates = true, combineStrategy = 'max' } = opts;
const combined = combineEdges(edges, combineStrategy);

// Nodos
const nodes = nodesFromPeopleOrEdges(combined, people);

// Aristas
const netEdges: NetworkEdge[] = combined.map(e => ({
from: e.from_legajo,
to: e.to_legajo,
weight: e.weight
}));

// Opcionalmente, filtrar nodos sin grado
if (!keepIsolates) {
const incident = new Set<Legajo>();
for (const ed of netEdges) { incident.add(ed.from); incident.add(ed.to); }
const filteredNodes = nodes.filter(n => incident.has(n.legajo));
return { nodes: filteredNodes, edges: netEdges };
}

return { nodes, edges: netEdges };
}

/** Construye Network desde respuestas Paso 3. */
export function buildFromResponses(responses: ResponseInput[], people?: Person[], opts?: BuildOptions): Network {
const edges = responsesToEdges(responses);
return buildNetworkFromEdges(edges, people, opts);
}

/** CSV helpers (cabecera: pregunta,from_legajo,to_legajo,weight) */
export function buildFromEdgesCsv(csv: string, people?: Person[], opts?: BuildOptions): Network {
const edges = csvToEdges(csv);
return buildNetworkFromEdges(edges, people, opts);
}

/** Parser simple de people.csv (cabecera: legajo,nombre,apellido,area,sector,rol) */
export function parsePeopleCsv(csv: string): Person[] {
const lines = csv.trim().split(/\r?\n/);
const header = lines.shift();
if (!header) return [];
const cols = header.split(',').map(s => s.trim().toLowerCase());
const idx = (name: string) => cols.indexOf(name);

const iLegajo = idx('legajo'),
iNombre = idx('nombre'),
iApellido = idx('apellido'),
iArea = idx('area'),
iSector = idx('sector'),
iRol = idx('rol');

if (iLegajo === -1 || iNombre === -1 || iApellido === -1) {
throw new Error('Cabecera inválida para people.csv (requiere legajo,nombre,apellido)');
}

const out: Person[] = [];
for (const line of lines) {
if (!line.trim()) continue;
const parts = line.split(',').map(s => s.trim());
const legajo = Number(parts[iLegajo]);
if (!Number.isInteger(legajo)) continue;
out.push({
legajo,
nombre: parts[iNombre] || '',
apellido: parts[iApellido] || '',
area: iArea !== -1 ? (parts[iArea] || undefined) : undefined,
sector: iSector !== -1 ? (parts[iSector] || undefined) : undefined,
rol: iRol !== -1 ? (parts[iRol] || undefined) : undefined
});
}
return out;
}