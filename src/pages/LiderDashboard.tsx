import React from 'react';
import { Target, TrendingUp, Users, Zap, Award, Share2, Activity, Star } from 'lucide-react';

const LiderDashboard = () => {
  return (
    <div className="animate-in fade-in duration-700 w-full max-w-7xl mx-auto pb-12">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Resultados del Relevamiento</h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Resultados basados en el feedback de tu equipo sobre tu liderazgo y el análisis de la red organizacional (ONA).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Leadership & Behaviors */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Liderazgo Predominante */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Star className="text-gold-500 mr-2" size={24} /> Perfil de Liderazgo Predominante
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5 text-center transition-all opacity-50">
                <div className="text-sm font-medium text-orange-400 mb-2 flex items-center justify-center"><Target size={16} className="mr-1"/> Transaccional</div>
                <div className="text-3xl font-bold text-white mb-1">2</div>
                <div className="inline-block px-3 py-1 bg-dark-600 rounded-full text-xs text-text-muted">18%</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-6 rounded-xl border border-green-500/30 text-center shadow-[0_0_20px_rgba(34,197,94,0.15)] transform scale-105 z-10">
                <div className="text-sm font-bold text-green-400 mb-2 flex items-center justify-center"><TrendingUp size={16} className="mr-1"/> Transformacional</div>
                <div className="text-4xl font-bold text-white mb-1">8</div>
                <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">72%</div>
              </div>
              
              <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5 text-center transition-all opacity-50">
                <div className="text-sm font-medium text-blue-400 mb-2 flex items-center justify-center"><Users size={16} className="mr-1"/> Delegador</div>
                <div className="text-3xl font-bold text-white mb-1">1</div>
                <div className="inline-block px-3 py-1 bg-dark-600 rounded-full text-xs text-text-muted">10%</div>
              </div>
            </div>
          </div>

          {/* Fortalezas y Áreas de Desarrollo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-green-500/50">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                <Award className="text-green-500 mr-2" size={18} /> Fortalezas Identificadas
              </h3>
              <div className="space-y-3">
                <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center"><span className="w-5 h-5 bg-green-500/20 text-green-500 flex items-center justify-center rounded text-xs font-bold mr-3">1</span><span className="text-sm text-white font-medium">COMUNICACIÓN</span></div>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">5 votos (71%)</span>
                </div>
                <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center"><span className="w-5 h-5 bg-green-500/20 text-green-500 flex items-center justify-center rounded text-xs font-bold mr-3">2</span><span className="text-sm text-white font-medium">LIDERAZGO</span></div>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">2 votos (28%)</span>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-orange-500/50">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                <Zap className="text-orange-500 mr-2" size={18} /> Áreas de Desarrollo
              </h3>
              <div className="space-y-3">
                <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center"><span className="w-5 h-5 bg-orange-500/20 text-orange-500 flex items-center justify-center rounded text-xs font-bold mr-3">1</span><span className="text-sm text-white font-medium">NEGOCIACIÓN</span></div>
                  <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded">3 votos (42%)</span>
                </div>
                <div className="bg-dark-900/50 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center"><span className="w-5 h-5 bg-orange-500/20 text-orange-500 flex items-center justify-center rounded text-xs font-bold mr-3">2</span><span className="text-sm text-white font-medium">EMPATÍA</span></div>
                  <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded">2 votos (28%)</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column - Stats & ONA */}
        <div className="space-y-6">
          
          {/* Indicadores rápidos */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-semibold text-white mb-4 flex items-center"><Activity className="text-blue-500 mr-2" size={18} /> Indicadores Rápidos</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-text-muted">Total encuestados:</span>
                <strong className="text-white bg-dark-600 px-2 py-0.5 rounded">7</strong>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-text-muted">Participación:</span>
                <strong className="text-green-500">100%</strong>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-text-muted">Dispuestos a movilidad:</span>
                <strong className="text-gold-500">5 (71%)</strong>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-text-muted">Avg Comportamientos:</span>
                <strong className="text-white">2.8</strong>
              </div>
            </div>
          </div>

          {/* ONA Panel */}
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Share2 size={100} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-lg font-bold text-white mb-1 flex items-center">
                <Share2 className="text-purple-500 mr-2" size={20} /> Análisis de Red (ONA)
              </h2>
              <p className="text-xs text-text-muted mb-4">Flujos de colaboración e influencia en tu equipo.</p>
              
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-dark-900/50 p-3 rounded-lg border border-purple-500/20">
                  <div className="text-xs text-purple-400 font-medium mb-1">DENSIDAD</div>
                  <div className="text-2xl font-bold text-white">42.8%</div>
                </div>
                <div className="bg-dark-900/50 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-xs text-blue-400 font-medium mb-1">CONEXIONES</div>
                  <div className="text-2xl font-bold text-white">15<span className="text-sm font-normal text-text-muted ml-1">rutas</span></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Líderes de Influencia</h4>
                  <div className="bg-dark-900/30 p-2 rounded-lg border border-white/5 flex items-center justify-between mb-2">
                    <span className="text-sm text-white flex items-center"><span className="mr-2">🥇</span> Ana Martínez</span>
                    <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full font-medium">8 pts</span>
                  </div>
                  <div className="bg-dark-900/30 p-2 rounded-lg border border-white/5 flex items-center justify-between">
                    <span className="text-sm text-white flex items-center"><span className="mr-2">🥈</span> Carlos Rodríguez</span>
                    <span className="text-xs bg-dark-600 text-text-muted px-2 py-0.5 rounded-full font-medium">5 pts</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Conectores Estratégicos</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded-full flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1.5"></span> Sofía López
                    </span>
                    <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded-full flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1.5"></span> Diego Pérez
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LiderDashboard;
