# Prototipo de Evaluación 360° + ONA + Nine Box (People Analytics)

Plataforma integral de **evaluación de desempeño y análisis organizacional** que combina evaluación 360°, **Analítica de Redes Organizacionales (ONA)** y **Matriz Nine Box** para mapear influencia, colaboración y talento en la organización.

## Funcionalidades Principales

### 🔄 Evaluación 360° Completa
* **Paso 1:** Configuración inicial y selección de evaluadores
* **Paso 2:** Evaluación de desempeño con criterios MBO-OKR, competencias FODA, rendimiento laboral y valoración de potencial
* **Paso 3:** Captura de relaciones organizacionales (colaboración, consulta técnica, inspiración) con pesos 1-3
* **Paso 4:** Dashboard ejecutivo con insights accionables

### 🕸️ Análisis de Redes Organizacionales (ONA)
* **Mapeo de influencia:** Identificación de líderes informales y conectores clave
* **Análisis de colaboración:** Patrones de trabajo directo y coordinación
* **Consultas técnicas:** Redes de conocimiento y asesoramiento
* **Inspiración:** Vínculos de influencia motivacional y liderazgo
* **Métricas avanzadas:** Densidad de red, centralidades, distancia promedio
* **Visualización interactiva:** Grafo dirigido con filtros por tipo de relación

### 📊 Matriz Nine Box - Potencial vs Desempeño
* **Evaluación de talento:** Cruce de potencial y desempeño para identificar talento clave
* **Perfiles detallados:** Información completa de cada colaborador basada en criterios del Paso 2
* **Visualización intuitiva:** Matriz 3x3 con posicionamiento dinámico de empleados
* **Integración completa:** Datos sincronizados con evaluaciones 360°

### 📈 Características Técnicas
* **Trazabilidad end-to-end:** Cada registro conserva origen y timestamp
* **Exportación flexible:** JSON, CSV, Excel para integración con otros sistemas
* **Importación de datos:** Soporte para archivos CSV/JSON externos
* **Interfaz responsiva:** Diseño adaptable con tema consistente
* **Datos sintéticos:** Ejemplos realistas para demostración segura

> **Privacidad:** Este repositorio utiliza únicamente datos **sintéticos**. No subir datos reales de personas.

---

## Navegación por Roles

```
index.html              # Portal principal - Selección de rol
├── admin.html          # 👥 Administrador RR.HH. - Panel ejecutivo
├── paso-4.html         # 👔 Líder - Dashboard de equipo
└── colaborador.html    # 👤 Colaborador - Mi evaluación

Flujo de evaluación:
paso-1.html → paso-2.html → paso-3.html → paso-4.html
sociograma.html         # Análisis ONA + Nine Box integrado
```

### Cómo probar los 3 roles:

1. **Administrador RR.HH.** (`admin.html`)
   - Métricas organizacionales con 5 gráficos Chart.js
   - Botones de simulación (recordatorios, feedback)
   - Acceso directo a ONA + Nine Box

2. **Líder** (`paso-4.html`)
   - Dashboard con insights del equipo
   - Análisis de red organizacional
   - Perfil de liderazgo predominante

3. **Colaborador** (`colaborador.html`)
   - Resumen de última evaluación
   - Plan de desarrollo personal
   - Acceso a feedback 360°

## Estructura

```
public/                  # Demo estática (GitHub Pages)
  index.html             # Portal por roles (NUEVO)
  admin.html             # Panel RR.HH. (NUEVO)
  colaborador.html       # Vista colaborador (NUEVO)
  paso-1.html            # Configuración inicial de evaluación
  paso-2.html            # Evaluación de desempeño completa (MBO-OKR, FODA, rendimiento, potencial)
  paso-3.html            # Captura de relaciones organizacionales + exportación
  paso-4.html            # Dashboard ejecutivo con insights
  sociograma.html        # Análisis ONA + Matriz Nine Box integrados
  assets/
    apple.css            # Estilos base del sistema
  docs/
    Fundamentos-ONA.pdf  # Documentación conceptual

src/
  core/
    schema.ts            # Esquemas de validación JSON
    types.d.ts           # Definiciones de tipos TypeScript
    utils.ts             # Utilidades de transformación de datos
  ona/
    buildGraph.ts        # Constructor de grafos desde datos
    metrics.ts           # Cálculo de métricas de red avanzadas
    ranking.ts           # Algoritmos de ranking e influencia
    export.ts            # Exportadores multi-formato
  dashboards/
    leader-adapter.ts    # Adaptador para vistas ejecutivas
  app.ts                 # Punto de entrada principal

.github/workflows/validate.yml  # CI/CD con validación y deploy
src/data/
  sample-people.csv      # Datos sintéticos de empleados
  sample-edges.csv       # Relaciones organizacionales de ejemplo
  sample-responses.json  # Respuestas de evaluación simuladas
```

---

## Cómo correr localmente (estático)

Requiere Python (3.x o 2.7):

```bash
npm run dev
# abre http://localhost:5173
```

### Flujo de Uso Recomendado

**Opción A - Por Rol (Recomendado):**
1. **Portal:** Inicia en `index.html` y selecciona tu rol
2. **RR.HH.:** Explora métricas organizacionales en `admin.html`
3. **Líder:** Revisa insights de tu equipo en `paso-4.html`
4. **Colaborador:** Ve tu evaluación en `colaborador.html`

**Opción B - Flujo Completo:**
1. **Configuración:** `paso-1.html` para establecer objetivos
2. **Evaluación:** `paso-2.html` para completar desempeño
3. **Feedback:** `paso-3.html` para capturar relaciones organizacionales
4. **Análisis:** `paso-4.html` (dashboard) o `sociograma.html` (ONA + Nine Box)

> **Tip:** Todas las vistas mantienen datos sintéticos en localStorage para simular un sistema real.

---

## Deploy (GitHub Pages)

El repositorio ya incluye un workflow que:

1. Valida JSON/CSV y archivos requeridos.
2. Publica `public/` como **GitHub Pages**.

Para habilitar:

* **Settings → Pages → Build and deployment → Source:** "GitHub Actions".

El workflow expondrá la URL en la pestaña *Actions* (job **deploy**).

---

## Esquema de datos (resumen)

**Edges (flat JSON):**

```json
{ "pregunta": "colaboracion|consejo|inspiracion", "from_legajo": 1001, "to_legajo": 1002, "weight": 1 }
```

**People (CSV):**

```
legajo,nombre,apellido,area,sector,rol
```

**Responses (Paso 3):**

```json
{
  "id": 1, "legajo": 1001, 
  "edges": [ { "pregunta": "consejo", "to": 1002, "weight": 2 } ],
  "recibioFeedback": true, "fortaleza": "LIDERAZGO", 
  "desarrollo": "COMUNICACIÓN", "trainings": ["Gestión de Equipos"], 
  "movilidad": "si"
}
```

**Métricas Admin (eva:admin-metrics):**

```json
{
  "evaluaciones": {"pendientes": 14, "realizadas": 36},
  "feedback": {"respondidas": 28, "pendientes": 12},
  "desempeno": {"no_cumple": 3, "parcial": 9, "cumple": 26, "supera": 9, "excepcional": 3},
  "potencial": {"puesto": 45, "desarrollo": 18, "promocion": 7},
  "liderazgo": {"transaccional": 17, "transformacional": 36, "delegador": 17}
}
```

**Evaluación Colaborador (eva:last-eval):**

```json
{
  "legajo": 1001,
  "promedio": 3.6,
  "desempeno": {"no_cumple": 0, "parcial": 1, "cumple": 3, "supera": 1, "excepcional": 0},
  "potencial": "desarrollo",
  "liderazgo_predominante": "transformacional"
}
```

---

## Características Avanzadas

### Análisis de Redes
* **Filtros dinámicos:** Vista general, colaboración, consultas técnicas, inspiración
* **Métricas en tiempo real:** Densidad, distancia promedio, conteo de nodos/aristas
* **Top influencers:** Ranking automático con numeración romana (I, II, III)
* **Visualización adaptativa:** Tamaño de nodos proporcional a grado de influencia
* **Exportación Excel:** Datos de nodos y aristas para análisis externos

### Matriz Nine Box
* **Posicionamiento automático:** Distribución aleatoria realista de empleados
* **Perfiles detallados:** Información completa por colaborador al hacer clic
* **Integración de datos:** Sincronización con evaluaciones del Paso 2
* **Codificación por colores:** Diferenciación visual por departamento/área
* **Interactividad completa:** Navegación fluida entre red y matriz de talento

### Interfaz y UX
* **Diseño consistente:** Tema unificado negro/gris con acentos de color
* **Navegación intuitiva:** Breadcrumbs y enlaces de retorno en todas las páginas
* **Responsividad:** Adaptación automática a diferentes tamaños de pantalla
* **Controles avanzados:** Ajuste de distancia, importación/exportación, métricas
* **Feedback visual:** Estados de hover, transiciones suaves, indicadores de carga

## Ética y Cumplimiento

* **Estándares APA/ITC:** Metodología clara, control de sesgos, uso responsable
* **Privacidad por diseño:** IDs sintéticos, legajos ficticios, datos anonimizados
* **Trazabilidad completa:** Cada registro conserva origen, paso y timestamp
* **Transparencia:** Código abierto, algoritmos documentados, datos de ejemplo
* **Consentimiento:** Flujo claro de permisos y propósito de uso de datos

---

## Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript ES6+, Tailwind CSS
* **Visualización:** Vis.js Network para grafos interactivos
* **Exportación:** SheetJS (XLSX) para archivos Excel
* **Datos:** JSON/CSV con esquemas validados
* **Deploy:** GitHub Pages con CI/CD automatizado
* **Compatibilidad:** Navegadores modernos, responsive design

## Roadmap

- [ ] Integración con APIs de RRHH
- [ ] Dashboard ejecutivo avanzado
- [ ] Análisis predictivo de talento
- [ ] Reportes automatizados
- [ ] Módulo de feedback en tiempo real
- [ ] Integración con sistemas de nómina
- [ ] App móvil para evaluaciones

## Licencia

Código bajo licencia **MIT**. Ver `LICENSE` para detalles completos.

---

**Desarrollado para transformar la gestión de talento mediante analítica avanzada y visualización intuitiva.**

---

Rodrigo Emmanuel Skerlak — People Analytics Manager / HR Data Scientist · Licenciado en Psicología / Behaviour Science · Ciudad de Buenos Aires, Argentina · rodrigoskerlak@gmail.com · +54 11 3021 2236 · linkedin.com/in/rodrigo-skerlak