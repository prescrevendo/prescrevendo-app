import React, { useState, useMemo } from "react";

// --- CONFIGURAÇÃO VISUAL ---
const CORES_SISTEMA = {
  primaria: "#0d5c4a",
  fundo: "#f4f6f8",
  branco: "#ffffff",
  texto: "#1e293b",
  cinza: "#94a3b8",
  borda: "#f1f5f9"
};

// --- BASE DE DADOS INTEGRAL (Restaurada sem alterações para não perder dados) ---
const DB_MEDICAMENTOS = [{"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL (frascos de 20mg/10mL e 10mg/5mL)","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"​Bloqueador neuromuscular não-despolarizante de duração intermediária utilizado durante procedimentos cirúrgicos ou em terapia intensiva para facilitar a intubação orotraqueal, promovendo relaxamento da musculatura esquelética durante cirurgia e ventilação mecânica.1","dose":"​Adulto\n\nRecomenda-se o monitoramento da função neuromuscular durante a administração, a fim de se individualizar as doses necessárias.\n\nIntubação orotraqueal\nde indução\n\n0,15mg/kg, administrada rapidamente ao longo de 5 a 10 segundos. Esta dose produz condições boas a excelentes para a intubação orotraqueal em 120 segundos após a administração.\ns mais altas reduzem o tempo para o início do bloqueio neuromuscular;\nde manutenção \n\nBôlus: uma dose de 0,03mg/kg proporciona aproximadamente 20 minutos adicionais de bloqueio neuromuscular clinicamente eficaz durante anestesia por opioides ou propofol.\ns de manutenção consecutivas não resultam em prolongamento progressivo do efeito;\n\nInfusão intravenosa: Ver velocidade de infusão na tabela 2.1,10\npara pacientes adultos em unidades de terapia intensiva\n\nUma taxa de infusão inicial de cisatracúrio de 3mcg/kg/min (0,18mg/kg/h) é recomendada para pacientes adultos em UTI. Pode haver uma variação interpacientes ampla na necessidade de dose e esta pode aumentar ou diminuir com o tempo. Em estudos clínicos a velocidade de infusão média foi de 3mcg/kg/min [faixa de 0,5 a 10,2mcg/kg/min (0,03 a 0,6mg/kg/h)]. Os tempos médios para a recuperação espontânea completa, após infusão de longo prazo (até 6 dias) de cisatracúrio em pacientes em UTIs, foi de aproximadamente 50 minutos. 1,10\n\nTabela 1: Velocidade de infusão de cisatracúrio injetável 5mg/mL para pacientes adultos em unidade de terapia intensiva.\n​Peso do paciente\n(kg)\n​\t​\n(μg/kg/min)​ ​\t\n​Velocidade de\ninfusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​70\t​0,8\t​1,2\t​1,7\t​2,5\t​mL/h\n​100\t​1,2\t​1,8\t​2,4\t​3,6\t​mL/h\n\nPediatria (2-12 anos)\nde Indução\n\n0,1mg/kg, administrada em 5 a 10 segundos;\nde manutenção\n\nBolus: uma dose de 0,02mg/kg proporciona aproximadamente 9 minutos de bloqueio neuromuscular clinicamente eficaz adicional durante anestesia por halotano. Não há dados suficientes para se descrever uma recomendação específica para a dosagem de manutenção em pacientes pediátricos de 2-12 anos de idade. Entretanto, dados muito limitados, obtidos de estudos clínicos em pacientes pediátricos menores de 2 anos de idade, sugerem que a dose de manutenção de 0,03mg/kg pode prolongar o bloqueio neuromuscular clinicamente efetivo por um período de até 25 minutos, durante anestesia com opioides.\n\nInfusão intravenosa: ver tabela 2 de velocidade de infusão. 1,10\n\nAjuste de dose\n\nInsuficiência renal: Não há necessidade de ajustes de dose para pacientes com insuficiência renal. Hemodiálise: Não foram encontradas informações sobre ajuste de dose nas referências consultadas.1,10\n\nInsuficiência hepática: Não há necessidade de ajustes de dose para pacientes com insuficiência hepática.1,10\n(μg/kg/min)\n ​\t​Velocidade de infusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​20\t​0,6\t​0,9\t​1,2\t​1,8\t​mL/h\n​70\t​2,1\t​3,2\t​4,2\t\n​6,3\n \n\t​mL/h\n​100\t​3,0\t​4,5\t​6,0\t​9,0\t​mL/h\n\n \n\nEstabilidade / Conservação\n\n​24h TA.1","via_de_administracao":"​EV.1","preparo_diluicao":"​O cisatracúrio pode ser diluído em concentrações de 0,1 a 2mg/mL em SF ou SG 5%.1","administracao":"Estabilidade / Conservação\nVelocidade de Infusão\n\nA manutenção do bloqueio neuromuscular pode ser alcançada com uma velocidade de infusão inicial de 3mcg/kg/min (0,18mg/kg/h), recomendada para restaurar 89% a 99% de supressão T1 após evidências de recuperação espontânea. Após um período inicial de estabilização do bloqueio neuromuscular, uma velocidade de 1 a 2mcg/kg/min (0,06 a 0,12mg/kg/h) deve ser adequada para manter o bloqueio nesta faixa na maioria dos pacientes. A redução da velocidade de infusão em aproximadamente 40% pode ser necessária quando é administrado durante anestesia por isoflurano ou enflurano. A velocidade de infusão depende da concentração de cisatracúrio na solução de infusão, do grau de bloqueio neuromuscular desejado e do peso do paciente. A tabela seguinte fornece diretrizes para a administração não diluída.1\n\nTabela 2: Velocidade de infusão de cisatracúrio para manutenção do bloqueio neuromuscular.\n\n​Peso do paciente (kg)\n​\t\n​","cuidados_especificos_monitoramento":"Contraindicação\nUso Durante a Gestação\nCISATRACÚRIO\n​Pode haver reação alérgica cruzada entre cisatracúrio e outros bloqueadores neuromusculares. Pacientes com queimaduras extensas podem desenvolver resistência a bloqueadores neuromusculares não-despolarizantes. Pacientes com miastenia gravis e outras doenças neuromusculares apresentaram grande aumento da sensibilidade a agentes bloqueadores não-despolarizantes. A dose máxima inicial para estes pacientes é de 0,02mg/kg. Desbalanço ácido-base ou eletrolítico podem ocasionar alteração da resposta aos bloqueadores neuromusculares.1\n\nReações adversas\n\nRubor, rash cutâneo, bradicardia, hipotensão, broncoespasmo, anafilaxia, fraqueza muscular e/ou miopatia. Pode ocorrer hipertermia maligna.1\n\nToxicologia\n\nEfeitos Clínicos: doses elevadas de cisatracurio podem levar a bloqueio neuromuscular prolongado;\n\nTratamento: o tratamento primário inclui a manutenção da ventilação mecânica até recuperação da função neuromuscular; a reversão dos efeitos do cisatracúrio pode ser realizada com administração de neostigmina e atropina (administradas em seringas separadas):\n\nAdulto: neostigmina: 0,5-2mg em bolus associado a atropina 0,6 a 1,2mg. A administração pode ser repetida. Raramente a dose total de neostigmina irá exceder 5mg;\n\nPediatria: neostigmina 0,02 a 0,075mg/kg em bolus associada a atropina 0,01 a 0,02mg/kg. 10\n\nContraindicação\n\n​Contraindicado para pacientes com conhecida hipersensibilidade ao cisatracúrio, atracúrio ou ácido benzenossulfônico.1\n\nUso Durante a Gestação\n\n​Risco B: não há dados sobre a administração de cisatracúrio em gestantes. O medicamento somente deve ser administrado se os benefícios superarem os riscos ao feto.1,10\n\nAtualizado em: 30/03/2018","status":"ok"},{"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco​","classe_terapeutica":"Antimicrobiano, Cefalosporina terceira geração","indicacao":"​Tratamento de infecção provocada por Pseudomonas aeruginosa; Infecções aeróbicas gram-negativos; tratamento empírico de neutropenia febril.3","dose":"​Adulto\n\nEV: 1-2g a cada 8 horas.1,3\n\nPediatria (1 mês a 12 anos)\n\n30-50mg/kg/dose a cada 8 horas.3\nMáxima\n\n6g/dia.3\n\nAjuste de\nInsuficiência renal3: \nClCr 31 - 50 mL/minuto: 1g a cada 12 horas. \nClCr 16 - 30 mL/minuto: 1g a cada 24 horas. \n\nClCr 6 - 15 mL/minuto: 500mg a cada 24 horas.\nClcr < 5 mL/minuto: Administrar 500mg a cada 48 horas. \n\nHemodiálise\n\nIntermitente: Dialisável (50% a 100%); Administrar dose após diálise: 0,5-1g em cada 24 horas ou 1-2g cada 48-72 horas.\n\nCVVH: dose de ataque de 2g, seguido de 1 a 2g a cada 12h.2\nCVVHD / CVVHDF: dose de ataque de 2g, seguido por 1g a cada 8h ou a cada 12h. A posologia de 1g de 8/8h resulta em concentrações estáveis semelhantes a 2h a cada 12h. A posologia de 2g de 8/8h pode ser necessária para gram-negativos com MIC ≥ 4 mg/L.2\n\nInsuficiência hepática: Não é necessário ajuste para insuficiência hepática.3","via_de_administracao":"​EV e IM","preparo_diluicao":"​Reconstituição\nEV: 10mL de AD.10 Retirar o ar para facilitar a aspiração.\n\nIM: 3mL de AD ou Lidocaína 0,5-1%.10\nDiluição\n10-50mL de SF, SG 5%, SG 10%, Ringer lactato.1,3","administracao":"Estabilidade / Conservação\nEV\n\nDireta: de 3-5 minutos.3\n\nDiluído: de 15-30 minutos.3\n\nIM\nAdministrar em áreas de grande massa muscular.3\n\nHemodialise: Administrar por 10min com a máquina em UF (banho desligado).\n\nEstabilidade / Conservação\n​EV\n12 horas TA ou 7 dias sob refrigeração.1\nIM\n3 horas em TA.1","cuidados_especificos_monitoramento":"CEFTAZIDIMA\n​Hemodialise: Aumentar o tempo de hemodiálise proporcional ao tempo de administração do medicamento (a critério médico)\n\nAtualizado em: 27/01/2025","status":"ok"}];

const CAMPOS_DETALHE = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];

// --- LISTA DE OPÇÕES DE PRESCRIÇÃO (RESOLVIDO O ERRO DO ARRAY) ---
// O uso de objetos com chaves nominais garante que o JavaScript não fatiará o texto da cor, evitando o "# f".
const LISTA_OPCOES_PRESC = [
  { id: "adm", icon: "🚨", name: "Admitindo Paciente Grave", bgColor: "#fde8e8" },
  { id: "car", icon: "❤️", name: "Cardiologia", bgColor: "#fde8e8" },
  { id: "end", icon: "🩺", name: "Endocrinologia", bgColor: "#fef3e2" },
  { id: "gas", icon: "🫄", name: "Gastroenterologia / Hepatologia", bgColor: "#e8f4ef" },
  { id: "hem", icon: "🩸", name: "Hematologia", bgColor: "#fde8e8" },
  { id: "nef", icon: "💧", name: "Nefrologia", bgColor: "#e8f0fd" },
  { id: "neu", icon: "🧠", name: "Neurologia", bgColor: "#f0e8fd" },
  { id: "onc", icon: "🎗️", name: "Oncologia", bgColor: "#fde8f4" },
  { id: "pne", icon: "🫁", name: "Pneumologia", bgColor: "#e8f0fd" },
  { id: "reu", icon: "🦴", name: "Reumatologia", bgColor: "#fef3e2" },
  { id: "cri", icon: "🏥", name: "Paciente Crítico", bgColor: "#e8f4ef" }
];


// --- ÍCONES SVG INLINE (Para o Vercel não falhar por causa de bibliotecas externas) ---
const SetaDireita = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Lupa = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Fechar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// --- COMPONENTES DA INTERFACE ---

function Topo({ txt }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100, height: 60, background: CORES_SISTEMA.primaria,
      display: "flex", alignItems: "center", padding: "0 18px", gap: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
    }}>
      {/* Aqui usamos a sua imagem original para que você saiba que o deploy funcionou */}
      <img src="/icon-192.png" alt="Logo" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "contain", background: "#fff" }} />
      <span style={{ color: "#fff", fontWeight: "700", fontSize: 18, letterSpacing: "-0.01em" }}>{txt}</span>
    </div>
  );
}

function BarraNavegacao({ tab, setTab }) {
  // Restaurados os Emojis originais da barra inferior
  const menus = [
    { id: "home", l: "Início", i: "🏠" },
    { id: "prescricoes", l: "Prescrições", i: "📝" },
    { id: "bulas", l: "Bulas", i: "💊" },
    { id: "favoritos", l: "Favoritos", i: "⭐" }
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", height: 75,
      borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around",
      alignItems: "center", paddingBottom: "env(safe-area-inset-bottom)", zIndex: 100,
      boxShadow: "0 -2px 15px rgba(0,0,0,0.05)"
    }}>
      {menus.map(m => (
        <button key={m.id} onClick={() => setTab(m.id)} style={{ background: "none", border: "none", color: tab === m.id ? CORES_SISTEMA.primaria : "#cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", transition: "color 0.2s" }}>
          <span style={{ fontSize: 24, filter: tab === m.id ? "none" : "grayscale(100%) opacity(0.6)" }}>{m.i}</span>
          <span style={{ fontSize: 10, fontWeight: "800", textTransform: "uppercase", color: tab === m.id ? CORES_SISTEMA.primaria : "#94a3b8" }}>{m.l}</span>
        </button>
      ))}
    </div>
  );
}

function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div style={{ width: "100%", maxHeight: "92vh", background: "#fff", borderRadius: "32px 32px 0 0", overflowY: "auto", boxShadow: "0 -10px 40px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 48, height: 5, background: "#e5e7eb", borderRadius: 10 }} />
        </div>
        <div style={{ padding: "0 24px 20px", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, background: "#fff", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: "900", color: CORES_SISTEMA.primaria, margin: 0, letterSpacing: "-0.02em" }}>{med.nome}</h2>
            <span style={{ fontSize: 11, background: CORES_SISTEMA.fundo, color: CORES_SISTEMA.primaria, padding: "4px 14px", borderRadius: 20, fontWeight: "800", marginTop: 8, display: "inline-block", textTransform: "uppercase" }}>
              {med.classe_terapeutica}
            </span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f3f4f6", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Fechar />
          </button>
        </div>
        <div style={{ padding: "24px 24px 120px" }}>
          {CAMPOS_DETALHE.map(campo => med[campo.key] && (
            <div key={campo.key} style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: 11, fontWeight: "900", color: CORES_SISTEMA.primaria, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, display: "flex", alignItems: "center", gap: 8, opacity: 0.8 }}>
                <span style={{ fontSize: 16 }}>{campo.icon}</span> {campo.label}
              </h4>
              <div style={{ padding: 18, background: "#f9fafb", borderRadius: 20, border: "1px solid #f1f5f9", fontSize: 14, lineHeight: 1.6, color: "#334155", whiteSpace: "pre-wrap" }}>
                {med[campo.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- TELAS DO APP ---

function HomePrincipal({ mudarTab }) {
  const [pesquisa, setPesquisa] = useState("");
  const encontrados = useMemo(() => {
    if (!pesquisa) return [];
    return DB_MEDICAMENTOS.filter(x => x.nome.toLowerCase().includes(pesquisa.toLowerCase())).slice(0, 6);
  }, [pesquisa]);

  return (
    <div style={{ minHeight: "100vh", background: CORES_SISTEMA.fundo, paddingBottom: 100 }}>
      <Topo txt="Prescrevendo" />
      <div style={{ padding: 20 }}>
        {/* Campo de Busca */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <div style={{ position: "absolute", left: 16, top: 18 }}><Lupa /></div>
          <input
            type="text"
            placeholder="Pesquisar medicamento..."
            value={pesquisa}
            onChange={e => setPesquisa(e.target.value)}
            style={{ width: "100%", padding: "18px 18px 18px 50px", borderRadius: 18, border: "1px solid #e2e8f0", fontSize: 16, outline: "none", boxSizing: "border-box", background: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}
          />
          {pesquisa && (
            <button onClick={() => setPesquisa("")} style={{ position: "absolute", right: 16, top: 18, border: "none", background: "none", cursor: "pointer" }}>
              <Fechar />
            </button>
          )}
        </div>

        {/* Resultados */}
        {pesquisa && (
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #f1f5f9", overflow: "hidden", marginBottom: 30, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
            {encontrados.length > 0 ? encontrados.map(m => (
              <div key={m.slug} style={{ padding: 18, borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "700", color: CORES_SISTEMA.texto }}>{m.nome}</span>
                <SetaDireita />
              </div>
            )) : <div style={{ padding: 25, textAlign: "center", color: CORES_SISTEMA.cinza }}>Nenhum resultado.</div>}
          </div>
        )}

        <h3 style={{ fontSize: 12, fontWeight: "900", color: CORES_SISTEMA.cinza, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Acesso Rápido</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div onClick={() => mudarTab("prescricoes")} style={{ background: "#fff", borderRadius: 28, padding: "28px 15px", textAlign: "center", border: "1px solid #f1f5f9", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 62, height: 62, background: "#fff8e8", borderRadius: 22, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📝</div>
            <span style={{ fontWeight: "800", color: "#334155", fontSize: 13 }}>Prescrições</span>
          </div>
          <div onClick={() => mudarTab("bulas")} style={{ background: "#fff", borderRadius: 28, padding: "28px 15px", textAlign: "center", border: "1px solid #f1f5f9", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ width: 62, height: 62, background: "#e8f4ef", borderRadius: 22, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>💊</div>
            <span style={{ fontWeight: "800", color: "#334155", fontSize: 13 }}>Bulário</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TELA DE PRESCRIÇÕES (SOLUÇÃO VISUAL IDENTICA À SUA IMAGEM) ---
function TelaPrescricoes() {
  return (
    <div style={{ minHeight: "100vh", background: CORES_SISTEMA.fundo, paddingBottom: 100 }}>
      <Topo txt="Prescrições" />
      <div style={{ padding: "16px" }}>
        {LISTA_OPCOES_PRESC.map((opcao) => (
          <div
            key={opcao.id}
            onClick={() => console.log("Abriu: " + opcao.name)}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "12px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              cursor: "pointer",
            }}
          >
            {/* Ícone dentro da caixa colorida - EXATAMENTE COMO NA IMAGEM */}
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: opcao.bgColor, // A cor agora é aplicada no CSS de forma robusta
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              flexShrink: 0
            }}>
              {opcao.icon}
            </div>

            {/* Nome do Item */}
            <div style={{ flex: 1 }}>
              <span style={{ 
                fontSize: "16px", 
                fontWeight: "700", 
                color: "#1e293b",
                lineHeight: "1.2",
                display: "block"
              }}>
                {opcao.name}
              </span>
            </div>

            {/* Seta à Direita em SVG leve */}
            <SetaDireita />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaVazia({ titulo, emoji }) {
  return (
    <div style={{ minHeight: "100vh", background: CORES_SISTEMA.fundo }}>
      <Topo txt={titulo} />
      <div style={{ padding: 100, textAlign: "center", color: CORES_SISTEMA.cinza }}>
        <div style={{ fontSize: 60, opacity: 0.5, marginBottom: 20 }}>{emoji}</div>
        <p style={{ fontSize: 14, fontWeight: "900", letterSpacing: 1 }}>EM DESENVOLVIMENTO</p>
      </div>
    </div>
  );
}

// --- APP RAIZ ---

export default function App() {
  const [tabAtiva, setTabAtiva] = useState("home");

  const renderConteudo = () => {
    switch (tabAtiva) {
      case "home": return <HomePrincipal mudarTab={setTabAtiva} />;
      case "prescricoes": return <TelaPrescricoes />;
      case "bulas": return <TelaVazia titulo="Bulário" emoji="💊" />;
      case "favoritos": return <TelaVazia titulo="Favoritos" emoji="⭐" />;
      default: return <HomePrincipal mudarTab={setTabAtiva} />;
    }
  };

  return (
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      minHeight: "100vh",
      position: "relative",
      background: "#fff",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      overflowX: "hidden",
      boxShadow: "0 0 60px rgba(0,0,0,0.15)"
    }}>
      {renderConteudo()}
      <BarraNavegacao tab={tabAtiva} setTab={setTabAtiva} />
    </div>
  );
}
