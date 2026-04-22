import { useMemo, useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { User, Target, Layers } from 'lucide-react';

const AREAS = ['Negocios', 'Tecnología', 'Operaciones', 'Staff'];
const AREA_COLORS = {
  'Negocios': '#d4af37', // Gold
  'Tecnología': '#8b5cf6', // Purple
  'Operaciones': '#3b82f6', // Blue
  'Staff': '#22c55e' // Green
};

const NetworkGraph = () => {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Todas');
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const data = useMemo(() => {
    const NOMBRES = ['Ana', 'Carlos', 'Sofía', 'Diego', 'Laura', 'Martín', 'Elena', 'Javier', 'Valentina', 'Lucas'];
    const APELLIDOS = ['Martínez', 'Rodríguez', 'López', 'Pérez', 'García', 'Fernández', 'Gómez', 'Díaz', 'Álvarez', 'Romero'];
    const CARGOS = ['Analista de Datos', 'Especialista', 'Coordinador/a', 'Desarrollador/a', 'Gerente', 'Diseñador/a', 'Líder Técnico', 'Product Manager'];

    const N = 80;

    // Asignar un "centro" base estático para ayudar a separar visualmente las 4 constelaciones
    const basePositions = {
      'Negocios': { x: 150, y: 150, z: 0 },
      'Tecnología': { x: -150, y: -150, z: 0 },
      'Operaciones': { x: 150, y: -150, z: 0 },
      'Staff': { x: -150, y: 150, z: 0 }
    };

    // Create groups of nodes per area to form "constellations"
    const nodes = [...Array(N).keys()].map(i => {
      const nombre = `${NOMBRES[Math.floor(Math.random() * NOMBRES.length)]} ${APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)]}`;
      const cargo = CARGOS[Math.floor(Math.random() * CARGOS.length)];
      const area = AREAS[i % AREAS.length]; // Evenly distribute
      const evaluacion = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
      
      const base = (basePositions as any)[area];

      return { 
        id: i, 
        nombre,
        cargo,
        area,
        evaluacion,
        reconocimientos: 0,
        val: 1,
        // Asignar posición inicial para que empiecen separadas
        x: base.x + (Math.random() * 50 - 25),
        y: base.y + (Math.random() * 50 - 25),
        z: base.z + (Math.random() * 50 - 25)
      };
    });

    const links = [];
    
    // Create intra-constellation links (stronger/more frequent)
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (nodes[i].area === nodes[j].area) {
          if (Math.random() > 0.85) {
            links.push({ source: i, target: j });
          }
        }
        // NO INTER-CONSTELLATION LINKS
      }
    }

    const degreeMap = new Map();
    links.forEach(l => {
      degreeMap.set(l.target, (degreeMap.get(l.target) || 0) + 1);
      degreeMap.set(l.source, (degreeMap.get(l.source) || 0) + 1);
    });

    nodes.forEach(n => {
      n.reconocimientos = degreeMap.get(n.id) || 0;
      // Reducido el tamaño drásticamente (antes era 0.3)
      n.val = 0.5 + (n.reconocimientos * 0.08); 
    });

    return { nodes, links };
  }, []);

  useEffect(() => {
    // Add glowing effect to the graph scene
    const fg = fgRef.current;
    if (fg) {
      const scene = fg.scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 1, 300);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Ajuste de físicas: quitar centro global para que las constelaciones no colisionen
      fg.d3Force('center', null);
      // Suave repulsión para que los nodos no se amontonen
      fg.d3Force('charge').strength(-30);
    }
  }, [dimensions]); // re-apply lights if dimensions trigger re-render

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    // Aim at node from outside it
    const distance = 80;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        1500  // ms transition duration
      );
    }
  };

  const handleFilterClick = (area: string) => {
    setActiveFilter(area);
    if (area === 'Todas') {
      if (fgRef.current) {
         // zoom out to origin
         fgRef.current.cameraPosition({ x: 0, y: 0, z: 300 }, { x: 0, y: 0, z: 0 }, 1500);
      }
      return;
    }
    
    // Find the most connected node in that area to center the camera
    const nodesInArea = data.nodes.filter(n => n.area === area);
    if (nodesInArea.length > 0) {
      // Find the one with highest val (reconocimientos)
      const centerNode = nodesInArea.reduce((prev, current) => (prev.val > current.val) ? prev : current);
      handleNodeClick(centerNode);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full min-h-[500px] xl:h-[700px]">
      
      {/* ONA 3D Graph Container */}
      <div ref={containerRef} className="glass-panel p-0 rounded-2xl overflow-hidden relative w-full h-[450px] sm:h-[550px] xl:w-2/3 xl:h-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        
        {/* Floating Filter Panel */}
        <div className="absolute top-2 left-2 right-2 md:top-6 md:left-6 md:right-auto md:w-auto z-10 bg-dark-900/80 backdrop-blur-md p-2 md:p-4 rounded-xl border border-white/10 shadow-lg flex flex-col">
          <h3 className="text-white font-medium mb-2 md:mb-3 text-xs md:text-sm flex items-center gap-2">
            <Layers size={14} className="text-gold-500" /> <span className="hidden sm:inline">Constelaciones por Área</span><span className="sm:hidden">Constelaciones</span>
          </h3>
          <div className="flex flex-row md:flex-col gap-1.5 md:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => handleFilterClick('Todas')}
              className={`text-[10px] md:text-xs text-left px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${activeFilter === 'Todas' ? 'bg-white/20 text-white font-bold' : 'text-text-muted hover:bg-white/5'}`}
            >
              🌐 Todas
            </button>
            {AREAS.map(area => (
              <button 
                key={area}
                onClick={() => handleFilterClick(area)}
                className={`text-[10px] md:text-xs text-left px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${activeFilter === area ? 'bg-white/20 text-white font-bold' : 'text-text-muted hover:bg-white/5'}`}
              >
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ backgroundColor: (AREA_COLORS as any)[area] }}></span>
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Hide default tooltip style */}
        <style>{`
          .scene-tooltip {
            display: none !important;
          }
        `}</style>
        
        <ForceGraph3D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          backgroundColor="#050507"
          nodeResolution={32}
          nodeRelSize={5}
          linkResolution={12}
          nodeColor={(node: any) => {
            if (activeFilter !== 'Todas' && node.area !== activeFilter) {
              return 'rgba(50, 50, 50, 0.1)'; // Dimmed
            }
            return (AREA_COLORS as any)[node.area] || '#b5952f';
          }}
          linkColor={(link: any) => {
            const sourceNode = typeof link.source === 'object' ? link.source : data.nodes[link.source];
            const targetNode = typeof link.target === 'object' ? link.target : data.nodes[link.target];
            
            if (activeFilter !== 'Todas' && (sourceNode.area !== activeFilter && targetNode.area !== activeFilter)) {
              return 'rgba(30, 30, 30, 0.05)'; // Dimmed
            }
            return 'rgba(255, 255, 255, 0.3)';
          }}
          linkOpacity={0.6}
          linkWidth={(link: any) => {
            const sourceNode = typeof link.source === 'object' ? link.source : data.nodes[link.source];
            const targetNode = typeof link.target === 'object' ? link.target : data.nodes[link.target];
            
            if (activeFilter !== 'Todas' && (sourceNode.area !== activeFilter && targetNode.area !== activeFilter)) {
              return 0.1;
            }
            return 0.4;
          }}
          nodeThreeObject={(node: any) => {
            const size = node.val;
            const isDimmed = activeFilter !== 'Todas' && node.area !== activeFilter;
            
            const geometry = new THREE.SphereGeometry(size, 16, 16);
            const material = new THREE.MeshPhongMaterial({
              color: isDimmed ? '#222222' : ((AREA_COLORS as any)[node.area] || '#b5952f'),
              emissive: isDimmed ? '#000000' : ((AREA_COLORS as any)[node.area] || '#b5952f'),
              emissiveIntensity: isDimmed ? 0 : 0.6,
              transparent: true,
              opacity: isDimmed ? 0.2 : 0.9,
            });
            return new THREE.Mesh(geometry, material);
          }}
          onNodeClick={handleNodeClick}
          enableNodeDrag={false}
          enableNavigationControls={true}
          showNavInfo={false}
        />
      </div>

      {/* Info Panel */}
      <div className="glass-panel p-6 rounded-2xl w-full xl:w-1/3 flex flex-col h-auto xl:h-full border-t-4" style={{ borderTopColor: selectedNode ? (AREA_COLORS as any)[selectedNode.area] : 'transparent' }}>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
          <User className="text-gold-500 mr-2" size={20} />
          Perfil de Influencia (ONA)
        </h3>
        
        {selectedNode ? (
          <div className="flex flex-col gap-5 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-2">
              <div 
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-dark-600 to-dark-800 border-2 flex items-center justify-center font-bold text-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{ borderColor: (AREA_COLORS as any)[selectedNode.area], color: (AREA_COLORS as any)[selectedNode.area] }}
              >
                {selectedNode.nombre.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{selectedNode.nombre}</h4>
                <p className="text-sm text-text-muted">{selectedNode.cargo}</p>
              </div>
            </div>
            
            <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-text-muted">Área/Constelación</span>
                <span 
                  className="text-xs font-bold px-2 py-1 rounded text-white" 
                  style={{ backgroundColor: (AREA_COLORS as any)[selectedNode.area] }}
                >
                  {selectedNode.area}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3 border-t border-white/5 pt-3">
                <span className="text-xs text-text-muted">Evaluación de Desempeño</span>
                <span className="text-sm text-white font-medium flex items-center gap-1">
                  <Target size={14} className="text-gold-500"/> {selectedNode.evaluacion} / 5.0
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="text-xs text-text-muted">Colaboradores que lo reconocen</span>
                <span className="text-sm text-white font-medium">{selectedNode.reconocimientos}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-semibold text-text-muted uppercase mb-3">Impacto en la red</h4>
              <div className="bg-dark-600/50 p-4 rounded-lg border border-white/5">
                <p className="text-sm text-white/80">
                  {selectedNode.reconocimientos > 10 
                    ? `¡Es un nodo central! ${selectedNode.nombre} actúa como un puente vital de comunicación dentro de ${selectedNode.area}.`
                    : `${selectedNode.nombre} mantiene un nivel saludable de conexiones, colaborando principalmente dentro de su ecosistema.`}
                </p>
              </div>
            </div>

            <button className="mt-auto w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors text-sm font-medium">
              Ver Análisis Detallado
            </button>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
            <Layers size={48} className="text-text-muted mb-4" />
            <p className="text-sm text-white max-w-[200px]">Interactúa con el modelo 3D o selecciona una constelación para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkGraph;
