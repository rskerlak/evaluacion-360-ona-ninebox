import { useState } from 'react';
import { Target, Shield, Zap, CheckCircle2, User } from 'lucide-react';

const EvaluateCollaborator = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const employees = [
    { id: '12345', nombre: 'Martínez, Ana', cargo: 'Analista de Desempeño' },
    { id: '12346', nombre: 'Rodríguez, Carlos', cargo: 'Especialista en RRHH' },
    { id: '12347', nombre: 'López, Sofía', cargo: 'Coordinadora de Talento' },
    { id: '12348', nombre: 'Pérez, Diego', cargo: 'Analista de Compensaciones' },
  ];

  const competencies = [
    'ADAPTACIÓN AL CAMBIO', 'COMPROMISO', 'COMUNICACIÓN', 'CULTURA INCLUSIVA',
    'DESARROLLO DE PERSONAS', 'EMPATÍA', 'GESTIÓN DE CONFLICTOS', 'GESTIÓN INNOVADORA',
    'LIDERAZGO', 'NEGOCIACIÓN ASERTIVA', 'ORIENTACIÓN AL CLIENTE', 'PENSAMIENTO ESTRATÉGICO',
    'PLANIFICACIÓN Y RESULTADOS', 'PROACTIVIDAD', 'RESPONSABILIDAD SOCIAL', 'TOMA DE DECISIONES',
    'TRABAJO EN EQUIPO'
  ];

  return (
    <div className="animate-in fade-in duration-700 w-full max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Evalúe un colaborador</h1>
        <p className="text-text-muted mt-1">Segunda Revisión Semestral - Evaluación 360°</p>
      </div>

      <form className="space-y-6">
        {/* Employee Selection */}
        <div className="glass-panel p-6 rounded-2xl">
          <label className="block text-sm font-medium text-text-muted mb-2 flex items-center">
            <User size={16} className="mr-2 text-gold-500" />
            Seleccione el colaborador a evaluar
          </label>
          <select 
            className="w-full bg-dark-900/50 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="" disabled>Seleccione un empleado...</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.nombre} - {emp.cargo}</option>
            ))}
          </select>
        </div>

        {/* Pilar I: Gestión por Objetivos */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-gold-500">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center">
            <Target size={20} className="mr-2 text-gold-500" />
            Pilar I: Gestión por Objetivos (MBO-OKR)
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Evalúe el grado de cumplimiento de los objetivos planteados al inicio del semestre.
          </p>

          <div className="space-y-4">
            {[
              { id: 1, node: 'Procesos', text: 'Generar reportes estadísticos semanales de los procesos de evaluación para identificar tendencias y áreas de mejora.' },
              { id: 2, node: 'Equipo', text: 'Completar al menos una certificación en análisis de datos o plataformas de gestión de talento.' },
              { id: 3, node: 'Cliente', text: 'Colaborar activamente en el diseño e implementación de un nuevo sistema de reconocimiento.' },
              { id: 4, node: 'Autosuperación', text: 'Brindar soporte y capacitación a los líderes de equipo sobre herramientas de evaluación.' }
            ].map(obj => (
              <div key={obj.id} className="bg-dark-900/40 border border-white/5 p-5 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Nodo</label>
                    <select className="w-full bg-dark-600 border border-white/10 rounded-lg p-2 text-sm text-white">
                      <option value={obj.node.toLowerCase()}>{obj.node}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Cumplimiento (1-5)</label>
                    <select className="w-full bg-dark-600 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-gold-500">
                      <option value="" disabled selected>Seleccione</option>
                      <option value="1">1 - No cumple</option>
                      <option value="2">2 - Parcial</option>
                      <option value="3">3 - Cumple</option>
                      <option value="4">4 - Supera</option>
                      <option value="5">5 - Excepcional</option>
                    </select>
                  </div>
                </div>
                <div className="bg-dark-600/50 p-3 rounded-lg border border-white/5">
                  <p className="text-sm text-white/90">{obj.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilar II: Competencias y Rendimiento */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center">
            <Shield size={20} className="mr-2 text-blue-500" />
            Pilar II: Evaluación de Competencias y Rendimiento
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Análisis FODA de competencias y evaluación cuantitativa de rendimiento laboral.
          </p>

          <div className="space-y-6">
            <div className="bg-dark-900/40 border border-white/5 p-5 rounded-xl">
              <h3 className="text-base font-bold text-white mb-4">Competencias (FODA)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Área de desarrollo', 'Fortaleza', 'Oportunidad de crecimiento', 'Reto futuro'].map(label => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
                    <select className="w-full bg-dark-600 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500">
                      <option value="" disabled selected>Seleccione una competencia</option>
                      {competencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-900/40 border border-white/5 p-5 rounded-xl">
              <h3 className="text-base font-bold text-white mb-4">Rendimiento Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['CALIDAD', 'CANTIDAD', 'COMPROMISO CON LA JORNADA', 'TIEMPO'].map(label => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
                    <select className="w-full bg-dark-600 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500">
                      <option value="" disabled selected>Seleccione</option>
                      <option value="1">No cumple las expectativas</option>
                      <option value="2">Cumple algunas expectativas</option>
                      <option value="3">Cumple las expectativas</option>
                      <option value="4">Supera las expectativas</option>
                      <option value="5">Excepcional</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pilar III: Valoración de Potencial */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center">
            <Zap size={20} className="mr-2 text-green-500" />
            Pilar III: Valoración de Potencial
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Determine el potencial futuro del colaborador en la organización.
          </p>

          <div className="bg-dark-900/40 border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-dark-800/50 border-b border-white/10">
                <tr>
                  <th className="p-4 font-semibold text-white">Descripción</th>
                  <th className="p-4 font-semibold text-white w-1/3">Instancia evaluadora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { title: 'CONOCIMIENTO Y EXPERTIZ', desc: 'Grado de conocimientos adquiridos respecto a las tareas que realiza.' },
                  { title: 'FLEXIBILIDAD', desc: 'Capacidad para adaptarse a cambios y situaciones imprevistas.' },
                  { title: 'INTERÉS EN DESARROLLO', desc: 'Motivación por avanzar profesionalmente y adquirir nuevas habilidades.' },
                  { title: 'COMPROMISO', desc: 'Dedicación hacia tareas, objetivos y disposición para asumir responsabilidades.' },
                  { title: 'TRANSMISIÓN DE CONOCIMIENTO', desc: 'Efectividad para compartir experiencia con colegas.' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <strong className="text-white block mb-1">{item.title}</strong>
                      <span className="text-text-muted text-xs">{item.desc}</span>
                    </td>
                    <td className="p-4 align-top">
                      <select className="w-full bg-dark-600 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-green-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option value="desarrollo">Potencial en desarrollo</option>
                        <option value="puesto">Potencial conforme a su puesto</option>
                        <option value="promocion">Promoción</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="button"
            className="flex items-center px-8 py-3 bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1"
          >
            <CheckCircle2 className="mr-2" size={20} />
            Confirmar Evaluación
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluateCollaborator;
