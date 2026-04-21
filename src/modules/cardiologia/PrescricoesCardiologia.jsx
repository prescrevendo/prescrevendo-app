import { useState } from "react";
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

// ─── DADOS ─────────────────────────────────────────────────────────────────────
const TEMAS = [
  {
    id: "bradiarritmia", nome: "Bradiarritmia",
    orientacoes: { secoes: [
      { titulo: "Paciente Estável", tipo: "info", itens: [
        "Monitorar, observar e solicitar avaliação da cardiologia.",
        "Se BAVT ou BAV de 2º grau Mobitz II → internação hospitalar para seguimento com cardiologia.",
      ]},
      { titulo: "Paciente Instável — Sinais (5Ds)", tipo: "alerta", itens: [
        "Dor torácica", "Dispneia", "Diminuição do nível de consciência", "Desmaio", "Diminuição da pressão arterial",
      ]},
      { titulo: "Conduta — Paciente Instável", tipo: "conduta", itens: [
        "1. Internação hospitalar para avaliação com serviço de cardiologia.",
        "2. Atropina 1 mg EV bolus, repetir a cada 3–5 min (Máx: 3 mg).",
        "3. Se sem resposta à atropina → Marca-passo transcutâneo (preferível) ou Epinefrina ou Dopamina.",
      ]},
      { titulo: "Marca-Passo — Sedação Pré-procedimento", tipo: "procedimento", itens: [
        "Opção 1: Fentanil 500 mcg/10 mL — 1 a 2 mL EV + Midazolam 2 a 5 mg EV.",
        "Opção 2: Morfina 10 mg/mL — 1 mL + 9 mL AD, fazer 2 mL EV.",
      ]},
      { titulo: "Configurações do Marca-Passo", tipo: "procedimento", itens: [
        "Frequência (rate): 70 bpm. Modo: FIXO.",
        "Saída (output): aumentar mA gradualmente até cada estímulo gerar QRS.",
        "Checar pulso femoral: deve ser igual à frequência do monitor.",
        "Quando pulso = frequência do MP → aumentar saída em 5–10 mA.",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Paciente Instável", itens: [
        "Dieta zero",
        "Atropina 0,5 mg/mL — administrar 2 mL, via EV, bolus",
        "Monitorização cardíaca contínua",
      ]},
      { titulo: "Instável — Refratário à Atropina (Marca-Passo)", itens: [
        "Dieta zero",
        "Fentanil 50 mcg/mL — 2 mL + SF 0,9% 8 mL via EV, bolus lento",
        "Midazolam 5 mg/mL — 0,5 mL + SF 0,9% 9 mL via EV, bolus lento",
        "Marca-passo transcutâneo",
        "Monitorização cardíaca contínua",
      ]},
      { titulo: "Instável — Marca-Passo Indisponível (Epinefrina)", itens: [
        "Dieta zero",
        "Epinefrina 1 mg/mL – 10 mL + SF 0,9% 240 mL via EV em BIC a 2 mL/h (máx: 15 mL/h)",
        "Monitorização cardíaca contínua",
      ]},
    ]},
  },
  {
    id: "emergencias-hipertensivas", nome: "Emergências Hipertensivas",
    orientacoes: { secoes: [
      { titulo: "Orientações Gerais", tipo: "info", itens: [
        "Objetivo: reduzir a PAM em 10–20% na 1ª hora e 5–15% nas 23 horas seguintes.",
        "Fórmula: PAM = (PAS + 2×PAD) / 3",
      ]},
      { titulo: "Manejo por Condição Clínica", tipo: "tabela",
        colunas: ["Condição Clínica", "Fármaco", "Meta"],
        linhas: [
          ["Encefalopatia Hipertensiva", "Nitroprussiato", "Redução PAM ≤ 25% em 2–3h"],
          ["AVC Hemorrágico", "Nitroprussiato", "Redução PAM ≤ 25% em 6–12h"],
          ["AVC Isquêmico", "Nitroprussiato", "PA permissiva conforme reperfusão"],
          ["Dissecção de Aorta", "Esmolol + Nitroprussiato", "FC < 60 + PAS 100–120 em 20 min"],
          ["Edema Agudo de Pulmão", "Nitroprussiato", "Redução da PA em 15–20%"],
          ["SCA", "Nitroglicerina", "Até redução da dor torácica"],
          ["Eclâmpsia", "Hidralazina", "PAD ≤ 90–100 mmHg"],
        ],
      },
      { titulo: "Encefalopatia Hipertensiva", tipo: "procedimento", itens: [
        "Meta: Reduzir PAS em 25% nas primeiras 2 a 3 horas.",
        "Titular BIC de 2 em 2 mL/h a cada 3–5 min (Máx.: 45 mL/h).",
      ]},
      { titulo: "AVC Hemorrágico", tipo: "procedimento", itens: [
        "PAS 150–220 mmHg → reduzir para 140 mmHg na 1ª hora.",
        "PAS ≥ 220 mmHg → reduzir para 220 mmHg, depois gradual até 140–160 mmHg.",
        "ATT: Nitroprussiato é controverso no AVCh, mas Nicardipina/Labetalol não disponíveis no Brasil.",
      ]},
      { titulo: "AVC Isquêmico", tipo: "procedimento", itens: [
        "PA permissiva: com trombólise PA < 185×110; sem trombólise PA < 220×120.",
        "Titular BIC de 2 em 2 mL/h a cada 3–5 min (Máx.: 45 mL/h).",
      ]},
      { titulo: "Edema Agudo de Pulmão", tipo: "procedimento", itens: [
        "Meta anti-hipertensiva: Reduzir PAM em 15–20%. Manter PAS > 90 mmHg.",
        "Furosemida: 0,5–1 mg/kg. Reavaliar em 20 min.",
        "VNI CPAP: pressão 5–10 cmH₂O, VC 6–8 mL/kg, SatO₂ alvo 90–94%.",
      ]},
      { titulo: "Dissecção Aguda de Aorta", tipo: "alerta", itens: [
        "Esmolol: 10 mg/mL. Dose de ataque 0,5–1 mg/kg em 1 min.",
        "Titular BIC de 20 em 20 mL/h a cada 5 min (Máx.: 210 mL/h).",
        "Meta: FC < 60 bpm + PAS 100–120 mmHg em 20 min.",
        "Iniciar Nitroprussiato SOMENTE após FC < 60 bpm.",
      ]},
      { titulo: "SCA", tipo: "procedimento", itens: [
        "Meta: alívio da dor ou redução PAM em 10% (normotenso) / 25–30% (hipertenso).",
        "PAS não deve cair abaixo de 90 mmHg ou mais de 30 mmHg.",
        "Contraindicações: Tadalafil/Sildenafil < 24h; IAMCST c/ VD; PAS < 110 mmHg.",
      ]},
      { titulo: "Eclâmpsia", tipo: "procedimento", itens: [
        "Alvo: PAD ≤ 90–100 mmHg.",
        "Repetir 5 mg de hidralazina a cada 20 min (Dose máx: 30 mg).",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Encefalopatia Hipertensiva", itens: [
        "Nitroprussiato 50 mg/2 mL – diluir 2 mL em SG5% 248 mL, EV em BIC a 2 mL/h",
      ]},
      { titulo: "AVC Hemorrágico / Isquêmico", itens: [
        "Nitroprussiato 50 mg/2 mL – diluir 2 mL em SG5% 248 mL, EV em BIC a 5–10 mL/h",
      ]},
      { titulo: "Edema Agudo de Pulmão", itens: [
        "Nitroprussiato 50 mg/2 mL – diluir 2 mL em SG5% 248 mL, EV em BIC a 2 mL/h",
        "Furosemida 20 mg/2 mL – administrar 4 mL via EV bolus",
        "VNI CPAP – 5 cmH₂O, se SatO₂ < 90%",
      ]},
      { titulo: "Dissecção Aguda de Aorta", itens: [
        "Esmolol 2500 mg/10 mL – diluir 10 mL em SF 240 mL, administrar 5 mL EV em 1 min (ataque), depois BIC a 20 mL/h",
        "Nitroprussiato 50 mg/2 mL – diluir 2 mL em SG5% 248 mL, EV BIC 5–10 mL/h — iniciar após FC < 60 bpm",
      ]},
      { titulo: "SCA", itens: [
        "Nitroglicerina 5 mg/mL – diluir 10 mL em SG5% 240 mL, EV em BIC a 3 mL/h",
      ]},
      { titulo: "Eclâmpsia", itens: [
        "Hidralazina 20 mg/mL – diluir 1 mL em 19 mL SF, administrar 5 mL via EV bolus",
      ]},
    ]},
  },
  {
    id: "fa-instavel", nome: "FA c/ Instabilidade Hemodinâmica",
    orientacoes: { secoes: [
      { titulo: "Sinais de Instabilidade", tipo: "alerta", itens: [
        "Dor anginosa", "Edema agudo de pulmão / IC descompensada",
        "Hipotensão (PAS < 90 mmHg)", "Rebaixamento do nível de consciência", "Síncope",
      ]},
      { titulo: "Atenção", tipo: "info", itens: [
        "Se FA for secundária, SEMPRE tratar a causa primária (anemia, sepse, hipoxemia, febre, tireotoxicose, dor).",
        "Confirmar que a instabilidade é de etiologia da FA antes da cardioversão.",
      ]},
      { titulo: "Cardioversão Elétrica Sincronizada", tipo: "procedimento", itens: [
        "Desfibrilador monofásico: 360 J.",
        "Desfibrilador bifásico: 200 J.",
        "Administrar sedação titulada antes do procedimento.",
      ]},
      { titulo: "Sedação Pré-Procedimento (70 kg)", tipo: "procedimento", itens: [
        "Opção 01: Propofol 10 mg/mL — 2 mL EV, repetir a cada 1 min (total 5–7 mL) + Fentanil 50 mcg/mL — 1 mL EV lento.",
        "Opção 02: Midazolam 1 mg/mL — 1 mL EV a cada 2–5 min (total 1–2 mL) + Fentanil 50 mcg/mL — 1 mL EV lento.",
        "Opção 03 (Ketofol): Quetamina 50 mg/mL 2 mL + Propofol 10 mg/mL 10 mL + AD 8 mL — 3–4 mL EV lento.",
      ]},
      { titulo: "Anticoagulação Pós-Cardioversão", tipo: "conduta", itens: [
        "TODOS devem ser anticoagulados por pelo menos 28 dias.",
        "Após 4 semanas: manter se CHA₂DS₂-VA ≥ 2.",
        "Opções: Rivaroxabana 20 mg 1×/dia; Apixabana 5 mg 12/12h; Edoxabana 60 mg 1×/dia; Dabigatrana 150 mg 12/12h.",
        "Varfarina 5 mg 1×/dia (INR 2–3) se estenose mitral moderada/grave ou prótese valvar metálica.",
      ]},
      { titulo: "Falha da Cardioversão Elétrica", tipo: "procedimento", itens: [
        "Metoprolol 1 mg/mL — 5 mL EV bolus a 1 mL/min, repetir a cada 5–10 min (máx 15 mg).",
        "Se falha com Metoprolol → adicionar digitálico IV.",
        "Última opção farmacológica → Amiodarona IV.",
        "Antes da Amiodarona: pode-se infundir MgSO4 4,5–9 g em SF 100 mL EV em 30 min.",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Cardioversão Elétrica (Sedação + Procedimento)", itens: [
        "Dieta zero",
        "Midazolam 5 mg/mL – diluir 1 mL em 4 mL AD, administrar 1 mL EV lento",
        "Fentanil 50 mcg/mL – administrar 1 mL EV lento",
        "Suplementação de O₂ em CNO₂ ou Másc. Concentradora",
        "Monitorização contínua | Cabeceira elevada 30–45°",
      ], nota: "Após sedação (2 e 3): CARDIOVERSÃO ELÉTRICA SINCRONIZADA. Bifásico: 200 J | Monofásico: 360 J. LEMBRAR DE SINCRONIZAR." },
      { titulo: "Falha da Cardioversão Elétrica", itens: [
        "Metoprolol 1 mg/mL – 5 mL EV bolus a 1 mL/min — repetir a cada 5–10 min (máx 15 mg)",
        "Suplementação de O₂ | Monitorização contínua",
      ]},
    ]},
  },
  {
    id: "fa-estavel-24h", nome: "FA s/ Instabilidade < 24h",
    orientacoes: { secoes: [
      { titulo: "Princípio Geral", tipo: "info", itens: [
        "Se FA secundária → SEMPRE tratar a causa primária.",
        "Anticoagulação + Cardioversão SOMENTE se: certeza de ausência de trombo (ECO TE) OU anticoagulação por 3 semanas antes.",
      ]},
      { titulo: "Risco Embólico — FA < 24h", tipo: "tabela",
        colunas: ["Perfil", "Critérios", "Conduta"],
        linhas: [
          ["BAIXO RISCO", "FA < 12h E CHA₂DS₂-VA = 0", "Anticoagular e Cardioverter"],
          ["ALTO RISCO", "FA valvar, evento embólico prévio ou CHA₂DS₂-VA ≥ 2", "Conduzir como FA > 24h"],
        ],
      },
      { titulo: "Amiodarona EV (COM cardiopatia estrutural)", tipo: "procedimento", itens: [
        "Ataque: 150 mg/3 mL — 3 mL + SG5% 100 mL EV em 15–30 min.",
        "Manutenção: 18 mL + SG5% 232 mL — 16 mL/h nas primeiras 6h → 8 mL/h nas 18h seguintes.",
      ]},
      { titulo: "Propafenona VO (SEM cardiopatia estrutural)", tipo: "procedimento", itens: [
        "Evitar em hipertrofia ventricular > 13 mm, disfunção ventricular ou miocardiopatia isquêmica.",
        "Administrar betabloqueador ANTES (Propranolol 20–40 mg VO) para evitar Flutter 1:1.",
        "Dose de ataque: 2 cp (600 mg) VO dose única (450 mg se < 70 kg).",
        "Manutenção: Propafenona 150 mg — 1 cp VO de 8/8h.",
      ]},
      { titulo: "Anticoagulação", tipo: "conduta", itens: [
        "ACOD (dabigatrana, rivaroxabana, apixabana ou edoxabana), OU",
        "Enoxaparina 1 mg/kg SC, OU Heparina EV em bolus (60–70 U/kg).",
        "Se FA > 24h ou alto risco → anticoagular por 3 semanas antes.",
        "Após cardioversão → anticoagular por pelo menos 28 dias.",
      ]},
      { titulo: "CHA₂DS₂-VA", tipo: "tabela",
        colunas: ["Letra", "Critério", "Pontos"],
        linhas: [
          ["C", "Insuficiência Cardíaca", "1"], ["H", "Hipertensão", "1"],
          ["A₂", "Idade ≥ 75 anos", "2"], ["D", "Diabetes Mellitus", "1"],
          ["S₂", "AIT ou AVC prévio", "2"], ["V", "Doença Vascular (IAM, DAP)", "1"],
          ["A", "Idade 65–74 anos", "1"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Baixo Risco — Propafenona (pct 60 kg)", itens: [
        "Dieta zero",
        "Enoxaparina 60 mg/0,6 mL – 0,6 mL SC (antes do item 4)",
        "Propranolol 40 mg – 1 cp VO agora",
        "Propafenona 300 mg – 1,5 cp VO, 30 min após item 3",
        "O₂ se SatO₂ < 94% | Monitorização contínua",
      ], nota: "Ambulatorial: Rivaroxabana 20 mg 1×/dia por pelo menos 4 semanas. Cardiologista em < 30 dias." },
      { titulo: "Baixo Risco — Amiodarona (sem Propafenona disponível)", itens: [
        "Dieta zero",
        "Enoxaparina 60 mg/0,6 mL – 0,6 mL SC (antes do item 3)",
        "Amiodarona 150 mg/3 mL – 3 mL em SG5% 100 mL, EV em 15–30 min",
        "Amiodarona 150 mg/3 mL – 18 mL em SG5% 232 mL, EV a 16 mL/h por 6h → 8 mL/h por 18h",
        "O₂ se SatO₂ < 94% | Monitorização contínua",
      ]},
    ]},
  },
  {
    id: "fa-estavel-gt24h", nome: "FA s/ Instabilidade > 24h",
    orientacoes: { secoes: [
      { titulo: "Princípio Geral", tipo: "alerta", itens: [
        "FA > 24h estável e assintomática: avaliar encaminhar para ambulatório de cardiologia como conduta ÚNICA.",
        "FA secundária → SEMPRE tratar causa primária.",
      ]},
      { titulo: "Conduta FA > 24h", tipo: "conduta", itens: [
        "Realizar controle da FC em todo paciente.",
        "Opção 1: ECO Transesofágico — sem trombo → cardioverter; com trombo → anticoagular 3 semanas antes.",
        "Opção 2 (ECO-TE indisponível): Anticoagular por 3 semanas → cardioverter.",
      ]},
      { titulo: "Controle da FC (Meta: 100–110 bpm) — EV", tipo: "procedimento", itens: [
        "Metoprolol 1 mg/mL — 2,5–5 mL EV bolus (1 mL/min). Repetir a cada 5–10 min. Máx: 15 mg.",
        "Contraindicado: Asma/DPOC, instabilidade hemodinâmica.",
        "Risco de hipotensão → Esmolol: diluir 10 mL em SF 240 mL (10 mg/mL). Ataque: 0,5 mg/kg em 1 min. Manutenção: 10–40 mcg/kg/min.",
      ]},
      { titulo: "Controle da FC — Manutenção VO (escolher 1)", tipo: "procedimento", itens: [
        "Succinato de Metoprolol 50 mg — 1 cp VO 1×/dia",
        "Carvedilol 6,25 mg — 1 cp VO de 12/12h",
        "Atenolol 25 mg — 1 cp VO 1×/dia",
        "Bisoprolol 2,5 mg — 1 cp VO 1×/dia",
        "Diltiazem 60 mg — 1 cp VO de 8/8h",
      ]},
      { titulo: "Anticoagulação (escolher 1)", tipo: "conduta", itens: [
        "Rivaroxabana 20 mg — 1 cp VO 1×/dia",
        "Apixabana 5 mg — 1 cp VO de 12/12h",
        "Edoxabana 60 mg — 1 cp VO 1×/dia",
        "Dabigatrana 150 mg — 1 cp VO de 12/12h",
        "Varfarina 5 mg — 1 cp VO 1×/dia (INR 2–3 — estenose mitral grave ou prótese valvar metálica)",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Pronto-Socorro — Controle de FC", itens: [
        "Dieta zero",
        "Metoprolol 1 mg/mL – 5 mL EV bolus a 1 mL/min — repetir a cada 5–10 min (máx 15 mg)",
        "O₂ se SatO₂ < 94% | Monitorização contínua | Cabeceira elevada 30–45°",
      ], nota: "Ambulatorial: Rivaroxabana 20 mg 1×/dia uso contínuo. Succinato de Metoprolol 50 mg pela manhã. Cardiologista em < 30 dias." },
    ]},
  },
  {
    id: "iam-supra", nome: "IAM com Supra de ST",
    orientacoes: { secoes: [
      { titulo: "ATT", tipo: "alerta", itens: ["Seguir sempre o protocolo adotado pela instituição. Prescrições são orientadoras."] },
      { titulo: "*Nitrato — Contraindicações", tipo: "conduta", itens: [
        "Uso de Tadalafil/Sildenafil nas últimas 24h.",
        "IAMCST com Infarto de VD.",
        "Hipotensão (PAS < 110 mmHg).",
      ]},
      { titulo: "*Morfina — Uso", tipo: "conduta", itens: [
        "Nitrato SL e/ou EV é a 1ª escolha. Morfina somente se dor refratária.",
        "Não usar rotineiramente.",
        "Contraindicada em IAMCST com Infarto de VD.",
      ]},
      { titulo: "*Betabloqueador — Contraindicações", tipo: "conduta", itens: [
        "FC < 40–45 bpm, hipotensão, instabilidade hemodinâmica.",
        "DPOC/Asma grave, BAV 2°, BAV 3°, IC, edema pulmonar.",
      ]},
      { titulo: "Tenecteplase 5 mg/mL — Dose por Peso", tipo: "tabela",
        colunas: ["Peso", "Dose"],
        linhas: [
          ["< 60 kg", "30 mg (6 mL)"], ["60–69 kg", "35 mg (7 mL)"],
          ["70–79 kg", "40 mg (8 mL)"], ["80–89 kg", "45 mg (9 mL)"], ["≥ 90 kg", "50 mg (10 mL)"],
        ],
      },
      { titulo: "Alteplase 1 mg/mL", tipo: "procedimento", itens: [
        "Pct > 65 kg: 15 mL bolus (1–2 min) → 50 mL em 30 min → 35 mL em 60 min.",
        "Pct < 65 kg: 15 mL bolus → 0,75 mg/kg (máx 50 mg) em 30 min → 0,5 mg/kg (máx 35 mg) em 60 min.",
        "Dose total não deve exceder 100 mg. Idade > 75 anos → 50% da dose de Tenecteplase.",
      ]},
      { titulo: "Enoxaparina na Trombólise", tipo: "procedimento", itens: [
        "Pct 70 kg: 30 mg EV + 70 mg SC 12/12h.",
        "Idade ≥ 75 anos: sem bolus EV. Dose 0,75 mg/kg SC 12/12h.",
        "TFG ≤ 30: sem bolus EV. Dose 1 mg/kg SC 1×/dia.",
      ]},
      { titulo: "Escala de Insulina Regular SC", tipo: "tabela",
        colunas: ["Glicemia (mg/dL)", "Dose"],
        linhas: [
          ["181–200", "2 UI"], ["201–250", "4 UI"], ["251–300", "6 UI"],
          ["301–350", "8 UI"], ["351–400", "10 UI"], ["≥ 400", "12 UI"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Candidato à Angioplastia Primária", itens: [
        "Dieta zero",
        "AAS 100 mg – administrar 3 cp (300 mg) VO (mastigar), imediatamente",
        "Clopidogrel 75 mg – administrar 8 cp (600 mg) VO, imediatamente",
        "*Dinitrato de Isossorbida 5 mg – 1 cp SL a cada 5 min se dor (Máx.: 3 cp)",
        "*Nitroglicerina 5 mg/mL – 10 mL em SG5% 240 mL, EV BIC 3 mL/h se dor refratária (Máx: 120 mL/h)",
        "*Morfina 10 mg/mL – 1 mL + 9 mL SF, 2 mL a cada 5 min se dor refratária (Máx.: 25 mg)",
        "Rosuvastatina 40 mg – 1 cp VO 1×/dia",
        "*Enalapril 10 mg – 1 cp VO de 12/12h",
        "*Atenolol 25 mg – 1 cp VO de 12/12h",
        "Monitorização contínua",
        "*Glicemia capilar 6/6h — manter 70–180 mg/dL",
        "CNO₂ 2–3 L/min, se SatO₂ < 90%",
      ], nota: "Itens com * possuem contraindicações — ver Orientações." },
      { titulo: "Candidato à Trombólise", itens: [
        "Dieta zero",
        "AAS 100 mg – 3 cp (300 mg) VO (mastigar), imediatamente",
        "*Clopidogrel 75 mg – 4 cp (300 mg) VO, imediatamente",
        "*Enoxaparina – 30 mg EV (0,3 mL de 60 mg/0,6 mL), imediatamente",
        "*Enoxaparina – 1 mg/kg SC de 12/12h (iniciar 15 min após item 4)",
        "*TROMBOLÍTICO via EV — ver dose por peso em Orientações",
        "*Dinitrato de Isossorbida 5 mg – 1 cp SL a cada 5 min (Máx.: 3 cp)",
        "*Nitroglicerina 5 mg/mL – 10 mL em SG5% 240 mL, EV BIC 3 mL/h (Máx: 120 mL/h)",
        "*Morfina 10 mg/mL – 1 mL + 9 mL SF, 2 mL a cada 5 min (Máx.: 25 mg)",
        "Rosuvastatina 40 mg – 1 cp VO 1×/dia",
        "*Enalapril 10 mg – 1 cp VO de 12/12h",
        "*Atenolol 25 mg – 1 cp VO de 12/12h",
        "Monitorização contínua",
        "*Glicemia capilar 6/6h — manter 70–180 mg/dL",
        "CNO₂ 2–3 L/min, se SatO₂ < 90%",
      ], nota: "Itens com * possuem contraindicações — ver Orientações." },
    ]},
  },
  {
    id: "iam-sem-supra", nome: "IAM sem Supra de ST",
    orientacoes: { secoes: [
      { titulo: "ATT", tipo: "alerta", itens: ["Seguir sempre o protocolo adotado pela instituição. Prescrições são orientadoras."] },
      { titulo: "Clopidogrel", tipo: "conduta", itens: ["Não administrar se CATE for em menos de 24h."] },
      { titulo: "Enoxaparina", tipo: "procedimento", itens: [
        "Idade ≥ 75 anos: sem bolus EV. Dose 0,75 mg/kg SC de 12/12h.",
        "TFG ≤ 30: sem bolus EV. Dose 1 mg/kg SC 1×/dia.",
      ]},
      { titulo: "Betabloqueador — Contraindicações", tipo: "conduta", itens: [
        "FC < 40–45 bpm, hipotensão, instabilidade hemodinâmica.",
        "DPOC/Asma grave, BAV 2°, BAV 3°, IC, edema pulmonar.",
      ]},
      { titulo: "Escala de Insulina Regular SC", tipo: "tabela",
        colunas: ["Glicemia (mg/dL)", "Dose"],
        linhas: [
          ["181–200", "2 UI"], ["201–250", "4 UI"], ["251–300", "6 UI"],
          ["301–350", "8 UI"], ["351–400", "10 UI"], ["≥ 400", "12 UI"],
        ],
      },
    ]},
    prescricao: { grupos: [
      { titulo: "Prescrição Prática", itens: [
        "Dieta oral branda (Dieta zero se CATE em menos de 12h)",
        "AAS 100 mg – 3 cp (300 mg) VO (mastigar), imediatamente",
        "*Clopidogrel 75 mg – 4 cp (300 mg) VO, imediatamente",
        "*Enoxaparina – 1 mg/kg SC de 12/12h",
        "*Dinitrato de Isossorbida 5 mg – 1 cp SL a cada 5 min (Máx.: 3 cp)",
        "*Nitroglicerina 5 mg/mL – 10 mL em SG5% 240 mL, EV BIC 3 mL/h (Máx: 120 mL/h)",
        "*Atenolol 25 mg – 1 cp VO de 12/12h",
        "*Enalapril 10 mg – 1 cp VO de 12/12h",
        "Rosuvastatina 40 mg – 1 cp VO 1×/dia",
        "Monitorização contínua",
        "*Glicemia capilar 6/6h — manter 70–180 mg/dL",
        "CNO₂ 2–3 L/min, se SatO₂ < 90%",
      ], nota: "Itens com * possuem contraindicações — ver Orientações." },
    ]},
  },
  {
    id: "ic-aguda", nome: "Insuficiência Cardíaca Aguda",
    orientacoes: { secoes: [
      { titulo: "Perfis Hemodinâmicos", tipo: "tabela",
        colunas: ["Perfil", "Perfusão", "Congestão", "Conduta"],
        linhas: [
          ["A — Quente e Seco", "Boa (TEC < 3s)", "Ausente", "Ambulatório"],
          ["B — Quente e Congesto", "Boa (TEC < 3s)", "Presente", "Diurético EV ± Vasodilatador"],
          ["C — Frio e Congesto", "Ruim", "Presente", "Inotrópico + Diurético ± Vasopressor"],
          ["L — Frio e Seco", "Ruim", "Ausente", "Reposição volêmica cautelosa"],
        ],
      },
      { titulo: "Perfil B — Quente e Congesto (Enfermaria)", tipo: "conduta", itens: [
        "Dieta hipossódica; restrição hídrica 1500–2000 mL/24h.",
        "Furosemida EV: 40–240 mg/dia, divididos em 2–4×/dia.",
        "Profilaxia TEP/TVP: Enoxaparina 40 mg SC 1×/dia.",
        "SatO₂ alvo > 95%; DPOC: 88–92%.",
      ]},
      { titulo: "Perfil B — Quente e Congesto (Sala Vermelha)", tipo: "conduta", itens: [
        "Furosemida EV bolus: 0,5–1 mg/kg (crônico: 1–2× dose usual).",
        "Se resposta insatisfatória e/ou PA ≥ 180×120 → Vasodilatador.",
        "Nitroprussiato: 5–10 mcg/min (Máx: 100 mcg/min).",
        "Resposta esperada: diurese ≥ 400 mL nas 2h + melhora da dispneia.",
      ]},
      { titulo: "Perfil C — Frio e Congesto", tipo: "alerta", itens: [
        "Dobutamina 250 mg/20 mL: todos os pacientes.",
        "PAS < 75 mmHg → Noradrenalina antes (ou junto) da Dobutamina.",
        "PAS > 90 mmHg → Nitroprussiato associado à Dobutamina.",
        "Resumo: PAS < 75 → Nora + Dob | 75–90 → Dob | > 90 → Nitrop + Dob.",
        "Betabloqueador: reduzir dose se PAS 85–110; suspender se PAS < 85.",
        "Suspender IECA/BRA.",
      ]},
      { titulo: "Perfil L — Frio e Seco", tipo: "conduta", itens: [
        "Identificar causa da hipovolemia; suspender diuréticos se forem a causa.",
        "SF 0,9% ou RL 250 mL EV em 1h, repetir se necessário.",
        "Se melhora → Perfil A. Se congestão → Perfil C.",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Perfil A — Quente e Seco", itens: [
        "Não há prescrição específica de urgência.",
        "Reavaliar tratamento atual da IC Crônica.",
        "Encaminhar ao ambulatório de cardiologia.",
      ]},
      { titulo: "Perfil B — Quente e Congesto (Enfermaria)", itens: [
        "Dieta oral hipossódica",
        "Furosemida 20 mg/2 mL – 2 mL EV de 6/6h",
        "Enoxaparina 40 mg – 0,4 mL SC 1×/dia",
        "Enalapril 5 mg – 1 cp VO de 12/12h",
        "Carvedilol 3,125 mg – 1 cp VO de 12/12h",
        "O₂ se SatO₂ < 90% (Alvo: > 95%)",
        "Pesar diariamente em jejum | Débito urinário 6/6h",
      ]},
      { titulo: "Perfil B — Quente e Congesto (Sala Vermelha)", itens: [
        "Dieta zero",
        "Furosemida 20 mg/2 mL – 6 mL EV bolus",
        "Nitroprussiato 50 mg/2 mL – 2 mL em SG5% 248 mL, EV BIC a 2 mL/h (titular)",
        "Enoxaparina 40 mg – 0,4 mL SC 1×/dia",
        "O₂ se SatO₂ < 90% | SVD para controle de débito urinário",
      ]},
      { titulo: "Perfil C — Frio e Congesto (Sala Vermelha)", itens: [
        "Dieta zero",
        "Dobutamina 250 mg/20 mL – 80 mL em SF 0,9% 170 mL, EV BIC a 4 mL/h",
        "Furosemida 20 mg/2 mL – 6 mL EV",
        "Enoxaparina 40 mg – 0,4 mL SC 1×/dia",
        "O₂ se SatO₂ < 90% | SVD para controle de débito urinário | Monitorização contínua",
      ], nota: "Prescrever Noradrenalina ou Nitroprussiato conforme PA. Reconciliar BB e IECA/BRA. Perfil C é dinâmico — reavaliar constantemente." },
      { titulo: "Perfil L — Frio e Seco", itens: [
        "Dieta zero",
        "SF 0,9% 250 mL – EV em 60 min (1 etapa)",
        "Monitorização contínua | Débito urinário 1/1h",
      ], nota: "Se melhora da perfusão → Perfil A. Se hipoperfusão c/ congestão → Perfil C." },
    ]},
  },
  {
    id: "taquiarritmia", nome: "Taquiarritmia",
    orientacoes: { secoes: [
      { titulo: "QRS Estreito e R-R Regular — Estável", tipo: "procedimento", itens: [
        "1. Manobras vagais: massagem do seio carotídeo 5–10 s; Valsalva 15 s.",
        "2. Valsalva Modificada: sentado 45° → soprar seringa 20 mL vazia por 15 s → decúbito MMII 45° por 15–45 s → posição inicial.",
        "3. Adenosina 3 mg/mL — 6 mg (2 mL) EV bolus (em Y) + flush 20 mL SF. Repetir 12 mg se necessário (Máx: 30 mg).",
        "4. Metoprolol 1 mg/mL — 2,5–5 mg EV lento em 3–5 min. Repetir a cada 10 min (Máx: 15 mg).",
        "5. Amiodarona: ataque 150 mg + SG5% 100 mL em 10 min → manutenção 18 mL + SG5% 232 mL a 16 mL/h por 6h, depois 8 mL/h por 18h.",
      ]},
      { titulo: "QRS Alargado Regular — TV Monomórfica (Estável)", tipo: "procedimento", itens: [
        "Amiodarona 150 mg + SG5% 100 mL EV em 15 min (repetir até 3× a cada 15 min).",
        "Manutenção: 18 mL + SG5% 232 mL a 16 mL/h por 6h → 8 mL/h por 18h.",
        "Se sem reversão → Cardioversão Elétrica Sincronizada: 100 J.",
      ]},
      { titulo: "QRS Alargado Irregular — Estável", tipo: "procedimento", itens: [
        "Torsades de Pointes (QT longo): MgSO4 10% — 20 mL + SF 100 mL EV em 15 min.",
        "TV Polimórfica com QT Normal: Amiodarona 150 mg + SG5% 100 mL EV em 15 min.",
      ]},
      { titulo: "Paciente Instável — Cargas de Cardioversão", tipo: "tabela",
        colunas: ["Ritmo", "Carga Bifásico", "Modo"],
        linhas: [
          ["QRS Estreito e Regular", "50–100 J", "Cardioversão"],
          ["QRS Estreito e Irregular", "120–200 J", "Cardioversão"],
          ["QRS Largo e Regular", "100 J", "Cardioversão"],
          ["QRS Largo e Irregular", "200 J", "DESFIBRILAÇÃO"],
        ],
      },
      { titulo: "Pós-reversão", tipo: "alerta", itens: [
        "Se não reverter → repetir cardioversão com carga maior.",
        "Se reverter → Amiodarona 900–1200 mg EV em 24h.",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "QRS Estreito Regular — Após Manobra Vagal s/ Reversão", itens: [
        "Adenosina 3 mg/mL – 2 mL EV bolus (em Y ou torneira 3 vias) + flush 20 mL SF",
        "O₂ se SatO₂ < 94% | Monitorização contínua",
      ]},
      { titulo: "TV Monomórfica — Cardioversão Química", itens: [
        "Amiodarona 150 mg/3 mL – 3 mL em SG5% 100 mL, EV em 10 min",
        "Amiodarona 150 mg/3 mL – 18 mL em SG5% 232 mL, EV a 11 mL/h por 24h (após item 1)",
        "O₂ se SatO₂ < 94% | Monitorização contínua",
      ]},
      { titulo: "Torsades de Pointes", itens: [
        "MgSO4 10% – 20 mL em SF 0,9% 100 mL, EV em 15 min",
        "O₂ se SatO₂ < 94% | Monitorização contínua",
      ]},
      { titulo: "Paciente Instável — Cardioversão Elétrica", itens: [
        "Dieta zero",
        "Midazolam 5 mg/mL – 1 mL em 4 mL AD, administrar 1 mL EV lento",
        "Fentanil 50 mcg/mL – 1 mL EV lento",
        "Amiodarona 150 mg/3 mL – 18 mL em SG5% 232 mL, EV a 16 mL/h por 6h → 8 mL/h por 18h (após reversão)",
        "O₂ em CNO₂ ou Másc. Concentradora | Monitorização contínua",
      ], nota: "Após sedação (2 e 3): CARDIOVERSÃO ELÉTRICA SINCRONIZADA — ver tabela de cargas em Orientações. Após reversão → item 4." },
    ]},
  },
  {
    id: "tvp", nome: "Trombose Venosa Profunda",
    orientacoes: { secoes: [
      { titulo: "Tratamento Ambulatorial — Indicação", tipo: "info", itens: [
        "Paciente estável com sinais vitais normais.",
        "Ausência de risco de sangramento e de insuficiência renal grave.",
        "Capacidade de administrar medicação e monitorização posterior.",
      ]},
      { titulo: "Internação Hospitalar — Indicação", tipo: "alerta", itens: [
        "Instabilidade hemodinâmica.",
        "Alto risco de sangramento (idade > 75 anos, histórico de sangramento).",
        "Trombocitopenia.",
      ]},
      { titulo: "Opções de Tratamento", tipo: "procedimento", itens: [
        "Opção 01: Rivaroxabana 15 mg 12/12h por 21 dias → 20 mg 1×/dia por 3–6 meses.",
        "Opção 02: Apixabana 10 mg 12/12h por 7 dias → 5 mg 12/12h por 3–6 meses.",
        "Opção 03: Enoxaparina 1 mg/kg SC 12/12h por 5–10 dias → Rivaroxabana.",
        "Opção 04: Fondaparinux SC 1×/dia por 5–10 dias (< 50 kg: 5 mg; 50–100 kg: 7,5 mg; > 100 kg: 10 mg) → Varfarina 5 mg (INR 2–3) por 3–6 meses.",
        "Opção 05 (DRC ClCr < 15): HNF 25.000 U/5 mL em SF 245 mL (100 U/mL). Ataque: 80 U/kg EV. Manutenção: 18 U/kg/h em BIC + Varfarina 5 mg VO.",
      ]},
    ]},
    prescricao: { grupos: [
      { titulo: "Enoxaparina — Paciente 75 kg", itens: [
        "Enoxaparina 80 mg/0,8 mL – uma seringa via SC de 12/12h",
      ]},
      { titulo: "HNF — Ataque (75 kg)", itens: [
        "HNF 25.000 U/5 mL – diluir 5 mL em SF 0,9% 245 mL, administrar 60 mL via EV",
      ]},
      { titulo: "HNF — Manutenção (75 kg)", itens: [
        "HNF 25.000 U/5 mL – diluir 5 mL em SF 0,9% 245 mL, EV a 13 mL/h em infusão contínua",
        "Varfarina 5 mg – 1 cp VO 1×/dia",
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
  const [aberta, setAberta] = useState(true);
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

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function PrescriçõesCardiologia({ onBack }) {
  const [temaId, setTemaId]     = useState(TEMAS[0].id);
  const [aba, setAba]           = useState("orientacoes");
  const [dropOpen, setDropOpen] = useState(false);

  const tema = TEMAS.find((t) => t.id === temaId);

  const selecionarTema = (id) => { setTemaId(id); setAba("orientacoes"); setDropOpen(false); };

  return (
    <div style={{ minHeight: "100vh", background: COR.bg, fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      <Header titulo="Prescrições" subtitulo="Cardiologia" onBack={onBack} />

      {/* SELETOR DE TEMA */}
      <div style={{ background: COR.card, borderBottom: `1px solid ${COR.border}`, padding: "10px 16px" }}>
        <button
          onClick={() => setDropOpen(!dropOpen)}
          style={{
            width: "100%", padding: "10px 14px",
            background: COR.bg, border: `1.5px solid ${dropOpen ? COR.primary : COR.border}`,
            borderRadius: 10, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            color: COR.text, fontSize: 14, fontWeight: 600, transition: "border-color 0.2s",
          }}
        >
          <span>📋 {tema.nome}</span>
          <span style={{ fontSize: 12, color: COR.muted }}>{dropOpen ? "▲" : "▼"}</span>
        </button>
        {dropOpen && (
          <div style={{
            marginTop: 6, background: COR.card, border: `1px solid ${COR.border}`,
            borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}>
            {TEMAS.map((t) => (
              <button key={t.id} onClick={() => selecionarTema(t.id)} style={{
                width: "100%", padding: "12px 14px", textAlign: "left",
                background: t.id === temaId ? COR.primary3 : "transparent",
                border: "none", borderBottom: `1px solid ${COR.border}`,
                cursor: "pointer", color: t.id === temaId ? COR.primary : COR.text,
                fontSize: 13, fontWeight: t.id === temaId ? 700 : 400,
              }}>{t.nome}</button>
            ))}
          </div>
        )}
      </div>

      {/* ABAS */}
      <div style={{ display: "flex", background: COR.card, borderBottom: `2px solid ${COR.border}`, padding: "0 16px" }}>
        {[{ id: "orientacoes", label: "Orientações" }, { id: "prescricao", label: "Prescrição Prática" }].map((tab) => (
          <button key={tab.id} onClick={() => setAba(tab.id)} style={{
            padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: aba === tab.id ? 700 : 400,
            color: aba === tab.id ? COR.primary : COR.muted,
            borderBottom: aba === tab.id ? `2px solid ${COR.primary}` : "2px solid transparent",
            marginBottom: -2, transition: "all 0.15s",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12, fontSize: 11, color: COR.muted }}>
          <span style={{ color: COR.primary, fontWeight: 700 }}>Cardiologia</span>
          <span>›</span>
          <span style={{ color: COR.text, fontWeight: 600 }}>{tema.nome}</span>
          <span>›</span>
          <span style={{ color: COR.primary, fontWeight: 700 }}>{aba === "orientacoes" ? "Orientações" : "Prescrição Prática"}</span>
        </div>

        {aba === "orientacoes" && tema.orientacoes.secoes.map((secao, i) => <Secao key={i} secao={secao} />)}

        {aba === "prescricao" && (
          <>
            <div style={{
              padding: "10px 14px", marginBottom: 12, background: COR.primary3,
              borderRadius: 10, border: `1px solid #C0D8C4`, fontSize: 12, color: COR.primary, fontWeight: 600,
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
