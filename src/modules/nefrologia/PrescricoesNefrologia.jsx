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

// ─── HEADER ───────────────────────────────────────────────────────────────────
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

// ─── DADOS CLÍNICOS (Nefrologia) ──────────────────────────────────────────────
const TEMAS = [
  {
    id: "hipercalcemia", nome: "Distúrbios do Cálcio - Hipercalcemia",
    orientacoes: { secoes: [
      { titulo: "Critérios e Fórmula", tipo: "info", itens: [
        "Sintomáticos ou Ca muito elevado (Ca++ iônico > 3,5 mmol/L ou 7 mg/dL; Ca++ total > 14 mg/dL) são emergências.",
        "Fórmula: Ca corrigido = Ca medido + [(4,0 - albumina) × 0,8] OU dosar cálcio iônico."
      ]},
      { titulo: "Hipercalcemia Leve", tipo: "conduta", itens: [
        "Ca iônico < 6 mg/dL; Ca corrigido < 12 mg/dL.",
        "Evitar: Tiazídicos, Lítio, depleção de volume, repouso prolongado, dieta rica em cálcio, Vitamina D > 800 UI/dia.",
        "Hidratação adequada (6-8 copos de água/dia) para evitar nefrolitíase."
      ]},
      { titulo: "Hipercalcemia Mod/Grave — Hidratação", tipo: "procedimento", itens: [
        "Ca iônico > 7 mg/dL; Ca corrigido > 14 mg/dL.",
        "Hidratação venosa vigorosa: SF 0,9% 200-300 mL/h (4-6L/24h). Alvo: débito urinário 100-150 mL/h.",
        "Após corrigir desidratação: manter 1000 mL a cada 6-8h.",
        "Se IR ou IC, usar diurético de alça (Furosemida) para evitar hipervolemia."
      ]},
      { titulo: "Terapias Antirreabsortivas e Específicas", tipo: "conduta", itens: [
        "Bifosfonados (Pamidronato): 60-90 mg EV em 2-4h. (Diluir 1 amp em 10mL do diluente, e depois em 250-500mL de SF 0,9%). Nova dose só após 7 dias.",
        "Ácido Zoledrônico: 4 mg EV em 15 min (diluir em SF 0,9% 50-100 mL). Repetir semanalmente se preciso.",
        "Calcitonina (se as de cima não forem eficazes): 4 UI/kg IM de 12/12h por 48h.",
        "Glicocorticoide (linfomas, mieloma, intox. Vit D): Hidrocortisona 100 mg EV 8/8h ou Prednisona 40 mg VO 1x/dia.",
        "Hemodiálise: casos graves + malignidade + disfunção renal ou IC, onde a hidratação não for segura."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "SF 0,9% – administrar 300 mL/hora em BIC",
        "Ácido Zoledrônico 4 mg/5mL – diluir 5 mL em SF 0,9% 100 mL e administrar via EV em 15 minutos",
        "Glicemia capilar 4/4h",
        "Monitorização contínua",
        "Registrar diurese via sonda vesical de demora de 1/1h",
        "Fisioterapia motora"
      ]},
    ]},
  },
  {
    id: "hipocalcemia", nome: "Distúrbios do Cálcio - Hipocalcemia",
    orientacoes: { secoes: [
      { titulo: "Hipocalcemia Leve / Crônica", tipo: "info", itens: [
        "Ca iônico > 3,0 mg/dL ou Ca total 8,0-8,5 mg/dL.",
        "Assintomáticos: reposição VO dirigida para a etiologia.",
        "Carbonato de Cálcio 500 mg: 1 cp VO de 8/8h (separado das refeições)."
      ]},
      { titulo: "Hipocalcemia Sintomática Grave/Aguda", tipo: "alerta", itens: [
        "Ca iônico ≤ 3,0 mg/dL ou Ca total ≤ 7,5 mg/dL ou presença de tetania.",
        "Dose de ataque: Gluconato de cálcio 10% – 10 mL + SG 5% 50 mL EV em BIC por 20 min (Vazão 150 mL/h). Repetir após 10-60 min para resolução.",
        "Dose de manutenção: Gluconato de cálcio 10% – 110 mL + SG 5% 890 mL EV em BIC a 50 mL/h.",
        "Manter EV até paciente estar em dose eficaz de cálcio + vitamina D via oral."
      ]},
      { titulo: "Reposição Via Oral (Transição)", tipo: "conduta", itens: [
        "Carbonato de Cálcio 500 mg: 1 cp VO de 8/8h (separado das refeições).",
        "Calcitriol 0,25 mg: 1 cp VO de 12/12h."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial (Sintomática / Grave)", itens: [
        "Gluconato de cálcio 10% – diluir 10 mL em SG 5% 50 mL e administrar, via EV, em BIC a 150 mL/h",
        "Glicemia capilar de 4/4h",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "hipercalemia", nome: "Distúrbios do Potássio - Hipercalemia",
    orientacoes: { secoes: [
      { titulo: "Classificação", tipo: "info", itens: [
        "Leve: 5,0 a 6,0 mEq/L",
        "Moderada: 6,0 a 6,5 mEq/L",
        "Grave: ≥ 6,5 mEq/L"
      ]},
      { titulo: "Redução Lenta / Rápida", tipo: "conduta", itens: [
        "Redução Lenta (< 5,5 crônico): Dieta hipocalêmica, Diurético de alça/tiazídico, reverter causa (suspender IECA, BRA, AINEs).",
        "Redução Rápida 6 a 12h (5,5 - 6,5, disfunção renal/oligúria): Lokelma/Sorcal, diurético (se hipervolêmico), Bicarbonato (se acidose), Hemodiálise (se IR grave)."
      ]},
      { titulo: "Redução Imediata (Grave ≥ 6,5 ou alt. ECG)", tipo: "alerta", itens: [
        "1. Antagonismo de Membrana (Cálcio): Gluconato de Cálcio 10% 10 mL + SG 5% 100 mL EV em 5 min. Repetir se alterações no ECG persistirem. (30 min se uso de digitálico).",
        "2. Carrear K+ para as células (Insulina + Glicose): Insulina Regular 10 UI + Glicose 10% 500 mL EV em 30 min. (Se Glicemia ≥ 250: apenas 10 UI EV bolus).",
        "Monitorar DX a cada 15-30 min na 1ª hora. Se DX < 70: Glicose 50% 50 mL EV bolus + SG 10% a 50 mL/h.",
        "3. Carrear K+ (Salbutamol): 40-80 gotas + SF 0,9% 5 mL inalatório (10 min).",
        "4. Carrear K+ (Bicarbonato): NaHCO3 8,4% 150 mL + SG 5% 1000 mL EV 2-4h (se acidose metabólica). Não juntar com cálcio."
      ]},
      { titulo: "Remoção do Potássio do Corpo", tipo: "procedimento", itens: [
        "Diuréticos de Alça: Furosemida 20 mg/2mL 4 mL EV 12/12h (se euvolêmico, associar SF 0,9%).",
        "Resinas de Troca: Lokelma 5 g (2 sachês VO 8/8h) ou Sorcal 30 g (1 sachê VO 4/4h).",
        "Hemodiálise: disfunção renal grave ou refratariedade."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial - Hipercalemia Grave", itens: [
        "Gluconato de cálcio 10% – diluir 10 mL em SG 5% 100 mL e administrar via EV em 5 minutos",
        "Insulina Regular 100 UI/mL – Diluir 10 UI em Glicose 10% 500 mL – administrar via EV em 30 minutos",
        "Furosemida 20 mg/2mL – administrar 4 mL via EV de 12/12h",
        "Glicemia capilar a cada 15 min na primeira hora, seguido de 1/1h pelas próximas 6h",
        "Se Dx < 70 mg/dL, administrar Glicose 50% 50 mL via EV bolus, seguido de Glicose 10% 250 mL via EV a 50 mL/h",
        "Monitorização cardíaca contínua"
      ]},
    ]},
  },
  {
    id: "hipocalemia", nome: "Distúrbios do Potássio - Hipocalemia",
    orientacoes: { secoes: [
      { titulo: "Classificação", tipo: "info", itens: [
        "Leve: 3,5 - 2,5 mEq/L",
        "Grave: ≤ 2,5 mEq/L",
        "Sempre diagnosticar e tratar a causa base."
      ]},
      { titulo: "Hipocalemia Leve (Sem instabilidade/ECG normal)", tipo: "conduta", itens: [
        "VO: 10-20 mEq 2-4x/dia (20-80 mEq/dia).",
        "KCl xarope 6% (15mL = 12mEq): 15-30 mL VO 8/8h após refeições.",
        "KCl 600 mg/cp (8mEq/cp): 2 cp VO 6/6h após refeições.",
        "Dose máx por vez: 40 mEq (Xarope 49 mL ou 5 cps)."
      ]},
      { titulo: "Hipocalcemia Grave / Sintomática (Instável ou alt. ECG)", tipo: "alerta", itens: [
        "Administrar EV e VO simultaneamente.",
        "VO: 40 mEq 3-4x/dia OU 20 mEq a cada 2-3h.",
        "EV: KCl 10% (13 mEq/10mL) ou KCl 19,1% (26 mEq/10mL).",
        "Administrar diluído em SF 0,9%. Não usar soro glicosado (risco de hipocalemia rebote e arritmia).",
        "Concentração Máxima: AVP = 80 mEq/L; CVC = 120 mEq/L.",
        "Velocidade infusão: AVP até 10 mEq/h; CVC 10-20 mEq/h (com monitorização).",
        "Dose EV diária: 240 a 400 mEq/dia. (Reduzir 50% se disfunção renal)."
      ]},
      { titulo: "Preparo da Solução EV", tipo: "procedimento", itens: [
        "AVP 40 mEq/L: KCl 10% 15 mL + SF 485 mL a 125 mL/h (5 mEq/h).",
        "AVP 80 mEq/L: KCl 10% 30 mL (ou KCl 19,1% 15 mL) + SF 470 mL a 125 mL/h (10 mEq/h).",
        "CVC 100-120 mEq/L: KCl 19,1% 20 mL + SF 480 mL a 190 mL/h (20 mEq/h).",
        "Dosar potássio a cada 2-4h no início."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial — AVP", itens: [
        "Dieta oral rica em potássio e Água potável livre demanda",
        "KCl 19,1% – diluir 15 mL em SF 0,9% 485 mL e administrar via EV em BIC a 125 mL/h",
        "SSVV 6/6h"
      ]},
      { titulo: "Prescrição Inicial — CVC", itens: [
        "Dieta oral rica em potássio e Água potável livre demanda",
        "KCl 19,1% – diluir 20 mL em SF 0,9% 480 mL e administrar via EV em BIC a 190 mL/h",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "hipernatremia", nome: "Distúrbios do Sódio - Hipernatremia",
    orientacoes: { secoes: [
      { titulo: "Considerações Iniciais (Na > 145 mEq/L)", tipo: "alerta", itens: [
        "Se Hipovolêmico (alteração SV): SF 0,9% 250 mL a cada 30 min (ou 20 mL/kg) até euvolemia.",
        "Se Hipervolêmico (congesto): Furosemida 20 mg/2mL 4 mL EV 8/8h +/- Hidroclorotiazida 25mg 1x/dia.",
        "Após atingir euvolemia, dosar sódio sérico novamente."
      ]},
      { titulo: "Hipernatremia Aguda (< 48h)", tipo: "conduta", itens: [
        "Alvo: Reduzir natremia em 2 mEq/L/h nas 1ªs 4h, seguido de 1 mEq/L/h.",
        "SG 5% 1000 mL EV em 4h (250 mL/h). Dosar Na ao fim e repetir se Na > 150.",
        "Após Na < 150: Manter SG 5% 1000 mL 8/8h ou 1 mL/kg/h."
      ]},
      { titulo: "Hipernatremia Crônica (> 48h)", tipo: "procedimento", itens: [
        "Alvo: reduzir no máximo 8 a 12 mEq/L/24h (0,5 mEq/L/h).",
        "Usar Fórmula de Androgué para estimar volume ou usar dose prática de SG 5% a 1,35 mL/kg/h (Máx 150 mL/h).",
        "Paciente alerta com deglutição: dar 2/3 da água calculada por VO e 1/3 SG 5% via EV.",
        "Dosar sódio a cada 2-6 horas."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição — Hipernatremia Aguda (Pct 70 kg, Na 170)", itens: [
        "Dieta oral livre conforme aceitação",
        "Água potável via oral livre demanda",
        "SG 5% administrar 1000 mL via EV a 250 mL/h",
        "Glicemia capilar 2/2h"
      ]},
      { titulo: "Prescrição — Hipernatremia Crônica (Pct 70 kg, Na 170)", itens: [
        "Dieta oral livre conforme aceitação",
        "Água potável via oral livre demanda",
        "SG 5% – administrar 2000 mL via EV a 83 mL/h"
      ]},
    ]},
  },
  {
    id: "hiponatremia", nome: "Distúrbios do Sódio - Hiponatremia",
    orientacoes: { secoes: [
      { titulo: "Manejo Inicial e Definições", tipo: "info", itens: [
        "Leve: 130-135; Moderada: 125-129; Grave: < 125 mEq/L.",
        "Aguda < 48h; Crônica > 48h.",
        "Leve/Moderada assintomática: Interromper medicamentos causadores. Sem medidas específicas ativas."
      ]},
      { titulo: "Hiponatremia Aguda Grave Sintomática", tipo: "alerta", itens: [
        "Sintomas: coma ou convulsão.",
        "NaCl 3% 100 mL EV em 10 min. Repetir até 2x se necessário para elevar Na em 4-6 mEq/L nas 1ªs 6h.",
        "Seguir com NaCl 3% a 0,5-2 mL/kg/h. Interromper quando elevação = 10 mEq/L em 24h.",
        "Checar Na após 1, 6 e 12h. A partir do 2º dia, alvo de 8 mEq/L/dia."
      ]},
      { titulo: "Hiponatremia Crônica Grave (Na < 120)", tipo: "procedimento", itens: [
        "Aumentar sal na dieta.",
        "Restrição hídrica < 1L (se cirrótico < 750 mL) se hipervolêmico/oligoassintomático.",
        "Preparo NaCl 3%: NaCl 20% 55 mL + SF 0,9% 455 mL.",
        "NaCl 3% EV a 15-30 mL/h. Alvo: 4-6 mEq/L em 24h. Interromper se Na > 125 mEq/L."
      ]},
      { titulo: "Crônica Grave no Paciente Congesto", tipo: "conduta", itens: [
        "IC, cirrose, nefrótico.",
        "NaCl 3% EV a 15-30 mL/h + Furosemida 4 mL EV 12/12h.",
        "Titular furosemida guiado por peso diário/débito para evitar hipervolemia severa."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Crônica Grave (Normovolêmico)", itens: [
        "Dieta oral livre conforme aceitação",
        "Restrição hídrica < 1L/24h",
        "NaCl 20% diluir 55 mL em SF 0,9% 455 mL e administrar via EV a 21 mL/h"
      ]},
      { titulo: "Crônica Grave (IC / Congesto)", itens: [
        "Dieta oral livre conforme aceitação",
        "Restrição hídrica < 1L/24h",
        "NaCl 20% – diluir 55 mL em SF 0,9% 455 mL e administrar via EV a 15 mL/h",
        "Furosemida 20 mg/2mL – administrar 4 mL via EV de 12/12h",
        "Registrar débito urinário e Pesar diariamente em jejum"
      ]},
    ]},
  },
  {
    id: "lesao-renal-aguda", nome: "Lesão Renal Aguda (LRA / IRA)",
    orientacoes: { secoes: [
      { titulo: "Medidas Gerais", tipo: "info", itens: [
        "Verificar fatores: hipovolemia, hipotensão, sepse, drogas nefrotóxicas.",
        "Evitar: Contraste iodado, AINEs, Aminoglicosídeos, Vanco, Tazocin, Cefepime, Tenofovir, Metformina, Morfina.",
        "Se IRA Pré-Renal: evitar diuréticos, IECA e BRA.",
        "Ajustar doses conf. função renal; dieta hipossódica e pobre em K+."
      ]},
      { titulo: "LRA Pré-Renal (Hipovolemia)", tipo: "procedimento", itens: [
        "1 a 3 L de fluidos para correção do déficit. Ringer Lactato ou SF 0,9%.",
        "Idosos: dar 0,5-1L e avaliar resposta.",
        "Evitar se edema pulmonar. NÃO usar albumina p/ hipovolemia na IRA.",
        "Se boa resposta (diurese > 0,5 mL/kg/h): manter hidratação a 75 mL/h."
      ]},
      { titulo: "LRA + Hipervolemia / Edema Pulmonar", tipo: "alerta", itens: [
        "Furosemida 20 mg/2mL: 4-8 mL EV.",
        "Avaliar resposta: Diurese de 200 mL em até 2h. Se não, repetir 8-20 mL de Furosemida EV.",
        "Se manutenção de anúria/ausência de resposta: Avaliar Diálise.",
        "Dose máx de Furosemida 20mg/2mL: IC (Máx 600mg); Cirrose (Máx 160mg); Nefrótica (Máx 600mg)."
      ]},
      { titulo: "LRA Pós-Renal", tipo: "conduta", itens: [
        "Avaliação da Urologia para resolver o fator obstrutivo."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "IRA Pré-Renal (Hipovolêmico)", itens: [
        "Ringer Lactato – administrar 1000 mL via EV aberto",
        "Restrição hídrica < 1L/24h",
        "NaCl 20% diluir 55 mL em SF 0,9% 455 mL e administrar via EV a 21 mL/h (Ajustar de acordo com a clínica)"
      ], nota: "Após normovolemia, seguir com hidratação venosa a 75 mL/h." },
      { titulo: "IRA + Hipervolemia", itens: [
        "Furosemida 20 mg/2mL – administrar 6 mL via EV",
        "Registrar débito urinário via SVD de 1/1h",
        "Monitorizar sinais vitais"
      ]},
    ]},
  },
  {
    id: "rabdomiolise", nome: "Rabdomiólise",
    orientacoes: { secoes: [
      { titulo: "Indicação e Meta", tipo: "info", itens: [
        "Indicado em pacientes com CPK ≥ 5.000 U/L ou com aumento progressivo.",
        "Reposição agressiva: SF 0,9% 1 a 2 L/h, ajustando a taxa para manter diurese alvo de 200-300 mL/h.",
        "Duração: manter até CPK ≤ 5.000 U/L e em queda progressiva."
      ]},
      { titulo: "Manejos Clínicos", tipo: "procedimento", itens: [
        "Se oligúrico após 3-6L de SF: Avaliação urgente da Nefrologia (diálise).",
        "Monitorar e tratar distúrbios: hipercalemia, hipocalcemia, hiperfosfatemia e hiperuricemia."
      ]},
      { titulo: "Atenção: Sobrecarga de Volume", tipo: "alerta", itens: [
        "Investigar congestão pulmonar.",
        "Edema periférico (3º espaço) pode ocorrer sem haver sobrecarga sistêmica.",
        "Se sobrecarga pulmonar documentada: Furosemida 4 mL EV e interromper fluidos."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "SF 0,9% – administrar 1000 mL via EV em 1 hora",
        "Monitorar débito urinário de 1/1h via SVD (Alvo: 200-300 mL/h)"
      ]},
      { titulo: "Terapia de Manutenção", itens: [
        "SF 0,9% 500 mL – administrar 4 etapas, via EV, a 28 gts/min",
        "Monitorar débito urinário"
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
                  <span style={ ...TEXT_STYLES.body }}>{item}</span>
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
            <span style={ ...TEXT_STYLES.body }}>{item}</span>
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

// ─── COMPONENTE PRINCIPAL (Nefrologia) ────────────────────────────────────────
export default function PrescricoesNefrologia({ onBack }) {
  const [temaId, setTemaId] = useState(null);
  const [aba, setAba]       = useState("orientacoes");

  if (!temaId) {
    return (
      <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
        <Header titulo="Nefrologia" onBack={onBack} />
        
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

  const tema = TEMAS.find((t) => t.id === temaId);

  return (
    <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      <Header titulo={tema.nome} subtitulo="Nefrologia" onBack={() => { setTemaId(null); setAba("orientacoes"); }} />

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
