# Projeto 7 — Copiloto de gestão de projetos

**Módulo 07 · semana 20 · ≈ 10h**

## Objetivo
Uma automação que roda sozinha e devolve, toda semana, o que hoje alguém monta na mão.

## Escopo
- Lê fonte real: repositório (commits, PRs, issues) e/ou board (Jira, Notion, ClickUp, GitHub Projects)
- Gera **status report em 3 versões**: técnica, para gestão, para diretoria
- Prioriza backlog com framework declarado (RICE, WSJF ou MoSCoW), com justificativa por fator
- Detecta pelo menos 3 tipos de risco: tarefa parada, estimativa crescendo, PR envelhecendo,
  concentração de conhecimento, reabertura recorrente
- Roda agendado (cron) e entrega onde a equipe já está

## Critérios de aceite
- [ ] Rodou por 3 semanas seguidas, sem você acionar
- [ ] As 3 versões do relatório saem coerentes entre si
- [ ] Priorização auditável: dá para ver por que cada item ficou onde ficou
- [ ] Riscos detectados batem com a realidade (relatório de falso positivo e falso negativo)
- [ ] Custo por execução medido

## Critério de valor
Se depois de 3 semanas ninguém lê o relatório, o projeto falhou — mesmo funcionando. Pergunte a quem
recebe e ajuste o formato. Isso também é engenharia.
