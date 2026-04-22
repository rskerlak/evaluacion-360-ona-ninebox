import { useMemo, useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const NetworkGraph = () => {
  const fgRef = useRef();

  const data = useMemo(() => {
    // Generate random data for a beautiful dense 3D network
    const N = 80;
    const nodes = [...Array(N).keys()].map(i => ({ id: i, val: (Math.random() * 2) + 1 }));
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
    <div className="w-full h-full rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
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
