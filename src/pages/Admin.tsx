import { useState } from 'react';
import NetworkGraph from '../components/NetworkGraph';
import Metrics from '../components/Metrics';
import NineBox from '../components/NineBox';
import { Activity, Users, ShieldAlert, TrendingUp } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'ona' | 'ninebox' | 'metrics'>('ona');

  return (
    <div className="animate-in fade-in duration-700 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Panel Ejecutivo</h1>
          <p className="text-text-muted mt-1">Análisis Organizacional y Mapeo de Redes</p>
        </div>
        
        <div className="flex flex-wrap bg-dark-600 rounded-lg p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab('ona')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ona' ? 'bg-gold-500 text-dark-900 shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            Sociograma ONA 3D
          </button>
          <button 
            onClick={() => setActiveTab('ninebox')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ninebox' ? 'bg-gold-500 text-dark-900 shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            Matriz 9-Box
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
        <div className="w-full relative">
          <NetworkGraph />
        </div>
      )}

      {activeTab === 'ninebox' && (
        <NineBox />
      )}
      
      {activeTab === 'metrics' && (
        <Metrics />
      )}
    </div>
  );
};

export default Admin;
