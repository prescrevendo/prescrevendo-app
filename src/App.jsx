import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star } from "lucide-react";

// --- Configurações de Cores e Temas ---
const COR = {
  primary: "#0d5c4a",      // Verde escuro principal
  primaryLight: "#e8f4ef", // Fundo verde claro
  text: "#1a1a1a",
  muted: "#666",
  border: "#eee",
  bg: "#f4f6f8",
  white: "#ffffff"
};

const MEDICAMENTOS = [
  { slug: "cisatracúrio", nome: "CISATRACÚRIO", classe_terapeutica: "Bloqueador neuromuscular", via_de_administracao: "EV" },
  { slug: "ceftazidima", nome: "CEFTAZIDIMA", classe_terapeutica: "Antimicrobiano", via_de_administracao: "EV e IM" },
  { slug: "amiodarona-injetavel", nome: "AMIODARONA (INJETÁVEL)", classe_terapeutica: "Antiarrítmico", via_de_administracao: "Endovenosa" },
  // ... (Dados mantidos conforme original para funcionalidade)
];

const CAMPOS = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
];

// --- Componentes de UI ---

function Header({ titulo }) {
  return (
    <div className="sticky top-0 z-50 flex items-center h-14 px-4 gap-3 bg-[#0d5c4a] shadow-sm">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-[#0d5c4a]">P</div>
      <h1 className="text-white font-bold text-lg tracking-tight">{titulo}</h1>
    </div>
  );
}

function BottomNav({ ativa, onChange }) {
  const itens = [
    { id: "home", label: "Início", icon: <Home size={20} /> },
    { id: "prescricoes", label: "Prescrições", icon: <FileText size={20} /> },
    { id: "bulas", label: "Bulas", icon: <Pill size={20} /> },
    { id: "favoritos", label: "Favoritos", icon: <Star size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center pb-safe-area pt-2 z-50">
      {itens.map(item => {
        const isAtiva = ativa === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${isAtiva ? "text-[#0d5c4a]" : "text-gray-400"}`}
          >
            {item.icon}
            <span className={`text-[10px] font-semibold ${isAtiva ? "opacity-100" : "opacity-80"}`}>{item.label}</span>
            {isAtiva && <div className="w-6 h-1 bg-[#0d5c4a] rounded-full mt-1" />}
          </button>
        );
      })}
    </div>
  );
}

// --- Modais ---

function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-black/40" onClick={onClose}>
      <div className="w-full max-h-[90vh] bg-white rounded-t-3xl overflow-y-auto animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
        <div className="flex justify-center p-3">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>
        <div className="px-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#0d5c4a]">{med.nome}</h2>
            <span className="text-xs bg-[#e8f4ef] text-[#0d5c4a] px-3 py-1 rounded-full font-bold uppercase mt-1 inline-block">
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-6">
          {CAMPOS.map(campo => med[campo.key] && (
            <div key={campo.key}>
              <h4 className="text-[10px] font-black text-[#0d5c4a] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>{campo.icon}</span> {campo.label}
              </h4>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {med[campo.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Telas Principais ---

function TelaHome({ onNavegar }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultados = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m => m.nome.toLowerCase().includes(q)).slice(0, 5);
  }, [busca]);

  const ferramentas = [
    { id: "prescricoes", label: "Prescrições", icon: "📝", cor: "#fef3e2" },
    { id: "bulas", label: "Bulário", icon: "💊", cor: "#e8f4ef" },
    { id: "calculadoras", label: "Calculadoras", icon: "🧮", cor: "#e8f0fd", emBreve: true },
    { id: "escores", label: "Escores", icon: "📊", cor: "#fde8e8", emBreve: true },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header titulo="Início" />
      <div className="p-5">
        {/* Barra de Busca */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-[#0d5c4a] outline-none"
            placeholder="Pesquisar no App..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && <button onClick={() => setBusca("")} className="absolute right-4 top-1/2 -translate-y-1/2"><X size={16} className="text-gray-400"/></button>}
        </div>

        {/* Resultados Rápidos */}
        {busca && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden mb-8">
            {resultados.map(m => (
              <div key={m.slug} onClick={() => setMedSelecionado(m)} className="p-4 border-b border-gray-50 flex justify-between items-center active:bg-gray-50">
                <span className="font-bold text-sm">{m.nome}</span>
                <ChevronRight size={16} className="text-[#0d5c4a]" />
              </div>
            ))}
          </div>
        )}

        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Ferramentas Médicas</h3>
        <div className="grid grid-cols-2 gap-4">
          {ferramentas.map(f => (
            <button
              key={f.id}
              onClick={() => !f.emBreve && onNavegar(f.id)}
              className={`bg-white p-5 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 shadow-sm active:scale-95 transition-transform ${f.emBreve ? "opacity-50" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: f.cor }}>{f.icon}</div>
              <span className="text-xs font-bold text-gray-700">{f.label}</span>
              {f.emBreve && <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tight">Em Breve</span>}
            </button>
          ))}
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

function TelaPrescricoes() {
  const SISTEMAS = [
    { icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fff0f0" },
    { icon: "❤️", nome: "Cardiologia", cor: "#fff0f0" },
    { icon: "🩺", nome: "Endocrinologia", cor: "#fffaf0" },
    { icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#f0fff4" },
    { icon: "🩸", nome: "Hematologia", cor: "#fff0f0" },
    { icon: "💧", nome: "Nefrologia", cor: "#f0f7ff" },
    { icon: "🧠", nome: "Neurologia", cor: "#f5f0ff" },
    { icon: "🎗️", nome: "Oncologia", cor: "#fff0f9" },
    { icon: "🫁", nome: "Pneumologia", cor: "#f0f7ff" },
    { icon: "🦴", nome: "Reumatologia", cor: "#fffaf0" },
    { icon: "🏥", nome: "Paciente Crítico", cor: "#f0fff4" }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-24">
      <Header titulo="Prescrições" />
      <div className="p-4 space-y-3">
        {SISTEMAS.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-4 shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Box do Ícone com cor de fundo suave */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: item.cor }}
            >
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div className="flex-1">
              <span className="text-[15px] font-bold text-gray-800 leading-tight">
                {item.nome}
              </span>
            </div>

            {/* Seta indicadora */}
            <ChevronRight size={20} className="text-gray-300 mr-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaBulas() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header titulo="Bulário" />
      <div className="p-10 text-center text-gray-400">
        <Pill size={48} className="mx-auto mb-4 opacity-20" />
        <p className="text-sm font-medium">Lista de medicamentos completa em breve.</p>
      </div>
    </div>
  );
}

// --- App Root ---

export default function App() {
  const [aba, setAba] = useState("home");

  const renderPagina = () => {
    switch (aba) {
      case "home": return <TelaHome onNavegar={setAba} />;
      case "prescricoes": return <TelaPrescricoes />;
      case "bulas": return <TelaBulas />;
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div className="max-w-md mx-auto relative shadow-2xl min-h-screen">
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
