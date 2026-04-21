import { useState } from "react";
import { TEXT_STYLES } from "../constants/styles";
import { Header, FichaModal } from "../components";
import { COLORS } from "../styles/colors";
import { useMedicamentos } from "../hooks";

const COR = COLORS;

export function TelaBulas({ onBack }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);
  const { resultados, total } = useMedicamentos(busca);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: COR.bg, paddingBottom: 80 }}>
      <Header titulo="Bulas" onBack={onBack} />
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
          {total} medicamento{total !== 1 ? "s" : ""}
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

      {medSelecionado && (
        <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
      )}
    </div>
  );
}
