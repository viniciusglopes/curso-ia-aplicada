# Projeto 8 — Roteador de modelos com cache semântico

**Módulo 08 · semana 23 · ≈ 12h**

## Objetivo
Reduzir custo de LLM de forma comprovada, sem perda perceptível de qualidade. É o projeto que gera
o número que você vai citar em entrevista.

## Escopo
- **Classificador de complexidade** roteando entre no mínimo 3 modelos (barato → intermediário → caro)
- **Intent routing**: alguns pedidos nem precisam de LLM — mande para a regra determinística
- **Cache semântico**: pergunta parecida devolve resposta guardada
  - ⚠ A chave **precisa** incluir o escopo do dado (tenant, usuário, permissão)
- **Prompt cache** onde o provedor suportar
- Fallback entre provedores
- Conjunto de avaliação para provar que a qualidade não caiu

## Critérios de aceite
- [ ] Roteamento funcionando com regra explicável
- [ ] Cache semântico **com teste provando isolamento entre usuários**
- [ ] Fallback testado
- [ ] Métricas antes/depois: custo, latência p50 e p95, qualidade no conjunto de avaliação
- [ ] **Redução de custo de no mínimo 40%**, com queda de qualidade dentro da margem que você declarou
- [ ] Documento de arquitetura com diagrama e trade-offs assumidos

## Cuidado
Cache semântico mal feito é incidente de vazamento de dado, não otimização. O teste de isolamento é o
critério mais importante deste projeto.
