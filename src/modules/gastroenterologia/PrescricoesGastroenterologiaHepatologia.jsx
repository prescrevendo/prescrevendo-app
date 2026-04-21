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

// ─── DADOS CLÍNICOS (Gastroenterologia) ───────────────────────────────────────
const TEMAS = [
  {
    id: "encefalopatia", nome: "Encefalopatia Hepática",
    orientacoes: { secoes: [
      { titulo: "Identificar e Corrigir Causas", tipo: "conduta", itens: [
        "Terapia inicial = fazer o paciente evacuar.",
        "Lactulose 667mg/mL: Até a 1ª evacuação, 30-45 mL VO de 8/8h a 4/4h (intervalo mín. 1/1h).",
        "Meta: 2 a 4 evacuações pastosas NÃO DIARREICAS por dia.",
        "Após atingir meta: reduzir para 15-30 mL VO 2 vezes/dia (manter contínuo)."
      ]},
      { titulo: "Enema de Lactulose", tipo: "procedimento", itens: [
        "Preparo: Lactulose 300mL + SF 0,9% 700mL.",
        "Administrar o preparo via retal em 10 minutos.",
        "Orientar o paciente a reter o líquido por 1 hora. Repetir se necessário.",
        "*O preparo também pode ser feito com água filtrada, glicerina ou manitol."
      ]},
      { titulo: "Uso de Antibióticos", tipo: "alerta", itens: [
        "Se não houver melhora em 48h OU se houver piora clínica = Associar antibiótico.",
        "1ª Linha: Rifaximina (Xifaxan) 550 mg – 1 cp VO 12/12h até melhora.",
        "2ª Linha: Metronidazol 250 a 500 mg VO 8/8h até melhora (tempo máximo de 15 dias)."
      ]},
      { titulo: "Dieta e Outras Condutas", tipo: "info", itens: [
        "Dieta: Ingestão de 35 a 40 kcal/kg/dia, com 1 g/kg/dia de proteína (preferencialmente vegetal).",
        "Considerar suspensão de diuréticos.",
        "Corrigir hipocalemia, se presente.",
        "Haloperidol 5 mg/mL: 1 mL IM, se agitação psicomotora (SOS).",
        "EVITAR benzodiazepínicos. Considerar contenção mecânica."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "Lactulose 667 mg/mL – administrar 30 mL, via oral, de 8/8h"
      ]},
      { titulo: "Após 24h sem evacuar", itens: [
        "Lactulose 667 mg/mL – administrar 45 mL, via oral, de 4/4h"
      ]},
      { titulo: "Após 48h sem evacuar e/ou piora clínica", itens: [
        "Metronidazol 250 mg/cp – administrar 2 comprimidos, via oral, de 8/8h",
        "Lactulose 667 mg/mL – Diluir 300 mL em SF 0,9% 700 mL, administrar via retal em 10 min"
      ]},
    ]},
  },
  {
    id: "hda-nao-varicosa", nome: "Hemorragia Digestiva Alta Não Varicosa",
    orientacoes: { secoes: [
      { titulo: "Instabilidade Hemodinâmica", tipo: "alerta", itens: [
        "Choque ou hipotensão: Reposição volêmica cuidadosa (Alvo: PAS 100 mmHg e FC < 100 bpm).",
        "SF 0,9% 500-1000 mL EV nos primeiros 30 min (Máx: 3L nas 6 primeiras horas).",
        "Avaliar necessidade de drogas vasoativas (noradrenalina)."
      ]},
      { titulo: "Transfusão de Hemocomponentes", tipo: "conduta", itens: [
        "Se Hb < 7 g/dL (ou baixa resposta a volume): Transfundir concentrado de hemácias EV. Alvo: 7-9 g/dL (ou 9-10 se doença cardiovascular).",
        "Se sangramento ativo + INR > 1,5: Plasma fresco congelado (15-20 mL/kg EV).",
        "Se sangramento ativo + Plq < 50.000: Concentrado de plaquetas (1U/10kg EV).",
        "Se Plq < 10.000 (mesmo sem sangramento ativo): Concentrado de plaquetas (1U/10kg EV)."
      ]},
      { titulo: "Tratamento Medicamentoso ANTES da EDA", tipo: "procedimento", itens: [
        "Realizar Endoscopia Digestiva Alta (EDA) em < 24h com paciente estável.",
        "Se alta suspeita de sangramento ativo (hematêmese/instabilidade): Omeprazol ou Pantoprazol 80 mg EV bolus em 5 min, seguido de 40 mg EV 12/12h.",
        "Se sem alta suspeita (estável com melena): Omeprazol ou Pantoprazol 40 mg EV 12/12h."
      ]},
      { titulo: "Tratamento Medicamentoso APÓS a EDA", tipo: "conduta", itens: [
        "Forrest Ia/b e IIa/b (Alto risco): Omeprazol/Pantoprazol 8 mg/h em infusão contínua por 72h → depois 40 mg EV 12/12h por 3 dias → depois 40 mg VO 12/12h por 2 semanas → depois 1x/dia.",
        "Forrest IIc, III (Baixo risco): Omeprazol 40 mg VO 12/12h por 14 dias → depois 1x/dia por 4-8 sem (úlcera duodenal) ou 8-12 sem (úlcera gástrica)."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial — Antes da EDA", itens: [
        "Dieta oral zero",
        "SF 0,9% 500 mL, via EV em 30 minutos",
        "Omeprazol 40 mg/fr – reconstituir 02 frascos e administrar via EV bolus por 5 min",
        "Omeprazol 40 mg/fr – reconstituir 01 frasco e administrar via EV de 12/12h (12h após o bolus, até a EDA)",
        "Eritromicina 1000 mg/fr – diluir 5 mL em SF 0,9% 250 mL e administrar via EV em 60 min (iniciar 90 min antes da EDA)",
        "Suplementação de O2, se SatO2 < 94%",
        "Monitorização contínua"
      ]},
      { titulo: "IBP Após EDA — Forrest Ia/Ib e IIa/b", itens: [
        "Omeprazol 40 mg/fr – reconstituir 02 frascos e diluir em SF 0,9% 80 mL – EV a 8 mL/h (infusão contínua por 72h)"
      ]},
      { titulo: "IBP Após EDA — Forrest IIc, III", itens: [
        "Omeprazol 40 mg/cp – administrar 01 comprimido, VO, de 12/12h"
      ]},
    ]},
  },
  {
    id: "hda-varicosa", nome: "Hemorragia Digestiva Alta Varicosa",
    orientacoes: { secoes: [
      { titulo: "Suspeita Clínica e Hemodinâmica", tipo: "alerta", itens: [
        "Suspeitar em pct com sinais de hipertensão portal, cirrose ou insuficiência hepática crônica.",
        "Instabilidade: Reposição volêmica cautelosa (SF 0,9% 500-1000 mL em 30 min). Alvo PAS 100 e FC < 100.",
        "Transfusão: Alvo de Hb 7-9 g/dL. Em sangramento maciço, usar protocolo 1:1:1 (Hemácias, Plasma, Plaquetas)."
      ]},
      { titulo: "Vasoconstritores Esplâncnicos", tipo: "procedimento", itens: [
        "Iniciar precocemente. Terlipressina 1mg/5mL: 2 a 4 mg EV bolus, seguido de 1-2 mg EV bolus 4/4h por 2-5 dias.",
        "Dose Terlipressina por peso: <50kg (1mg), 50-70kg (1,5mg), >70kg (2mg) de 4/4h nas primeiras 24h. Depois manter 1mg 4/4h.",
        "Octreotida: 50 mcg EV bolus 2-5 min, seguido de 50 mcg/h EV em BIC por 2-5 dias."
      ]},
      { titulo: "Profilaxias", tipo: "conduta", itens: [
        "Profilaxia PBE: Ceftriaxona 1g EV 1x/dia por 7 dias. Se alta precoce, Ciprofloxacino 500 mg VO 12/12h até completar 7 dias.",
        "Profilaxia secundária (Iniciar no 5º dia, após suspensão dos vasoconstritores e hemostasia): Carvedilol 3,125 mg VO 12/12h.",
        "Meta do Carvedilol: FC 55-60 bpm e PAS ≥ 90 mmHg."
      ]},
      { titulo: "IBP e Endoscopia", tipo: "info", itens: [
        "EDA em menos de 24h.",
        "Antes da EDA: Omeprazol/Pantoprazol 80 mg EV bolus 5 min, depois 40 mg EV 12/12h.",
        "Após EDA: Se varizes confirmadas, manter medidas. Se descartadas e confirmada úlcera, seguir protocolo de HDA Não Varicosa."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "Dieta oral zero",
        "SF 0,9% 500 mL, via EV em 30 minutos",
        "Terlipressina 1 mg/5mL – administrar 10 mL via EV bolus em 1 minuto",
        "Terlipressina 1 mg/5mL – administrar 7 mL via EV bolus lento de 4/4h (iniciar 4h após o ataque)",
        "Omeprazol 40 mg/fr – reconstituir 02 frascos e administrar via EV bolus por 5 min",
        "Omeprazol 40 mg/fr – reconstituir 01 frasco e administrar via EV de 12/12h",
        "Ceftriaxona 1g/fr – reconstituir em 10 mL AD e diluir em SF 0,9% 100 mL – EV em 30 min a cada 24h (D1/D7)",
        "Eritromicina 1000 mg/fr – diluir 5 mL em SF 0,9% 250 mL – EV em 60 min (iniciar 90 min antes da EDA)",
        "Suplementação de O2, se SatO2 < 94%",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "hdb", nome: "Hemorragia Digestiva Baixa",
    orientacoes: { secoes: [
      { titulo: "Manejo Inicial", tipo: "conduta", itens: [
        "Foco: manter estabilidade hemodinâmica para colonoscopia. Excluir fonte alta com EDA se necessário.",
        "Hipotensão/Choque: SF 0,9% 500-1000 mL EV em 30 min. Avaliar noradrenalina.",
        "Transfusão: Hemácias se Hb < 7 g/dL. Plasma (15-20 mL/kg) se INR > 1,5. Plaquetas se < 50.000.",
        "ATENÇÃO: Ácido Tranexâmico (Transamin) NÃO é recomendado."
      ]},
      { titulo: "Manejo de Anticoagulantes", tipo: "alerta", itens: [
        "Varfarina: Suspender e reintroduzir 7 dias após controle.",
        "AAS Profilaxia Primária: Suspender permanentemente.",
        "AAS Profilaxia Secundária / Dupla antiagregação: Suspensão NÃO recomendada rotineiramente.",
        "DOACs (Rivaroxabana, etc): Suspender e reintroduzir em até 7 dias após controle."
      ]},
      { titulo: "Preparo do Cólon", tipo: "procedimento", itens: [
        "Realizar nas primeiras 12-24h após estabilidade hemodinâmica.",
        "Bisacodil 5 mg: 2 cp VO 24h antes do exame.",
        "Manitol 20%: Diluir 500 mL em 500 mL de água e tomar VO em 90 min (6h antes do exame). Pode-se adicionar 100 gotas de Simeticona.",
        "Meta de preparo: 8-12 evacuações líquidas, aspecto urina amarelo-esverdeada."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "Dieta oral zero",
        "SF 0,9% 500 mL, via EV em 30 minutos",
        "Omeprazol 40 mg/fr – reconstituir 01 frasco e administrar via EV bolus a cada 24h (manter até exclusão de HDA)",
        "Suplementação de O2, se SatO2 < 94%",
        "Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "pancreatite", nome: "Pancreatite Aguda",
    orientacoes: { secoes: [
      { titulo: "Ressuscitação Volêmica", tipo: "conduta", itens: [
        "Infundir 5-10 mL/kg/hora em bolus se hipovolemia, seguido de 1,5 mL/kg/hora.",
        "Reajustar nas primeiras 6h e depois a cada 24h. Usar preferencialmente Ringer Lactato.",
        "Metas: FC < 120 bpm, PAM 65-85 mmHg, Débito urinário > 0,5 a 1 mL/kg/h, e Ht 35-44%."
      ]},
      { titulo: "Controle da Dor", tipo: "procedimento", itens: [
        "Analgésicos simples: Dipirona EV 6/6h ou Paracetamol VO 6/6h.",
        "AINEs (se ausência de LRA/sangramento): Cetoprofeno 100 mg EV 12/12h.",
        "Opioides (não pioram quadro clínico): Tramadol 50 mg EV 6/6h ou Morfina 10 mg EV 4/4h."
      ]},
      { titulo: "Suporte Nutricional", tipo: "info", itens: [
        "Jejum até melhora de dor/vômitos e manifestação de fome.",
        "Dieta oral (baixo teor de gordura) deve ser iniciada precocemente (< 24h) conforme tolerância.",
        "Se não tolerar em 3 dias, iniciar Dieta Enteral a 25 mL/h (SNG ou SNE indiferente).",
        "Parenteral: Apenas se não tolerar oral/enteral após 72h."
      ]},
      { titulo: "Uso de Antibióticos", tipo: "alerta", itens: [
        "Leucocitose é comum no estágio inicial. NÃO usar antibióticos profiláticos sem suspeita de infecção.",
        "Suspeita de infecção (esquemas empíricos): Meropenem 1g EV 8/8h OU Piperacilina-Tazobactam 4,5g EV 6/6h.",
        "Alternativas: Cefepime 1g EV 8/8h + Metronidazol 500mg EV 8/8h OU Cipro 400mg EV 12/12h + Metronidazol."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Admissão (Pct 70 kg)", itens: [
        "Dieta oral zero",
        "Ringer Lactato 500 mL/bolsa – 5 bolsas – EV a 33 gts/min",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD via EV 6/6h",
        "Morfina 10 mg/mL – diluir 1 mL em SF 0,9% 9 mL e administrar 4 mL via EV 6/6h",
        "Bromoprida 10 mg/2mL – diluir 2 mL em 18 mL AD via EV até de 8/8h (SOS náusea/vômito)",
        "Sinais vitais (SSVV) de 6/6h"
      ]},
    ]},
  },
  {
    id: "pbe", nome: "Peritonite Bacteriana Espontânea",
    orientacoes: { secoes: [
      { titulo: "Manejo Antibiótico Empírico", tipo: "conduta", itens: [
        "Iniciar tratamento empírico o mais breve possível (coletar líquido ascítico antes se possível).",
        "Paciente não grave (CLIF-SOFA < 7): Cefotaxima 2g EV 8/8h ou Ceftriaxona 1g EV 12/12h por 5-7 dias.",
        "2ª linha: Ciprofloxacino 400mg 12/12h ou Tazocin 4,5g 6/6h.",
        "Paciente grave (CLIF-SOFA ≥ 7): Meropenem 1g EV 8/8h, Ertapenem 1g EV 1x/dia, ou Imipenem 500mg EV 6/6h."
      ]},
      { titulo: "Ajustes de Medicação e Análise Ascítica", tipo: "procedimento", itens: [
        "Suspender permanentemente betabloqueadores. Suspender diuréticos se hipovolemia/LRA.",
        "Se PMN < 250 cel/microL: Descontinuar ATB e reavaliar.",
        "Se PMN ≥ 250 cel/microL: Manter ATB e administrar Albumina no D0.",
        "Após 48h: Queda de 25% de PMN = resposta. Queda < 25% = ampliar espectro.",
        "Após 5 dias: Se PMN > que no pré-tratamento, investigar causas secundárias de peritonite."
      ]},
      { titulo: "Uso de Albumina", tipo: "info", itens: [
        "Dia 1: 1,5 g/kg (Máx 100g). Administrar a 40 gts/min em etapa única.",
        "Dia 3: 1 g/kg (Máx 100g) — SE Creatinina > 1 mg/dL, Ureia > 30 mg/dL ou Bilirrubinas Totais > 4 mg/dL."
      ]},
      { titulo: "Profilaxia Secundária", tipo: "conduta", itens: [
        "Iniciar após tratamento, manter enquanto persistir ascite ou até transplante hepático.",
        "Opções (VO 24/24h): Norfloxacino 400 mg, Sulfametoxazol+Trimetoprima 800+160 mg, ou Ciprofloxacino 500 mg."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Admissão (Pct 70 kg)", itens: [
        "Dieta oral branda hipossódica",
        "Cefotaxima 1g/fr – reconstituir 2 fr e diluir em SF 0,9% 100 mL – EV em 60 min de 8/8h (D0/D5)",
        "Albumina 20% – administrar 500 mL via EV a 40 gts/min",
        "Sinais vitais de 6/6h",
        "Pesar diariamente em jejum"
      ]},
    ]},
  },
  {
    id: "sindrome-hepatorrenal", nome: "Síndrome Hepatorrenal",
    orientacoes: { secoes: [
      { titulo: "1ª Intervenção: Corrigir Hipovolemia", tipo: "conduta", itens: [
        "Albumina 1 g/kg via EV (Máx: 100 g/dia) por dois dias consecutivos.",
        "Suspender diuréticos, betabloqueadores e nefrotóxicos.",
        "Identificar e tratar precipitantes (Infecção, sangramento, diurese agressiva, lactulose excessiva).",
        "Avaliar necessidade de hemotransfusão."
      ]},
      { titulo: "2ª Intervenção: Vasoconstritores", tipo: "procedimento", itens: [
        "Se ausência de resposta com Albumina → Vasoconstritores + Albumina por até 14 dias.",
        "1ª Escolha: Terlipressina 1mg/5mL – 5 mL EV bolus 6/6h + Albumina 20% 50 mL EV a 40gts/min de 8/8h.",
        "Se s/ resposta em 48h, titular Terlipressina +2 mg/dia até máx 12 mg/dia (Alvo: reduzir Cr > 25%).",
        "Se Terlipressina indisponível: Noradrenalina (infusão 0,5-3,0 mg/h, titular de 4/4h). Alvo: Elevar PAM 10 mmHg ou diurese > 200 mL/4h."
      ]},
      { titulo: "Tratamento Definitivo", tipo: "info", itens: [
        "O tratamento definitivo para Síndrome Hepatorrenal é o transplante hepático."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Admissão (Pct 70 kg)", itens: [
        "Dieta oral branda hipossódica",
        "Albumina 20% – administrar 500 mL via EV a 40 gts/min",
        "Sinais vitais de 4/4h ou monitorização contínua",
        "Registrar débito urinário de 1/1h",
        "Pesar diariamente em jejum"
      ]},
      { titulo: "Após 48h sem resposta à Albumina", itens: [
        "Dieta oral branda hipossódica",
        "Albumina 20% – administrar 50 mL via EV a 40 gts/min de 8/8h",
        "Terlipressina 1 mg/5mL – administrar 5 mL via EV bolus de 6/6h",
        "Sinais vitais de 4/4h ou monitorização contínua",
        "Registrar débito urinário de 1/1h",
        "Pesar diariamente em jejum"
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

// ─── COMPONENTE PRINCIPAL (Gastroenterologia) ─────────────────────────────────
export default function PrescricoesGastroenterologia({ onBack }) {
  const [temaId, setTemaId] = useState(null);
  const [aba, setAba]       = useState("orientacoes");

  if (!temaId) {
    return (
      <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
        <Header titulo="Gastroenterologia / Hepatologia" onBack={onBack} />
        
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

      <Header titulo={tema.nome} subtitulo="Gastroenterologia" onBack={() => { setTemaId(null); setAba("orientacoes"); }} />

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
