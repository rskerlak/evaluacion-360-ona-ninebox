import { useMemo, useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const NetworkGraph = () => {
  const fgRef = useRef();

  const data = useMemo(() => {
    const NOMBRES = ['Ana', 'Carlos', 'Sofía', 'Diego', 'Laura', 'Martín', 'Elena', 'Javier', 'Valentina', 'Lucas'];
    const APELLIDOS = ['Martínez', 'Rodríguez', 'López', 'Pérez', 'García', 'Fernández', 'Gómez', 'Díaz', 'Álvarez', 'Romero'];
    const CARGOS = ['Analista de Datos', 'Especialista', 'Coordinador/a', 'Desarrollador/a', 'Gerente', 'Diseñador/a', 'Líder Técnico', 'Product Manager'];
    const AREAS = ['Recursos Humanos', 'IT', 'Marketing', 'Ventas', 'Finanzas', 'Operaciones', 'Producto'];

    const N = 80;
    const nodes = [...Array(N).keys()].map(i => {
      const nombre = `${NOMBRES[Math.floor(Math.random() * NOMBRES.length)]} ${APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)]}`;
      const cargo = CARGOS[Math.floor(Math.random() * CARGOS.length)];
      const area = AREAS[Math.floor(Math.random() * AREAS.length)];
      const evaluacion = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
      const reconocimientos = Math.floor(Math.random() * 8) + 1;
      
      return { 
        id: i, 
        val: (Math.random() * 2) + 1,
        nombre,
        cargo,
        area,
        evaluacion,
        reconocimientos
      };
    });

    const links = [...Array(N * 2).keys()]
      .filter(() => Math.random() > 0.5)
      .map(() => ({
        source: Math.floor(Math.random() * N),
        target: Math.floor(Math.random() * N)
      }));

    return { nodes, links };
  }, []);

  useEffect(() => {
    // Add glowing effect to the graph scene
    const fg = fgRef.current;
    if (fg) {
      // @ts-ignore
      const scene = fg.scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xd4af37, 2, 100);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);
    }
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative">
      {/* Esconder el tooltip nativo feo que a veces aparece y forzar estilos sobre el scene-tooltip */}
      <style>{`
        .scene-tooltip {
          color: white !important;
          background: transparent !important;
          pointer-events: none;
        }
      `}</style>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        backgroundColor="#050507"
        nodeResolution={16}
        nodeRelSize={4}
        nodeColor={(node) => {
          // @ts-ignore
          return node.val > 2 ? '#e5c158' : '#b5952f';
        }}
        linkColor={() => 'rgba(212, 175, 55, 0.4)'}
        linkOpacity={0.4}
        linkWidth={0.5}
        nodeThreeObject={(node) => {
          // @ts-ignore
          const size = node.val;
          const geometry = new THREE.SphereGeometry(size, 16, 16);
          const material = new THREE.MeshPhongMaterial({
            // @ts-ignore
            color: node.val > 2 ? '#e5c158' : '#b5952f',
            emissive: '#d4af37',
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9,
          });
          return new THREE.Mesh(geometry, material);
        }}
        nodeLabel={(node) => {
          // @ts-ignore
          return \`
            <div style="background: rgba(18, 18, 22, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.3); padding: 14px 18px; border-radius: 12px; font-family: 'Outfit', sans-serif; box-shadow: 0 8px 32px rgba(0,0,0,0.6); min-width: 220px; text-align: left;">
              <div style="font-weight: 600; font-size: 16px; color: #ffffff; margin-bottom: 2px;">\${node.nombre}</div>
              <div style="font-size: 12px; color: #d4af37; margin-bottom: 12px; letter-spacing: 0.5px; font-weight: 500;">\${node.cargo} • \${node.area}</div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; color: #a3a3a3;">Evaluación de desempeño</span>
                <span style="font-size: 13px; font-weight: 600; color: #e5c158;">\${node.evaluacion}/5.0</span>
              </div>
              
              <div style="font-size: 12px; color: #cccccc; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px; margin-top: 6px;">
                Fue reconocido por <strong>\${node.reconocimientos}</strong> colaboradores
              </div>
            </div>
          \`;
        }}
        enableNodeDrag={false}
        enableNavigationControls={true}
        showNavInfo={false}
        width={800}
        height={500}
      />
    </div>
  );
};

export default NetworkGraph;
