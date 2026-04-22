export const personSchema = {
$id: 'Person',
type: 'object',
additionalProperties: false,
required: ['legajo', 'nombre', 'apellido'],
properties: {
legajo: { type: 'integer', minimum: 1 },
nombre: { type: 'string', minLength: 1 },
apellido: { type: 'string', minLength: 1 },
area: { type: 'string' },
sector: { type: 'string' },
rol: { type: 'string' }
}
} as const;

export const edgeSchema = {
$id: 'Edge',
type: 'object',
additionalProperties: false,
required: ['pregunta', 'from_legajo', 'to_legajo', 'weight'],
properties: {
pregunta: { enum: ['colaboracion', 'consejo', 'inspiracion'] },
from_legajo: { type: 'integer', minimum: 1 },
to_legajo: { type: 'integer', minimum: 1 },
weight: { type: 'integer', minimum: 1, maximum: 3 }
}
} as const;

export const edgeInputSchema = {
$id: 'EdgeInput',
type: 'object',
additionalProperties: false,
required: ['pregunta', 'to', 'weight'],
properties: {
pregunta: { enum: ['colaboracion', 'consejo', 'inspiracion'] },
to: { type: 'integer', minimum: 1 },
weight: { type: 'integer', minimum: 1, maximum: 3 }
}
} as const;

export const responseInputSchema = {
$id: 'ResponseInput',
type: 'object',
additionalProperties: false,
required: ['id', 'legajo', 'edges'],
properties: {
id: { type: 'integer', minimum: 1 },
legajo: { type: 'integer', minimum: 1 },
recibioFeedback: { type: 'boolean' },
behaviors: { type: 'array', items: { type: 'string' } },
fortaleza: { type: 'string' },
desarrollo: { type: 'string' },
trainings: { type: 'array', items: { type: 'string' } },
movilidad: { enum: ['si', 'no', 'quizas'] },
edges: { type: 'array', items: { $ref: 'EdgeInput' }, minItems: 0 },
timestamp: { type: 'string', format: 'date-time' }
}
} as const;

export const responsesArraySchema = {
$id: 'ResponsesArray',
type: 'array',
items: { $ref: 'ResponseInput' }
} as const;

export const peopleArraySchema = {
$id: 'PeopleArray',
type: 'array',
items: { $ref: 'Person' }
} as const;

export const edgesArraySchema = {
$id: 'EdgesArray',
type: 'array',
items: { $ref: 'Edge' }
} as const;

export const schemaRegistry = [
personSchema,
edgeSchema,
edgeInputSchema,
responseInputSchema,
responsesArraySchema,
peopleArraySchema,
edgesArraySchema
];

export function registerSchemas(ajv: any) {
schemaRegistry.forEach(s => ajv.addSchema(s));
}