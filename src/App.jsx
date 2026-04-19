import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star, ClipboardList, ArrowLeft } from "lucide-react";

// --- CONFIGURAÇÃO DE CORES ---
const THEME = {
  primary: "#0d5c4a",
  bg: "#f4f6f8",
  white: "#ffffff",
  text: "#1e293b",
  muted: "#94a3b8",
  border: "#f1f5f9"
};

// --- BASE DE DADOS COMPLETA ---
const DATABASE_MEDS = [
  {"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL","classe_terapeutica":"Bloqueador neuromuscular","indicacao":"Facilitar a intubação orotraqueal.","dose":"Indução: 0,15mg/kg. Manutenção: 0,03mg/kg.","via_de_administracao":"EV","preparo_diluicao":"Diluído em SF ou SG 5%.","administracao":"Infusão inicial de 3mcg/kg/min.","cuidados_especificos_monitoramento":"Monitorar função neuromuscular.","status":"ok"},
  {"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco","classe_terapeutica":"Antimicrobiano, Cefalosporina","indicacao":"Infecções por Pseudomonas.","dose":"1-2g a cada 8 horas.","via_de_administracao":"EV e IM","preparo_diluicao":"Reconstituição: 10mL de AD.","administracao":"Direta: 3-5 min. Diluído: 15-30 min.","cuidados_especificos_monitoramento":"Ajustar na insuficiência renal.","status":"ok"},
  {"slug":"amiodarona-injetavel","nome":"AMIODARONA (INJETÁVEL)","nome_comercial_apresentacao":"AmioDARONA 50mg/mL","classe_terapeutica":"Antiarrítmico","indicacao":"Arritmias graves.","dose":"Ataque: 5mg/kg em 20 min.","via_de_administracao":"Endovenosa","preparo_diluicao":"Diluir em SG 5%. Sem PVC.","administracao":"Bomba de infusão contínua.","cuidados_especificos_monitoramento":"Monitorar ECG e PA. Categoria D.","status":"ok"}
];

// --- LISTA DE OPÇÕES DE PRESCRIÇÃO (BASEADO NA IMAGEM) ---
const MENU_PRESCRICOES = [
  { uid: "m1", emoji: "🚨", titulo: "Admitindo Paciente Grave", fundo: "#fde8e8" },
  { uid: "m2", emoji: "❤️", titulo: "Cardiologia", fundo: "#fde8e8" },
  { uid: "m3", emoji: "🩺", titulo: "Endocrinologia", fundo: "#fef3e2" },
  { uid: "m4", emoji: "🫄", titulo: "Gastroenterologia / Hepatologia", fundo: "#e8f4ef" },
  { uid: "m5", emoji: "🩸", titulo: "Hematologia", fundo: "#fde8e8" },
  { uid: "m6", emoji: "💧", titulo: "Nefrologia", fundo: "#e8f0fd" },
  { uid: "m7", emoji: "🧠", titulo: "Neurologia", fundo: "#f0e8fd" },
  { uid: "m8", emoji: "🎗️", titulo: "Oncologia", fundo: "#fde8f4" },
  { uid: "m9", emoji: "🫁", titulo: "Pneumologia", fundo: "#e8f0fd" },
  { uid: "m10", emoji: "🦴", titulo: "Reumatologia", fundo: "#fef3e2" },
  { uid: "m11", emoji: "🏥", titulo: "Paciente Crítico", fundo: "#e8f4ef" }
];

// --- COMPONENTES ---

function MainHeader({ label }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100, height: 60, background: THEME.primary,
      display: "flex", alignItems: "center", padding: "0 20px", gap: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
    }}>
      <div style={{
        width: 32, height: 32, background: "#fff", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "900", color: THEME.primary, fontSize: 18
      }}>P</div>
      <span style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>{label}</span>
    </div>
  );
}

function NavMenu({ current, onTabChange }) {
  const tabs = [
    { key: "home", label: "Início", icon: <Home size={22} /> },
    { key: "prescricoes", label: "Prescrições", icon: <FileText size={22} /> },
    { key: "bulas", label: "Bulas", icon: <Pill size={22} /> },
    { key: "favoritos", label: "Favoritos", icon: <Star size={22} /> },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", height: 75,
      borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around",
      alignItems: "center", paddingBottom: "env(safe-area-inset-bottom)", zIndex: 100
    }}>
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onTabChange(t.key)}
          style={{
            background: "none", border: "none", color: current === t.key ? THEME.primary : "#cbd5e1",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer"
          }}
        >
          {t.icon}
          <span style={{ fontSize: 10, fontWeight: "800" }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// --- TELAS ---

function ScreenHome({ setNav }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    if (!query) return [];
    return DATABASE_MEDS.filter(m => m.nome.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, paddingBottom: 80 }}>
      <MainHeader label="Prescrevendo" />
      <div style={{ padding: 20 }}>
        {/* Pesquisa */}
        <div style={{ position: "relative", marginBottom: 25 }}>
          <Search size={20} style={{ position: "absolute", left: 16, top: 18, color: THEME.muted }} />
          <input
            type="text"
            placeholder="Buscar no app..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "18px 18px 18px 50px", borderRadius: 16, border: "1px solid #e2e8f0",
              fontSize: 16, outline: "none", boxSizing: "border-box", background: "#fff", shadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
          />
        </div>

        {/* Grade de Ferramentas */}
        <h3 style={{ fontSize: 12, fontWeight: "900", color: THEME.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 15 }}>Acesso Rápido</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <div onClick={() => setNav("prescricoes")} style={{ background: "#fff", borderRadius: 24, padding: "25px 15px", textAlign: "center", border: "1px solid #f1f5f9", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 60, height: 60, background: "#fff8e8", borderRadius: 20, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>📝</div>
            <span style={{ fontWeight: "800", color: "#334155", fontSize: 13 }}>Prescrições</span>
          </div>
          <div onClick={() => setNav("bulas")} style={{ background: "#fff", borderRadius: 24, padding: "25px 15px", textAlign: "center", border: "1px solid #f1f5f9", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 60, height: 60, background: "#e8f4ef", borderRadius: 20, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>💊</div>
            <span style={{ fontWeight: "800", color: "#334155", fontSize: 13 }}>Bulário</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenPrescricoes() {
  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, paddingBottom: 100 }}>
      <MainHeader label="Prescrições" />
      <div style={{ padding: "16px" }}>
        {MENU_PRESCRICOES.map((item) => (
          <div
            key={item.uid}
            onClick={() => console.log("Clicou em: " + item.titulo)}
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "12px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              cursor: "pointer",
              transition: "transform 0.1s"
            }}
          >
            {/* Ícone dentro do quadrado colorido - IDENTICO À IMAGEM */}
            <div style={{
              width: "58px",
              height: "58px",
              borderRadius: "18px",
              backgroundColor: item.fundo, // Aqui a cor é aplicada corretamente
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              flexShrink: 0
            }}>
              {item.emoji}
            </div>

            {/* Nome da Categoria */}
            <div style={{ flex: 1 }}>
              <span style={{ 
                fontSize: "15px", 
                fontWeight: "700", 
                color: "#1e293b",
                lineHeight: "1.3",
                display: "block"
              }}>
                {item.titulo}
              </span>
            </div>

            {/* Seta lateral */}
            <ChevronRight size={18} color="#d1d5db" style={{ marginRight: "8px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenPlaceholder({ title, icon: Icon }) {
  return (
    <div style={{ minHeight: "100vh", background: THEME.bg }}>
      <MainHeader label={title} />
      <div style={{ padding: 100, textAlign: "center", color: THEME.muted }}>
        <Icon size={50} style={{ opacity: 0.2, marginBottom: 20 }} />
        <p style={{ fontSize: 14, fontWeight: "700" }}>EM BREVE</p>
      </div>
    </div>
  );
}

// --- COMPONENTE RAIZ ---

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderCurrent = () => {
    switch (activeTab) {
      case "home": return <ScreenHome setNav={setActiveTab} />;
      case "prescricoes": return <ScreenPrescricoes />;
      case "bulas": return <ScreenPlaceholder title="Bulário" icon={Pill} />;
      case "favoritos": return <ScreenPlaceholder title="Favoritos" icon={Star} />;
      default: return <ScreenHome setNav={setActiveTab} />;
    }
  };

  return (
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      minHeight: "100vh",
      position: "relative",
      background: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      overflowX: "hidden",
      boxShadow: "0 0 50px rgba(0,0,0,0.1)"
    }}>
      {renderCurrent()}
      <NavMenu current={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
