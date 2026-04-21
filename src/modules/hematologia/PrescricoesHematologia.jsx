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

// ─── DADOS CLÍNICOS (Hematologia) ─────────────────────────────────────────────
const TEMAS = [
  {
    id: "falciforme-crise-algica", nome: "Anemia Falciforme - Crise Álgica (Vaso-Oclusiva)",
    orientacoes: { secoes: [
      { titulo: "Controle da Dor — Precauções", tipo: "alerta", itens: [
        "Evitar corticoides: associados a efeito rebote da dor/vaso-oclusão.",
        "Precaução com AINEs: Risco de Necrose Tubular Aguda nesta população."
      ]},
      { titulo: "Dor Leve (Intensidade 1-4)", tipo: "conduta", itens: [
        "Opioide fraco (escolha uma opção):",
        "• Codeína 30 mg/cp: 1 cp, VO, 6/6h.",
        "• Tramadol 50 mg/cp: 1 a 2 cp, VO, 6/6h.",
        "Associar a analgésico comum (escolha uma opção):",
        "• Dipirona 500 mg: 1 a 2 cp, VO, 6/6h.",
        "• Paracetamol 750 mg: 1 cp, VO, 6/6h."
      ]},
      { titulo: "Dor Moderada (Intensidade 5-7)", tipo: "conduta", itens: [
        "Tramadol 100 mg/2mL: 2 mL + SF 0,9% 100 mL via EV.",
        "Dipirona 1 g/2mL: 2 mL + 18 mL de água destilada via EV."
      ]},
      { titulo: "Dor Forte (Intensidade 8-10)", tipo: "conduta", itens: [
        "Morfina 0,1 mg/kg, via EV.",
        "Repetir a cada 20 min, se necessário, na dose de 0,05 mg/kg até o controle adequado da dor (máx.: 10 mg/dose)."
      ]},
      { titulo: "Hidratação e Suporte Respiratório", tipo: "procedimento", itens: [
        "Hidratação se hipovolemia: SF 0,9% 500-1000 mL, via EV, na 1ª hora (monitorar sinais de congestão).",
        "Se necessário, manter hidratação a 50 mL/kg a cada 24h (1000-3000 mL/24h).",
        "Suporte Respiratório: O2 suplementar se SatO2 < 95% (Alvo: 94-98%).",
        "Espirometria de incentivo a cada 2h durante período de vigília."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática — Dor Moderada", itens: [
        "SF 0,9% administrar 500 mL via EV em 60 minutos",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD e administrar via EV lento",
        "Tramadol 100 mg/2mL – diluir 2 mL em SF 0,9% 100 mL e administrar via EV em 30 minutos",
        "SSVV e oximetria de pulso",
        "Oxigênio suplementar, se SatO2 < 95% (Alvo: 94-98%)"
      ]},
      { titulo: "Prescrição Prática — Dor Intensa", itens: [
        "SF 0,9% – administrar 500 mL via EV em 60 minutos",
        "Morfina 10 mg/mL – diluir 1 mL em SF 0,9% 9 mL e administrar 6 mL via EV",
        "SSVV e oximetria de pulso",
        "Oxigênio suplementar, se SatO2 < 95% (Alvo: 94-98%)"
      ]},
    ]},
  },
  {
    id: "falciforme-sindrome-toracica", nome: "Anemia Falciforme - Síndrome Torácica Aguda",
    orientacoes: { secoes: [
      { titulo: "Controle da Dor e Suporte", tipo: "procedimento", itens: [
        "Igual à Crise Álgica: Dor leve (Codeína/Tramadol VO + Dipirona/Paracetamol), Moderada (Tramadol + Dipirona EV), Forte (Morfina EV).",
        "O2 suplementar se SatO2 < 95% (Alvo: 94-98%).",
        "Espirometria de incentivo a cada 2h (vigília).",
        "Hidratação: SF 0,9% 500-1000 mL na 1ª hora (monitorar congestão)."
      ]},
      { titulo: "Manejo Respiratório Específico", tipo: "conduta", itens: [
        "Broncodilatador 4/4h ou 6/6h:",
        "• Salbutamol inalatório 100 mcg/jato – 4 inalações 6/6h.",
        "• Salbutamol gotas 5 mg/mL – 10-20 gts + SF 0,9% 5 mL via inalatória 6/6h."
      ]},
      { titulo: "Antibioticoterapia Empírica", tipo: "conduta", itens: [
        "Cefotaxime 2g EV 8/8h OU Ceftriaxona 2g EV 1x/dia ou 1g EV 12/12h por 7-10 dias.",
        "Associado a: Azitromicina 500 mg VO 1x/dia por 5 dias OU Claritromicina 500 mg EV 12/12h por 7-10 dias.",
        "Se optar por monoterapia: Moxifloxacino 400 mg VO ou EV por 7-10 dias."
      ]},
      { titulo: "Transfusão e Profilaxia TVP", tipo: "info", itens: [
        "Transfusão sanguínea: Alvo Hb > 9-10 g/dL (evitar Hb > 11 g/dL). Se Hb basal > 9g/dL, provavelmente não precisa.",
        "Observar protocolo para Transfusão de Troca (eritrocitoaférese).",
        "Profilaxia para TVP (para > 18 anos s/ contraindicações): Enoxaparina 40mg SC 1x/dia OU HNF 5000 UI SC 12/12h."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Dieta oral livre e Água potável via oral livre demanda",
        "SF 0,9% administrar 500 mL via EV em 60 min, seguido de 100 mL/h",
        "Ceftriaxona 1g/fr – reconstituir 1 frasco em 10 mL AD, diluir em SF 0,9% 100 mL, EV em 30 min 12/12h (D0/D7)",
        "Azitromicina 500 mg/cp – administrar 01 cp, via oral, 1x/dia (D1/D5)",
        "Enoxaparina 40 mg/0,4mL – administrar 0,4 mL via SC 1x/dia",
        "Salbutamol 100 mcg/jato – realizar 4 inalações de 6/6h",
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD via EV lento em até 6/6h (SOS dor/febre)",
        "Tramadol 100 mg/2mL – diluir 2 mL em SF 0,9% 100 mL via EV em 30 min até 6/6h (SOS dor refratária)",
        "Oxigênio (CNO2 1-3 L/min) se SatO2 < 95%",
        "Fisioterapia respiratória (espirometria 2/2h) e motora (deambulação)",
        "SSVV e oximetria de pulso 6/6h"
      ]},
    ]},
  },
  {
    id: "rt-febril", nome: "Reação Febril Não Hemolítica (Transfusão)",
    orientacoes: { secoes: [
      { titulo: "Definição e Quadro Clínico", tipo: "info", itens: [
        "Febre e calafrios que ocorrem em 1 a 6 horas após o início da transfusão.",
        "Ocorre na ausência de outras manifestações sistêmicas."
      ]},
      { titulo: "Manejo Clínico", tipo: "conduta", itens: [
        "Interromper a transfusão.",
        "Administrar antitérmico (Ex: Dipirona 1g EV).",
        "Avaliar outras causas de febre secundárias a reações transfusionais ou não relacionadas."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Dipirona 500 mg/mL – diluir 2 mL em 18 mL AD e administrar via EV lento",
        "Interromper transfusão"
      ]},
    ]},
  },
  {
    id: "rt-hemolitica", nome: "Reação Hemolítica Aguda (Transfusão)",
    orientacoes: { secoes: [
      { titulo: "Definição e Quadro Clínico", tipo: "alerta", itens: [
        "Ocorre durante ou nas primeiras 24h, usualmente nos primeiros minutos.",
        "Sintomas: Febre, calafrios, dor nos flancos, vazamento de sangue nos acessos EV, hipotensão, oligoanúria.",
        "Soro, plasma e urina vermelha/rósea (hemólise intravascular e hemoglobinúria)."
      ]},
      { titulo: "Manejo Clínico", tipo: "conduta", itens: [
        "Interromper transfusão IMEDIATAMENTE.",
        "Hidratação venosa: SF 0,9% 100-200 mL/h nas próximas 24h.",
        "Registrar débito urinário. Alvo: 100-200 mL/h ou 1 mL/kg/h."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "SF 0,9% 500 mL – administrar 5 etapas via EV a 100 mL/h",
        "Monitorar débito urinário (Alvo: 100-200 mL/h)",
        "Interromper transfusão"
      ]},
    ]},
  },
  {
    id: "rt-anafilatica", nome: "Reação Anafilática (Transfusão)",
    orientacoes: { secoes: [
      { titulo: "Definição", tipo: "alerta", itens: [
        "Qualquer reação alérgica diferente de urticária.",
        "Inclui angioedema, desconforto respiratório, sibilância e hipotensão/choque."
      ]},
      { titulo: "Manejo Clínico", tipo: "conduta", itens: [
        "Interromper transfusão IMEDIATAMENTE.",
        "Administrar epinefrina 0,5 mg IM.",
        "Hidratação venosa se hipotensão (SF 0,9% 1000 mL EV aberto).",
        "Avaliar necessidade de drogas vasoativas."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "SF 0,9% 1000 mL – administrar via EV aberto",
        "Epinefrina 1 mg/mL – administrar 0,5 mL via IM em face anterolateral da coxa",
        "Interromper transfusão imediatamente"
      ]},
    ]},
  },
  {
    id: "rt-taco", nome: "TACO - Sobrecarga Circulatória (Transfusão)",
    orientacoes: { secoes: [
      { titulo: "Definição e Prevenção", tipo: "info", itens: [
        "Edema pulmonar por excesso de volume/sobrecarga. Ocorre nas primeiras 6h.",
        "Pensar em TACO se desconforto respiratório ou hipertenso.",
        "Prevenção: reduzir taxa de infusão para 1 mL/kg/hora (tempo total não pode exceder 4 horas). Solicitar frações menores do hemocomponente se necessário."
      ]},
      { titulo: "Manejo Clínico", tipo: "conduta", itens: [
        "Interromper transfusão.",
        "Diureticoterapia: Furosemida 20mg/2mL – 2 a 4 mL EV 6/6h, até melhora clínica.",
        "Suporte respiratório: O2 se SatO2 < 90%. Avaliar necessidade de VNI."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Furosemida 20 mg/2mL – administrar 2 mL via EV de 6/6h",
        "Suplementação de O2, se SatO2 < 90%",
        "Interromper transfusão imediatamente"
      ]},
    ]},
  },
  {
    id: "rt-trali", nome: "TRALI - Lesão Pulmonar Aguda (Transfusão)",
    orientacoes: { secoes: [
      { titulo: "Definição e Quadro", tipo: "alerta", itens: [
        "Desenvolvimento de insuficiência respiratória hipoxêmica durante ou logo após a transfusão.",
        "Achados: febre, infiltrado pulmonar novo, secreções respiratórias espumosas róseas e hipotensão."
      ]},
      { titulo: "Manejo Clínico", tipo: "conduta", itens: [
        "Interromper a transfusão imediatamente.",
        "Suporte respiratório: O2 suplementar. Avaliar VNI ou Ventilação Mecânica (80% necessitam de VM).",
        "Suporte hemodinâmico: Fluidos e/ou drogas vasoativas se hipotensão/hipovolemia."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "SF 0,9% 1000 mL – administrar via EV aberto",
        "Monitorização contínua",
        "Suplementação de O2, se SatO2 < 90%",
        "Interromper transfusão imediatamente"
      ]},
    ]},
  },
  {
    id: "transfusao-crio", nome: "Transfusão: Crioprecipitado",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais", tipo: "procedimento", itens: [
        "Dose: 1 a 1,5 unidade a cada 10 kg.",
        "Volume por unidade: 10-20 mL por unidade.",
        "Taxa de infusão: até 30 minutos.",
        "Indicação: Tratamento de sangramento por deficiência de fibrinogênio (< 100mg/dL), disfibrinogenemia ou deficiência do fator XIII.",
        "O crioprecipitado deve ser descongelado em banho-maria (30-37ºC) por até 15 min e transfundido imediatamente."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática (Exemplo Pct 70kg)", itens: [
        "Crioprecipitado (7 unidades) – administrar cada unidade, via EV, aberto (2 a 5 mL/min)"
      ]},
    ]},
  },
  {
    id: "transfusao-hemacias", nome: "Transfusão: Hemácias",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais", tipo: "procedimento", itens: [
        "Dose: Cada CH eleva Hb em ~1 g/dL e Ht em 3%. Reavaliar a cada transfusão.",
        "Volume por unidade: 250-350 mL.",
        "Taxa de infusão: 1 a 2 mL/min nos primeiros 15 min, depois rápido conforme tolerado. Pode-se adotar 2 a 2,5 mL/kg/h. A infusão NÃO deve exceder 4 horas.",
        "Indicação: Geralmente Hb < 7-8 g/dL (exceto pacientes instáveis, sintomáticos, cardiopatas ou DPOC que podem precisar com Hb maiores).",
        "A avaliação da Hb pós-transfusional pode ser feita 15 min após o término."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Concentrado de Hemácias – administrar 01 unidade, via EV, em 1 a 4 horas"
      ]},
    ]},
  },
  {
    id: "transfusao-plaquetas", nome: "Transfusão: Plaquetas",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais", tipo: "procedimento", itens: [
        "Dose: 1 unidade a cada 10 kg.",
        "Volume: 50-60 mL (centrifugação); 200-300 mL (aférese — equivale a 5-6 unidades).",
        "Taxa de infusão: 30 minutos. Não exceder 20-30 mL/kg/h.",
        "Indicações: < 50.000 (sangramento ativo), < 20.000 (com febre/infecção), < 10.000 (afebril). Na PTI com febre < 5.000.",
        "Em sangramento ativo, pode repetir a cada 8h. Em profilaxia, 1x/dia a cada 24-48h.",
        "A avaliação plaquetária pode ser feita 1 hora pós-transfusão."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática (Exemplo Pct 70kg)", itens: [
        "Concentrado de plaquetas – transfundir 7 unidades, via EV, em 30 minutos cada concentrado"
      ]},
    ]},
  },
  {
    id: "transfusao-pfc", nome: "Transfusão: Plasma Fresco Congelado",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais", tipo: "procedimento", itens: [
        "Dose: 10 a 20 mL/kg (aprox. 3 a 5 unidades na maioria dos adultos).",
        "Volume por unidade: 150-200 mL.",
        "Taxa de infusão: 2-3 mL/kg/h (geralmente 90 min/unidade). Se sobrecarga/IC: 1 mL/kg/h (4h/unidade).",
        "Indicações: Deficiência de múltiplos fatores de coagulação, reversão de Varfarina, transfusão maciça, PTT, deficiência isolada de fator (sem concentrado específico)."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática (Exemplo Pct 70kg)", itens: [
        "Plasma fresco congelado (3 unidades) – administrar uma unidade via EV em 90 minutos, de 8/8h"
      ]},
    ]},
  },
  {
    id: "transfusao-macica", nome: "Transfusão Maciça",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais e Protocolo", tipo: "alerta", itens: [
        "Deve-se utilizar o Protocolo de Transfusão Maciça do hospital em que o atendimento ocorre.",
        "No início, administrar até 1500 mL de SF 0,9% EV e 4 a 10 unidades de Concentrado de Hemácias antes da liberação dos hemocomponentes guiados por exames.",
        "Proporção 1:1:1 — Alguns protocolos orientam terapia com Plasma : Plaquetas : Hemácias na proporção 1:1:1."
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "A prescrição dos hemocomponentes deve levar em conta o protocolo adotado pela instituição. Realize os ajustes de acordo com as orientações do protocolo local e o controle de danos."
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

// ─── COMPONENTE PRINCIPAL (Hematologia) ───────────────────────────────────────
export default function PrescricoesHematologia({ onBack }) {
  const [temaId, setTemaId] = useState(null);
  const [aba, setAba]       = useState("orientacoes");

  if (!temaId) {
    return (
      <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif" }}>
        <Header titulo="Hematologia" onBack={onBack} />
        
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

      <Header titulo={tema.nome} subtitulo="Hematologia" onBack={() => { setTemaId(null); setAba("orientacoes"); }} />

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
