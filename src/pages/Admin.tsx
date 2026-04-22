import { useState } from 'react';
import NetworkGraph from '../components/NetworkGraph';
import { Activity, Users, ShieldAlert, TrendingUp } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'ona' | 'metrics'>('ona');

  return (
    <div className="animate-in fade-in duration-700 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Panel Ejecutivo</h1>
          <p className="text-text-muted mt-1">Análisis Organizacional y Mapeo de Redes</p>
        </div>
        
        <div className="flex bg-dark-600 rounded-lg p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab('ona')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ona' ? 'bg-gold-500 text-dark-900 shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            Sociograma ONA 3D
          </button>
          <button 
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'metrics' ? 'bg-gold-500 text-dark-900 shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            Métricas Clave
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-dark-600 rounded-lg border border-white/5 text-gold-500">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Total Empleados</p>
            <p className="text-2xl font-semibold text-white">1,248</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-dark-600 rounded-lg border border-white/5 text-gold-500">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Nodos de Influencia</p>
            <p className="text-2xl font-semibold text-white">84</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-dark-600 rounded-lg border border-white/5 text-gold-500">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Riesgo de Fuga (Top 10%)</p>
            <p className="text-2xl font-semibold text-white">12%</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-dark-600 rounded-lg border border-white/5 text-gold-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Adopción Cultural</p>
            <p className="text-2xl font-semibold text-white">89%</p>
          </div>
        </div>
      </div>

      {activeTab === 'ona' && (
        <div className="glass-panel p-4 rounded-2xl h-[600px] relative">
          <div className="absolute top-8 left-8 z-10 bg-dark-900/80 backdrop-blur-md p-4 rounded-lg border border-white/10 max-w-xs">
            <h3 className="text-white font-medium mb-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              Organizational Network Analysis
            </h3>
            <p className="text-xs text-text-muted">
              Interacción en tiempo real. Use el ratón para rotar el modelo 3D y la rueda para hacer zoom. Los nodos dorados brillantes representan líderes informales o puentes críticos en la comunicación.
            </p>
          </div>
          <NetworkGraph />
        </div>
      )}
      
      {activeTab === 'metrics' && (
        <div className="glass-panel p-12 text-center rounded-2xl h-[600px] flex items-center justify-center flex-col">
           <Activity size={48} className="text-gold-500 mb-6 opacity-50" />
           <h2 className="text-2xl text-white font-light">Panel de Métricas Detalladas</h2>
           <p className="text-text-muted mt-2 max-w-md">El módulo de métricas avanzadas y cruces con Nine Box se está procesando en esta versión de demostración.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
