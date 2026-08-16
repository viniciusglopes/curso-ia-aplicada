# Projeto 9 — Modelo customizado para domínio específico

**Módulo 09 · semana 26 · ≈ 14h**

## Objetivo
Passar por todo o ciclo de fine-tuning com rigor — e chegar a uma conclusão honesta, seja ela qual for.

## Domínio sugerido
Classificação e resposta de mensagens de cobrança, ou extração estruturada de documento do ERP.
Tarefa estreita, formato repetitivo, volume de exemplo disponível.

## Escopo
1. **Documento de decisão** justificando fine-tuning contra RAG e few-shot (com custo e prazo)
2. **Baseline medido antes**: modelo base + prompt bem construído + few-shot
3. **Métrica declarada antes do treino** — e o conjunto de teste separado e intocado
4. **Dataset**: coleta, limpeza, anonimização, balanceamento, JSONL, divisão, versionamento,
   relatório de descarte
5. **Treino** via API, com hiperparâmetros documentados e curva de perda acompanhada
6. **Avaliação**: A/B contra o baseline no conjunto de teste
7. **Protótipo** em TypeScript consumindo o modelo
8. **Model card** interno

## Critérios de aceite
- [ ] Todas as 8 etapas cumpridas e documentadas
- [ ] Dado pessoal anonimizado antes de sair do seu perímetro
- [ ] Resultado do A/B reportado com honestidade
- [ ] Análise de overfitting e de perda de generalização
- [ ] Custo total (treino + inferência projetada) calculado

## Resultado válido
**"O fine-tuning não superou o baseline, e aqui está a evidência"** é um resultado excelente. Mostra
critério e economia. Forçar um ganho inexistente é o que desqualifica.
