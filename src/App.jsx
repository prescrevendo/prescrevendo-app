import { useState, useMemo } from "react";

// Importar componentes
import { Header, BottomNav, FichaModal, IconChevron } from "./components";

// Importar especialidades
import PrescricoesCardiologia from "./telas/prescricoes/PrescricoesCardiologia";
import PrescricoesEndocrinologia from "./telas/prescricoes/PrescricoesEndocrinologia";
import PrescricoesGastroenterologiaHepatologia from "./telas/prescricoes/PrescricoesGastroenterologiaHepatologia";
import PrescricoesHematologia from "./telas/prescricoes/PrescricoesHematologia";
import PrescricoesNefrologia from "./telas/prescricoes/PrescricoesNefrologia";
import PrescricoesNeurologia from "./telas/prescricoes/PrescricoesNeurologia";

// Importar constantes
import { COLORS } from "./styles/colors";
import { MEDICAMENTOS, CAMPOS_MEDICAMENTO } from "./constants/medicamentos";
import { ESPECIALIDADES_PRESCRICOES } from "./constants/especialidades";

// Alias para compatibilidade
const COR = COLORS;

// ── Tela: Início ──────────────────────────────────────────────────────────────
function TelaHome({ onNavegarSecao }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultados = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m =>
      m.nome?.toLowerCase().includes(q) ||
      m.classe_terapeutica?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [busca]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Header titulo="Prescrevendo" />
      <div style={{ padding: "16px", minHeight: "100vh", paddingBottom: 80, background: COR.bg }}>
        
        {/* Seção de Busca */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            position: "relative", display: "flex", alignItems: "center",
            background: "#fff", borderRadius: 12, border: "1.5px solid #dde3ea",
            overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          }}>
            <span style={{ position: "absolute", left: 14, fontSize: 16 }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar medicamento..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "13px 42px 13px 44px", borderRadius: 12,
                border: "none", fontSize: 15,
                background: "#fff", outline: "none",
                fontFamily: "inherit", color: COR.text,
              }}
            />
            {busca && (
              <button onClick={() => setBusca("")} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "#eee", border: "none", borderRadius: "50%",
                width: 22, height: 22, cursor: "pointer", fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#888",
              }}>×</button>
            )}
          </div>
        </div>

        {/* Se não houver busca */}
        {!busca && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
            <h2 style={{ fontSize: 18, color: COR.text, margin: "0 0 8px", fontWeight: 700 }}>
              Bem-vindo ao Prescrevendo
            </h2>
            <p style={{ fontSize: 13, color: COR.muted, margin: 0 }}>
              Digite o nome de um medicamento para começar
            </p>
          </div>
        )}

        {/* Resultados da busca */}
        {busca && resultados.length > 0 && (
          <div>
            <p style={{ fontSize: 11, color: COR.muted, margin: "0 0 10px", fontWeight: 700, textTransform: "uppercase" }}>
              {resultados.length} resultado{resultados.length !== 1 ? "s" : ""}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {resultados.map(med => (
                <div
                  key={med.slug}
                  onClick={() => setMedSelecionado(med)}
                  style={{
                    background: "#fff", borderRadius: 12, padding: "14px 16px",
                    border: "1.5px solid #eee", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: COR.text }}>
                      {med.nome}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: COR.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {med.classe_terapeutica} · {med.via_de_administracao}
                    </p>
                  </div>
                  <span style={{ color: COR.primary, fontSize: 20, flexShrink: 0, marginLeft: 8 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sem resultados */}
        {busca && resultados.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, color: COR.muted, margin: 0 }}>
              Nenhum medicamento encontrado
            </p>
          </div>
        )}
      </div>

      {medSelecionado && (
        <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
      )}
    </div>
  );
}

// ── Tela: Bulas ────────────────────────────────────────────────────────────────
function TelaBulas() {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultado = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m =>
      m.nome?.toLowerCase().includes(q) ||
      m.classe_terapeutica?.toLowerCase().includes(q)
    );
  }, [busca]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: COR.bg, paddingBottom: 80 }}>
      <Header titulo="Bulas" />
      <div style={{ padding: "16px" }}>
        <div style={{
          position: "relative", display: "flex", alignItems: "center",
          background: "#fff", borderRadius: 12, border: "1.5px solid #dde3ea",
          overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
          marginBottom: 16,
        }}>
          <span style={{ position: "absolute", left: 14, fontSize: 16 }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar medicamento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "13px 42px 13px 44px", borderRadius: 12,
              border: "1.5px solid #dde3ea", fontSize: 15,
              background: "#fff", outline: "none",
              fontFamily: "inherit", color: COR.text,
            }}
          />
          {busca && (
            <button onClick={() => setBusca("")} style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "#eee", border: "none", borderRadius: "50%",
              width: 22, height: 22, cursor: "pointer", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center", color: "#888",
            }}>×</button>
          )}
        </div>

        <p style={{ fontSize: 11, color: COR.muted, margin: "0 0 10px" }}>
          {resultado.length} medicamento{resultado.length !== 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {resultado.map(med => (
            <div
              key={med.slug}
              onClick={() => setMedSelecionado(med)}
              style={{
                background: "#fff", borderRadius: 12, padding: "14px 16px",
                border: "1.5px solid #eee", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: COR.text }}>
                  {med.nome}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: COR.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {med.classe_terapeutica} · {med.via_de_administracao}
                </p>
              </div>
              <span style={{ color: COR.primary, fontSize: 20, flexShrink: 0, marginLeft: 8 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {medSelecionado && (
        <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
      )}
    </div>
  );
}

// ── Tela: Prescrições ─────────────────────────────────────────────────────────
function TelaPrescrições({ onBack }) {
  const [sistema, setSistema] = useState(null);

  const SISTEMAS_DATA = [
    { id: "s1", icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
    { id: "s2", icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
    { id: "s3", icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
    { id: "s4", icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
    { id: "s5", icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
    { id: "s6", icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
    { id: "s7", icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
    { id: "s8", icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
    { id: "s9", icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
    { id: "s10", icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
    { id: "s11", icon: "⚠️", nome: "Causas Externas", cor: "#fde8e8" },
    { id: "s12", icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" },
    { id: "s13", icon: "⭐", nome: "Bônus", cor: "#fef3e2" }
  ];

  if (sistema) {
    if (sistema.nome === "Cardiologia") return <PrescricoesCardiologia onBack={() => setSistema(null)} />;
    if (sistema.nome === "Endocrinologia") return <PrescricoesEndocrinologia onBack={() => setSistema(null)} />;
    if (sistema.nome === "Gastroenterologia / Hepatologia") return <PrescricoesGastroenterologiaHepatologia onBack={() => setSistema(null)} />;
    if (sistema.nome === "Hematologia") return <PrescricoesHematologia onBack={() => setSistema(null)} />;
    if (sistema.nome === "Nefrologia") return <PrescricoesNefrologia onBack={() => setSistema(null)} />;
    if (sistema.nome === "Neurologia") return <PrescricoesNeurologia onBack={() => setSistema(null)} />;

    return (
      <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "system-ui, sans-serif" }}>
        <Header titulo={sistema.nome} onBack={() => setSistema(null)} />
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9",
            padding: "40px 24px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
          }}>
            <div style={{
              width: 72, height: 72, background: sistema.cor, borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, margin: "0 auto 20px"
            }}>{sistema.icon}</div>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{sistema.nome}</p>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>O conteúdo desta especialidade estará disponível em breve.</p>
            <button 
              onClick={() => setSistema(null)} 
              style={{ marginTop: 24, padding: "10px 24px", borderRadius: 8, border: "none", background: "#f1f5f9", color: "#1a1a1a", fontWeight: 600, cursor: "pointer" }}
            >Voltar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "system-ui, sans-serif", paddingBottom: 80 }}>
      <Header titulo="Prescrições" onBack={onBack} />
      <div style={{ padding: "16px" }}>
        {SISTEMAS_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSistema(item)}
            style={{
              background: "#ffffff", borderRadius: "16px", padding: "12px",
              marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px",
              border: "1px solid #f1f5f9", cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14, backgroundColor: item.cor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0
            }}>{item.icon}</div>
            
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", flex: 1, lineHeight: "1.2" }}>{item.nome}</span>
            <span style={{ display: "flex", alignItems: "center", marginRight: 8 }}><IconChevron /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tela: Favoritos ───────────────────────────────────────────────────────────
function TelaFavoritos() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Header titulo="Favoritos" />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "80px 24px", textAlign: "center",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: "#fff", border: "1.5px solid #eee",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, marginBottom: 16,
        }}>⭐</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 18, color: "#1a1a1a" }}>Favoritos</h2>
        <p style={{ color: "#888", fontSize: 13, margin: "0 0 20px", maxWidth: 260 }}>
          Esta secção está em desenvolvimento e estará disponível em breve.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [aba, setAba] = useState("home");

  const renderTela = () => {
    if (aba === "home")        return <TelaHome onNavegarSecao={setAba} />;
    if (aba === "bulas")       return <TelaBulas />;
    if (aba === "prescricoes") return <TelaPrescrições onBack={() => setAba("home")} />;
    if (aba === "favoritos")   return <TelaFavoritos />;
    return <TelaHome />;
  };

  return (
    <div style={{ background: COR.bg, minHeight: "100vh", paddingBottom: 64, maxWidth: 480, margin: "0 auto", position: "relative", boxShadow: "0 0 30px rgba(0,0,0,0.1)" }}>
      {renderTela()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
