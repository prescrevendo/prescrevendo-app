import { ESPECIALIDADES_PRESCRICOES } from "../constants/especialidades";

/**
 * Service para operações com prescrições
 * Centraliza toda a lógica de negócio relacionada a prescrições
 */

export const prescricaoService = {
  /**
   * Obter todas as especialidades
   * @returns {Array} Todas as especialidades
   */
  obterEspecialidades: () => {
    return ESPECIALIDADES_PRESCRICOES;
  },

  /**
   * Obter especialidades disponíveis
   * @returns {Array} Especialidades com disponivel: true
   */
  obterDisponiveis: () => {
    return ESPECIALIDADES_PRESCRICOES.filter(e => e.disponivel);
  },

  /**
   * Obter especialidade por ID
   * @param {string} id - ID da especialidade
   * @returns {Object|null} Especialidade ou null
   */
  obterPorId: (id) => {
    return ESPECIALIDADES_PRESCRICOES.find(e => e.id === id) || null;
  },

  /**
   * Obter especialidade por nome
   * @param {string} nome - Nome da especialidade
   * @returns {Object|null} Especialidade ou null
   */
  obterPorNome: (nome) => {
    return ESPECIALIDADES_PRESCRICOES.find(e => 
      e.nome.toLowerCase() === nome.toLowerCase()
    ) || null;
  },

  /**
   * Buscar especialidades por termo
   * @param {string} termo - Termo de busca
   * @returns {Array} Especialidades encontradas
   */
  buscar: (termo) => {
    if (!termo || !termo.trim()) return [];
    
    const q = termo.toLowerCase().trim();
    return ESPECIALIDADES_PRESCRICOES.filter(e =>
      e.nome.toLowerCase().includes(q)
    );
  },

  /**
   * Contar total de especialidades
   * @returns {number} Total de especialidades
   */
  contar: () => {
    return ESPECIALIDADES_PRESCRICOES.length;
  },

  /**
   * Contar especialidades disponíveis
   * @returns {number} Total de especialidades disponíveis
   */
  contarDisponiveis: () => {
    return ESPECIALIDADES_PRESCRICOES.filter(e => e.disponivel).length;
  }
};
