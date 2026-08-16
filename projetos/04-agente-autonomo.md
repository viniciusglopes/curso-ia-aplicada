# Projeto 4 — Agente autônomo completo

**Módulo 04 · semana 13 · ≈ 16h · 🎖 projeto de portfólio**

## Objetivo
Um agente que executa uma tarefa complexa de ponta a ponta, sem supervisão passo a passo, com
guardrails que impedem que ele cause dano.

## Sugestões de tarefa
- **Auditor de operação**: verifica o resultado do dia, cruza fontes que se contradizem, identifica
  divergência e produz relatório com evidência
- **Triador de suporte**: lê a fila, classifica, busca no histórico, responde o simples e escala o resto
- **Analista de repositório**: examina PRs abertos, identifica risco e sugere ordem de revisão

## Escopo obrigatório
- Planejamento adaptativo (replaneja quando um passo falha)
- Execução via APIs externas reais (use o MCP do projeto 3)
- Memória persistente: curta, longa (embeddings) e episódica, com consolidação
- Orquestração em LangGraph, com checkpointing
- Trilha de auditoria consultável: para cada passo, o que viu, o que concluiu, o que fez, o que voltou

### Guardrails — todos, sem exceção
- [ ] Teto de iterações
- [ ] Teto de custo por execução **e** por dia
- [ ] Allowlist de ações (nunca blocklist)
- [ ] Detecção de repetição (mesma ação + mesmo argumento → parar)
- [ ] Timeout global
- [ ] Kill switch acessível sem deploy
- [ ] Aprovação humana para ação irreversível

## Critérios de aceite
- [ ] Roda 10 execuções reais sem intervenção
- [ ] Métricas medidas: passos, tokens, custo por tarefa, taxa de sucesso, taxa de intervenção
- [ ] Todos os guardrails com teste
- [ ] Memória sobrevive a restart e é listável/apagável
- [ ] **Relatório dizendo onde ele falhou** — obrigatório

## Critério de honestidade
Se em 10 execuções nada deu errado, você escolheu uma tarefa fácil demais. Aumente a dificuldade.
