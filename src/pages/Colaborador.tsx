import React from 'react';
import { Target, TrendingUp, MessageSquare, Star, Award, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Colaborador = () => {
  return (
    <div className="animate-in fade-in duration-700 w-full max-w-5xl mx-auto pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Mi Evaluación y Desarrollo</h1>
        <p className="text-text-muted max-w-2xl mx-auto">Resumen de tu última evaluación, feedback recibido y plan de desarrollo personal.</p>
      </div>

      {/* Featured Feedback Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/40 rounded-2xl border border-blue-500/30 overflow-hidden group hover:border-blue-500/60 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <div className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <MessageSquare className="text-blue-400 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-white">Relevar Feedback 360°</h2>
              </div>
              <p className="text-blue-200/80 mb-4 max-w-md">
                Comparte tu perspectiva sobre colaboración y relaciones organizacionales con tu equipo.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-blue-300">
                <div className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Evaluación 360°</div>
                <div className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Mapeo de relaciones</div>
                <div className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Feedback estructurado</div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link to="/feedback">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 flex items-center">
                  Completar Feedback
                  <TrendingUp size={20} className="ml-3" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Summary */}
      <div className="glass-panel p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Star className="text-gold-500 mr-2" size={24} /> Resumen de mi Última Evaluación
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center relative overflow-hidden group hover:border-gold-500/30 transition-colors">
            <div className="text-4xl font-bold text-gold-500 mb-2">3.6</div>
            <div className="text-sm text-white font-medium">Puntaje Promedio</div>
            <div className="text-xs text-text-muted mt-1">sobre 5.0</div>
          </div>
          <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center relative overflow-hidden group hover:border-green-500/30 transition-colors">
            <div className="text-2xl font-bold text-green-500 mb-2">En desarrollo</div>
            <div className="text-sm text-white font-medium">Nivel de Potencial</div>
            <div className="text-xs text-text-muted mt-1">evaluación actual</div>
          </div>
          <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="text-2xl font-bold text-purple-500 mb-2">Transformacional</div>
            <div className="text-sm text-white font-medium">Estilo Predominante</div>
            <div className="text-xs text-text-muted mt-1">según feedback</div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-dark-900/30 rounded-xl p-5 border border-white/5 mb-8">
          <h3 className="font-semibold text-white mb-4">Desglose por Área</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
              <div className="text-xs text-text-muted mb-1">No cumple</div>
              <div className="text-xl font-bold text-red-500">0</div>
            </div>
            <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
              <div className="text-xs text-text-muted mb-1">Parcial</div>
              <div className="text-xl font-bold text-orange-500">1</div>
            </div>
            <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
              <div className="text-xs text-text-muted mb-1">Cumple</div>
              <div className="text-xl font-bold text-green-500">3</div>
            </div>
            <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
              <div className="text-xs text-text-muted mb-1">Supera</div>
              <div className="text-xl font-bold text-blue-500">1</div>
            </div>
            <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
              <div className="text-xs text-text-muted mb-1">Excepcional</div>
              <div className="text-xl font-bold text-purple-500">0</div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-5">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center">
              <Award className="mr-2" size={18} /> Mis Fortalezas
            </h4>
            <ul className="text-sm text-green-200/70 space-y-2">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Comunicación efectiva</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Trabajo en equipo</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Orientación a resultados</li>
            </ul>
          </div>
          <div className="bg-orange-900/10 border border-orange-500/20 rounded-xl p-5">
            <h4 className="font-semibold text-orange-400 mb-3 flex items-center">
              <AlertCircle className="mr-2" size={18} /> Áreas de Mejora
            </h4>
            <ul className="text-sm text-orange-200/70 space-y-2">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div> Gestión del tiempo</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div> Liderazgo de proyectos</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div> Pensamiento estratégico</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Personal Nine Box */}
      <div className="glass-panel p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center">
          <Target className="text-purple-500 mr-2" size={24} /> Mi Posición en la Matriz 9-Box
        </h2>
        <p className="text-text-muted text-sm mb-8">Tu ubicación en la matriz de potencial vs desempeño organizacional.</p>
        
        <div className="bg-dark-900/30 rounded-xl p-6 border border-white/5 relative flex justify-center">
          
          <div className="absolute left-10 md:left-24 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-text-muted tracking-widest">
            POTENCIAL
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-2 aspect-square">
              {/* Row 3 (Alto Potencial) */}
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-green-500 font-bold text-[10px] md:text-xs">Alto Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Bajo Desempeño</div>
              </div>
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-green-500 font-bold text-[10px] md:text-xs">Alto Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Medio Desempeño</div>
              </div>
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-green-500 font-bold text-[10px] md:text-xs">Alto Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Alto Desempeño</div>
              </div>
              
              {/* Row 2 (Medio Potencial) */}
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-yellow-500 font-bold text-[10px] md:text-xs">Medio Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Bajo Desempeño</div>
              </div>
              
              {/* THIS IS THE SELECTED BOX */}
              <div className="bg-blue-600 border border-blue-400 rounded-lg flex flex-col items-center justify-center p-2 text-center shadow-[0_0_15px_rgba(59,130,246,0.5)] transform scale-105 z-10">
                <div className="text-2xl mb-1">👤</div>
                <div className="font-bold text-white text-[10px] md:text-xs">Tú estás aquí</div>
              </div>

              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-yellow-500 font-bold text-[10px] md:text-xs">Medio Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Alto Desempeño</div>
              </div>
              
              {/* Row 1 (Bajo Potencial) */}
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-red-500 font-bold text-[10px] md:text-xs">Bajo Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Bajo Desempeño</div>
              </div>
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-red-500 font-bold text-[10px] md:text-xs">Bajo Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Medio Desempeño</div>
              </div>
              <div className="bg-dark-600/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 text-center opacity-50">
                <div className="text-red-500 font-bold text-[10px] md:text-xs">Bajo Potencial</div>
                <div className="text-[10px] md:text-xs text-text-muted">Alto Desempeño</div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm font-semibold text-text-muted tracking-widest">
              DESEMPEÑO
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colaborador;
