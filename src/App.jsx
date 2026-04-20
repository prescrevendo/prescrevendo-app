import { useState } from "react";
import { BottomNav } from "./components";
import { TelaHome, TelaBulas, TelaPrescrições, TelaFavoritos } from "./pages";
import { COLORS } from "./styles/colors";

const COR = COLORS;

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
