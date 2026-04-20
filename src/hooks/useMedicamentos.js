import { useMemo } from "react";
import { medicamentoService } from "../services/medicamentoService";

/**
 * Hook customizado para usar o service de medicamentos
 * Encapsula a lógica de busca e memorização
 */
export function useMedicamentos(termo, limit = 999) {
  const resultados = useMemo(() => {
    return medicamentoService.buscar(termo, limit);
  }, [termo, limit]);

  return {
    resultados,
    total: resultados.length,
    temResultados: resultados.length > 0,
    vazio: resultados.length === 0
  };
}

/**
 * Hook para obter um medicamento específico
 */
export function useMedicamento(slug) {
  return medicamentoService.obterPorSlug(slug);
}

/**
 * Hook para obter medicamentos por classe terapêutica
 */
export function useMedicamentosPorClasse(classe) {
  const resultados = useMemo(() => {
    return medicamentoService.obterPorClasse(classe);
  }, [classe]);

  return resultados;
}

/**
 * Hook para obter estatísticas de medicamentos
 */
export function useMedicamentosStats() {
  return {
    total: medicamentoService.contar(),
    todosOsMedicamentos: medicamentoService.obterTodos()
  };
}
