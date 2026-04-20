import { MEDICAMENTOS } from "../constants/medicamentos";

/**
 * Service para operações com medicamentos
 * Centraliza toda a lógica de negócio relacionada a medicamentos
 */

export const medicamentoService = {
  /**
   * Buscar medicamentos por termo
   * @param {string} termo - Termo de busca (nome ou classe terapêutica)
   * @param {number} limit - Número máximo de resultados
   * @returns {Array} Medicamentos encontrados
   */
  buscar: (termo, limit = 999) => {
    if (!termo || !termo.trim()) return [];
    
    const q = termo.toLowerCase().trim();
    return MEDICAMENTOS.filter(m =>
      m.nome?.toLowerCase().includes(q) ||
      m.classe_terapeutica?.toLowerCase().includes(q) ||
      m.via_de_administracao?.toLowerCase().includes(q)
    ).slice(0, limit);
  },

  /**
   * Obter medicamento por slug
   * @param {string} slug - Slug do medicamento
   * @returns {Object|null} Medicamento ou null
   */
  obterPorSlug: (slug) => {
    return MEDICAMENTOS.find(m => m.slug === slug) || null;
  },

  /**
   * Obter todos os medicamentos
   * @returns {Array} Todos os medicamentos
   */
  obterTodos: () => {
    return MEDICAMENTOS;
  },

  /**
   * Obter medicamentos por classe terapêutica
   * @param {string} classe - Classe terapêutica
   * @returns {Array} Medicamentos da classe
   */
  obterPorClasse: (classe) => {
    if (!classe) return [];
    return MEDICAMENTOS.filter(m => 
      m.classe_terapeutica?.toLowerCase() === classe.toLowerCase()
    );
  },

  /**
   * Contar total de medicamentos
   * @returns {number} Total de medicamentos
   */
  contar: () => {
    return MEDICAMENTOS.length;
  },

  /**
   * Validar se medicamento existe
   * @param {string} slug - Slug do medicamento
   * @returns {boolean} True se existe
   */
  existe: (slug) => {
    return MEDICAMENTOS.some(m => m.slug === slug);
  }
};
