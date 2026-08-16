# Projeto 6 — Copiloto de operação (DevOps)

**Módulo 06 · semana 18 · ≈ 14h**

## Objetivo
Um copiloto que ajuda a operar infraestrutura de verdade, com aprovação humana onde importa.

## Escopo mínimo
Integre pelo menos **duas** destas frentes:
- **IaC**: gera Terraform/Helm, valida com `plan` + política OPA, abre PR (nunca aplica)
- **Deploy/Kubernetes**: gera manifest, valida readiness, propõe estratégia de rollout
- **Observabilidade**: traduz pergunta em PromQL/LogQL, monta dashboard, detecta anomalia

Mais, obrigatoriamente:
- **RAG sobre os seus runbooks reais**
- **ChatOps** (Telegram serve) com aprovação humana para qualquer ação em produção
- Diagnóstico com evidência rastreável (qual log, qual métrica, qual trace)

## Guardrails
- [ ] Dry-run antes de qualquer execução
- [ ] Circuit breaker
- [ ] Allowlist de ações
- [ ] Kill switch
- [ ] Produção exige aprovação de segunda pessoa
- [ ] Log imutável de tudo que foi executado

## Critérios de aceite
- [ ] Testado contra pelo menos 5 cenários (reais ou reproduzidos), com relatório de acerto e erro
- [ ] Toda sugestão vem com a evidência que a sustenta
- [ ] Nenhuma ação em produção sem aprovação
- [ ] **Análise de ROI**: horas economizadas por mês vs custo de token

## Escopo reduzido, se o tempo apertar
Faça só a frente de observabilidade + RAG de runbooks + ChatOps consultivo (só lê e diagnostica,
não age). Já entrega valor e mantém o aprendizado principal.
