import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star } from "lucide-react";

// --- Configurações de Cores e Temas ---
const COR = {
  primary: "#0d5c4a",      // Verde escuro principal
  primaryLight: "#e8f4ef", // Fundo verde claro
  text: "#1a1a1a",
  muted: "#666",
  border: "#eee",
  bg: "#f4f6f8",
  white: "#ffffff"
};

// --- Base de Dados de Medicamentos (Mantida na totalidade) ---
const MEDICAMENTOS = [{"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL (frascos de 20mg/10mL e 10mg/5mL)","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"​Bloqueador neuromuscular não-despolarizante de duração intermediária utilizado durante procedimentos cirúrgicos ou em terapia intensiva para facilitar a intubação orotraqueal, promovendo relaxamento da musculatura esquelética durante cirurgia e ventilação mecânica.1","dose":"​Adulto\n\nRecomenda-se o monitoramento da função neuromuscular durante a administração, a fim de se individualizar as doses necessárias.\n\nIntubação orotraqueal\nde indução\n\n0,15mg/kg, administrada rapidamente ao longo de 5 a 10 segundos. Esta dose produz condições boas a excelentes para a intubação orotraqueal em 120 segundos após a administração.\ns mais altas reduzem o tempo para o início do bloqueio neuromuscular;\nde manutenção \n\nBôlus: uma dose de 0,03mg/kg proporciona aproximadamente 20 minutos adicionais de bloqueio neuromuscular clinicamente eficaz durante anestesia por opioides ou propofol.\ns de manutenção consecutivas não resultam em prolongamento progressivo do efeito;\n\nInfusão intravenosa: Ver velocidade de infusão na tabela 2.1,10\npara pacientes adultos em unidades de terapia intensiva\n\nUma taxa de infusão inicial de cisatracúrio de 3mcg/kg/min (0,18mg/kg/h) é recomendada para pacientes adultos em UTI. Pode haver uma variação interpacientes ampla na necessidade de dose e esta pode aumentar ou diminuir com o tempo. Em estudos clínicos a velocidade de infusão média foi de 3mcg/kg/min [faixa de 0,5 a 10,2mcg/kg/min (0,03 a 0,6mg/kg/h)]. Os tempos médios para a recuperação espontânea completa, após infusão de longo prazo (até 6 dias) de cisatracúrio em pacientes em UTIs, foi de aproximadamente 50 minutos. 1,10\n\nTabela 1: Velocidade de infusão de cisatracúrio injetável 5mg/mL para pacientes adultos em unidade de terapia intensiva.\n​Peso do paciente\n(kg)\n​\t​\n(μg/kg/min)​ ​\t\n​Velocidade de\ninfusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​70\t​0,8\t​1,2\t​1,7\t​2,5\t​mL/h\n​100\t​1,2\t​1,8\t​2,4\t​3,6\t​mL/h\n\nPediatria (2-12 anos)\nde Indução\n\n0,1mg/kg, administrada em 5 a 10 segundos;\nde manutenção\n\nBolus: uma dose de 0,02mg/kg proporciona aproximadamente 9 minutos de bloqueio neuromuscular clinicamente eficaz adicional durante anestesia por halotano. Não há dados suficientes para se descrever uma recomendação específica para a dosagem de manutenção em pacientes pediátricos de 2-12 anos de idade. Entretanto, dados muito limitados, obtidos de estudos clínicos em pacientes pediátricos menores de 2 anos de idade, sugerem que a dose de manutenção de 0,03mg/kg pode prolongar o bloqueio neuromuscular clinicamente efetivo por um período de até 25 minutos, durante anestesia com opioides.\n\nInfusão intravenosa: ver tabela 2 de velocidade de infusão. 1,10\n\nAjuste de dose\n\nInsuficiência renal: Não há necessidade de ajustes de dose para pacientes com insuficiência renal. Hemodiálise: Não foram encontradas informações sobre ajuste de dose nas referências consultadas.1,10\n\nInsuficiência hepática: Não há necessidade de ajustes de dose para pacientes com insuficiência hepática.1,10\n(μg/kg/min)\n ​\t​Velocidade de infusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​20\t​0,6\t​0,9\t​1,2\t​1,8\t​mL/h\n​70\t​2,1\t​3,2\t​4,2\t\n​6,3\n \n\t​mL/h\n​100\t​3,0\t​4,5\t​6,0\t​9,0\t​mL/h\n\n \n\nEstabilidade / Conservação\n\n​24h TA.1","via_de_administracao":"​EV.1","preparo_diluicao":"​O cisatracúrio pode ser diluído em concentrações de 0,1 a 2mg/mL em SF ou SG 5%.1","administracao":"Estabilidade / Conservação\nVelocidade de Infusão\n\nA manutenção do bloqueio neuromuscular pode ser alcançada com uma velocidade de infusão inicial de 3mcg/kg/min (0,18mg/kg/h), recomendada para restaurar 89% a 99% de supressão T1 após evidências de recuperação espontânea. Após um período inicial de estabilização do bloqueio neuromuscular, uma velocidade de 1 a 2mcg/kg/min (0,06 a 0,12mg/kg/h) deve ser adequada para manter o bloqueio nesta faixa na maioria dos pacientes. A redução da velocidade de infusão em aproximadamente 40% pode ser necessária quando é administrado durante anestesia por isoflurano ou enflurano. A velocidade de infusão depende da concentração de cisatracúrio na solução de infusão, do grau de bloqueio neuromuscular desejado e do peso do paciente. A tabela seguinte fornece diretrizes para a administração não diluída.1\n\nTabela 2: Velocidade de infusão de cisatracúrio para manutenção do bloqueio neuromuscular.\n\n​Peso do paciente (kg)\n​\t\n​","cuidados_especificos_monitoramento":"Contraindicação\nUso Durante a Gestação\nCISATRACÚRIO\n​Pode haver reação alérgica cruzada entre cisatracúrio e outros bloqueadores neuromusculares. Pacientes com queimaduras extensas podem desenvolver resistência a bloqueadores neuromusculares não-despolarizantes. Pacientes com miastenia gravis e outras doenças neuromusculares apresentaram grande aumento da sensibilidade a agentes bloqueadores não-despolarizantes. A dose máxima inicial para estes pacientes é de 0,02mg/kg. Desbalanço ácido-base ou eletrolítico podem ocasionar alteração da resposta aos bloqueadores neuromusculares.1\n\nReações adversas\n\nRubor, rash cutâneo, bradicardia, hipotensão, broncoespasmo, anafilaxia, fraqueza muscular e/ou miopatia. Pode ocorrer hipertermia maligna.1\n\nToxicologia\n\nEfeitos Clínicos: doses elevadas de cisatracurio podem levar a bloqueio neuromuscular prolongado;\n\nTratamento: o tratamento primário inclui a manutenção da ventilação mecânica até recuperação da função neuromuscular; a reversão dos efeitos do cisatracúrio pode ser realizada com administração de neostigmina e atropina (administradas em seringas separadas):\n\nAdulto: neostigmina: 0,5-2mg em bolus associado a atropina 0,6 a 1,2mg. A administração pode ser repetida. Raramente a dose total de neostigmina irá exceder 5mg;\n\nPediatria: neostigmina 0,02 a 0,075mg/kg em bolus associada a atropina 0,01 a 0,02mg/kg. 10\n\nContraindicação\n\n​Contraindicado para pacientes com conhecida hipersensibilidade ao cisatracúrio, atracúrio ou ácido benzenossulfônico.1\n\nUso Durante a Gestação\n\n​Risco B: não há dados sobre a administração de cisatracúrio em gestantes. O medicamento somente deve ser administrado se os benefícios superarem os riscos ao feto.1,10\n\nAtualizado em: 30/03/2018","status":"ok"},{"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco​","classe_terapeutica":"Antimicrobiano, Cefalosporina terceira geração","indicacao":"​Tratamento de infecção provocada por Pseudomonas aeruginosa; Infecções aeróbicas gram-negativos; tratamento empírico de neutropenia febril.3","dose":"​Adulto\n\nEV: 1-2g a cada 8 horas.1,3\n\nPediatria (1 mês a 12 anos)\n\n30-50mg/kg/dose a cada 8 horas.3\nMáxima\n\n6g/dia.3\n\nAjuste de\nInsuficiência renal3: \nClCr 31 - 50 mL/minuto: 1g a cada 12 horas. \nClCr 16 - 30 mL/minuto: 1g a cada 24 horas. \n\nClCr 6 - 15 mL/minuto: 500mg a cada 24 horas.\nClcr < 5 mL/minuto: Administrar 500mg a cada 48 horas. \n\nHemodiálise\n\nIntermitente: Dialisável (50% a 100%); Administrar dose após diálise: 0,5-1g em cada 24 horas ou 1-2g cada 48-72 horas.\n\nCVVH: dose de ataque de 2g, seguido de 1 a 2g a cada 12h.2\nCVVHD / CVVHDF: dose de ataque de 2g, seguido por 1g a cada 8h ou a cada 12h. A posologia de 1g de 8/8h resulta em concentrações estáveis semelhantes a 2h a cada 12h. A posologia de 2g de 8/8h pode ser necessária para gram-negativos com MIC ≥ 4 mg/L.2\n\nInsuficiência hepática: Não é necessário ajuste para insuficiência hepática.3","via_de_administracao":"​EV e IM","preparo_diluicao":"​Reconstituição\nEV: 10mL de AD.10 Retirar o ar para facilitar a aspiração.\n\nIM: 3mL de AD ou Lidocaína 0,5-1%.10\nDiluição\n10-50mL de SF, SG 5%, SG 10%, Ringer lactato.1,3","administracao":"Estabilidade / Conservação\nEV\n\nDirecta: de 3-5 minutos.3\n\nDiluído: de 15-30 minutos.3\n\nIM\nAdministrar em áreas de grande massa muscular.3\n\nHemodialise: Administrar por 10min com a máquina em UF (banho desligado).\n\nEstabilidade / Conservação\n​EV\n12 horas TA ou 7 dias sob refrigeração.1\nIM\n3 horas em TA.1","cuidados_especificos_monitoramento":"CEFTAZIDIMA\n​Hemodialise: Aumentar o tempo de hemodiálise proporcional ao tempo de administração do medicamento (a critério médico)\n\nAtualizado em: 27/01/2025","status":"ok"}];

const CAMPOS = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];

// --- Componentes Globais ---

function Header({ titulo }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
      height: 56, padding: "0 16px", gap: 12, background: COR.primary, boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        width: 32, height: 32, background: "#fff", borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "bold", color: COR.primary, fontSize: 18
      }}>P</div>
      <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: 18, margin: 0 }}>{titulo}</h1>
    </div>
  );
}

function BottomNav({ ativa, onChange }) {
  const itens = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "prescricoes", label: "Prescrições", icon: <FileText size={22} /> },
    { id: "bulas", label: "Bulas", icon: <Pill size={22} /> },
    { id: "favoritos", label: "Favoritos", icon: <Star size={22} /> },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff",
      borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around",
      alignItems: "center", paddingBottom: "env(safe-area-inset-bottom, 16px)",
      paddingTop: 8, zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
    }}>
      {itens.map(item => {
        const isAtiva = ativa === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              background: "none", border: "none", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, padding: "8px 12px", cursor: "pointer",
              color: isAtiva ? COR.primary : "#aaa", position: "relative"
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: "bold" }}>{item.label}</span>
            {isAtiva && <div style={{
              position: "absolute", bottom: -2, width: 24, height: 3,
              background: COR.primary, borderRadius: 2
            }} />}
          </button>
        );
      })}
    </div>
  );
}

function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div 
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div 
        style={{ width: "100%", maxHeight: "90vh", background: "#fff", borderRadius: "32px 32px 0 0", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 48, height: 5, background: "#eee", borderRadius: 10 }} />
        </div>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: COR.primary, margin: 0 }}>{med.nome}</h2>
            <span style={{ fontSize: 11, background: COR.primaryLight, color: COR.primary, padding: "4px 12px", borderRadius: 20, fontWeight: "bold", marginTop: 6, display: "inline-block" }}>
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f5f5f5", width: 36, height: 36, borderRadius: "50%", color: "#666", fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 24, paddingBottom: 100 }}>
          {CAMPOS.map(campo => med[campo.key] && (
            <div key={campo.key} style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 10, fontWeight: "black", color: COR.primary, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{campo.icon}</span> {campo.label}
              </h4>
              <div style={{ padding: 16, background: "#f9fafb", borderRadius: 16, border: "1px solid #f0f0f0", fontSize: 13, lineHeight: 1.6, color: "#374151", whiteSpace: "pre-wrap" }}>
                {med[campo.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Telas Principais ---

function TelaHome({ onNavegar }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultados = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m => m.nome.toLowerCase().includes(q)).slice(0, 5);
  }, [busca]);

  return (
    <div style={{ minHeight: "100vh", background: COR.bg }}>
      <Header titulo="Prescrevendo" />
      <div style={{ padding: 24 }}>
        <div style={{ position: "relative", marginBottom: 32 }}>
          <Search style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={20} />
          <input
            type="text"
            style={{ width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "14px 16px 14px 48px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            placeholder="Pesquisar no Bulário..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && <button onClick={() => setBusca("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "#9ca3af" }}><X size={18}/></button>}
        </div>

        {busca && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 32 }}>
            {resultados.length > 0 ? (
              resultados.map((m, i) => (
                <button 
                  key={m.slug} 
                  onClick={() => setMedSelecionado(m)} 
                  style={{ width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", background: "none", borderBottom: i !== resultados.length - 1 ? "1px solid #f9fafb" : "none", cursor: "pointer" }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: "bold", fontSize: 14, margin: 0, color: "#1f2937" }}>{m.nome}</p>
                    <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", fontWeight: "bold", marginTop: 2 }}>{m.classe_terapeutica}</p>
                  </div>
                  <ChevronRight size={18} color={COR.primary} />
                </button>
              ))
            ) : <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Nenhum resultado encontrado</div>}
          </div>
        )}

        <h3 style={{ fontSize: 11, fontWeight: 900, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Ferramentas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <button onClick={() => onNavegar("prescricoes")} style={{ background: "#fff", border: "1px solid #f0f0f0", padding: 24, borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 56, height: 56, background: "#fff8e8", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📝</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#374151" }}>Prescrições</span>
          </button>
          <button onClick={() => onNavegar("bulas")} style={{ background: "#fff", border: "1px solid #f0f0f0", padding: 24, borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 56, height: 56, background: "#e8f4ef", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>💊</div>
            <span style={{ fontSize: 12, fontWeight: "bold", color: "#374151" }}>Bulário</span>
          </button>
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

// ── DEFINIÇÃO DA TELA DE PRESCRIÇÕES (CORRIGIDA) ──
function TelaPrescricoes() {
  // Lista robusta de objetos para evitar erro de leitura de string
  const SISTEMAS = [
    { icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
    { icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
    { icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
    { icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
    { icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
    { icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
    { icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
    { icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
    { icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
    { icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
    { icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: COR.bg, paddingBottom: 100 }}>
      <Header titulo="Prescrições" />
      <div style={{ padding: 16 }}>
        {SISTEMAS.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff", border: "1px solid #f0f0f0", borderRadius: 20,
              padding: 12, display: "flex", alignItems: "center", gap: 16,
              marginBottom: 12, boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}
          >
            {/* Box do Ícone com cor de fundo real */}
            <div style={{
              width: 56, height: 56, borderRadius: 16, backgroundColor: item.cor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0
            }}>
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: "bold", color: "#1f2937", lineHeight: 1.2 }}>
                {item.nome}
              </span>
            </div>

            {/* Seta indicadora à direita */}
            <ChevronRight size={20} color="#d1d5db" style={{ marginRight: 8 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaBulas() {
  return (
    <div style={{ minHeight: "100vh", background: COR.bg }}>
      <Header titulo="Bulário" />
      <div style={{ padding: 48, textAlign: "center", color: "#9ca3af" }}>
        <div style={{ width: 80, height: 80, background: "#fff", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
          <Pill size={40} opacity={0.2} />
        </div>
        <p style={{ fontSize: 14, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2 }}>Base de Dados</p>
        <p style={{ fontSize: 12, marginTop: 8 }}>A lista completa de medicamentos está a ser processada.</p>
      </div>
    </div>
  );
}

// --- App Root ---

export default function App() {
  const [aba, setAba] = useState("home");

  const renderPagina = () => {
    switch (aba) {
      case "home": return <TelaHome onNavegar={setAba} />;
      case "prescricoes": return <TelaPrescricoes />;
      case "bulas": return <TelaBulas />;
      case "favoritos": 
        return (
          <div style={{ minHeight: "100vh", background: COR.bg }}>
            <Header titulo="Favoritos" />
            <div style={{ padding: 80, textAlign: "center", color: "#d1d5db" }}>
              <Star size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontSize: 14, fontWeight: "bold", fontStyle: "italic" }}>Ainda não tem favoritos</p>
            </div>
          </div>
        );
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: "0 auto", position: "relative", minHeight: "100vh", overflowX: "hidden", fontFamily: "system-ui, sans-serif" }}>
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
