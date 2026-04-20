export const MEDICAMENTOS = [
  {
    slug: "cisatracurio",
    nome: "CISATRACÚRIO",
    nome_comercial_apresentacao: "Nimbium injetável - 2mg/mL",
    classe_terapeutica: "Bloqueador neuromuscular não despolarizante",
    indicacao: "Bloqueador neuromuscular de duração intermediária para intubação orotraqueal",
    dose: "Adulto: 0,15mg/kg EV. Manutenção: 0,03mg/kg",
    via_de_administracao: "EV",
    preparo_diluicao: "Pode ser diluído em SF ou SG 5%",
    administracao: "Infusão: 3mcg/kg/min",
    cuidados_especificos_monitoramento: "Monitorar função neuromuscular. Risco B na gestação",
    status: "ok"
  },
  {
    slug: "ceftazidima",
    nome: "CEFTAZIDIMA",
    nome_comercial_apresentacao: "Kefadim injetável - 1g/frasco",
    classe_terapeutica: "Antimicrobiano, Cefalosporina terceira geração",
    indicacao: "Tratamento de infecção por Pseudomonas aeruginosa",
    dose: "Adulto: 1-2g a cada 8 horas. Máx: 6g/dia",
    via_de_administracao: "EV e IM",
    preparo_diluicao: "Reconstituição: EV 10mL de AD",
    administracao: "EV Direta: 3-5 min. Diluído: 15-30 min",
    cuidados_especificos_monitoramento: "Ajuste em insuficiência renal",
    status: "ok"
  }
];

export const CAMPOS_MEDICAMENTO = [
  { key: "nome_comercial_apresentacao", label: "Nome Comercial / Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];
