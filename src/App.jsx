import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star, ClipboardList } from "lucide-react";

// --- Configurações de Cores ---
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
const MEDICAMENTOS = [{"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL (frascos de 20mg/10mL e 10mg/5mL)","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"​Bloqueador neuromuscular não-despolarizante de duração intermediária utilizado durante procedimentos cirúrgicos ou em terapia intensiva para facilitar a intubação orotraqueal.","dose":"​Adulto: 0,15mg/kg indução; 0,03mg/kg manutenção.","via_de_administracao":"​EV","preparo_diluicao":"​Diluído em SF ou SG 5%.","administracao":"Infusão inicial de 3mcg/kg/min.","cuidados_especificos_monitoramento":"Monitorar função neuromuscular.","status":"ok"},{"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco​","classe_terapeutica":"Antimicrobiano, Cefalosporina terceira geração","indicacao":"​Tratamento de infecção provocada por Pseudomonas aeruginosa.","dose":"​Adulto: EV 1-2g a cada 8 horas.","via_de_administracao":"​EV e IM","preparo_diluicao":"​Reconstituição EV: 10mL de AD. Diluição: 10-50mL de SF ou SG 5%.","administracao":"Direta: 3-5 minutos. Diluído: 15-30 minutos.","cuidados_especificos_monitoramento":"Ajuste necessário para insuficiência renal.","status":"ok"},{"slug":"amiodarona-injetavel","nome":"AMIODARONA (INJETÁVEL)","nome_comercial_apresentacao":"AmioDARONA 50mg/mL (ampola 3mL) injetável​","classe_terapeutica":"Antiarrítmico","indicacao":"Distúrbios graves do ritmo cardíaco.","dose":"Ataque: 5mg/kg em 5 a 20 minutos.","via_de_administracao":"Endovenosa","preparo_diluicao":"Diluir exclusivamente em SG 5%.","administracao":"Usar preferencialmente cateter venoso central e filtro de linha.","cuidados_especificos_monitoramento":"Monitoração contínua de ECG e PA. Contraindicado na gravidez.","status":"ok"}];

const CAMPOS_DETALHE = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];

// Lista de especialidades com objetos literais para evitar erros de desestruturação
const LISTA_SISTEMAS = [
  { id: 1, icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
  { id: 2, icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
  { id: 3, icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
  { id: 4, icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
  { id: 5, icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
  { id: 6, icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
  { id: 7, icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
  { id: 8, icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
  { id: 9, icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
  { id: 10, icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
  { id: 11, icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
];

// --- Componentes ---

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
      <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: 17, margin: 0 }}>{titulo}</h1>
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
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div style={{ width: "100%", maxHeight: "90vh", background: "#fff", borderRadius: "32px 32px 0 0", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 48, height: 5, background: "#eee", borderRadius: 10 }} />
        </div>
        <div style={{ padding: "0 24px 20px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: "bold", color: COR.primary, margin: 0 }}>{med.nome}</h2>
            <span style={{ fontSize: 11, background: COR.primaryLight, color: COR.primary, padding: "3px 10px", borderRadius: 20, fontWeight: "bold", marginTop: 4, display: "inline-block" }}>
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f5f5f5", width: 32, height: 32, borderRadius: "50%", color: "#666", fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 20, paddingBottom: 100 }}>
          {CAMPOS_DETALHE.map(campo => med[campo.key] && (
            <div key={campo.key} style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 10, fontWeight: "bold", color: COR.primary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <span>{campo.icon}</span> {campo.label}
              </h4>
              <div style={{ padding: 14, background: "#f9fafb", borderRadius: 14, border: "1px solid #f0f0f0", fontSize: 13, lineHeight: 1.6, color: "#333", whiteSpace: "pre-wrap" }}>
                {med[campo.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Telas ---

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
      <div style={{ padding: 20 }}>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} size={18} />
          <input
            type="text"
            style={{ width: "100%", background: "#fff", border: "1px solid #ddd", borderRadius: 14, padding: "14px 16px 14px 44px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            placeholder="Pesquisar medicamento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && <button onClick={() => setBusca("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#aaa" }}><X size={18}/></button>}
        </div>

        {busca && resultados.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #eee", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 24 }}>
            {resultados.map((m, i) => (
              <div 
                key={m.slug} 
                onClick={() => setMedSelecionado(m)} 
                style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i !== resultados.length - 1 ? "1px solid #f5f5f5" : "none", cursor: "pointer" }}
              >
                <div>
                  <p style={{ fontWeight: "bold", fontSize: 14, margin: 0 }}>{m.nome}</p>
                  <p style={{ fontSize: 10, color: "#999", textTransform: "uppercase", marginTop: 2 }}>{m.classe_terapeutica}</p>
                </div>
                <ChevronRight size={18} color={COR.primary} />
              </div>
            ))}
          </div>
        )}

        <h3 style={{ fontSize: 11, fontWeight: "bold", color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Ferramentas Rápidas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button onClick={() => onNavegar("prescricoes")} style={{ background: "#fff", border: "1px solid #eee", padding: "20px 10px", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, background: "#fff8e8", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📝</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#444" }}>Prescrições</span>
          </button>
          <button onClick={() => onNavegar("bulas")} style={{ background: "#fff", border: "1px solid #eee", padding: "20px 10px", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, background: "#e8f4ef", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>💊</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#444" }}>Bulário</span>
          </button>
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

function TelaPrescricoes() {
  return (
    <div style={{ minHeight: "100vh", background: COR.bg, paddingBottom: 100 }}>
      <Header titulo="Prescrições" />
      <div style={{ padding: "16px" }}>
        {LISTA_SISTEMAS.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 20,
              padding: "12px", display: "flex", alignItems: "center", gap: "16px",
              marginBottom: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
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
              <span style={{ fontSize: 15, fontWeight: "bold", color: "#1a1a1a", lineHeight: 1.2 }}>
                {item.nome}
              </span>
            </div>

            {/* Seta lateral */}
            <ChevronRight size={18} color="#ccc" style={{ marginRight: 4 }} />
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
      <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
        <Pill size={48} style={{ opacity: 0.1, marginBottom: 16 }} />
        <p style={{ fontSize: 14, fontWeight: "bold" }}>A carregar base de dados...</p>
      </div>
    </div>
  );
}

// --- Componente Principal ---

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
            <div style={{ padding: 60, textAlign: "center", color: "#ccc" }}>
              <Star size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
              <p style={{ fontSize: 13, fontWeight: "bold" }}>Ainda sem favoritos</p>
            </div>
          </div>
        );
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", position: "relative", minHeight: "100vh", overflowX: "hidden", background: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
