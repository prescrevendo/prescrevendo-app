import { useState } from "react";
import { Header, IconChevron } from "../components";
import { COLORS } from "../styles/colors";
import { prescricaoService } from "../services";
import { PrescricoesCardiologia, PrescricoesEndocrinologia, PrescricoesGastroenterologiaHepatologia, PrescricoesHematologia, PrescricoesNefrologia, PrescricoesNeurologia } from "../modules";

const COR = COLORS;

export function TelaPrescrições({ onBack }) {
  const [sistema, setSistema] = useState(null);
  const SISTEMAS_DATA = prescricaoService.obterEspecialidades();

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
