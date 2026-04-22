import React, { useState } from 'react';
import { User, Target, TrendingUp } from 'lucide-react';

const NineBox = () => {
  const [selectedDot, setSelectedDot] = useState<any>(null);

  // Generate some random dots for the 9-box grid
  const dots = [...Array(40)].map((_, i) => {
    const isStar = Math.random() > 0.8;
    return {
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      color: isStar ? '#e5c158' : '#cccccc',
      nombre: `Colaborador \${i + 1}`,
      cargo: isStar ? 'Líder de Proyecto' : 'Analista',
      area: ['IT', 'Finanzas', 'RRHH', 'Ventas'][Math.floor(Math.random() * 4)],
      desempeno: (Math.random() * 2 + 3).toFixed(1),
      potencial: isStar ? 'Promoción' : 'En su puesto'
    };
  });

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      <div className="glass-panel p-8 rounded-2xl relative w-full xl:w-2/3">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="w-2 h-2 rounded-full bg-gold-500 mr-2"></span>
            Nine Box - Potencial vs Desempeño
          </h3>
          <p className="text-sm text-text-muted mt-1">Matriz de evaluación cruzando potencial (eje Y) y desempeño (eje X).</p>
        </div>

        <div className="relative border border-white/10 rounded-xl overflow-visible ml-12 mb-8" style={{ height: '450px' }}>
          {/* Explicit Axis Labels */}
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-bold text-white tracking-widest flex items-center gap-2">
            <TrendingUp size={16} className="text-gold-500" /> POTENCIAL (Y)
          </div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-bold text-white tracking-widest flex items-center gap-2">
            <Target size={16} className="text-gold-500" /> DESEMPEÑO (X)
          </div>

          {/* Grid Layout Container */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 overflow-hidden rounded-xl border border-white/10">
            {/* Top Row: High Potential */}
            <div className="border-r border-b border-white/5 bg-red-900/10 hover:bg-white/5 transition-colors"></div>
            <div className="border-r border-b border-white/5 bg-yellow-900/10 hover:bg-white/5 transition-colors"></div>
            <div className="border-b border-white/5 bg-green-900/20 hover:bg-white/5 transition-colors"></div>
            
            {/* Middle Row: Medium Potential */}
            <div className="border-r border-b border-white/5 bg-red-900/20 hover:bg-white/5 transition-colors"></div>
            <div className="border-r border-b border-white/5 bg-yellow-900/20 hover:bg-white/5 transition-colors"></div>
            <div className="border-b border-white/5 bg-green-900/10 hover:bg-white/5 transition-colors"></div>
            
            {/* Bottom Row: Low Potential */}
            <div className="border-r border-white/5 bg-red-900/30 hover:bg-white/5 transition-colors"></div>
            <div className="border-r border-white/5 bg-red-900/20 hover:bg-white/5 transition-colors"></div>
            <div className="bg-yellow-900/10 hover:bg-white/5 transition-colors"></div>
          </div>

          {/* Overlay text for grid quadrants */}
          <div className="absolute top-4 left-4 text-xs font-semibold text-text-muted">Bajo Desempeño<br/>Alto Potencial</div>
          <div className="absolute top-4 right-4 text-xs font-semibold text-gold-500 text-right">Estrellas<br/>Alto Desempeño / Alto Potencial</div>
          <div className="absolute bottom-4 left-4 text-xs font-semibold text-red-400/70">Bajo Desempeño<br/>Bajo Potencial</div>
          <div className="absolute bottom-4 right-4 text-xs font-semibold text-text-muted text-right">Alto Desempeño<br/>Bajo Potencial</div>

          {/* Dots representing employees */}
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-visible z-20">
            {dots.map(dot => (
              <div 
                key={dot.id}
                onClick={() => setSelectedDot(dot)}
                className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer pointer-events-auto \${selectedDot?.id === dot.id ? 'scale-150 ring-2 ring-white z-30' : 'hover:scale-150 z-20'}`}
                style={{
                  left: `\${dot.x}%`,
                  bottom: `\${dot.y}%`,
                  backgroundColor: dot.color,
                  boxShadow: dot.color === '#e5c158' ? '0 0 10px rgba(212, 175, 55, 0.8)' : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="glass-panel p-6 rounded-2xl w-full xl:w-1/3 flex flex-col h-[560px]">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
          <User className="text-gold-500 mr-2" size={20} />
          Perfil del Colaborador
        </h3>
        
        {selectedDot ? (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-dark-600 to-dark-800 border-2 border-gold-500/50 flex items-center justify-center text-gold-500 font-bold text-xl">
                {selectedDot.nombre.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{selectedDot.nombre}</h4>
                <p className="text-sm text-gold-500">{selectedDot.cargo}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5">
                <span className="text-xs text-text-muted block mb-1">Área</span>
                <span className="text-sm text-white font-medium">{selectedDot.area}</span>
              </div>
              <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5">
                <span className="text-xs text-text-muted block mb-1">Desempeño (X)</span>
                <span className="text-sm text-white font-medium">{selectedDot.desempeno} / 5.0</span>
              </div>
              <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5 col-span-2">
                <span className="text-xs text-text-muted block mb-1">Potencial (Y)</span>
                <span className="text-sm text-white font-medium">{selectedDot.potencial}</span>
              </div>
            </div>

            <button className="mt-auto w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors text-sm font-medium">
              Ver Evaluación Completa
            </button>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center opacity-50">
            <Target size={48} className="text-gold-500 mb-4" />
            <p className="text-sm text-white max-w-[200px]">Selecciona un punto en la matriz para ver los detalles del colaborador.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NineBox;
