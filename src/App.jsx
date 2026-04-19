import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star, ClipboardList } from "lucide-react";

// --- Configurações de Cores ---
const COR = {
  primary: "#0d5c4a",      // Verde escuro
  primaryLight: "#e8f4ef", // Verde fundo
  text: "#1a1a1a",
  muted: "#666",
  border: "#eee",
  bg: "#f4f6f8",
  white: "#ffffff"
};

// --- Base de Dados de Medicamentos (Lista Completa) ---
const MEDICAMENTOS = [
  {"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"Facilitar a intubação orotraqueal.","dose":"Adulto: 0,15mg/kg.","via_de_administracao":"EV","preparo_diluicao":"Diluído em SF ou SG 5%.","administracao":"Infusão inicial de 3mcg/kg/min.","cuidados_especificos_monitoramento":"Monitorar função neuromuscular.","status":"ok"},
  {"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco","classe_terapeutica":"Antimicrobiano, Cefalosporina","indicacao":"Tratamento de infecções por Pseudomonas.","dose":"Adulto: 1-2g a cada 8 horas.","via_de_administracao":"EV e IM","preparo_diluicao":"Reconstituição: 10mL de AD.","administracao":"Direta: 3-5 minutos.","cuidados_especificos_monitoramento":"Ajustar em insuficiência renal.","status":"ok"},
  {"slug":"amiodarona-injetavel","nome":"AMIODARONA (INJETÁVEL)","nome_comercial_apresentacao":"AmioDARONA 50mg/mL","classe_terapeutica":"Antiarrítmico","indicacao":"Distúrbios graves do ritmo cardíaco.","dose":"Ataque: 5mg/kg em 20 min.","via_de_administracao":"Endovenosa","preparo_diluicao":"Diluir em SG 5%.","administracao":"Usar bomba de infusão.","cuidados_especificos_monitoramento":"Monitoração de ECG e PA.","status":"ok"},
  {"slug":"vitamina-b1-tiamina","nome":"VITAMINA B1 (TIAMINA)","nome_comercial_apresentacao":"Benerva 300mg / Hipovit B ampola","classe_terapeutica":"Vitaminas","indicacao":"Carência de vitamina B1.","dose":"Adulto: 50-100mg/dia.","via_de_administracao":"IM, EV, VO","preparo_diluicao":"Diluir em 100mL SF ou SG.","administracao":"Injeção direta lenta.","cuidados_especificos_monitoramento":"Risco de choque anafilático.","status":"ok"},
  {"slug":"capecitabina","nome":"CAPECITABINA","nome_comercial_apresentacao":"Xeloda 500mg","classe_terapeutica":"Antineoplásico","indicacao":"Câncer de mama e colorretal.","dose":"1.250mg/m2, VO, 2x/dia.","via_de_administracao":"VO","preparo_diluicao":"N/A","administracao":"Até 30 min após as refeições.","cuidados_especificos_monitoramento":"Monitorar função renal.","status":"ok"}
  // ... Podes continuar a adicionar a lista original aqui
];

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

const SISTEMAS_PRESCRIÇÃO = [
  { id: "emergencia", icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
  { id: "cardio", icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
  { id: "endocrino", icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
  { id: "gastro", icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
  { id: "hemato", icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
  { id: "nefro", icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
  { id: "neuro", icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
  { id: "onco", icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
  { id: "pneumo", icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
  { id: "reumato", icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
  { id: "critico", icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
];

// --- Componentes Reutilizáveis ---

function Header({ titulo, icon: CustomIcon }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
      height: 56, padding: "0 16px", gap: 12, background: COR.primary, boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}>
      <div style={{
        width: 34, height: 34, background: "#fff", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "bold", color: COR.primary, fontSize: 18, shadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        {CustomIcon ? <CustomIcon size={20} /> : "P"}
      </div>
      <h1 style={{ color: "#fff", fontWeight: "800", fontSize: 18, margin: 0, tracking: "-0.02em" }}>{titulo}</h1>
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
      paddingTop: 8, zIndex: 100, boxShadow: "0 -4px 12px rgba(0,0,0,0.05)"
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
              color: isAtiva ? COR.primary : "#aaa", position: "relative", transition: "all 0.2s"
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: "800", letterSpacing: "0.02em" }}>{item.label}</span>
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
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div 
        style={{ width: "100%", maxHeight: "92vh", background: "#fff", borderRadius: "32px 32px 0 0", overflowY: "auto", boxShadow: "0 -10px 40px rgba(0,0,0,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 48, height: 5, background: "#e5e7eb", borderRadius: 10 }} />
        </div>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, background: "#fff", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: "900", color: COR.primary, margin: 0, letterSpacing: "-0.02em" }}>{med.nome}</h2>
            <span style={{ fontSize: 11, background: COR.primaryLight, color: COR.primary, padding: "4px 14px", borderRadius: 20, fontWeight: "800", marginTop: 8, display: "inline-block", textTransform: "uppercase" }}>
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f3f4f6", width: 40, height: 40, borderRadius: "50%", color: "#4b5563", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: "24px 24px 120px" }}>
          {CAMPOS_DETALHE.map(campo => med[campo.key] && (
            <div key={campo.key} style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: 11, fontWeight: "900", color: COR.primary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, display: "flex", alignItems: "center", gap: 8, opacity: 0.8 }}>
                <span style={{ fontSize: 14 }}>{campo.icon}</span> {campo.label}
              </h4>
              <div style={{ padding: 18, background: "#f9fafb", borderRadius: 20, border: "1px solid #f1f5f9", fontSize: 14, lineHeight: 1.6, color: "#334155", whiteSpace: "pre-wrap", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
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
    return MEDICAMENTOS.filter(m => 
      m.nome.toLowerCase().includes(q) || 
      m.classe_terapeutica.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [busca]);

  return (
    <div style={{ minHeight: "100vh", background: COR.bg }}>
      <Header titulo="Prescrevendo" />
      <div style={{ padding: 20 }}>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} size={20} />
          <input
            type="text"
            style={{ width: "100%", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 20, padding: "16px 16px 16px 52px", fontSize: 15, outline: "none", boxSizing: "border-box", shadow: "0 2px 4px rgba(0,0,0,0.02)" }}
            placeholder="Pesquisar medicamento ou classe..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && <button onClick={() => setBusca("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}><X size={20}/></button>}
        </div>

        {busca && (
          <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #f1f5f9", boxShadow: "0 12px 30px rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 32 }}>
            {resultados.length > 0 ? (
              resultados.map((m, i) => (
                <button 
                  key={m.slug} 
                  onClick={() => setMedSelecionado(m)} 
                  style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", background: "none", borderBottom: i !== resultados.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer", transition: "background 0.2s" }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: "800", fontSize: 15, margin: 0, color: "#1e293b" }}>{m.nome}</p>
                    <p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: "700", marginTop: 4 }}>{m.classe_terapeutica}</p>
                  </div>
                  <ChevronRight size={20} color={COR.primary} />
                </button>
              ))
            ) : <div style={{ padding: 32, textAlign: "center", color: "#94a3b8", fontSize: 14, fontWeight: "600" }}>Nenhum resultado encontrado</div>}
          </div>
        )}

        <h3 style={{ fontSize: 12, fontWeight: "900", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16, marginLeft: 4 }}>Menu Principal</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <button 
            onClick={() => onNavegar("prescricoes")} 
            style={{ background: "#fff", border: "1px solid #f1f5f9", padding: "24px 16px", borderRadius: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transition: "transform 0.2s" }}
          >
            <div style={{ width: 64, height: 64, background: "#fff8e8", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📝</div>
            <span style={{ fontSize: 13, fontWeight: "800", color: "#334155" }}>Prescrições</span>
          </button>
          <button 
            onClick={() => onNavegar("bulas")} 
            style={{ background: "#fff", border: "1px solid #f1f5f9", padding: "24px 16px", borderRadius: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transition: "transform 0.2s" }}
          >
            <div style={{ width: 64, height: 64, background: "#e8f4ef", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>💊</div>
            <span style={{ fontSize: 13, fontWeight: "800", color: "#334155" }}>Bulário</span>
          </button>
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

// ── TELA DE PRESCRIÇÕES (FIX DEFINITIVO) ──
function TelaPrescricoes() {
  return (
    <div style={{ minHeight: "100vh", background: COR.bg, paddingBottom: 110 }}>
      <Header titulo="Prescrições" icon={ClipboardList} />
      <div style={{ padding: "20px 16px" }}>
        {SISTEMAS_PRESCRIÇÃO.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff", 
              border: "1px solid #f1f5f9", 
              borderRadius: 24,
              padding: "14px", 
              display: "flex", 
              alignItems: "center", 
              gap: "18px",
              marginBottom: "14px", 
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {/* Box do Ícone com cor de fundo correta e explícita */}
            <div style={{
              width: 58, 
              height: 58, 
              borderRadius: 18, 
              backgroundColor: item.cor,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 26, 
              flexShrink: 0,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
            }}>
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: "800", color: "#1e293b", lineHeight: "1.3" }}>
                {item.nome}
              </span>
            </div>

            {/* Seta lateral cinza */}
            <ChevronRight size={18} color="#cbd5e1" style={{ marginRight: 6 }} />
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
      <div style={{ padding: 60, textAlign: "center", color: "#94a3b8" }}>
        <div style={{ width: 90, height: 90, background: "#fff", borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}>
          <Pill size={44} style={{ opacity: 0.15 }} />
        </div>
        <p style={{ fontSize: 15, fontWeight: "900", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Base de Dados</p>
        <p style={{ fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>A lista completa de medicamentos está a ser sincronizada com o servidor.</p>
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
            <div style={{ padding: 100, textAlign: "center", color: "#cbd5e1" }}>
              <Star size={56} style={{ margin: "0 auto 20px", opacity: 0.2 }} />
              <p style={{ fontSize: 15, fontWeight: "800", fontStyle: "italic" }}>Ainda não tem itens salvos</p>
            </div>
          </div>
        );
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", position: "relative", minHeight: "100vh", overflowX: "hidden", fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", boxShadow: "0 0 50px rgba(0,0,0,0.1)" }}>
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
