import React, { useState } from 'react';
import { Send, Users, MessageSquare, TrendingUp, BookOpen, AlertCircle, Share2, Target, CheckCircle2 } from 'lucide-react';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const MAX_BEHAVIORS = 3;

  const behaviorsList = [
    "Aumenta la confianza en mí mismo.",
    "Mantiene un seguimiento de todos los errores que se producen.",
    "Tengo confianza en sus juicios y sus decisiones.",
    "Muestra con su conducta lo que expresa en palabras.",
    "Tiende a evitar involucrarse cuando surge alguna situación relevante.",
    "Me motiva a dar más de mí.",
    "Expresa que cada cual debe buscar su forma de hacer el trabajo.",
    "Sugiere nuevas formas de trabajar.",
    "Aclara lo que recibiré a cambio de mis esfuerzos.",
    "Me estimula a expresar mis ideas y opiniones.",
    "Considera que tengo necesidades, habilidades y aspiraciones distintas a las de los demás.",
    "Ninguna opción"
  ];

  const toggleBehavior = (behavior: string) => {
    if (behavior === "Ninguna opción") {
      setSelectedBehaviors(["Ninguna opción"]);
      return;
    }

    let newSelections = [...selectedBehaviors].filter(b => b !== "Ninguna opción");
    
    if (newSelections.includes(behavior)) {
      newSelections = newSelections.filter(b => b !== behavior);
    } else {
      if (newSelections.length < MAX_BEHAVIORS) {
        newSelections.push(behavior);
      }
    }
    setSelectedBehaviors(newSelections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to the backend
  };

  if (submitted) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-20">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">¡Feedback Enviado!</h2>
        <p className="text-text-muted mb-8 text-lg">Tu respuesta ha sido registrada exitosamente. Gracias por contribuir al desarrollo del equipo.</p>
        <button 
          onClick={() => window.location.href = '/colaborador'}
          className="px-8 py-4 bg-dark-600 hover:bg-dark-500 text-white border border-white/10 rounded-xl transition-all font-semibold"
        >
          Volver a Mi Perfil
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 w-full max-w-4xl mx-auto pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Encuesta de Retroalimentación 360°</h1>
        <p className="text-text-muted max-w-2xl mx-auto">Tu opinión honesta y constructiva es clave para nuestro crecimiento organizacional.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Clima Laboral */}
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/5 pb-4">
            <Users className="text-blue-500 mr-2" size={20} /> Clima Laboral
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">¿Cómo evalúas el trabajo en equipo?</label>
              <select required className="w-full bg-dark-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all appearance-none">
                <option value="" disabled selected>Seleccione una opción</option>
                <option>Muy bueno</option>
                <option>Bueno</option>
                <option>Regular</option>
                <option>Malo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">¿Cómo evalúas el ambiente laboral?</label>
              <select required className="w-full bg-dark-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all appearance-none">
                <option value="" disabled selected>Seleccione una opción</option>
                <option>Muy bueno</option>
                <option>Bueno</option>
                <option>Regular</option>
                <option>Malo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Red de Trabajo (Sociograma) */}
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center border-b border-white/5 pb-4">
            <Share2 className="text-purple-500 mr-2" size={20} /> Red de trabajo (Análisis de Redes)
          </h2>
          <p className="text-sm text-text-muted mb-6">Identifica a las personas clave con las que interactúas y la intensidad del vínculo (1=Normal, 2=Fundamental).</p>

          <div className="space-y-6">
            <div className="bg-dark-900/30 p-4 rounded-xl border border-white/5">
              <label className="block text-sm font-medium text-white mb-1">1. ¿A quién acudes primero para apoyo o consejo?</label>
              <p className="text-xs text-text-muted mb-3">Vínculos de trabajo / flujo de información diaria.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input required type="text" placeholder="Ej: 1001 - García, Ana María" className="flex-1 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50" />
                <select className="w-full sm:w-48 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50">
                  <option value="1">1 - Normal</option>
                  <option value="2">2 - Fundamental</option>
                </select>
              </div>
            </div>

            <div className="bg-dark-900/30 p-4 rounded-xl border border-white/5">
              <label className="block text-sm font-medium text-white mb-1">2. ¿A quién pedirías ayuda técnica ante un problema complejo?</label>
              <p className="text-xs text-text-muted mb-3">Vínculos de asesoramiento experto.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input required type="text" placeholder="Ej: 1002 - López, Carlos Eduardo" className="flex-1 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50" />
                <select className="w-full sm:w-48 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50">
                  <option value="1">1 - Normal</option>
                  <option value="2">2 - Fundamental</option>
                </select>
              </div>
            </div>

            <div className="bg-dark-900/30 p-4 rounded-xl border border-white/5">
              <label className="block text-sm font-medium text-white mb-1">3. ¿A quién reconoces como alguien que inspira o motiva?</label>
              <p className="text-xs text-text-muted mb-3">Vínculos de influencia y liderazgo natural.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input required type="text" placeholder="Ej: 1003 - Martínez, Laura Sofía" className="flex-1 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50" />
                <select className="w-full sm:w-48 bg-dark-900/50 border border-white/10 text-white rounded-lg p-3 focus:outline-none focus:border-purple-500/50">
                  <option value="1">1 - Normal</option>
                  <option value="2">2 - Fundamental</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Liderazgo de mi Líder Evaluador */}
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/5 pb-4">
            <Target className="text-gold-500 mr-2" size={20} /> Liderazgo de mi Líder Evaluador/a
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Competencia destacada (Fortaleza)</label>
              <select required className="w-full bg-dark-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-gold-500/50 appearance-none">
                <option value="" disabled selected>Seleccione una competencia</option>
                <option>ADAPTACIÓN AL CAMBIO</option>
                <option>COMUNICACIÓN</option>
                <option>LIDERAZGO</option>
                <option>PENSAMIENTO ESTRATÉGICO</option>
                <option>TRABAJO EN EQUIPO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Competencia a desarrollar</label>
              <select required className="w-full bg-dark-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-gold-500/50 appearance-none">
                <option value="" disabled selected>Seleccione una competencia</option>
                <option>EMPATÍA</option>
                <option>GESTIÓN DE CONFLICTOS</option>
                <option>NEGOCIACIÓN ASERTIVA</option>
                <option>DESARROLLO DE PERSONAS</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-white">Comportamientos observados</label>
              <span className="text-xs px-2 py-1 bg-dark-600 rounded text-text-muted">
                {selectedBehaviors.length} / {MAX_BEHAVIORS} seleccionados
              </span>
            </div>
            <p className="text-xs text-text-muted mb-4">Selecciona hasta tres comportamientos que describan el estilo de liderazgo:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {behaviorsList.map((beh, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleBehavior(beh)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-center text-center h-full min-h-[80px]
                    \${selectedBehaviors.includes(beh) 
                      ? 'bg-gold-500/20 border-gold-500 text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                      : 'bg-dark-900/50 border-white/5 text-text-muted hover:border-white/20 hover:text-white'
                    }`}
                >
                  <span className="text-xs font-medium leading-relaxed">{beh}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Necesidades de Capacitación */}
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/5 pb-4">
            <BookOpen className="text-green-500 mr-2" size={20} /> Necesidades de Capacitación (para mí)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Tipo de capacitación</label>
              <select className="w-full md:w-1/2 bg-dark-900/50 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-green-500/50 appearance-none">
                <option value="" disabled selected>Seleccione el tipo</option>
                <option value="interna">Interna (facilitada por el equipo)</option>
                <option value="externa">Externa (institución educativa)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Detalle de la capacitación</label>
              <textarea 
                className="w-full bg-dark-900/50 border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-green-500/50 resize-none" 
                rows={3}
                placeholder="Describe brevemente en qué áreas te gustaría capacitarte para mejorar tu desempeño..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 flex items-center justify-center"
          >
            <Send className="mr-2" size={18} />
            Enviar Evaluación 360°
          </button>
        </div>

      </form>
    </div>
  );
};

export default Feedback;
