# Módulo 08 — Arquitetura de Sistemas com IA

**Semanas 21 a 23 · ≈ 30h · Pré-requisitos: módulos 01 a 06**

O módulo que separa quem *usa* IA de quem *projeta sistema* com IA. É também o conteúdo mais cobrado
em entrevista de nível sênior e acima.

---

## Ao final deste módulo você será capaz de

1. Decidir com critério quando usar IA e quando usar regra determinística
2. Escolher entre arquitetura single-agent e multi-agent e justificar
3. Aplicar padrões de RAG avançado, roteamento e cache com ganho medido
4. Projetar o stack completo de IA em produção
5. Defender trade-offs de latência, precisão, custo e resiliência numa sala mista

---

## Unidade 1 — Fundamentos de arquitetura AI-first (semana 21)

### Tradicional vs AI-driven
| | Sistema tradicional | Sistema com IA |
|---|---|---|
| Saída | Determinística | Probabilística |
| Teste | Assert de igualdade | Avaliação com faixa aceitável |
| Falha | Exceção clara | Resposta plausível e errada |
| Custo | Por infraestrutura | Por chamada, variável |
| Latência | Milissegundos | Segundos |
| Versionamento | Código | Código + prompt + modelo + dado |

Consequência prática: **você não pode tratar chamada de LLM como chamada de função.** Precisa de
timeout, fallback, avaliação contínua e orçamento.

### Os cinco padrões de design em sistemas inteligentes
1. **Prompting** — como a instrução é construída, versionada e testada
2. **Responsible AI** — viés, transparência, consentimento, limite de uso
3. **UX** — como o usuário percebe incerteza, espera e erro do modelo
4. **AI-Ops** — deploy, monitoramento, avaliação e rollback do comportamento
5. **Optimization** — custo, latência, cache, escolha de modelo

### Decision framework: IA ou regra determinística?

Use **regra determinística** quando: a entrada é estruturada, a regra é escrevível, o erro é caro, a
resposta precisa ser idêntica sempre, ou a latência precisa ser de milissegundos.

Use **IA** quando: a entrada é linguagem natural ou não estruturada, as variações são infinitas,
"aproximadamente certo" resolve, ou escrever a regra custaria mais que tolerar o erro.

Use **os dois** (o mais comum, e a resposta certa na maioria das entrevistas): IA extrai e interpreta,
regra valida e decide. Exemplo: LLM lê o boleto, regra confere se a soma bate e se a data é válida.

**Exercício 21.1 (entrega da semana 21):** pegue 5 features de sistemas seus e decida, para cada uma,
IA / regra / híbrido — com justificativa nos 4 eixos (latência, precisão, custo, performance). Pelo
menos uma conclusão deve ser "aqui IA foi a escolha errada".

---

## Unidade 2 — Arquiteturas single-agent (semana 22)

Padrões, do mais simples ao mais caro:

| Padrão | O que faz | Quando |
|---|---|---|
| **Reactive** | Entrada → resposta, sem estado | Classificação, extração |
| **Memory-Enhanced** | Lembra interações anteriores | Assistente contínuo |
| **Tool-Using** | Chama ferramentas externas | Consulta a sistema |
| **ReAct** | Alterna raciocínio e ação | Diagnóstico, exploração |
| **Self-Reflection** | Critica a própria saída | Geração de código e texto |

Contexto ideal do single-agent: tarefa curta, orçamento limitado, latência baixa. **Comece sempre
aqui.** Multi-agente é otimização, não ponto de partida.

**Exercício 22.1:** protótipo em TypeScript de um agente Tool-Using integrado a uma API sua, com
simulação de interação com usuário real.

---

## Unidade 3 — Arquiteturas multi-agent (semana 22)

Padrões de orquestração:
- **Sequential** — pipeline; cada um faz sua parte
- **Parallel** — vários atacam ao mesmo tempo, um consolida
- **Supervisor** — um distribui e cobra
- **Hierarchical** — supervisores de supervisores
- **Group Chat** — todos veem tudo (caro; contexto explode)
- **Handoff** — passa a conversa adiante com o contexto

Desafios distribuídos, que são os mesmos de sistema distribuído clássico com uma camada a mais de
não determinismo: falha de nó, coordenação, controle de estado, sincronização, e o pior deles —
**o erro de um agente vira entrada do outro e se propaga como se fosse verdade.**

**Exercício 22.2:** implemente comunicação entre múltiplos agentes usando fila de mensagens e chamada
assíncrona. Injete falha de propósito em um agente e observe a propagação. Depois adicione validação
entre etapas e meça a diferença.

---

## Unidade 4 — Padrões de design específicos de IA (semana 23)

### RAG avançado
| Padrão | O que resolve |
|---|---|
| **Basic** | Busca vetorial simples |
| **Hybrid Search** | Vetorial + full-text; recupera código, SKU, placa, nome próprio |
| **Multi-Index** | Fontes diferentes com estratégias diferentes |
| **Agentic RAG** | O agente decide o que buscar, reformula e busca de novo |

Complementos: query rewriting, re-ranking, HyDE, compressão de contexto.

### Roteamento inteligente
- **Model Router**: tarefa fácil vai para modelo barato, difícil para o caro. Redução típica de custo
  de 40% a 70% em produto real
- **Intent-Based Routing**: classifica a intenção e manda para o fluxo certo — às vezes o fluxo certo
  nem usa IA

### Cache
- **Prompt Cache** — prefixo estável reaproveitado pelo provedor
- **Semantic Cache** — pergunta semanticamente parecida devolve resposta guardada.
  ⚠ Cuidado: "qual meu saldo?" de dois usuários é semanticamente idêntico e a resposta é diferente.
  **A chave de cache precisa incluir o escopo do dado**
- **Response Streaming** — não reduz custo, melhora percepção

### Human-in-the-loop
- **Approval Gates** — ação sensível espera aprovação
- **Confidence Thresholds** — abaixo de X de confiança, escala para humano
- **Audit Trails** — tudo registrado e reconstituível

---

## Unidade 5 — Arquitetura enterprise (semana 23)

### Stack completo
```
Cliente
  ↓
API Gateway ......... autenticação, rate limit, quota por tenant
  ↓
Orquestração ........ fila, workers, roteamento de modelo, retry
  ↓
Serviços compartilhados
  ├── Prompt registry (versionado)
  ├── Vector store
  ├── Cache (prompt + semântico)
  ├── Tool/MCP layer
  └── Guardrails (entrada e saída)
  ↓
Provedores .......... múltiplos, com fallback
  ↓
Observabilidade ..... trace de prompt, custo, latência, avaliação contínua
```

### Princípios
- **Loose Coupling** — trocar de provedor não pode exigir refatorar o produto
- **Clear Interfaces** — o resto do sistema não sabe qual modelo está sendo usado
- **Policy-Driven Control** — o que pode ser chamado, por quem, com que limite: configuração, não código

### Observabilidade em IA
Rastreamento de prompt ponta a ponta, métrica de qualidade (não só de sistema), custo por
funcionalidade e por cliente, e **avaliação contínua** — um conjunto de casos que roda a cada mudança
de prompt ou de modelo. Sem isso, você troca de modelo e descobre a regressão pelo suporte.

### Implantação
Kubernetes, serverless e edge — e **Model Tiering**: definir níveis de modelo por criticidade e custo,
com política automática de escolha.

---

## 🎯 Projeto 8 — Roteador de modelos com cache semântico

**Entrega da semana 23.** Spec em [../../projetos/08-model-router.md](../../projetos/08-model-router.md).

Critérios de aceite:
- [ ] Classificador de complexidade roteando entre no mínimo 3 modelos
- [ ] Cache semântico com chave incluindo escopo de dado (com teste provando isolamento)
- [ ] Fallback entre provedores
- [ ] Métricas: custo antes/depois, latência p50/p95, qualidade em conjunto de avaliação
- [ ] **Redução de custo comprovada de no mínimo 40% sem queda mensurável de qualidade**
- [ ] Documento de arquitetura com diagrama e trade-offs assumidos

---

## ✅ Checklist de domínio

- [ ] Aplico o decision framework IA vs regra em qualquer feature
- [ ] Listo os 5 padrões de single-agent e o contexto de cada
- [ ] Explico 4 padrões de orquestração multi-agente e o custo de cada
- [ ] Diferencio Basic, Hybrid, Multi-Index e Agentic RAG
- [ ] Explico o risco de cache semântico com dado por usuário
- [ ] Desenho o stack enterprise de memória
- [ ] Explico Model Tiering e calculo a economia
- [ ] Defendo trade-offs de latência, precisão, custo e resiliência

---

## 💬 Perguntas de entrevista deste módulo

1. Desenhe a arquitetura de um assistente para 10 mil usuários simultâneos. Onde estão os gargalos?
2. Como você garante que trocar de modelo não quebre o produto?
3. Quando multi-agente compensa o custo extra?
4. Como implementar cache semântico sem vazar dado entre usuários?
5. Latência p95 de 8s, orçamento de 5 mil por mês, precisão exigida de 95%. Que arquitetura?
6. Como você versiona o comportamento de um sistema de IA?

---

## 📚 Recursos

- *Designing Data-Intensive Applications* — os fundamentos distribuídos continuam valendo
- Documentação de arquitetura de IA da AWS, Azure e Google Cloud (padrões, não produtos)
- *Building Effective Agents* (Anthropic)
- Papers de RAG: original (Lewis et al., 2020), HyDE, Self-RAG

---

**Anterior:** [Módulo 07](../07-gestao-projetos/) · **Próximo:** [Módulo 09 — Fine-Tuning](../09-fine-tuning/)
