import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InteractiveBackground from './components/InteractiveBackground';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Lider from './pages/Lider';
import EvaluateCollaborator from './pages/EvaluateCollaborator';
import Colaborador from './pages/Colaborador';
import Feedback from './pages/Feedback';
import LiderDashboard from './pages/LiderDashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen text-text-main font-sans relative flex flex-col items-center">
        <InteractiveBackground />
        
        {/* Navigation / Header */}
        <nav className="w-full max-w-7xl mx-auto p-6 relative z-10 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold text-2xl tracking-widest text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              SAGE<span className="text-gold-500 text-3xl leading-none">.</span>
            </span>
          </Link>
          <div className="flex gap-4">
            <Link to="/colaborador" className="text-sm font-medium text-text-muted hover:text-white transition-colors">Colaborador</Link>
            <Link to="/lider" className="text-sm font-medium text-text-muted hover:text-white transition-colors">Líder</Link>
            <Link to="/admin" className="text-sm font-medium text-text-muted hover:text-white transition-colors">RR.HH.</Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="relative z-10 pt-8 pb-12 px-6 w-full max-w-7xl mx-auto flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/lider" element={<Lider />} />
            <Route path="/lider-dashboard" element={<LiderDashboard />} />
            <Route path="/evaluate" element={<EvaluateCollaborator />} />
            <Route path="/colaborador" element={<Colaborador />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
