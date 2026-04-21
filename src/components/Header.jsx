import { IconArrowLeft } from "./IconArrowLeft";
import { TEXT_STYLES } from "../constants/styles";
import { COLORS } from "../constants/colors";

const COR = COLORS;

export function Header({ titulo, onBack, cor = COR.primary }) {
  return (
    <div style={{
      background: cor,
      height: 52,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, fontSize: 20, display: "flex", alignItems: "center" }}>
          ‹
        </button>
      ) : (
        <span style={{ fontSize: 20 }}>💊</span>
      )}
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.2px" }}>
        {titulo}
      </span>
    </div>
  );
}
