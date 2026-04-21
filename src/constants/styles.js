// ─── PADRÕES DE TIPOGRAFIA UNIFORMES ───────────────────────────────────────
export const TEXT_STYLES = {
  // Rótulos e labels pequenos (ex: "Selecione um Tema")
  label: {
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1.4,
  },

  // Texto padrão do app (descrições, itens de lista)
  body: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // Captions e observações (ex: "⚠️ Obs:")
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // Títulos grandes (ex: "Endocrinologia")
  heading: {
    fontSize: 17,
    fontWeight: 800,
    lineHeight: 1.4,
  },

  // Títulos de seção (ex: "PRESCRIÇÃO PRÁTICA")
  sectionTitle: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Descrição de tema (ex: "Avaliar gravidade...")
  description: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // Item em lista (ex: "Propranolol 40mg 6/6h")
  listItem: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
  },
};

export default TEXT_STYLES;
