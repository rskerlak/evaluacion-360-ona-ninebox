import React from 'react';
import { Target, BarChart2, TrendingUp, Users, CheckSquare, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lider = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-700 w-full max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Panel de Líder</h1>
        <p className="text-text-muted max-w-2xl mx-auto">Herramientas de gestión integral para liderar, evaluar y desarrollar a tu equipo de trabajo.</p>
      </div>

      {/* Quick Stats */}
      <div className="glass-panel p-6 rounded-2xl mb-12">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
          <TrendingUp className="text-purple-500 mr-2" size={20} />
          Resumen Rápido del Equipo
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-900/50 p-4 rounded-xl text-center border border-white/5 relative overflow-hidden group hover:border-gold-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={48} />
            </div>
            <div className="text-3xl font-bold text-gold-500 mb-1">12</div>
            <div className="text-sm text-text-muted">Colaboradores</div>
          </div>
          <div className="bg-dark-900/50 p-4 rounded-xl text-center border border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckSquare size={48} />
            </div>
            <div className="text-3xl font-bold text-green-500 mb-1">8</div>
            <div className="text-sm text-text-muted">Evaluaciones Hechas</div>
          </div>
          <div className="bg-dark-900/50 p-4 rounded-xl text-center border border-white/5 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock size={48} />
            </div>
            <div className="text-3xl font-bold text-orange-500 mb-1">4</div>
            <div className="text-sm text-text-muted">Pendientes</div>
          </div>
          <div className="bg-dark-900/50 p-4 rounded-xl text-center border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart2 size={48} />
            </div>
            <div className="text-3xl font-bold text-blue-500 mb-1">3.7</div>
            <div className="text-sm text-text-muted">Promedio Equipo</div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <h2 className="text-xl font-bold text-white mb-6">Acciones Principales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Card 1: Evaluar Colaborador */}
        <div className="glass-panel p-0 rounded-2xl overflow-hidden group hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all flex flex-col">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/5 p-8 text-center border-b border-white/5 relative overflow-hidden">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <CheckSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Evaluar Colaborador</h3>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm text-text-muted mb-8 flex-grow">
              Evalúa el desempeño, competencias y potencial de tus colaboradores usando criterios MBO-OKR y análisis FODA.
            </p>
            <button 
              onClick={() => navigate('/evaluate')}
              className="w-full py-3 bg-dark-600 hover:bg-dark-500 text-green-400 border border-green-500/30 hover:border-green-500/60 font-semibold rounded-xl transition-all flex items-center justify-center group-hover:bg-green-500/10"
            >
              Evaluar Desempeño <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Estadísticas del Equipo */}
        <div className="glass-panel p-0 rounded-2xl overflow-hidden group hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] transition-all flex flex-col">
          <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/5 p-8 text-center border-b border-white/5 relative overflow-hidden">
            <div className="w-16 h-16 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <BarChart2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white relative z-10">Estadísticas del Equipo</h3>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm text-text-muted mb-8 flex-grow">
              Visualiza métricas de desempeño, análisis de red organizacional y la perspectiva sobre tu perfil de liderazgo.
            </p>
            <button 
              onClick={() => navigate('/lider-dashboard')}
              className="w-full py-3 bg-dark-600 hover:bg-dark-500 text-gold-400 border border-gold-500/30 hover:border-gold-500/60 font-semibold rounded-xl transition-all flex items-center justify-center group-hover:bg-gold-500/10"
            >
              Ver Dashboard <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lider;
