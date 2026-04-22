
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const Metrics = () => {
  const evaluacionesData = [
    { name: 'Pendientes', value: 14, color: '#f59e0b' },
    { name: 'Realizadas', value: 36, color: '#10b981' },
  ];

  const feedbackData = [
    { name: 'Respondidas', value: 28, color: '#10b981' },
    { name: 'Pendientes', value: 12, color: '#ef4444' },
  ];

  const desempenoData = [
    { name: 'No cumple', value: 3, color: '#ef4444' },
    { name: 'Parcial', value: 9, color: '#f59e0b' },
    { name: 'Cumple', value: 26, color: '#10b981' },
    { name: 'Supera', value: 9, color: '#3b82f6' },
    { name: 'Excepcional', value: 3, color: '#d4af37' },
  ];

  const potencialData = [
    { name: 'En su puesto', value: 45, color: '#2a2a32' },
    { name: 'En desarrollo', value: 18, color: '#b5952f' },
    { name: 'Promoción', value: 7, color: '#d4af37' },
  ];

  const liderazgoData = [
    { name: 'Transaccional', value: 17, color: '#ef4444' },
    { name: 'Transformacional', value: 36, color: '#10b981' },
    { name: 'Delegador', value: 17, color: '#3b82f6' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl text-sm">
          <p className="text-white font-medium">{label || payload[0].name}</p>
          <p className="text-gold-500 font-bold">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      
      {/* Evaluaciones */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-80">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
          Estado de Evaluaciones
        </h3>
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evaluacionesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {evaluacionesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-80">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Relevamiento de Feedback
        </h3>
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feedbackData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {feedbackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribución de Desempeño */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-80">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-gold-500 mr-2"></span>
          Distribución de Desempeño
        </h3>
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={desempenoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#808080" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {desempenoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Potencial */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-80">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
          Potencial por Promedio
        </h3>
        <div className="flex-grow w-full flex relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={potencialData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {potencialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col mt-4">
             <span className="text-3xl font-bold text-white">70</span>
             <span className="text-xs text-text-muted">Total</span>
          </div>
        </div>
      </div>

      {/* Estilo de Liderazgo */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-80 xl:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          Estilo de Liderazgo Predominante
        </h3>
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={liderazgoData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
              <XAxis type="number" stroke="#808080" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#808080" fontSize={12} tickLine={false} axisLine={false} width={120} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                {liderazgoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Metrics;
