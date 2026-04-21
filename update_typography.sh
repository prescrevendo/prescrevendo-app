#!/bin/bash

# Script para uniformizar tipografia em todos os arquivos do app

# Função para atualizar imports em um arquivo
add_import_if_missing() {
  local file="$1"
  
  # Verifica se o import já existe
  if ! grep -q "import { TEXT_STYLES }" "$file"; then
    # Adiciona o import após o primeiro import React
    sed -i.bak '1,/^import React/a\
import { TEXT_STYLES } from "../../constants/styles";' "$file"
    rm "${file}.bak"
    echo "✅ Import adicionado em: $file"
  else
    echo "⚠️  Import já existe em: $file"
  fi
}

# Atualizar todos os módulos
echo "🔄 Atualizando MÓDULOS..."
for module in src/modules/*/Prescricoes*.jsx; do
  echo "📝 Processando: $module"
  add_import_if_missing "$module"
done

# Atualizar todas as pages
echo "🔄 Atualizando PAGES..."
for page in src/pages/*.jsx; do
  echo "📝 Processando: $page"
  add_import_if_missing "$page"
done

# Atualizar componentes
echo "🔄 Atualizando COMPONENTS..."
for component in src/components/*.jsx; do
  echo "📝 Processando: $component"
  add_import_if_missing "$component"
done

echo "✅ Script de atualização concluído!"
