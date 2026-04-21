import React, { useState } from "react";
import { TEXT_STYLES } from "../../constants/styles";

// ─── CORES — mesmas do App.jsx ────────────────────────────────────────────────
const COR = {
  bg:       "#f4f6f8",
  card:     "#FFFFFF",
  border:   "#eee",
  text:     "#1a1a1a",
  muted:    "#888",
  primary:  "#0d5c4a",
  primary2: "#0a4a3b",
  primary3: "#e8f4ef",
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

// ─── DADOS CLÍNICOS (Neurologia) ──────────────────────────────────────────────
const TEMAS = [
  {
    id: "avc-hemorragico", nome: "AVC Hemorrágico - Tratamento Clínico",
    orientacoes: { secoes: [
      { titulo: "Controle da Pressão Arterial", tipo: "procedimento", itens: [
        "PAS > 220 mmHg: reduzir rapidamente para < 220 mmHg, depois gradual até 140-160 mmHg.",
        "PAS 150-220 mmHg: reduzir para 140 mmHg dentro da 1ª hora.",
        "Monitoramento: 15/15 min nas primeiras 2h; 30/30 min nas próximas 6h; 1/1h até 24h.",
        "Nitroprussiato 50 mg/2mL: Diluir 2 mL em SG 5% 248 mL. Iniciar 5-10 mL/h (titular de 2 em 2 mL/h a cada 3-5 min. Máx: 45 mL/h).",
        "Esmolol 2500 mg/10mL: Ataque de 0,5 mg/kg em 1 min, seguido de manutenção 50-300 mcg/kg/min."
      ]},
      { titulo: "Reversão de Anticoagulantes", tipo: "conduta", itens: [
        "Interromper TODOS os anticoagulantes e antiplaquetários.",
        "Varfarina: Complexo Protrombínico 4 fatores (8 mL EV em 10 min) + Vitamina K 10 mg/mL (1 mL em SF 0,9% 50 mL EV em 20 min). Se indisponível, usar Plasma Fresco Congelado.",
        "Dabigatrana: Idarucizumabe 5g EV (dois frascos de 2,5g).",
        "Rivaroxabana/Apixabana/Edoxabana: Alfa-andexanete 800 mg EV ataque, seguido de 960 mg em 120 min.",
        "Heparina (HNF ou HBPM): Protamina 1000 UI/mL (2,5 mL EV a 0,5 mL/min).",
        "Alteplase: Crioprecipitado (10 unidades EV aberto, alvo Fibrinogênio 150-200) + Ácido Tranexâmico (250 mg/5mL - diluir 20 mL em SF 100 mL EV em 20 min)."
      ]},
      { titulo: "Controle da Hipertensão Intracraniana (HIC)", tipo: "alerta", itens: [
        "Cabeceira elevada 30º. Evitar rotação do pescoço.",
        "Manter sódio > 135 mEq/L. Evitar soluções hipotônicas/glicosadas.",
        "Glicocorticoides NÃO estão indicados.",
        "Manitol 20%: 1 g/kg/dose via EV (CVC) em 30 min (repete de 6/6h se necessário).",
        "Salina Hipertônica 20%: 30 mL EV (CVC) em 5 min de 6/6h.",
        "NaCl 3%: 3 mL/kg EV em 20 min."
      ]},
      { titulo: "Anticonvulsivantes", tipo: "conduta", itens: [
        "Se crise no contexto de AVCh, usar Diazepam ou Fenitoína.",
        "Diazepam 5 mg/mL: 2 mL EV bolus lento (1 mL/min).",
        "Fenitoína 50 mg/mL: Ataque 20 mg/kg. Diluir 20-25 mL em SF 250 mL EV em 30-60 min.",
        "Manutenção profilática: Fenitoína 100 mg VO 8/8h ou 250mg/5mL (diluir 2 mL em SF 18 mL EV em 2 min 8/8h)."
      ]},
      { titulo: "Outras Medidas de Suporte", tipo: "info", itens: [
        "Manter euvolêmico: Solução isotônica 30 mL/kg/dia.",
        "Controle glicêmico rigoroso: Alvo Dx 140-180 mg/dL.",
        "Controle da febre: Alvo TAX < 37,5 ºC.",
        "IOT + VM se Glasgow < 8."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "Dieta oral zero",
        "Omeprazol 40 mg/fr – reconstituir 1 fr em 10 mL de Diluente Próprio e administrar via EV lento 1x/dia",
        "SF 0,9% 500 mL – administrar 500 mL via EV a 28 gts/min em 4 etapas",
        "Nitroprussiato 50 mg/2mL – Diluir 2 mL em SG 5% 248 mL, EV em BIC a 5-10 mL/h se PAS > 150 (Máx: 45 mL/h)",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD via EV em até 6/6h, se dor ou TAX > 37,5ºC",
        "Bromoprida 10 mg/2mL – diluir 2 mL em 18 mL AD via EV até de 8/8h se náusea/vômito",
        "Fenitoína 250 mg/5mL – diluir 25 mL em SF 0,9% 250 mL, EV a 300 mL/h, se crise convulsiva",
        "Glicose 50% – 20 mL via EV se Dx ≤ 60 mg/dL (repetir após 15 min)",
        "Insulina Regular SC – Conforme esquema (181-200: 2UI | 201-250: 4UI | 251-300: 6UI)",
        "Glicemia capilar (Dx alvo: 140-180) | SatO2 < 95% -> O2 suplementar",
        "Registrar débito urinário 6/6h | Cabeceira elevada 30º | Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "avc-isquemico-trombolise", nome: "AVC Isquêmico COM Trombólise",
    orientacoes: { secoes: [
      { titulo: "Controle da Pressão Arterial", tipo: "alerta", itens: [
        "PA > 185x110 mmHg: REDUZIR para < 185x110 mmHg ANTES do trombolítico.",
        "Manter PA ≤ 180x105 mmHg por pelo menos 24h após a trombólise.",
        "Se possível, manter PAS > 160 mmHg (160-180 mmHg).",
        "SE NÃO CONTROLAR A PA PARA < 185x110, NÃO ADMINISTRE TROMBOLÍTICO."
      ]},
      { titulo: "Drogas Anti-hipertensivas", tipo: "procedimento", itens: [
        "Nitroprussiato: 5-10 mL/h BIC (Titular 2 em 2 mL/h a cada 3-5 min. Máx 45 mL/h).",
        "Metoprolol 5 mg/5mL: 5 mL EV em 5 min. (Aferir PA a cada 10 min, repetir se necessário até 20 mg).",
        "Hidralazina 20 mg/mL: Diluir 1 mL em 9 mL SF e fazer 2,5 mL EV (repetir a cada 15 min, máx 3 vezes)."
      ]},
      { titulo: "Alteplase (rtPA) - 1 mg/mL", tipo: "conduta", itens: [
        "Dose: 0,9 mg/kg (MÁXIMO 90 mg).",
        "10% da dose total em bolus inicial (1-2 min).",
        "90% restante em bomba de infusão por 60 min.",
        "Utilizar AVP exclusivo puncionado em membro superior.",
        "Se piora neurológica durante administração, interromper e repetir TC de Crânio."
      ]},
      { titulo: "Alteplase — Tabela de Infusão (0,9 mg/kg)", tipo: "tabela",
        colunas: ["Peso (kg)", "Bolus EV (mL)", "Volume em 1h (mL)"],
        linhas: [
          ["50", "4,5", "40,5"],
          ["60", "5,4", "48,6"],
          ["70", "6,3", "56,7"],
          ["80", "7,2", "64,8"],
          ["90", "8,1", "72,9"],
          ["≥ 100", "9,0", "81,0"],
        ],
      },
      { titulo: "Tenecteplase (TNK) - 5 mg/mL", tipo: "conduta", itens: [
        "Dose: 0,25 mg/kg (MÁXIMO 25 mg).",
        "Administrar via EV bolus, por 5-10 segundos."
      ]},
      { titulo: "Tenecteplase — Tabela de Dose (0,25 mg/kg)", tipo: "tabela",
        colunas: ["Peso (kg)", "Dose TNK (mg)", "Volume Bolus EV (mL)"],
        linhas: [
          ["< 60", "15 mg", "3 mL"],
          ["60 a <70", "17,5 mg", "3,5 mL"],
          ["70 a <80", "20 mg", "4 mL"],
          ["80 a <90", "22,5 mg", "4,5 mL"],
          ["≥ 90", "25 mg", "5 mL"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial na 1ª Hora", itens: [
        "Dieta oral zero",
        "SF 0,9% 500 mL – administrar via EV a 28 gts/min em 4 etapas",
        "Omeprazol 40 mg/fr – EV lento 1x/dia",
        "Nitroprussiato 50mg/2mL – Diluir em SG 5% 248 mL EV BIC a 5-10 mL/h se PA > 185x110 (MÁX: 45 mL/h)",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD EV até 6/6h se dor/febre",
        "Glicose 50% – 20 mL EV se Dx ≤ 70 mg/dL",
        "Insulina Regular 100 UI/mL – SC conforme Dx (181-200: 2UI | 201-250: 4UI)",
        "Glicemia capilar (alvo 140-180) | Cabeceira elevada 30º | Monitorização contínua"
      ]},
      { titulo: "Prescrição Trombolítico: Alteplase (Ex: Pct 70 kg)", itens: [
        "Alteplase 1 mg/mL – administrar 6,3 mL via EV em bolus, seguido de 56,7 mL via EV em BIC em 1 hora"
      ]},
      { titulo: "Prescrição Trombolítico: Tenecteplase (Ex: Pct 70 kg)", itens: [
        "Tenecteplase 5 mg/mL – administrar 4 mL via EV em bolus em 5-10 segundos"
      ]},
    ]},
  },
  {
    id: "avc-isquemico-sem-trombolise", nome: "AVC Isquêmico SEM Trombólise",
    orientacoes: { secoes: [
      { titulo: "Controle da Pressão Arterial", tipo: "procedimento", itens: [
        "Se PA > 220x120 mmHg: reduzir para PA < 220x120 mmHg.",
        "Reduzir a PA em 15% durante as primeiras 24h do AVCI.",
        "Evitar PAS < 140 mmHg.",
        "Opções: Nitroprussiato (titular de 2 em 2 mL/h. Máx 45 mL/h), Esmolol, Metoprolol ou Hidralazina."
      ]},
      { titulo: "Terapia Antitrombótica e Estatinas", tipo: "conduta", itens: [
        "AAS: Iniciar o quanto antes nas primeiras 48h.",
        "Primeira dose AAS: 300 mg VO/SNE. Depois, 100 mg 1x/dia.",
        "Estatinas (Escolher uma): Atorvastatina 80 mg 1x/dia; Sinvastatina 40 mg 1x/dia à noite; Rosuvastatina 20 mg 1x/dia."
      ]},
      { titulo: "Profilaxia TVP / TEP", tipo: "info", itens: [
        "Indicado para todos os pacientes com AVC I + mobilidade reduzida.",
        "Enoxaparina 40 mg SC 1x/dia OU HNF 5.000 UI SC de 8/8h."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial", itens: [
        "Dieta oral zero até avaliação da capacidade de deglutição",
        "SF 0,9% 500 mL – administrar via EV a 28 gts/min em 4 etapas",
        "Omeprazol 40 mg/fr – EV lento 1x/dia",
        "Enoxaparina 40 mg/0,4mL – administrar 0,4 mL via SC a cada 24h",
        "AAS 100 mg/cp – 3 cp, VO/SNE na admissão, seguido de 1 cp a cada 24h",
        "Sinvastatina 40 mg/cp – administrar 1 cp, VO/SNE, a cada 24h",
        "Nitroprussiato 50mg/2mL – Diluir 2 mL em SG 5% 248 mL EV BIC a 5-10 mL/h se PA > 220x120 (PA permissiva nas 1ªs 48h)",
        "Glicose 50% – 20 mL EV se Dx ≤ 70 mg/dL",
        "Insulina Regular 100 UI/mL – SC conforme Dx",
        "Glicemia capilar (alvo 140-180) | Suplementação O2 se Sat < 95%",
        "Cabeceira elevada 30º | Monitorização contínua"
      ]},
    ]},
  },
  {
    id: "crise-convulsiva", nome: "Crise Convulsiva / Estado de Mal Epiléptico",
    orientacoes: { secoes: [
      { titulo: "Quadro Agudo - Paciente em Crise", tipo: "alerta", itens: [
        "Benzodiazepínico EV (Preferencial): Diazepam 10 mg/2mL – 2 mL via EV lento em 2 minutos. Repetir mais 2x a cada 5-10 min se necessário (Máx 30 mg).",
        "Via Intramuscular: Midazolam 5 mg/mL – 2 mL via IM (Não repetir).",
        "Via Intranasal: Midazolam 5 mg/mL – 2 mL via IN (Não repetir).",
        "Via Retal: Diazepam 10 mg/2mL – 4 mL via retal. Repetir mais 1x após 10-15 min."
      ]},
      { titulo: "Medidas Gerais", tipo: "info", itens: [
        "Avaliar vias aéreas, Decúbito lateral.",
        "2 Acessos Venosos (AVP). Se não obtiver em 3 min, usar via IM/IN/Retal.",
        "Aferir glicemia capilar e monitorizar sinais vitais."
      ]},
      { titulo: "Estado de Mal Epiléptico - Hidantalização", tipo: "procedimento", itens: [
        "Indicação: Evitar recorrência, convulsão > 5 min, ou múltiplas crises sem retorno da consciência.",
        "Apresentação: Fenitoína 50 mg/mL (ampola de 5 mL).",
        "Dose de ataque: 20 mg/kg. (Macete: 0,4 mL * Peso = Dose em mL).",
        "Diluição: SF 0,9% 250 mL. Velocidade: 25 a 50 mg/min.",
        "Se idoso/cardiopata: Velocidade máx 25 mg/min.",
        "ATENÇÃO: NÃO administrar junto com soro glicosado ou benzodiazepínicos no mesmo acesso. Necessário Filtro de Linha se AVP."
      ]},
      { titulo: "Velocidade de Infusão de Fenitoína (Diluída em SF 250mL)", tipo: "tabela",
        colunas: ["Peso", "Dose (mg)", "Vazão a 25mg/min", "Vazão a 50mg/min"],
        linhas: [
          ["50 kg", "1000 mg (20 mL)", "405 mL/h (40 min)", "810 mL/h (20 min)"],
          ["60 kg", "1200 mg (24 mL)", "342 mL/h (48 min)", "685 mL/h (24 min)"],
          ["70 kg", "1400 mg (28 mL)", "297 mL/h (56 min)", "595 mL/h (28 min)"],
          ["80 kg", "1600 mg (32 mL)", "264 mL/h (64 min)", "529 mL/h (32 min)"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Inicial - Crise Convulsiva", itens: [
        "Diazepam 10 mg/2mL – administrar 2 mL via EV lento em 2 minutos",
        "Glicose 50% – Administrar 50 mL via EV, se Dx ≤ 70 mg/dL",
        "Glicemia capilar",
        "Suplementação de O2, se SatO2 < 95%",
        "Monitorização contínua"
      ]},
      { titulo: "Prescrição - Estado de Mal Epiléptico (Ex: Pct 70 kg)", itens: [
        "Fenitoína 250 mg/5mL – diluir 25 mL em SF 0,9% 250 mL e administrar via EV a 595 mL/h",
        "Suplementação de O2, se SatO2 < 95%",
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
  const [aberta, setAberta] = useState(false); // Inicia recolhido
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

// ─── COMPONENTE PRINCIPAL (Neurologia) ────────────────────────────────────────
export default function PrescricoesNeurologia({ onBack }) {
  const [temaId, setTemaId] = useState(null);
  const [aba, setAba]       = useState("orientacoes");

  if (!temaId) {
    return (
      <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
        <Header titulo="Neurologia" onBack={onBack} />
        
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

      <Header titulo={tema.nome} subtitulo="Neurologia" onBack={() => { setTemaId(null); setAba("orientacoes"); }} />

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
