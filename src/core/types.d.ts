export type Legajo = number;
export type Pregunta = 'colaboracion' | 'consejo' | 'inspiracion';

export interface Person {
legajo: Legajo;
nombre: string;
apellido: string;
area?: string;
sector?: string;
rol?: string;
}

export interface Edge {
pregunta: Pregunta;
from_legajo: Legajo;
to_legajo: Legajo;
weight: 1 | 2 | 3;
}

export interface EdgeInput {
pregunta: Pregunta;
to: Legajo;
weight: 1 | 2 | 3;
}

export interface ResponseInput {
id: number;
legajo: Legajo;
recibioFeedback?: boolean;
behaviors?: string[];
fortaleza?: string;
desarrollo?: string;
trainings?: string[];
movilidad?: 'si' | 'no' | 'quizas';
edges: EdgeInput[];
timestamp?: string;
}

export interface NetworkNode {
legajo: Legajo;
label?: string;
area?: string;
sector?: string;
rol?: string;
}

export interface NetworkEdge {
from: Legajo;
to: Legajo;
weight: number;
}

export interface Network {
nodes: NetworkNode[];
edges: NetworkEdge[];
}