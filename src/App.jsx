import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star, ClipboardList, ArrowLeft } from "lucide-react";

// --- Constantes de Design ---
const CORES_APP = {
  primaria: "#0d5c4a",      // Verde escuro Prescrevendo
  fundo: "#f4f6f8",         // Cinza azulado claro
  texto: "#1a1a1a",
  cartao: "#ffffff",
  borda: "#eeeeee",
  muted: "#94a3b8"
};

// --- Base de Dados (Amostra - Adicione os outros medicamentos aqui seguindo este padrão) ---
const LISTA_MEDICAMENTOS = [
  {"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL","classe_terapeutica":"Bloqueador neuromuscular","indicacao":"Facilitar a intubação orotraqueal.","dose":"Adulto: 0,15mg/kg.","via_de_administracao":"EV","preparo_diluicao":"Diluído em SF ou SG 5%.","administracao":"Infusão inicial de 3mcg/kg/min.","cuidados_especificos_monitoramento":"Monitorar função neuromuscular.","status":"ok"},
  {"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco","classe_terapeutica":"Antimicrobiano","indicacao":"Infecções por Pseudomonas.","dose":"Adulto: 1-2g a cada 8 horas.","via_de_administracao":"EV e IM","preparo_diluicao":"Reconstituição: 10mL de AD.","administracao":"Direta: 3-5 minutos.","cuidados_especificos_monitoramento":"Ajustar em insuficiência renal.","status":"ok"},
  {"slug":"amiodarona-injetavel","nome":"AMIODARONA (INJETÁVEL)","nome_comercial_apresentacao":"AmioDARONA 50mg/mL","classe_terapeutica":"Antiarrítmico","indicacao":"Distúrbios graves do ritmo cardíaco.","dose":"Ataque: 5mg/kg em 20 min.","via_de_administracao":"Endovenosa","preparo_diluicao":"Diluir em SG 5%.","administracao":"Usar bomba de infusão.","cuidados_especificos_monitoramento":"Monitoração de ECG e PA.","status":"ok"}
];

// --- Dados das Especialidades (TELA DE PRESCRIÇÕES) ---
// Note que usamos Objetos { icon, nome, cor } e NÃO tuplas (...) para evitar o erro visual
const CATEGORIAS_PRESCRIÇÃO = [
  { id: "p1", icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
  { id: "p2", icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
  { id: "p3", icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
  { id: "p4", icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
  { id: "p5", icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
  { id: "p6", icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
  { id: "p7", icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
  { id: "p8", icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
  { id: "p9", icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
  { id: "p10", icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
  { id: "p11", icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
];

// --- Sub-componentes ---

function BarraSuperior({ titulo, showBack, onBack }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center",
      height: 60, padding: "0 16px", gap: 12, background: CORES_APP.primaria, 
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>
      {showBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", padding: 0 }}>
          <ArrowLeft size={24} />
        </button>
      ) : (
        <div style={{
          width: 32, height: 32, background: "#fff", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "900", color: CORES_APP.primaria, fontSize: 18
        }}>P</div>
      )}
      <h1 style={{ color: "#fff", fontWeight: "700", fontSize: 18, margin: 0 }}>{titulo}</h1>
    </div>
  );
}

function NavegacaoInferior({ abaAtiva, setAba }) {
  const botoes = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "prescricoes", label: "Prescrições", icon: <FileText size={22} /> },
    { id: "bulas", label: "Bulas", icon: <Pill size={22} /> },
    { id: "favoritos", label: "Favoritos", icon: <Star size={22} /> },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff",
      borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around",
      paddingBottom: "max(12px, env(safe-area-inset-bottom))", paddingTop: 10, zIndex: 100,
      boxShadow: "0 -2px 15px rgba(0,0,0,0.05)"
    }}>
      {botoes.map(btn => (
        <button
          key={btn.id}
          onClick={() => setAba(btn.id)}
          style={{
            background: "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, padding: "4px 10px", cursor: "pointer",
            color: abaAtiva === btn.id ? CORES_APP.primaria : "#cbd5e1",
            transition: "all 0.2s"
          }}
        >
          {btn.icon}
          <span style={{ fontSize: 10, fontWeight: "800", textTransform: "uppercase" }}>{btn.label}</span>
          {abaAtiva === btn.id && (
            <div style={{ width: 15, height: 3, background: CORES_APP.primaria, borderRadius: 2, marginTop: 2 }} />
          )}
        </button>
      ))}
    </div>
  );
}

// --- Telas Principais ---

function HomePrincipal({ navegar }) {
  const [term, setTerm] = useState("");
  const filtered = useMemo(() => {
    if (!term) return [];
    return LISTA_MEDICAMENTOS.filter(m => m.nome.toLowerCase().includes(term.toLowerCase())).slice(0, 5);
  }, [term]);

  return (
    <div style={{ paddingBottom: 100 }}>
      <BarraSuperior titulo="Prescrevendo" />
      <div style={{ padding: 20 }}>
        {/* Busca */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: CORES_APP.muted }} size={20} />
          <input
            type="text"
            placeholder="Pesquisar medicamento..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              width: "100%", padding: "16px 16px 16px 48px", borderRadius: 16, border: "1.5px solid #e2e8f0",
              fontSize: 16, outline: "none", boxSizing: "border-box", background: "#fff"
            }}
          />
          {term && <X style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: CORES_APP.muted }} onClick={() => setTerm("")} />}
        </div>

        {/* Resultados Rápidos */}
        {term && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden", marginBottom: 20, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
            {filtered.map(med => (
              <div key={med.slug} style={{ padding: 16, borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "700" }}>{med.nome}</span>
                <ChevronRight size={18} color={CORES_APP.primaria} />
              </div>
            ))}
          </div>
        )}

        {/* Menu Grid */}
        <h3 style={{ fontSize: 12, fontWeight: "900", color: CORES_APP.muted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Ferramentas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <button onClick={() => navegar("prescricoes")} style={{ background: "#fff", border: "1px solid #f1f5f9", padding: "24px 12px", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 60, height: 60, background: "#fff8e8", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📝</div>
            <span style={{ fontSize: 13, fontWeight: "800", color: "#334155" }}>Prescrições</span>
          </button>
          <button onClick={() => navegar("bulas")} style={{ background: "#fff", border: "1px solid #f1f5f9", padding: "24px 12px", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 60, height: 60, background: "#e8f4ef", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>💊</div>
            <span style={{ fontSize: 13, fontWeight: "800", color: "#334155" }}>Bulário</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function TelaPrescricoes() {
  return (
    <div style={{ minHeight: "100vh", background: CORES_APP.fundo, paddingBottom: 110 }}>
      <BarraSuperior titulo="Prescrições" />
      <div style={{ padding: "16px" }}>
        {CATEGORIAS_PRESCRIÇÃO.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff", 
              border: "1px solid #f1f5f9", 
              borderRadius: 22,
              padding: "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: "16px",
              marginBottom: "12px", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}
          >
            {/* Box do Ícone com cor de fundo real - FIX DEFINITIVO AQUI */}
            <div style={{
              width: 58, 
              height: 58, 
              borderRadius: 18, 
              backgroundColor: item.cor, // Cor de fundo vinda do objeto CATEGORIAS_PRESCRIÇÃO
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 26, 
              flexShrink: 0
            }}>
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: "700", color: "#1e293b" }}>
                {item.nome}
              </span>
            </div>

            {/* Seta lateral à direita */}
            <ChevronRight size={18} color="#cbd5e1" style={{ marginRight: 8 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Componente Raiz ---

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState("home");

  const renderContent = () => {
    switch (paginaAtiva) {
      case "home": return <HomePrincipal navegar={setPaginaAtiva} />;
      case "prescricoes": return <TelaPrescricoes />;
      case "bulas": 
        return (
          <div style={{ paddingBottom: 100 }}>
            <BarraSuperior titulo="Bulário" />
            <div style={{ padding: 40, textAlign: "center", color: CORES_APP.muted }}>
              <Pill size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>Bulário completo em breve.</p>
            </div>
          </div>
        );
      case "favoritos":
        return (
          <div style={{ paddingBottom: 100 }}>
            <BarraSuperior titulo="Favoritos" />
            <div style={{ padding: 80, textAlign: "center", color: CORES_APP.muted }}>
              <Star size={48} style={{ opacity: 0.1, marginBottom: 16 }} />
              <p>Nenhum item salvo.</p>
            </div>
          </div>
        );
      default: return <HomePrincipal navegar={setPaginaAtiva} />;
    }
  };

  return (
    <div style={{ 
      maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative",
      background: "#fff", fontFamily: "system-ui, -apple-system, sans-serif",
      overflowX: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.1)"
    }}>
      {renderContent()}
      <NavegacaoInferior abaAtiva={paginaAtiva} setAba={setPaginaAtiva} />
    </div>
  );
}
