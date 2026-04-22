import { Link } from 'react-router-dom';
import { Network, Users, UserCircle } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-12 max-w-3xl flex flex-col items-center">
        <div className="mb-10 transform transition-transform hover:scale-105 filter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <img src={logoUrl} alt="SAGE Logo" className="h-48 sm:h-64 md:h-80 object-contain" />
        </div>
        
        <p className="text-xl sm:text-2xl text-white font-light leading-relaxed mb-4">
          Gestión del Talento <span className="text-gold-500 font-semibold">Impulsada por Datos</span>
        </p>
        <p className="text-base text-text-muted max-w-2xl">
          Plataforma integral de evaluación 360°, mapeo de redes organizacionales (ONA) y matriz Nine Box para un análisis predictivo y estratégico del capital humano.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        
        {/* Admin Card */}
        <Link to="/admin" className="group glass-panel rounded-2xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-full bg-dark-600 border border-gold-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-shadow">
            <Network className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">RR.HH. Ejecutivo</h2>
          <p className="text-sm text-text-muted mb-6 flex-grow">
            Panel centralizado con métricas organizacionales, análisis ONA en 3D y distribución de talento.
          </p>
          <span className="text-gold-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Acceder al panel <span className="text-lg">→</span>
          </span>
        </Link>

        {/* Lider Card */}
        <Link to="/lider" className="group glass-panel rounded-2xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-full bg-dark-600 border border-gold-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-shadow">
            <Users className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Visión del Líder</h2>
          <p className="text-sm text-text-muted mb-6 flex-grow">
            Gestión estratégica de equipos, definición de objetivos SMART y evaluación de desempeño.
          </p>
          <span className="text-gold-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Acceder al panel <span className="text-lg">→</span>
          </span>
        </Link>

        {/* Colaborador Card */}
        <Link to="/colaborador" className="group glass-panel rounded-2xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-full bg-dark-600 border border-gold-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-shadow">
            <UserCircle className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Autodesarrollo</h2>
          <p className="text-sm text-text-muted mb-6 flex-grow">
            Experiencia del colaborador: relevamiento de feedback y seguimiento de carrera.
          </p>
          <span className="text-gold-500 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Acceder al panel <span className="text-lg">→</span>
          </span>
        </Link>

      </div>
    </div>
  );
};

export default Home;
