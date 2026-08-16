# Módulo 04 — Criação de Agentes Autônomos

**Semanas 10 a 13 · ≈ 40h · Pré-requisitos: módulos 01, 02 e 03**

O módulo mais denso do curso. É também o que mais vale no mercado.

---

## Ao final deste módulo você será capaz de

1. Implementar um agent loop do zero e explicar cada componente
2. Escolher entre ReAct, Plan-and-Execute e Reflection com critério
3. Projetar memória de agente que não estoura contexto nem esquece o que importa
4. Orquestrar múltiplos agentes com LangGraph
5. Colocar guardrails que impedem loop infinito, gasto descontrolado e ação irreversível
6. Auditar e explicar cada decisão que o agente tomou

---

## Unidade 1 — Arquitetura de agents (semana 10)

### O agent loop
```
percepção → raciocínio → ação → observação → (repete até objetivo ou limite)
```
A diferença para um pipeline é uma só: **quem decide o próximo passo é o modelo, não o seu código.**
Isso traz poder e traz todos os problemas do módulo.

### Estrutura interna
- **Planner** — decide o que fazer agora
- **Executor** — executa a ação escolhida
- **Memory store** — o que lembrar entre passos e entre sessões
- **Toolbox** — o que ele pode fazer (aqui entra o MCP do módulo 03)

### Tipos de agente
| Tipo | Característica | Exemplo |
|---|---|---|
| Task-based | Tarefa definida, fim claro | "Gere o relatório de ontem" |
| Interactive | Humano no meio o tempo todo | Copiloto de código |
| Goal-oriented | Objetivo, caminho livre | "Reduza a fila de pendentes" |
| Autonomous | Roda sem supervisão | Monitor que corrige sozinho |

O risco cresce na mesma ordem. A quantidade de guardrail necessária também.

**Exercício 10.1 (entrega da semana):** implemente um agent loop em TypeScript **sem framework**:
loop de mensagens, function calling nativo, 3 ferramentas reais, limite de iterações e log de cada
passo. Se você não consegue fazer isso na mão, framework nenhum vai te salvar depois.

---

## Unidade 2 — Padrões de raciocínio (semana 11)

### ReAct — Reasoning + Acting
Alterna pensamento e ação: `Thought → Action → Observation → Thought → ...`
Bom para: exploração, diagnóstico, tarefa cujo caminho não dá para prever.
Ruim para: tarefa longa e conhecida — ele repensa a cada passo e desperdiça token.

### Plan-and-Execute
Planeja tudo primeiro, executa depois. Mais barato e previsível; sofre quando a realidade contraria o
plano. Mitigação: replanejamento quando um passo falha.

### Reflection
O agente critica a própria saída antes de entregar. Ganho de qualidade real em geração de código e de
texto; custa uma chamada a mais por ciclo. **Cuidado:** reflection sem critério vira auto-elogio —
dê ao crítico um checklist objetivo, não "avalie se está bom".

### Comparativo
| Cenário | Padrão |
|---|---|
| Diagnóstico de incidente | ReAct |
| Pipeline de dados conhecido | Plan-and-Execute |
| Geração de código | Plan-and-Execute + Reflection |
| Pesquisa exploratória | ReAct + memória |
| Tarefa crítica com custo de erro alto | Qualquer um + human-in-the-loop |

**Exercício 11.1 (entrega da semana):** reescreva o agente da semana 10 em **LangGraph**. Compare
linha de código, legibilidade, facilidade de debugar e custo por execução. Escreva sua conclusão —
inclusive se a conclusão for "não valeu".

---

## Unidade 3 — Function calling e tool use (semana 11)

- Como o modelo escolhe uma ferramenta: ele não "executa", ele **pede** que você execute
- Design de schema JSON: descrição, tipos, enums, obrigatoriedade, valor padrão
- Chamadas paralelas de ferramenta: quando o modelo pede várias de uma vez
- Erro de ferramenta como sinal de aprendizado: devolva mensagem que permita correção
- Conectar a REST, banco, automações e MCP

**Regra de ouro:** toda ferramenta com efeito colateral precisa de (a) confirmação, (b) dry-run, ou
(c) reversibilidade. Sem uma das três, ela não entra no toolbox de um agente autônomo.

---

## Unidade 4 — Memória e reflexão (semana 12)

### Tipos de memória
| Tipo | Vive onde | Exemplo |
|---|---|---|
| Curta | Janela de contexto | Conversa atual |
| Longa | Banco vetorial | "O cliente prefere contato por WhatsApp" |
| Episódica | Log estruturado | "Na execução de ontem, a tool X falhou" |
| Contextual | Estado da sessão | Tenant, permissões, objetivo corrente |

### Estratégias
- Escrever memória: o que vale guardar (fato durável), o que não vale (ruído da conversa)
- Recuperar: busca vetorial + recência + relevância declarada
- Consolidar: resumir episódios antigos em fatos; sem isso a memória vira lixão
- Conflito: memória antiga contradiz a nova — a mais recente vence, e você registra a mudança

### Reflection loops
Agente revisa a própria execução e ajusta comportamento futuro. Casos: assistente pessoal, debugging
automatizado, aprendizado incremental sobre um domínio.

**Exercício 12.1 (entrega da semana):** dê memória persistente ao seu agente. Requisitos: sobrevive a
restart, não cresce indefinidamente (política de consolidação), e você consegue listar e apagar o que
ele lembra. O último requisito é LGPD, não capricho — volta no módulo 10.

---

## Unidade 5 — Gerenciamento de contexto (semana 12)

- **Contexto ativo**: o que está na janela agora e por quê
- **Context pruning**: remover o irrelevante — mensagens antigas, saídas gigantes de ferramenta,
  raciocínio já consumido
- **Context stitching**: costurar pedaços de fontes diferentes preservando coerência
- Contexto compartilhado entre agentes: quadro-negro comum vs mensagem ponto a ponto
- Global (memória coletiva) vs local (memória individual) — e o custo de sincronizar

Sintoma clássico: o agente "esquece" a instrução inicial depois de 20 passos. Causa: a instrução foi
empurrada para longe pelo acúmulo de observações. Cura: reinjetar o objetivo a cada N passos.

---

## Unidade 6 — LangGraph e workflows complexos (semana 13)

- Grafo de execução: nós, arestas, estado compartilhado, arestas condicionais
- Controle de dependência e paralelismo
- Roteamento de tarefa, fallback handler e retry por nó
- Checkpointing: retomar de onde parou depois de falha
- Human-in-the-loop como nó do grafo, não como gambiarra
- Monitoramento e depuração de grafo em execução

---

## Unidade 7 — Observabilidade e limites de autonomia (semana 13)

Sem isto, agente autônomo é passivo, não ativo.

- **Métricas**: passos por execução, tokens por execução, taxa de sucesso, taxa de intervenção humana,
  custo por tarefa concluída, tempo até conclusão
- **Trilha de auditoria**: para cada decisão — o que ele viu, o que concluiu, o que fez, o que voltou
- **Guardrails obrigatórios**:
  - teto de iterações
  - teto de custo por execução (e por dia)
  - lista de ações permitidas (allowlist, nunca blocklist)
  - detecção de repetição (mesma ação, mesmo argumento → pare)
  - timeout global
  - kill switch acessível sem deploy
- **Human-in-the-loop**: aprovação obrigatória para ação irreversível, custosa ou externa
- **Escopo e ética**: o que o agente nunca pode fazer, escrito antes de ele existir
- **Runaway loops**: o modo de falha mais caro. Agente que chama API em loop numa madrugada gera
  fatura e, se a API for de terceiro, incidente com terceiro

---

## Unidade 8 — Projeto prático (semana 13)

## 🎯 Projeto 4 — Agente autônomo completo

**Spec em [../../projetos/04-agente-autonomo.md](../../projetos/04-agente-autonomo.md).**

Critérios de aceite:
- [ ] Planejamento adaptativo (replaneja quando um passo falha)
- [ ] Execução via APIs externas reais
- [ ] Memória persistente com consolidação
- [ ] Log completo com trilha de auditoria consultável
- [ ] Todos os guardrails da unidade 7 implementados
- [ ] Orquestração em LangGraph
- [ ] Métricas de eficácia, autonomia e resiliência medidas em 10 execuções reais
- [ ] Um relatório dizendo onde ele falhou — projeto sem falha registrada é projeto não testado

---

## Unidade 9 — Sistemas multi-agente

- Colaboração: orquestração, coordenação, negociação
- Padrões: **Supervisor** (um distribui), **Hierarchical** (árvore), **Group Chat** (todos veem tudo),
  **Delegation** (passa a bola), **Consensus** (votam)
- Comunicação assíncrona e troca de mensagens; fila entre agentes
- Quando multi-agente é a resposta errada: se um agente com boas ferramentas resolve, **use um**.
  Multi-agente multiplica custo, latência e modos de falha
- Referências práticas: CrewAI, AutoGen, subagentes do Claude Code, AutoGPT (histórico)

**Exercício 13.2:** mini sistema cooperativo — analista → planejador → executor — com supervisor
decidindo quando encerrar. Meça: quantos tokens custou a mais que a versão de agente único, e se a
qualidade compensou.

---

## ✅ Checklist de domínio

- [ ] Implemento um agent loop sem framework
- [ ] Escolho entre ReAct e Plan-and-Execute justificando
- [ ] Explico os 4 tipos de memória e onde cada uma vive
- [ ] Descrevo context pruning e por que o agente "esquece" o objetivo
- [ ] Listo 6 guardrails obrigatórios de agente autônomo
- [ ] Explico como auditar uma decisão autônoma depois do fato
- [ ] Digo quando multi-agente **não** vale a pena
- [ ] Sei estimar custo por tarefa concluída

---

## 💬 Perguntas de entrevista deste módulo

1. Seu agente entrou em loop e gastou 3 mil em uma noite. O que faltou? Cite 4 controles.
2. Como você garante que um agente não execute ação irreversível sem aprovação?
3. Quando você usaria multi-agente em vez de um agente com mais ferramentas?
4. Como funciona a memória de longo prazo de um agente? Como evitar que ela vire ruído?
5. O agente deu a resposta certa por um caminho errado. Como você descobre isso?
6. Qual a diferença prática entre agente e workflow com IA?

---

## 📚 Recursos

- *ReAct: Synergizing Reasoning and Acting in Language Models* — arxiv.org/abs/2210.03629
- *Reflexion: Language Agents with Verbal Reinforcement Learning* — arxiv.org/abs/2303.11366
- Documentação do LangGraph (conceitos, checkpointing, human-in-the-loop)
- *Building Effective Agents* (Anthropic) — leitura obrigatória, curta e sem hype
- CrewAI e AutoGen — para conhecer os padrões multi-agente na prática

---

**Anterior:** [Módulo 03](../03-mcp/) · **Próximo:** [Módulo 05 — IA para UX & UI](../05-ux-ui/)
