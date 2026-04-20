import { NAV_ITEMS } from "../constants/navigation";
import { COLORS } from "../styles/colors";

const COR = COLORS;

export function BottomNav({ ativa, onChange }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #e8e8e8",
      display: "flex", zIndex: 200,
      paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
    }}>
      {NAV_ITEMS.map(item => {
        const isAtiva = ativa === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              flex: 1, border: "none", background: "none",
              padding: "10px 4px 8px", cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
              color: isAtiva ? COR.primary : "#aaa",
              transition: "color 0.15s",
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1, filter: isAtiva ? "none" : "grayscale(100%) opacity(0.6)" }}>{item.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: isAtiva ? 700 : 500,
              fontFamily: "system-ui, sans-serif", letterSpacing: "0.01em",
            }}>{item.label}</span>
            {isAtiva && (
              <div style={{
                position: "absolute", bottom: "calc(100% - 2px)",
                width: 32, height: 3, borderRadius: 2,
                background: COR.primary,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
