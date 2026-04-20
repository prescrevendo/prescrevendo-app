import { CAMPOS_MEDICAMENTO } from "../constants/medicamentos";
import { COLORS } from "../styles/colors";

const COR = COLORS;

export function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      zIndex: 300, display: "flex", alignItems: "flex-end",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "20px 20px 0 0",
        width: "100%", maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.15)",
      }}>
        {/* Handle */}
        <div style={{ padding: "12px 0 4px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
        </div>

        <div style={{
          padding: "8px 20px 14px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          borderBottom: `1px solid ${COR.border}`,
          position: "sticky", top: 0, background: "#fff", zIndex: 1,
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, color: COR.primary, fontWeight: 700 }}>
              {med.nome}
            </h2>
            {med.classe_terapeutica && (
              <span style={{
                fontSize: 11, fontWeight: 700, background: COR.primary3,
                color: COR.primary, padding: "3px 10px", borderRadius: 20,
                display: "inline-block",
              }}>{med.classe_terapeutica}</span>
            )}
          </div>
          <button onClick={onClose} style={{
            background: "#f0f0f0", border: "none", borderRadius: "50%",
            width: 30, height: 30, fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#666", flexShrink: 0, marginLeft: 12,
          }}>×</button>
        </div>

        <div style={{ padding: "16px 20px 40px" }}>
          {CAMPOS_MEDICAMENTO.filter(c => med[c.key] && c.key !== "classe_terapeutica").map(campo => (
            <div key={campo.key} style={{ marginBottom: 18 }}>
              <p style={{
                fontSize: 10, fontWeight: 700, color: COR.primary,
                textTransform: "uppercase", letterSpacing: "0.08em",
                margin: "0 0 6px", display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ fontSize: 13 }}>{campo.icon}</span> {campo.label}
              </p>
              <p style={{
                fontSize: 13, color: "#333", margin: 0, lineHeight: 1.75,
                whiteSpace: "pre-wrap", background: "#f8f9fa",
                borderRadius: 10, padding: "11px 14px",
                border: `1px solid ${COR.border}`,
              }}>{med[campo.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
