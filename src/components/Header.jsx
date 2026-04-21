import { IconArrowLeft } from "./IconArrowLeft";
import { TEXT_STYLES } from "../../constants/styles";

export function Header({ titulo, onBack, cor = "#0d5c4a" }) {
  return (
    <div style={{
      background: cor, height: 52, padding: "0 16px",
      display: "flex", alignItems: "center", gap: 10,
      position: "sticky", top: 0, zIndex: 100,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}>
          <IconArrowLeft />
        </button>
      ) : (
        <img src="/icon-192.png" alt="Logo" style={{ width: 30, height: 30, borderRadius: 7, objectFit: "contain", background: "#fff" }} />
      )}
      <span style={{ ...TEXT_STYLES.heading, color: "#fff", letterSpacing: "-0.2px" }}>
        {titulo}
      </span>
    </div>
  );
}
