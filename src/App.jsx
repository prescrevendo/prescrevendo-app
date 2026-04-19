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

// --- Base de Dados de Medicamentos ---
const MEDICAMENTOS = [
  {"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL","classe_terapeutica":"Bloqueador neuromuscular","indicacao":"Facilitar a intubação orotraqueal.","dose":"Adulto: 0,15mg/kg.","via_de_administracao":"EV","preparo_diluicao":"Diluído em SF ou SG 5%.","administracao":"Infusão inicial de 3mcg/kg/min.","cuidados_especificos_monitoramento":"Monitorar função neuromuscular.","status":"ok"},
  {"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco","classe_terapeutica":"Antimicrobiano","indicacao":"Infecções por Pseudomonas.","dose":"Adulto: 1-2g a cada 8 horas.","via_de_administracao":"EV e IM","preparo_diluicao":"Reconstituição: 10mL de AD.","administracao":"Direta: 3-5 minutos.","cuidados_especificos_monitoramento":"Ajustar em insuficiência renal.","status":"ok"},
  {"slug":"amiodarona-injetavel","nome":"AMIODARONA (INJETÁVEL)","nome_comercial_apresentacao":"AmioDARONA 50mg/mL","classe_terapeutica":"Antiarrítmico","indicacao":"Distúrbios graves do ritmo cardíaco.","dose":"Ataque: 5mg/kg em 20 min.","via_de_administracao":"Endovenosa","preparo_diluicao":"Diluir em SG 5%.","administracao":"Usar bomba de infusão.","cuidados_especificos_monitoramento":"Monitoração de ECG e PA.","status":"ok"}
];

const CAMPOS = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];

// --- Componentes Globais ---

function Header({ titulo }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
      height: 56, padding: "0 16px", gap: 12, background: COR.primary, boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        width: 32, height: 32, background: "#fff", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "bold", color: COR.primary, fontSize: 18
      }}>P</div>
      <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: 18, margin: 0 }}>{titulo}</h1>
    </div>
  );
}

function BottomNav({ ativa, onChange }) {
  const itens = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "prescricoes", label: "Prescrições", icon: <FileText size={22} /> },
    { id: "bulas", label: "Bulas", icon: <Pill size={22} /> },
    { id: "favoritos", label: "Favoritos", icon: <Star size={22} /> },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff",
      borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around",
      alignItems: "center", paddingBottom: "env(safe-area-inset-bottom, 16px)",
      paddingTop: 8, zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
    }}>
      {itens.map(item => {
        const isAtiva = ativa === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              background: "none", border: "none", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, padding: "8px 12px", cursor: "pointer",
              color: isAtiva ? COR.primary : "#aaa", position: "relative"
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: "bold" }}>{item.label}</span>
            {isAtiva && <div style={{
              position: "absolute", bottom: -2, width: 24, height: 3,
              background: COR.primary, borderRadius: 2
            }} />}
          </button>
        );
      })}
    </div>
  );
}

function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div 
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div 
        style={{ width: "100%", maxHeight: "90vh", background: "#fff", borderRadius: "32px 32px 0 0", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 48, height: 5, background: "#eee", borderRadius: 10 }} />
        </div>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: COR.primary, margin: 0 }}>{med.nome}</h2>
            <span style={{ fontSize: 11, background: COR.primaryLight, color: COR.primary, padding: "4px 12px", borderRadius: 20, fontWeight: "bold", marginTop: 6, display: "inline-block" }}>
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f5f5f5", width: 36, height: 36, borderRadius: "50%", color: "#666", fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 24, paddingBottom: 100 }}>
          {CAMPOS.map(campo => med[campo.key] && (
            <div key={campo.key} style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 10, fontWeight: "black", color: COR.primary, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{campo.icon}</span> {campo.label}
              </h4>
              <div style={{ padding: 16, background: "#f9fafb", borderRadius: 16, border: "1px solid #f0f0f0", fontSize: 13, lineHeight: 1.6, color: "#374151", whiteSpace: "pre-wrap" }}>
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

  return (
    <div style={{ minHeight: "100vh", background: COR.bg }}>
      <Header titulo="Prescrevendo" />
      <div style={{ padding: 24 }}>
        <div style={{ position: "relative", marginBottom: 32 }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={20} />
          <input
            type="text"
            style={{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "14px 16px 14px 48px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            placeholder="Pesquisar no Bulário..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && <button onClick={() => setBusca("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#9ca3af" }}><X size={18}/></button>}
        </div>

        {busca && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 32 }}>
            {resultados.length > 0 ? (
              resultados.map((m, i) => (
                <button 
                  key={m.slug} 
                  onClick={() => setMedSelecionado(m)} 
                  style={{ width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", background: "none", borderBottom: i !== resultados.length - 1 ? "1px solid #f9fafb" : "none", cursor: "pointer" }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: "bold", fontSize: 14, margin: 0, color: "#1f2937" }}>{m.nome}</p>
                    <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", fontWeight: "bold", marginTop: 2 }}>{m.classe_terapeutica}</p>
                  </div>
                  <ChevronRight size={18} color={COR.primary} />
                </button>
              ))
            ) : <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Nenhum resultado encontrado</div>}
          </div>
        )}

        <h3 style={{ fontSize: 11, fontWeight: 900, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Ferramentas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <button onClick={() => onNavegar("prescricoes")} style={{ background: "#fff", border: "1px solid #f0f0f0", padding: 24, borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 56, height: 56, background: "#fff8e8", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📝</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#374151" }}>Prescrições</span>
          </button>
          <button onClick={() => onNavegar("bulas")} style={{ background: "#fff", border: "1px solid #f0f0f0", padding: 24, borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 56, height: 56, background: "#e8f4ef", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>💊</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#374151" }}>Bulário</span>
          </button>
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

// ── DEFINIÇÃO DA TELA DE PRESCRIÇÕES (RESOLVIDA) ──
function TelaPrescricoes() {
  // Lista de objetos REAIS para evitar erro de desestruturação de strings
  const SISTEMAS = [
    { icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
    { icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
    { icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
    { icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
    { icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
    { icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
    { icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
    { icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
    { icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
    { icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
    { icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: COR.bg, paddingBottom: 100 }}>
      <Header titulo="Prescrições" />
      <div style={{ padding: "16px" }}>
        {SISTEMAS.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 20,
              padding: "12px", display: "flex", alignItems: "center", gap: "16px",
              marginBottom: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}
          >
            {/* Box do Ícone com cor de fundo real */}
            <div style={{
              width: 56, height: 56, borderRadius: 16, backgroundColor: item.cor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0
            }}>
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: "bold", color: "#1a1a1a" }}>
                {item.nome}
              </span>
            </div>

            {/* Seta indicadora lateral */}
            <ChevronRight size={18} color="#ccc" style={{ marginRight: 8 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaBulas() {
  return (
    <div style={{ minHeight: "100vh", background: COR.bg }}>
      <Header titulo="Bulário" />
      <div style={{ padding: 48, textAlign: "center", color: "#9ca3af" }}>
        <div style={{ width: 80, height: 80, background: "#fff", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Pill size={40} opacity={0.2} />
        </div>
        <p style={{ fontSize: 14, fontWeight: "bold" }}>CARREGANDO BULÁRIO</p>
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
      case "favoritos": 
        return (
          <div style={{ minHeight: "100vh", background: COR.bg }}>
            <Header titulo="Favoritos" />
            <div style={{ padding: 80, textAlign: "center", color: "#d1d5db" }}>
              <Star size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontSize: 14, fontWeight: "bold" }}>Ainda não há favoritos</p>
            </div>
          </div>
        );
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: "0 auto", position: "relative", minHeight: "100vh", overflowX: "hidden", fontFamily: "system-ui, sans-serif" }}>
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
