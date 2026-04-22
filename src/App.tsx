import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InteractiveBackground from './components/InteractiveBackground';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-text-main font-sans selection:bg-gold-500/30">
        <InteractiveBackground />
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-dark-900/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              EVALUACIÓN 360° + ONA
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link to="/admin" className="hover:text-gold-500 transition-colors">Admin RRHH</Link>
              <Link to="/lider" className="hover:text-gold-500 transition-colors">Líder</Link>
              <Link to="/colaborador" className="hover:text-gold-500 transition-colors">Colaborador</Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/lider" element={<div className="glass-panel p-12 text-center rounded-2xl"><h1 className="text-3xl text-white font-light">Panel del Líder</h1><p className="mt-4 text-text-muted">Módulo en construcción en la nueva versión.</p></div>} />
            <Route path="/colaborador" element={<div className="glass-panel p-12 text-center rounded-2xl"><h1 className="text-3xl text-white font-light">Panel del Colaborador</h1><p className="mt-4 text-text-muted">Módulo en construcción en la nueva versión.</p></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
