import { useState, useMemo } from "react";

import PrescriçõesCardiologia from "./scr/telas/prescricoes/PrescriçõesCardiologia";

const COR = {
  primary:  "#0d5c4a",
  primary2: "#0a4a3b",
  primary3: "#e8f4ef",
  text:     "#1a1a1a",
  muted:    "#888",
  border:   "#eee",
  bg:       "#f4f6f8",
};

// --- ÍCONES SVG INLINE (Para evitar erros de compilação no Vercel) ---
const IconChevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// --- COMPONENTE DE SIMULAÇÃO (Apague isto no seu GitHub após descomentar a importação acima!) ---
function PrescriçõesCardiologia({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
      <Header titulo="Cardiologia" onBack={onBack} />
      <div style={{ padding: "32px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
        <h2 style={{ color: COR.primary }}>Tela de Cardiologia</h2>
        <p style={{ color: COR.muted, lineHeight: 1.5 }}>
          Esta é uma simulação para que a pré-visualização funcione sem erros.<br/><br/>
          No seu GitHub, basta <b>apagar este bloco</b> e <b>descomentar a importação</b> no topo do ficheiro para que o seu código real (<i>PrescriçõesCardiologia.jsx</i>) seja executado!
        </p>
      </div>
    </div>
  );
}
// ---------------------------------------------------------------------------------------------

// --- BASE DE DADOS COMPLETA (Preservada conforme o seu original) ---
const MEDICAMENTOS = [{"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL (frascos de 20mg/10mL e 10mg/5mL)","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"​Bloqueador neuromuscular não-despolarizante de duração intermediária utilizado durante procedimentos cirúrgicos ou em terapia intensiva para facilitar a intubação orotraqueal, promovendo relaxamento da musculatura esquelética durante cirurgia e ventilação mecânica.1","dose":"​Adulto\n\nRecomenda-se o monitoramento da função neuromuscular durante a administração, a fim de se individualizar as doses necessárias.\n\nIntubação orotraqueal\nde indução\n\n0,15mg/kg, administrada rapidamente ao longo de 5 a 10 segundos. Esta dose produz condições boas a excelentes para a intubação orotraqueal em 120 segundos após a administração.\ns mais altas reduzem o tempo para o início do bloqueio neuromuscular;\nde manutenção \n\nBôlus: uma dose de 0,03mg/kg proporciona aproximadamente 20 minutos adicionais de bloqueio neuromuscular clinicamente eficaz durante anestesia por opioides ou propofol.\ns de manutenção consecutivas não resultam em prolongamento progressivo do efeito;\n\nInfusão intravenosa: Ver velocidade de infusão na tabela 2.1,10\npara pacientes adultos em unidades de terapia intensiva\n\nUma taxa de infusão inicial de cisatracúrio de 3mcg/kg/min (0,18mg/kg/h) é recomendada para pacientes adultos em UTI. Pode haver uma variação interpacientes ampla na necessidade de dose e esta pode aumentar ou diminuir com o tempo. Em estudos clínicos a velocidade de infusão média foi de 3mcg/kg/min [faixa de 0,5 a 10,2mcg/kg/min (0,03 a 0,6mg/kg/h)]. Os tempos médios para a recuperação espontânea completa, após infusão de longo prazo (até 6 dias) de cisatracúrio em pacientes em UTIs, foi de aproximadamente 50 minutos. 1,10\n\nTabela 1: Velocidade de infusão de cisatracúrio injetável 5mg/mL para pacientes adultos em unidade de terapia intensiva.\n​Peso do paciente\n(kg)\n​\t​\n(μg/kg/min)​ ​\t\n​Velocidade de\ninfusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​70\t​0,8\t​1,2\t​1,7\t​2,5\t​mL/h\n​100\t​1,2\t​1,8\t​2,4\t​3,6\t​mL/h\n\nPediatria (2-12 anos)\nde Indução\n\n0,1mg/kg, administrada em 5 a 10 segundos;\nde manutenção\n\nBolus: uma dose de 0,02mg/kg proporciona aproximadamente 9 minutos de bloqueio neuromuscular clinicamente eficaz adicional durante anestesia por halotano. Não há dados suficientes para se descrever uma recomendação específica para a dosagem de manutenção em pacientes pediátricos de 2-12 anos de idade. Entretanto, dados muito limitados, obtidos de estudos clínicos em pacientes pediátricos menores de 2 anos de idade, sugerem que a dose de manutenção de 0,03mg/kg pode prolongar o bloqueio neuromuscular clinicamente efetivo por um período de até 25 minutos, durante anestesia com opioides.\n\nInfusão intravenosa: ver tabela 2 de velocidade de infusão. 1,10\n\nAjuste de dose\n\nInsuficiência renal: Não há necessidade de ajustes de dose para pacientes com insuficiência renal. Hemodiálise: Não foram encontradas informações sobre ajuste de dose nas referências consultadas.1,10\n\nInsuficiência hepática: Não há necessidade de ajustes de dose para pacientes com insuficiência hepática.1,10\n(μg/kg/min)\n ​\t​Velocidade de infusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​20\t​0,6\t​0,9\t​1,2\t​1,8\t​mL/h\n​70\t​2,1\t​3,2\t​4,2\t\n​6,3\n \n\t​mL/h\n​100\t​3,0\t​4,5\t​6,0\t​9,0\t​mL/h\n\n \n\nEstabilidade / Conservação\n\n​24h TA.1","via_de_administracao":"​EV.1","preparo_diluicao":"​O cisatracúrio pode ser diluído em concentrações de 0,1 a 2mg/mL em SF ou SG 5%.1","administracao":"Estabilidade / Conservação\nVelocidade de Infusão\n\nA manutenção do bloqueio neuromuscular pode ser alcançada com uma velocidade de infusão inicial de 3mcg/kg/min (0,18mg/kg/h), recomendada para restaurar 89% a 99% de supressão T1 após evidências de recuperação espontânea. Após um período inicial de estabilização do bloqueio neuromuscular, uma velocidade de 1 a 2mcg/kg/min (0,06 a 0,12mg/kg/h) deve ser adequada para manter o bloqueio nesta faixa na maioria dos pacientes. A redução da velocidade de infusão em aproximadamente 40% pode ser necessária quando é administrado durante anestesia por isoflurano ou enflurano. A velocidade de infusão depende da concentração de cisatracúrio na solução de infusão, do grau de bloqueio neuromuscular desejado e do peso do paciente. A tabela seguinte fornece diretrizes para a administração não diluída.1\n\nTabela 2: Velocidade de infusão de cisatracúrio para manutenção do bloqueio neuromuscular.\n\n​Peso do paciente (kg)\n​\t\n​","cuidados_especificos_monitoramento":"Contraindicação\nUso Durante a Gestação\nCISATRACÚRIO\n​Pode haver reação alérgica cruzada entre cisatracúrio e outros bloqueadores neuromusculares. Pacientes com queimaduras extensas podem desenvolver resistência a bloqueadores neuromusculares não-despolarizantes. Pacientes com miastenia gravis e outras doenças neuromusculares apresentaram grande aumento da sensibilidade a agentes bloqueadores não-despolarizantes. A dose máxima inicial para estes pacientes é de 0,02mg/kg. Desbalanço ácido-base ou eletrolítico podem ocasionar alteração da resposta aos bloqueadores neuromusculares.1\n\nReações adversas\n\nRubor, rash cutâneo, bradicardia, hipotensão, broncoespasmo, anafilaxia, fraqueza muscular e/ou miopatia. Pode ocorrer hipertermia maligna.1\n\nToxicologia\n\nEfeitos Clínicos: doses elevadas de cisatracurio podem levar a bloqueio neuromuscular prolongado;\n\nTratamento: o tratamento primário inclui a manutenção da ventilação mecânica até recuperação da função neuromuscular; a reversão dos efeitos do cisatracúrio pode ser realizada com administração de neostigmina e atropina (administradas em seringas separadas):\n\nAdulto: neostigmina: 0,5-2mg em bolus associado a atropina 0,6 a 1,2mg. A administração pode ser repetida. Raramente a dose total de neostigmina irá exceder 5mg;\n\nPediatria: neostigmina 0,02 a 0,075mg/kg em bolus associada a atropina 0,01 a 0,02mg/kg. 10\n\nContraindicação\n\n​Contraindicado para pacientes com conhecida hipersensibilidade ao cisatracúrio, atracúrio ou ácido benzenossulfônico.1\n\nUso Durante a Gestação\n\n​Risco B: não há dados sobre a administração de cisatracúrio em gestantes. O medicamento somente deve ser administrado se os benefícios superarem os riscos ao feto.1,10\n\nAtualizado em: 30/03/2018","status":"ok"},{"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco​","classe_terapeutica":"Antimicrobiano, Cefalosporina terceira geração","indicacao":"​Tratamento de infecção provocada por Pseudomonas aeruginosa; Infecções aeróbicas gram-negativos; tratamento empírico de neutropenia febril.3","dose":"​Adulto\n\nEV: 1-2g a cada 8 horas.1,3\n\nPediatria (1 mês a 12 anos)\n\n30-50mg/kg/dose a cada 8 horas.3\nMáxima\n\n6g/dia.3\n\nAjuste de\nInsuficiência renal3: \nClCr 31 - 50 mL/minuto: 1g a cada 12 horas. \nClCr 16 - 30 mL/minuto: 1g a cada 24 horas. \n\nClCr 6 - 15 mL/minuto: 500mg a cada 24 horas.\nClcr < 5 mL/minuto: Administrar 500mg a cada 48 horas. \n\nHemodiálise\n\nIntermitente: Dialisável (50% a 100%); Administrar dose após diálise: 0,5-1g em cada 24 horas ou 1-2g cada 48-72 horas.\n\nCVVH: dose de ataque de 2g, seguido de 1 a 2g a cada 12h.2\nCVVHD / CVVHDF: dose de ataque de 2g, seguido por 1g a cada 8h ou a cada 12h. A posologia de 1g de 8/8h resulta em concentrações estáveis semelhantes a 2h a cada 12h. A posologia de 2g de 8/8h pode ser necessária para gram-negativos com MIC ≥ 4 mg/L.2\n\nInsuficiência hepática: Não é necessário ajuste para insuficiência hepática.3","via_de_administracao":"​EV e IM","preparo_diluicao":"​Reconstituição\nEV: 10mL de AD.10 Retirar o ar para facilitar a aspiração.\n\nIM: 3mL de AD ou Lidocaína 0,5-1%.10\nDiluição\n10-50mL de SF, SG 5%, SG 10%, Ringer lactato.1,3","administracao":"Estabilidade / Conservação\nEV\n\nDireta: de 3-5 minutos.3\n\nDiluído: de 15-30 minutos.3\n\nIM\nAdministrar em áreas de grande massa muscular.3\n\nHemodialise: Administrar por 10min com a máquina em UF (banho desligado).\n\nEstabilidade / Conservação\n​EV\n12 horas TA ou 7 dias sob refrigeração.1\nIM\n3 horas em TA.1","cuidados_especificos_monitoramento":"CEFTAZIDIMA\n​Hemodialise: Aumentar o tempo de hemodiálise proporcional ao tempo de administração do medicamento (a critério médico)\n\nAtualizado em: 27/01/2025","status":"ok"}];

const CAMPOS = [
  { key: "nome_comercial_apresentacao",        label: "Nome Comercial / Apresentação", icon: "💊" },
  { key: "classe_terapeutica",                  label: "Classe Terapêutica",            icon: "🏷"  },
  { key: "indicacao",                          label: "Indicação",                     icon: "📋" },
  { key: "dose",                               label: "Dose",                          icon: "⚖️" },
  { key: "via_de_administracao",               label: "Via de Administração",          icon: "💉" },
  { key: "preparo_diluicao",                   label: "Preparo / Diluição",            icon: "🧪" },
  { key: "administracao",                      label: "Administração",                 icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento",      icon: "⚠️" },
];

const SECOES_HOME = [
  { id: "calculadoras", label: "Calculadoras",       icon: "🧮", cor: "#1a6b8a", disponivel: false },
  { id: "escores",      label: "Escores / Escalas",  icon: "📊", cor: "#7a3b0d", disponivel: false },
  { id: "protocolos",   label: "Protocolos",         icon: "📋", cor: "#0d4a5c", disponivel: false },
  { id: "antimicro",    label: "Antimicrobianos",    icon: "🦠", cor: "#5c0d2e", disponivel: false },
];

const NAV = [
  { id: "home",       label: "Início",     icon: "🏠" },
  { id: "prescricoes",label: "Prescrições",icon: "📝" },
  { id: "bulas",      label: "Bulas",      icon: "💊" },
  { id: "favoritos",  label: "Favoritos",  icon: "⭐" },
];

// ── Bottom Nav ────────────────────────────────────────────────────────────────
function BottomNav({ ativa, onChange }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #e8e8e8",
      display: "flex", zIndex: 200,
      paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
    }}>
      {NAV.map(item => {
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

// ── Header ────────────────────────────────────────────────────────────────────
function Header({ titulo, onBack }) {
  return (
    <div style={{
      background: COR.primary, height: 52, padding: "0 16px",
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
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.2px" }}>
        {titulo}
      </span>
    </div>
  );
}

// ── Ficha modal ───────────────────────────────────────────────────────────────
function FichaModal({ med, onClose }) {
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
          {CAMPOS.filter(c => med[c.key] && c.key !== "classe_terapeutica").map(campo => (
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

// ── Tela: Início ──────────────────────────────────────────────────────────────
function TelaHome({ onNavegarSecao }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultados = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m =>
      m.nome?.toLowerCase().includes(q) ||
      m.classe_terapeutica?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [busca]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Header titulo="Prescrevendo" />
      <div style={{ padding: "20px 16px" }}>

        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 16, color: "#bbb", pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Busque no Prescrevendo App"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "14px 42px 14px 44px", borderRadius: 14,
              border: "1.5px solid #dde3ea", fontSize: 15,
              background: "#fff", outline: "none",
              fontFamily: "inherit", color: COR.text,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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

        {resultados.length > 0 && (
          <div style={{
            background: "#fff", borderRadius: 14, border: "1.5px solid #dde3ea",
            overflow: "hidden", marginBottom: 20,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}>
            {resultados.map((med, i) => (
              <div
                key={med.slug}
                onClick={() => setMedSelecionado(med)}
                style={{
                  padding: "13px 16px", cursor: "pointer",
                  borderBottom: i < resultados.length - 1 ? `1px solid ${COR.border}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "#fff", transition: "background 0.1s",
                }}
              >
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14, color: COR.text }}>
                    {med.nome}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: COR.muted }}>
                    {med.classe_terapeutica}
                  </p>
                </div>
                <span style={{ color: COR.primary, fontSize: 18, flexShrink: 0 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {!busca && (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: COR.muted, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Ferramentas
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              <div
                onClick={() => onNavegarSecao("bulas")}
                style={{
                  background: "#fff", borderRadius: 16,
                  padding: "20px 14px", textAlign: "center",
                  border: `1.5px solid ${COR.border}`, cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${COR.primary}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, margin: "0 auto 10px",
                }}>💊</div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: COR.text }}>Bulário</p>
              </div>

              <div
                onClick={() => onNavegarSecao("prescricoes")}
                style={{
                  background: "#fff", borderRadius: 16,
                  padding: "20px 14px", textAlign: "center",
                  border: `1.5px solid ${COR.border}`, cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "#5c5c0d18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, margin: "0 auto 10px",
                }}>📝</div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: COR.text }}>Prescrições</p>
              </div>

              {SECOES_HOME.map(s => (
                <div
                  key={s.id}
                  style={{
                    background: "#fff", borderRadius: 16,
                    padding: "20px 14px", textAlign: "center",
                    border: "1.5px solid #f0f0f0",
                    opacity: 0.55, position: "relative",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{
                    position: "absolute", top: 8, right: 10,
                    fontSize: 8, fontWeight: 700, color: "#bbb",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>Em breve</span>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: "#f5f5f5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, margin: "0 auto 10px",
                  }}>{s.icon}</div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#bbb" }}>{s.label}</p>
                </div>
              ))}

            </div>
          </>
        )}
      </div>

      {medSelecionado && (
        <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
      )}
    </div>
  );
}

// ── Tela: Bulas ───────────────────────────────────────────────────────────────
function TelaBulas() {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultado = useMemo(() =>
    MEDICAMENTOS.filter(m => {
      const q = busca.toLowerCase();
      return !q || m.nome?.toLowerCase().includes(q) ||
        m.classe_terapeutica?.toLowerCase().includes(q);
    })
  , [busca]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Header titulo="Bulário" />
      <div style={{ padding: "16px 16px" }}>

        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 16, color: "#bbb", pointerEvents: "none",
          }}>🔍</span>
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
          {resultado.length} medicamento{resultado.length !== 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {resultado.map(med => (
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

// ── Tela: Prescrições (ESTÉTICA CORRIGIDA + NAVEGAÇÃO P/ CARDIOLOGIA) ─────────
function TelaPrescrições({ onBack }) {
  const [sistema, setSistema] = useState(null);

  const SISTEMAS_DATA = [
    ["🚨", "Admitindo Paciente Grave", "#fde8e8"], 
    ["❤️", "Cardiologia", "#fde8e8"], 
    ["🩺", "Endocrinologia", "#fef3e2"], 
    ["🫄", "Gastroenterologia / Hepatologia", "#e8f4ef"], 
    ["🩸", "Hematologia", "#fde8e8"], 
    ["💧", "Nefrologia", "#e8f0fd"], 
    ["🧠", "Neurologia", "#f0e8fd"], 
    ["🎗️", "Oncologia", "#fde8f4"], 
    ["🫁", "Pneumologia", "#e8f0fd"], 
    ["🦴", "Reumatologia", "#fef3e2"], 
    ["⚠️", "Causas Externas", "#fde8e8"], 
    ["🏥", "Paciente Crítico", "#e8f4ef"], 
    ["⭐", "Bônus", "#fef3e2"]
  ];

  if (sistema) {
    if (sistema[1] === "Cardiologia") {
      // IMPORTANTE: Assim que fizer o seu deploy, descomente a importação no topo do arquivo 
      // e troque este bloco pelo seu <PrescriçõesCardiologia onBack={() => setSistema(null)} />
      return (
        <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "system-ui, sans-serif" }}>
          <Header titulo="Cardiologia" onBack={() => setSistema(null)} />
          <div style={{ padding: "32px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
            <h2 style={{ color: COR.primary }}>Ecrã de Cardiologia</h2>
            <p style={{ color: COR.muted, lineHeight: 1.5 }}>
              Esta é uma simulação para o Vercel não falhar devido ao import.<br/><br/>
              <b>No seu código final no GitHub:</b><br/>
              1. Descomente o <code>import</code> lá no topo.<br/>
              2. Substitua este return pelo seu próprio componente <code>&lt;PrescriçõesCardiologia&gt;</code>!
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "100vh", background: "#f4f6f8", fontFamily: "system-ui, sans-serif" }}>
        <Header titulo={sistema[1]} onBack={() => setSistema(null)} />
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9",
            padding: "40px 24px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
          }}>
            <div style={{
              width: 72, height: 72, background: sistema[2], borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, margin: "0 auto 20px"
            }}>{sistema[0]}</div>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{sistema[1]}</p>
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
        {SISTEMAS_DATA.map(([icon, nome, cor]) => (
          <div
            key={nome}
            onClick={() => setSistema([icon, nome, cor])}
            style={{
              background: "#ffffff", borderRadius: "16px", padding: "12px",
              marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px",
              border: "1px solid #f1f5f9", cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
          >
            {/* Box do Ícone com cor de fundo suave */}
            <div style={{
              width: 56, height: 56, borderRadius: 14, backgroundColor: cor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0
            }}>{icon}</div>
            
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", flex: 1, lineHeight: "1.2" }}>{nome}</span>
            <span style={{ display: "flex", alignItems: "center", marginRight: 8 }}><IconChevron /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tela: Favoritos ───────────────────────────────────────────────────────────
function TelaFavoritos() {
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
