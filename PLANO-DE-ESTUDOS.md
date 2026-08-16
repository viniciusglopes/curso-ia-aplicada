# Plano de Estudos — 32 semanas

## Carga e ritmo

- **Ritmo padrão:** 8 a 10 horas por semana (≈ 1h30 em 5 dias úteis + 2h no fim de semana)
- **Duração:** 32 semanas (≈ 8 meses)
- **Trilha acelerada:** 16 semanas a 18–20h/semana — ver o final deste arquivo
- **Regra:** semana sem entrega não é semana concluída. Prefira atrasar o calendário a marcar falso.

### Divisão sugerida da semana

| Bloco | Tempo | O quê |
|---|---|---|
| Estudo dirigido | 3h | Ler o material do módulo, docs oficiais, papers indicados |
| Mão na massa | 4h | Codar o exercício da semana |
| Revisão ativa | 1h | Responder o checklist sem consultar; anotar o que não soube |
| Escrita | 1h | Registrar em `notas/` o que aprendeu (vira post no LinkedIn depois — módulo 12) |

---

## Fase 0 — Setup (semana 0)

Antes da semana 1, deixe o ambiente pronto. Detalhes em [COMO-ESTUDAR.md](COMO-ESTUDAR.md).

- [ ] Node 20+, pnpm, TypeScript
- [ ] Chaves de API: Anthropic, OpenAI, Google AI Studio, OpenRouter
- [ ] Ollama instalado com pelo menos um modelo pequeno (`llama3.2:3b` ou `qwen2.5:7b`)
- [ ] Projeto Supabase com extensão `pgvector` habilitada
- [ ] Repositório `estudos-ia` criado para os exercícios (separado deste)
- [ ] Planilha ou arquivo de controle de gasto de tokens — você vai gastar, é melhor medir desde o dia 1

---

## Fase 1 — Fundamentos (semanas 1 a 6)

**Objetivo da fase:** parar de tratar LLM como caixa preta.

| Semana | Módulo | Foco | Entrega |
|---|---|---|---|
| 1 | 01 | História da IA, ML vs DL vs IA, tensores, redes neurais | Rede neural treinada do zero em JS classificando algo real |
| 2 | 01 | Transformers, embeddings, attention, tokenização | Notebook/script explicando por que "morango" tem 3 R's e o modelo erra |
| 3 | 01 | Prompt engineering, Cursor/rules, MCPs (visão geral), RAG básico, Ollama, OpenRouter | **Projeto 1:** RAG em JS + Postgres sobre um acervo seu |
| 4 | 02 | Provedores, diferenças de API, multimodalidade | Mesma tarefa resolvida em 3 provedores, com comparativo de custo e latência |
| 5 | 02 | Prompt chaining, templates, redução de alucinação, custo/cache | Camada de prompts versionados com testes de regressão |
| 6 | 02 | Erros, retry, logging, observabilidade, OCR e bots multimodais | **Projeto 2:** `llm-core` — cliente resiliente com cache, retry, telemetria e OCR |

**Marco da fase 1:** você tem uma biblioteca própria que qualquer projeto futuro vai importar.

---

## Fase 2 — Protocolos e Agentes (semanas 7 a 13)

**Objetivo da fase:** sair de "chamada de API" para "sistema que decide e age".

| Semana | Módulo | Foco | Entrega |
|---|---|---|---|
| 7 | 03 | O que é MCP, MCP vs tools tradicionais, anatomia do protocolo | MCP server "hello world" consumido por dois clients diferentes |
| 8 | 03 | MCP em TypeScript, resources, tools, prompts, transports | MCP expondo um sistema real seu (leitura apenas) |
| 9 | 03 | Segurança: auth, service tokens, rate limit, WAF | **Projeto 3:** MCP em produção, autenticado e com rate limit |
| 10 | 04 | Agent loop, planner/executor/memory/toolbox, tipos de agente | Agente ReAct escrito do zero, sem framework |
| 11 | 04 | ReAct vs Plan-and-Execute, Reflection, function calling, schemas | O mesmo agente reescrito em LangGraph; comparativo honesto |
| 12 | 04 | Memória (curta, longa, episódica), context pruning e stitching | Agente que lembra entre sessões via embeddings |
| 13 | 04 | Observabilidade, guardrails, human-in-the-loop, multi-agent | **Projeto 4:** agente autônomo completo com trilha de auditoria |

**Marco da fase 2:** um agente seu roda sem supervisão por uma tarefa inteira e você consegue provar
*por que* ele fez cada coisa.

---

## Fase 3 — Aplicação por domínio (semanas 14 a 20)

**Objetivo da fase:** aplicar IA nas três áreas onde o dinheiro está — produto, infra e gestão.

| Semana | Módulo | Foco | Entrega |
|---|---|---|---|
| 14 | 05 | AI-driven UX/UI, text-to-UI, Figma → código | Tela real gerada por IA, refinada à mão, com diff comentado |
| 15 | 05 | Agentes de codificação, CLI, E2E com MCP, IA no cliente e servidor | **Projeto 5:** feature de front construída via agente + teste E2E autônomo |
| 16 | 06 | LLMs para infra, IaC copilot, Terraform/Helm, policy-as-code | Copiloto que gera e valida IaC com `plan` + OPA |
| 17 | 06 | Kubernetes, troubleshooting ReAct, AIOps, PromQL/LogQL, anomalias | Diagnóstico automático de um incidente simulado |
| 18 | 06 | ChatOps, aprovação humana, segurança, CI/CD, FinOps, runbooks | **Projeto 6:** bot de ChatOps com `/deploy` e gate de aprovação |
| 19 | 07 | Requirements copilot, priorização (RICE/WSJF/MoSCoW), cronograma | Backlog real priorizado por IA, com justificativa auditável |
| 20 | 07 | Estimativas, Monte Carlo, riscos, reuniões, status report, OKRs | **Projeto 7:** automação que transforma atividade do repo em status report |

**Marco da fase 3:** três automações suas rodando sozinhas, cada uma economizando tempo mensurável.

---

## Fase 4 — Arquitetura, Modelos e Governança (semanas 21 a 28)

**Objetivo da fase:** decidir como um sistema de IA deve ser construído — e defender a decisão.

| Semana | Módulo | Foco | Entrega |
|---|---|---|---|
| 21 | 08 | Arquitetura AI-first, decision framework IA vs regra determinística | Documento decidindo, para 5 features suas, IA ou `if` |
| 22 | 08 | Single-agent, multi-agent, padrões de orquestração | Diagrama + protótipo de dois agentes negociando |
| 23 | 08 | RAG avançado, model router, semantic cache, HITL, stack enterprise | **Projeto 8:** roteador de modelos com semantic cache e corte de custo medido |
| 24 | 09 | Quando fazer fine-tuning (e quando não fazer) | Decision doc: RAG vs few-shot vs fine-tuning para um caso real |
| 25 | 09 | Datasets, JSONL, limpeza, balanceamento | Dataset limpo e versionado a partir de dados seus |
| 26 | 09 | Fine-tuning via API, LoRA/PEFT, avaliação, A/B, overfitting | **Projeto 9:** modelo fine-tunado vencendo o baseline em métrica declarada |
| 27 | 10 | Governança, interpretabilidade, viés, riscos humanos e éticos | Política de uso de IA para a sua operação |
| 28 | 10 | Riscos de dados, aspectos legais (LGPD/AI Act), custo financeiro | **Projeto 10:** auditoria de IA de um sistema seu, com plano de correção |

**Marco da fase 4:** você consegue sustentar uma decisão de arquitetura de IA numa sala com gente
técnica e gente de negócio ao mesmo tempo.

---

## Fase 5 — Capstone e Carreira (semanas 29 a 32)

| Semana | Módulo | Foco | Entrega |
|---|---|---|---|
| 29 | 11 | Ideação, escopo, arquitetura, backlog do micro-SaaS | Documento de arquitetura + backlog priorizado |
| 30 | 11 | RAG + agente principal (CLI de validação) | **Entrega 1:** núcleo de inteligência funcionando |
| 31 | 11 | Back-end, API, MCP habilitado, orquestração | **Entrega 2:** API documentada + MCP validado por um client externo |
| 32 | 11 | Front-end, CI/CD, deploy, apresentação e defesa | **Entrega 3:** micro-SaaS no ar + defesa técnica gravada |

O **módulo 12 (Carreira)** é contínuo: 30 minutos por semana, do início ao fim. Ver
[modulos/12-carreira/](modulos/12-carreira/) para o cronograma paralelo.

---

## Trilha acelerada — 16 semanas

Se der para investir 18–20h/semana, comprima assim (mantendo todos os projetos):

| Semanas | Módulos |
|---|---|
| 1–3 | 01 + 02 |
| 4–6 | 03 + 04 |
| 7–9 | 04 (conclusão) + 05 + 06 |
| 10–11 | 06 (conclusão) + 07 |
| 12–13 | 08 + 09 |
| 14 | 10 |
| 15–16 | 11 (capstone) |

**O que não comprimir:** os projetos 3 (MCP em produção), 4 (agente autônomo) e 11 (capstone). São os
que viram portfólio. Os outros podem ficar em versão mínima.

---

## Controle de progresso

Três lugares, sem duplicar esforço:

1. **Site do curso** — marque as aulas concluídas (salva no navegador)
2. **Repositório `estudos-ia`** — um commit por exercício; o histórico é a prova
3. **`notas/semana-NN.md`** — o que aprendeu, o que travou, o que ficou pendente

Se um item ficar 2 semanas pendente, ele vira dívida: pare e resolva antes de seguir.
