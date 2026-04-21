import React, { useState } from "react";
import { TEXT_STYLES } from "../../constants/styles";

// ─── CORES — mesmas do App.jsx ────────────────────────────────────────────────
const COR = {
  bg:       "#F5F7F5",
  card:     "#FFFFFF",
  border:   "#DDE3DC",
  text:     "#1A2B1A",
  muted:    "#6B7C6B",
  primary:  "#1F5C2E",
  primary2: "#2E7A42",
  primary3: "#E8F2EA",
  danger:   "#C0392B",
  warn:     "#B45309",
  info:     "#1D5FA8",
  success:  "#2D7A4F",
};

// ─── HEADER (mesmo padrão do App) ─────────────────────────────────────────────
function Header({ titulo, subtitulo, onBack }) {
  return (
    <div style={{
      background: COR.primary, padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <button
        onClick={onBack}
        style={{
          background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
          width: 34, height: 34, color: "#fff", fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >‹</button>
      <div>
        {subtitulo && (
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
            {subtitulo}
          </div>
        )}
        <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>{titulo}</div>
      </div>
    </div>
  );
}

// ─── DADOS CLÍNICOS (Extraídos do PDF de Endocrinologia) ──────────────────────
const TEMAS = [
  {
    id: "cad-ehh", nome: "Cetoacidose Diabética / EHH",
    orientacoes: { secoes: [
      { titulo: "Fase 1 e 2: Hidratação Venosa (HV)", tipo: "conduta", itens: [
        "Fase 1 (1ª hora): SF 0,9% 1000 a 1500 mL (15-20 mL/kg).",
        "Se instabilidade hemodinâmica, considerar Ringer Lactato e aminas vasoativas.",
        "Fase 2 (Após 1ª hora): Manter HV 250-500 mL/h (4 mL/kg/h) até exames."
      ]},
      { titulo: "Checar Potássio Sérico (K)", tipo: "conduta", itens: [
        "K < 3,3 e Na < 135: SF 0,9% 1000 mL + KCl 19,1% 10 mL (ou KCl 10% 20 mL) EV em 1 hora.",
        "K < 3,3 e Na ≥ 135: NaCl 0,45% 1000 mL + KCl 19,1% 10 mL EV em 1 hora.",
        "K 3,3 a 5,0 e Na < 135: Insulinoterapia + SF 0,9% 1000 mL + KCl 19,1% 10 mL EV em 2 horas.",
        "K 3,3 a 5,0 e Na ≥ 135: Insulinoterapia + NaCl 0,45% 1000 mL + KCl 19,1% 10 mL EV em 2 horas.",
        "K > 5,0 e Na < 135: Insulinoterapia + SF 0,9% 1000 mL EV em 2 horas.",
        "K > 5,0 e Na ≥ 135: Insulinoterapia + NaCl 0,45% 1000 mL EV em 2 horas.",
        "*Na corrigido = Sódio medido + 0,016 * (Glicose sérica - 100).",
        "**NaCl 0,45% 500 mL = SF 0,9% 250 mL + água destilada 250 mL."
      ]},
      { titulo: "Fase 3: Insulinoterapia", tipo: "conduta", itens: [
        "Insulina Regular 100 UI (1 mL) + SF 0,9% 99 mL — administrar via EV a 0,1 UI/kg/h em BIC (Pct 70 kg = 7 mL/h).",
        "Glicemia capilar 1/1h.",
        "Ajustar velocidade da BIC para reduzir HGT em 50-75 mg/dL/h.",
        "Se redução de HGT > 75 mg/dL/h: Reduzir velocidade da BIC à metade.",
        "Se redução de HGT < 50 mg/dL/h: Dobrar velocidade da BIC."
      ]},
      { titulo: "ATENÇÃO: Evitar Hipoglicemia", tipo: "alerta", itens: [
        "Se HGT < 200-250 mg/dL na FASE 2: Manter SF 0,9% ou NaCl 0,45% +/- KCl + Iniciar SG 5% 250 mL/h.",
        "Se HGT < 200-250 mg/dL na FASE 3: Manter HV + Manter Insulina em BIC (reduzir vazão à metade) + Iniciar SG 5% 250 mL/h.",
        "GLICEMIA ALVO = 150-200 mg/dL até reversão da CAD/EHH."
      ]},
      { titulo: "Critérios para Resolução da CAD", tipo: "info", itens: [
        "GLICEMIA < 200 MG/DL + 2 de 3 critérios:",
        "1. pH ≥ 7,3",
        "2. HCO3 ≥ 15",
        "3. Ânion GAP ≤ 12"
      ]},
      { titulo: "Manejo Após Resolução CAD/EHH", tipo: "conduta", itens: [
        "1. Iniciar dieta via oral.",
        "2. Administrar Insulina Regular 10 UI via SC.",
        "3. Interromper BIC de Insulina e Hidratação APÓS 2 HORAS da insulina SC.",
        "4. Manter tratamento para o fator desencadeante.",
        "5. Reconciliação medicamentosa: manter tratamento prévio ou esquema Basal-Bolus."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Aguardando Exames Laboratoriais", itens: [
        "Dieta zero",
        "SF 0,9% 500 mL – administrar 3 etapas (1500 mL) via EV em 1 hora",
        "SF 0,9% 500 mL – administrar 1 etapa (500 mL), via EV, em 1 hora (repetir etapa a cada hora até 2ª ordem)",
        "Monitorização contínua",
        "Glicemia capilar 1/1h"
      ], nota: "Solicitar Gasometria arterial, Hemograma, PCR, Na, K, Cl, Ur, Cr, EAS e Rx de Tórax." },
      { titulo: "Exemplo Pós-Exames (Pct 70kg, CAD por ITU, K 3,5, Na 130)", itens: [
        "Dieta zero",
        "SF 0,9% 1000 mL + KCl 10% 20 mL via EV em 2 horas",
        "Insulina Regular 100 UI + SF 0,9% 99 mL – administrar via EV em BIC a 7 mL/h",
        "Ceftriaxona 1g – diluir 1 fr em 10 mL AD e administrar via EV em 2 min de 12/12h",
        "Monitorização contínua",
        "Glicemia capilar de 1/1h",
        "Gasometria arterial – 1ª amostra, seguido de venosa de 4/4h",
        "Dosar eletrólitos e função renal de 2/2h"
      ]},
    ]},
  },
  {
    id: "crise-tireotoxica", nome: "Crise Tireotóxica",
    orientacoes: { secoes: [
      { titulo: "Inibir a produção de hormônio (Escolher uma)", tipo: "procedimento", itens: [
        "Propiltiouracil 100 mg/cp: Ataque 6 a 10 cp (600-1000 mg) VO/SNG. Manutenção: 2 cp (200 mg) a cada 4-6h (Total 24h: 1200-1500mg).",
        "Tiamazol (Metimazol) 5-10 mg/cp: 20 mg a cada 4-8h (Total 24h: 60-120mg)."
      ]},
      { titulo: "Bloquear liberação de hormônio (Escolher uma)", tipo: "alerta", itens: [
        "Solução de lugol 1%: 4 a 10 gotas VO/SNG a cada 6-8h. (Administrar 1-2 HORA(S) APÓS o Tiamazol/Propiltiouracil).",
        "Carbonato de lítio 300 mg 6/6h (monitorar litemia - alvo: 1 mg/dL)."
      ]},
      { titulo: "Reduzir conversão T4 para T3 (Escolher uma)", tipo: "procedimento", itens: [
        "Hidrocortisona 100 mg/fr: ataque 300 mg EV, seguido de 100 mg EV de 8/8h por 48h.",
        "Dexametasona 4 mg/mL: 0,5 mL (2 mg) EV 6/6h ou 1 mL (4 mg) EV de 12/12h."
      ]},
      { titulo: "Inibir reabsorção dos hormônios", tipo: "conduta", itens: [
        "Colestiramina 4g/envelope: 4g em 90 mL de água VO/SNG de 6/6h."
      ]},
      { titulo: "Suporte Clínico", tipo: "info", itens: [
        "Corrigir hipertermia (Antipiréticos): Dipirona 2 mL EV 6/6h ou Paracetamol 750 mg VO 6/6h. Resfriamento físico.",
        "Controlar sintomas adrenérgicos (Alvo FC 60-80 bpm): Propranolol 60-80 mg VO/SNG a cada 4-6h ou Atenolol 50-100 mg VO 12/12h.",
        "Se contraindicação a betabloqueador: Verapamil 80 mg VO 6/6h ou Diltiazem 60 mg VO 6/6h.",
        "Reposição volêmica: RL 20 mL/kg EV em 2-6h se hipovolemia, ou SF 0,9% 30-40 mL/kg EV em 24h. Cautela se IC.",
        "Tratar a causa precipitante (ex: infecção, sendo a mais comum)."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática (Crise Tireotóxica)", itens: [
        "Dieta oral branda",
        "Água potável via oral livre demanda",
        "Hidrocortisona 100 mg/fr – reconstituir 3 fr em 2 mL AD cada e diluir 6 mL em SF 0,9% 50 mL – administrar via EV agora",
        "Propiltiouracil 100 mg/cp – administrar 6 comprimidos, via oral, agora",
        "Colestiramina 4g/envelope – diluir 4g em 90 mL de água e administrar, via oral, de 6/6h",
        "Propranolol 40 mg/cp – administrar 2 comprimidos, via oral, de 6/6h",
        "Solução de lugol 1% – administrar 6 gotas, via oral, de 8/8h (Iniciar 2h APÓS administração do item 4)",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD e administrar via EV lento de 6/6h, se dor ou febre",
        "Glicemia capilar 2/2h",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "coma-mixedematoso", nome: "Estado/Coma Mixedematoso",
    orientacoes: { secoes: [
      { titulo: "Considerações Iniciais", tipo: "alerta", itens: [
        "Emergência endócrina que deve ser tratada assim que a suspeita clínica for aventada.",
        "Não se deve adiar o tratamento enquanto aguarda exames laboratoriais."
      ]},
      { titulo: "Terapêutica Hormonal", tipo: "procedimento", itens: [
        "Ataque EV: Levotiroxina 200 mcg/mL – 4 mL (800 mcg) + 16 mL de SF 0,9%. Administrar 5-10 mL (200-400 mcg) EV bólus. (Indisponível no Brasil atualmente).",
        "Se EV indisponível (Ataque VO): Levotiroxina 500 mcg VO/SNG.",
        "Manutenção: Levotiroxina 50-200 mcg VO/SNG a cada 24 horas (ajustar conforme resposta)."
      ]},
      { titulo: "Corticoterapia", tipo: "conduta", itens: [
        "Hidrocortisona 100 mg/fr: 1 fr + SF 0,9% 100 mL EV de 8/8h.",
        "Manter até estabilidade clínica ou até excluir insuficiência adrenal."
      ]},
      { titulo: "Outros Manejos no Coma Mixedematoso", tipo: "info", itens: [
        "Antibioticoterapia: fator precipitante mais comum. Prescrever empiricamente até excluir infecção.",
        "Hipotermia: aquecimento com cobertores de pano.",
        "Hipoventilação: considerar Ventilação Mecânica.",
        "Hiponatremia (alvo Na > 120 mEq/L): Salina hipertônica 3% a 20 mL/h. Se coma, avaliar infusão inicial de 100 mL em 10 min.",
        "Hipoglicemia: Glicose 50% 40 mL EV + SG 5% 100 mL/h EV até estabilidade.",
        "Hipotensão: Reposição volêmica. Considerar Noradrenalina (16 mL + SG 5% 234 mL via EV a 10 mL/h)."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Dieta oral branda (ou enteral via SNG de acordo com o estado de alerta)",
        "Hidrocortisona 100 mg/fr – reconstituir 1 fr em 2 mL AD e diluir em SF 0,9% 50 mL, administrar via EV de 8/8h",
        "Levotiroxina 100 mcg/cp – administrar 5 comprimidos, via oral, dose única (Ataque)",
        "Suplementação de O2, se SatO2 < 90%",
        "Glicemia capilar 2/2h",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "hiperglicemia-assintomatica", nome: "Hiperglicemia Assintomática",
    orientacoes: { secoes: [
      { titulo: "Manejo Clínico Geral", tipo: "info", itens: [
        "Descartar a presença de urgência hiperglicêmica (Cetoacidose Diabética e EHH).",
        "Considerar o ajuste do tratamento ambulatorial e orientar sobre a importância da adesão.",
        "Encaminhar para a Atenção Primária à Saúde (APS) para seguimento clínico.",
        "Orientar sobre os sinais de alarme para emergências hiperglicêmicas."
      ]},
      { titulo: "Uso de Insulina no PS", tipo: "alerta", itens: [
        "A administração de insulina no pronto socorro NÃO é recomendada para casos de descompensação crônica.",
        "Caso opte pela administração isolada, siga a escala abaixo."
      ]},
      { titulo: "Escala de Insulina Regular SC", tipo: "tabela",
        colunas: ["Valor da Glicemia", "Dose da Insulina"],
        linhas: [
          ["181 - 200 mg/dL", "2 UI"],
          ["201 - 250 mg/dL", "4 UI"],
          ["251 - 300 mg/dL", "6 UI"],
          ["301 - 350 mg/dL", "8 UI"],
          ["351 - 400 mg/dL", "10 UI"],
          ["> 400 mg/dL", "12 UI"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição (Apenas se clinicamente justificado)", itens: [
        "Insulina Regular SC — Administrar conforme escala estrita acima baseada na glicemia capilar pontual."
      ], nota: "Pacientes assintomáticos devem preferencialmente ter os esquemas de medicação oral/basal ajustados ambulatorialmente." },
    ]},
  },
  {
    id: "hipoglicemia", nome: "Hipoglicemia",
    orientacoes: { secoes: [
      { titulo: "Hipoglicemia Leve (Dx < 70 mg/dL)", tipo: "conduta", itens: [
        "Tratamento via oral (se houver condições de deglutir): Oferecer 15 g de carboidrato.",
        "Exemplos: 1 colher de sopa rasa de açúcar ou mel.",
        "150 mL de refrigerante comum.",
        "150 mL de suco de laranja.",
        "3 balas de caramelo."
      ]},
      { titulo: "Hipoglicemia Grave (Dx < 54 mg/dL) ou sem deglutição", tipo: "procedimento", itens: [
        "Tratamento Endovenoso: Glicose 50% – 40 mL EV + SG 5% 100 mL/h EV, até estabilidade clínica.",
        "Tratamento Intramuscular (se sem acesso): Glucagon 1 mg/fr – 1 mL via IM."
      ]},
      { titulo: "Pós-Reversão", tipo: "info", itens: [
        "Após reversão (Dx > 70 mg/dL): oferecer um lanche para o paciente."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Glicose 50% – administrar 40 mL, via EV, agora",
        "SG 5% 500 mL – administrar via EV a 33 gts/min",
        "Monitorar glicemia capilar a cada 15 minutos"
      ]},
    ]},
  },
  {
    id: "insuficiencia-adrenal", nome: "Insuficiência Adrenal Aguda",
    orientacoes: { secoes: [
      { titulo: "Ressuscitação Volêmica", tipo: "procedimento", itens: [
        "Hidratação venosa com 1 L de SF 0,9% na primeira hora.",
        "Pode ser necessário 2 a 3 litros de SF 0,9% nas primeiras 12-24h.",
        "Manutenção (mínimo 24-48 horas): SF 0,9% 30-40 mL/kg EV em 24 horas.",
        "Se hipoglicemia: acrescentar Glicose Hipertônica 50% 200 mL distribuindo as ampolas entre os frascos de SF (ex: 5 ampolas por frasco se usar 4 frascos/dia)."
      ]},
      { titulo: "Corticoterapia", tipo: "conduta", itens: [
        "Dose de ataque: Hidrocortisona 100 mg EV.",
        "Dose de manutenção: Hidrocortisona 50 mg EV de 6/6 horas nas primeiras 24h. Em seguida, 50 mg EV 12/12h.",
        "Se Hidrocortisona indisponível: Metilprednisolona 20 mg EV 12/12h ou Dexametasona 4 mg EV 1x/dia."
      ]},
      { titulo: "Distúrbios Eletrolíticos e Glicêmicos", tipo: "info", itens: [
        "Os distúrbios se normalizam com corticoterapia e reposição volêmica.",
        "Hiponatremia: monitorar níveis séricos de Na a cada 2-6h até normalização. Se persistir, investigar causas secundárias.",
        "Hipercalemia: iniciar medidas corretivas se persistência após algumas horas.",
        "Fazer controle glicêmico (risco de hipoglicemia)."
      ]},
      { titulo: "Identificar e tratar causa precipitante", tipo: "alerta", itens: [
        "Infecção bacteriana.",
        "Gastroenterite viral.",
        "Trauma."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Dieta zero",
        "SF 0,9% 1000 mL – administrar via EV em 1 hora",
        "Hidrocortisona 100 mg/fr – reconstituir 1 fr em 2 mL AD e diluir em SF 0,9% 20 mL – administrar via EV em 2 minutos imediatamente",
        "Glicose 50% – administrar 40 mL, via EV, se glicemia capilar < 70 mg/dL",
        "Glicemia capilar 2/2h",
        "Monitorização contínua"
      ]},
    ]},
  },
];

// ─── SUB-COMPONENTES ──────────────────────────────────────────────────────────

function TagTipo({ tipo }) {
  const mapa = {
    alerta:      { label: "ALERTA",       bg: "#FDECEA", color: COR.danger,  bd: "#FACAC5" },
    conduta:     { label: "CONDUTA",      bg: "#EAF4EC", color: COR.success, bd: "#B8DFC0" },
    procedimento:{ label: "PROCEDIMENTO", bg: "#EBF3FB", color: COR.info,    bd: "#B8D4EE" },
    info:        { label: "ORIENTAÇÃO",   bg: COR.primary3, color: COR.primary, bd: "#C0D8C4" },
    tabela:      { label: "TABELA",       bg: "#F5F0FF", color: "#6B4FBB",   bd: "#D6C9F7" },
  };
  const t = mapa[tipo] || mapa.info;
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: "2px 6px",
      borderRadius: 3, background: t.bg, color: t.color,
      border: `1px solid ${t.bd}`, textTransform: "uppercase", flexShrink: 0,
    }}>
      {t.label}
    </span>
  );
}

function Secao({ secao }) {
  const [aberta, setAberta] = useState(false);
  return (
    <div style={{ marginBottom: 8, borderRadius: 10, overflow: "hidden", border: `1px solid ${COR.border}`, background: COR.card }}>
      <button
        onClick={() => setAberta(!aberta)}
        style={{
          width: "100%", display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", padding: "10px 14px",
          background: "transparent", border: "none", cursor: "pointer", gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left" }}>
          <TagTipo tipo={secao.tipo} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COR.text, lineHeight: 1.4 }}>{secao.titulo}</span>
        </div>
        <span style={{ fontSize: 13, color: COR.muted, flexShrink: 0, marginTop: 3 }}>{aberta ? "▲" : "▼"}</span>
      </button>
      {aberta && (
        <div style={{ padding: "0 14px 12px" }}>
          {secao.tipo === "tabela" ? (
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${COR.border}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    {secao.colunas.map((col, i) => (
                      <th key={i} style={{
                        padding: "8px 10px", background: COR.primary, color: "#fff",
                        textAlign: "left", fontWeight: 700, fontSize: 11,
                        borderRight: i < secao.colunas.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {secao.linhas.map((row, ri) => (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? COR.card : COR.bg }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: "7px 10px", color: COR.text, fontSize: 12, lineHeight: 1.4,
                          borderTop: `1px solid ${COR.border}`, fontWeight: ci === 0 ? 600 : 400,
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {secao.itens.map((item, i) => (
                <li key={i} style={{
                  display: "flex", gap: 8, padding: "5px 0",
                  borderBottom: i < secao.itens.length - 1 ? `1px solid ${COR.border}` : "none",
                  alignItems: "flex-start",
                }}>
                  <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: COR.primary2, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: COR.text, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function GrupoPrescricao({ grupo }) {
  return (
    <div style={{ marginBottom: 14, borderRadius: 12, border: `1px solid ${COR.border}`, background: COR.card, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", background: COR.primary }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {grupo.titulo}
        </span>
      </div>
      <div style={{ padding: "10px 14px" }}>
        {grupo.itens.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 10,
            marginBottom: i < grupo.itens.length - 1 ? 8 : 0,
            paddingBottom: i < grupo.itens.length - 1 ? 8 : 0,
            borderBottom: i < grupo.itens.length - 1 ? `1px solid ${COR.border}` : "none",
            alignItems: "flex-start",
          }}>
            <div style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: 6,
              background: i % 2 === 0 ? COR.primary : COR.primary3,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: i % 2 === 0 ? "#fff" : COR.primary, fontWeight: 800, fontSize: 11,
            }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: COR.text, lineHeight: 1.5, paddingTop: 2 }}>{item}</span>
          </div>
        ))}
        {grupo.nota && (
          <div style={{
            marginTop: 10, padding: "10px 12px", borderRadius: 8,
            background: "#FFFBF0", border: "1px solid #E8CC6A",
            fontSize: 12, color: "#6B4E00", lineHeight: 1.5,
          }}>
            <strong>⚠️ Obs:</strong> {grupo.nota}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL (Endocrinologia) ────────────────────────────────────
export default function PrescricoesEndocrinologia({ onBack }) {
  const [temaId, setTemaId] = useState(null); // Começa nulo para mostrar a lista
  const [aba, setAba]       = useState("orientacoes");

  // Se nenhum tema estiver selecionado, mostra a LISTA DE TEMAS
  if (!temaId) {
    return (
      <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
        <Header titulo="Endocrinologia" onBack={onBack} />
        
        <div style={{ padding: "20px 16px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: COR.muted, margin: "0 0 16px 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Selecione um Tema
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TEMAS.map(t => (
              <div 
                key={t.id} 
                onClick={() => { setTemaId(t.id); setAba("orientacoes"); }} 
                style={{
                  background: COR.card, borderRadius: 16, padding: "18px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  border: `1px solid ${COR.border}`, cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)", transition: "transform 0.1s"
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: COR.text }}>{t.nome}</span>
                <span style={{ color: COR.primary, fontSize: 22, fontWeight: 600 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Se o utilizador clicou num tema, mostra as ABAS (Orientações / Prescrição)
  const tema = TEMAS.find((t) => t.id === temaId);

  return (
    <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* O botão "Voltar" agora regressa à lista de temas desta especialidade */}
      <Header titulo={tema.nome} subtitulo="Endocrinologia" onBack={() => { setTemaId(null); setAba("orientacoes"); }} />

      {/* ABAS */}
      <div style={{ display: "flex", background: COR.card, borderBottom: `2px solid ${COR.border}`, padding: "0 16px" }}>
        {[{ id: "orientacoes", label: "Orientações" }, { id: "prescricao", label: "Prescrição Prática" }].map((tab) => (
          <button key={tab.id} onClick={() => setAba(tab.id)} style={{
            padding: "16px 16px", background: "transparent", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: aba === tab.id ? 700 : 500,
            color: aba === tab.id ? COR.primary : COR.muted,
            borderBottom: aba === tab.id ? `3px solid ${COR.primary}` : "3px solid transparent",
            marginBottom: -2, transition: "all 0.15s", flex: 1
          }}>{tab.label}</button>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {aba === "orientacoes" && tema.orientacoes.secoes.map((secao, i) => <Secao key={i} secao={secao} />)}

        {aba === "prescricao" && (
          <>
            <div style={{
              padding: "12px 16px", marginBottom: 16, background: COR.primary3,
              borderRadius: 12, border: `1px solid #C0D8C4`, fontSize: 13, color: COR.primary, fontWeight: 600,
              lineHeight: 1.4
            }}>
              🩺 Prescrições orientadoras — adapte ao protocolo da sua instituição.
            </div>
            {tema.prescricao.grupos.map((grupo, i) => <GrupoPrescricao key={i} grupo={grupo} />)}
          </>
        )}
      </div>
    </div>
  );
}
