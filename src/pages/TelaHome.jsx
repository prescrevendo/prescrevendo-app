import { useState } from "react";
import { TEXT_STYLES } from "../constants/styles";
import { Header, FichaModal } from "../components";
import { COLORS } from "../styles/colors";
import { SECOES_HOME } from "../constants/especialidades";
import { useMedicamentos } from "../hooks";

const COR = COLORS;

export function TelaHome({ onNavegarSecao }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);
  const { resultados, total } = useMedicamentos(busca, 8);

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

        {/* Se não houver busca - Mostrar atalhos e boas-vindas */}
        {!busca && (
          <div>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
              <h2 style={{ fontSize: 18, color: COR.text, margin: "0 0 8px", fontWeight: 700 }}>
                Bem-vindo ao Prescrevendo
              </h2>
              <p style={{ fontSize: 13, color: COR.muted, margin: 0 }}>
                Escolha uma opção ou digite para buscar
              </p>
            </div>

            {/* Grid de Atalhos Rápidos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {SECOES_HOME.map(secao => (
                <div
                  key={secao.id}
                  onClick={() => onNavegarSecao(secao.id)}
                  style={{
                    background: "#fff", borderRadius: 12, padding: "16px 12px",
                    border: "1.5px solid #eee", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 8,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all 0.15s",
                    opacity: secao.disponivel ? 1 : 0.6,
                    pointerEvents: secao.disponivel ? "auto" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (secao.disponivel) {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: 28 }}>{secao.icon}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: COR.text,
                    textAlign: "center", lineHeight: 1.2
                  }}>{secao.label}</span>
                  {!secao.disponivel && (
                    <span style={{ fontSize: 10, color: COR.muted, fontStyle: "italic" }}>Em breve</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resultados da busca */}
        {busca && resultados.length > 0 && (
          <div>
            <p style={{ fontSize: 11, color: COR.muted, margin: "0 0 10px", fontWeight: 700, textTransform: "uppercase" }}>
              {total} resultado{total !== 1 ? "s" : ""}
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
