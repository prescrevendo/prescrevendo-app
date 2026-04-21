import { Header } from "../components";
import { TEXT_STYLES } from "../../constants/styles";

export function TelaFavoritos() {
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
