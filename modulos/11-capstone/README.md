# Módulo 11 — Projeto Integrador (Capstone): Micro-SaaS de IA

**Semanas 29 a 32 · ≈ 50h · Pré-requisitos: todos os módulos anteriores**

Este é o projeto que você mostra em entrevista. Tudo que veio antes existe para viabilizar ele.

---

## Regras do capstone

1. **Precisa estar no ar.** Link público que qualquer pessoa abre. Localhost não conta
2. **Precisa resolver problema real** — de preferência um que você mesmo tenha
3. **Precisa ter RAG e agente.** É o núcleo técnico avaliado
4. **Precisa expor MCP.** É o diferencial que quase nenhum portfólio tem
5. **Precisa ter CI/CD.** Push na main → deploy
6. **Precisa de documentação.** README, diagrama de arquitetura, instruções de uso

---

## Unidade 1 — Ideação e arquitetura (semana 29)

### Definição do problema
- Problema em uma frase, sem citar tecnologia. Se você precisa dizer "com IA" para o problema fazer
  sentido, o problema está errado
- Público-alvo específico. "Empresas" não é público-alvo
- Proposta de valor: o que a pessoa consegue fazer que hoje não consegue, ou consegue em muito menos
  tempo
- Viabilidade: existe dado? existe disposição a pagar? você consegue construir em 4 semanas?

### Ideias que se encaixam bem (todas com dado que você já tem)
| Ideia | RAG sobre | Agente faz |
|---|---|---|
| Copiloto de operação de cobrança | Runbooks, histórico de disparo, regras por regional | Diagnostica bloco travado e propõe ação |
| Assistente de licitação / edital | Editais e propostas anteriores | Lê edital novo e aponta risco e requisito |
| Analista de contrato | Contratos e cláusulas padrão | Compara contrato novo com o padrão e sinaliza divergência |
| Copiloto de suporte | Base de conhecimento e tickets resolvidos | Responde e escala quando não sabe |

### Arquitetura
Documente **antes de codar**: front, back, componentes de IA (RAG, agentes, orquestração), banco,
fila, provedores, e onde ficam os guardrails. Use o stack enterprise do módulo 08 como referência e
corte o que não precisa — arquitetura boa é a menor que resolve.

### Planejamento
Milestones das 4 semanas, backlog inicial priorizado (módulo 07), stack definida e justificada.

**Entrega da semana 29:** documento de arquitetura + diagrama + backlog priorizado.

---

## Unidade 2 — Núcleo de inteligência: RAG e agente (semana 30)

- Implementação do RAG: ingestão, chunking, embeddings, índice, busca
- Seleção e configuração do vector database (Postgres + pgvector é a recomendação do curso)
- Agente principal consumindo o RAG para responder consultas complexas
- Estratégia de avaliação: conjunto de perguntas com resposta esperada, rodando a cada mudança

**📦 Entrega 1:** protótipo funcional do RAG com **CLI** para validar a lógica sem interface no
caminho. Interface esconde erro de lógica — por isso a CLI vem primeiro.

Critérios:
- [ ] Ingestão idempotente e reprocessável
- [ ] Busca híbrida (vetorial + full-text)
- [ ] Agente com ferramentas, respondendo com citação de fonte
- [ ] Conjunto de avaliação com no mínimo 20 perguntas e resultado registrado
- [ ] Custo por consulta medido

---

## Unidade 3 — Back-end, MCP e orquestração (semana 31)

- API do back-end: autenticação, autorização por tenant, rate limit, quota
- **Ponte IA-UI**: habilitar MCP na aplicação, expondo as capacidades do serviço de forma padronizada
  para agentes externos
- Orquestração de múltiplos agentes ou LLMs (LangGraph, ADK ou o seu próprio orquestrador)
- Observabilidade ligada desde o primeiro dia

**📦 Entrega 2:** API documentada e funcional + MCP habilitado e validado por um client externo.

Critérios:
- [ ] OpenAPI ou documentação equivalente
- [ ] Autenticação e isolamento por tenant, com teste provando
- [ ] MCP com no mínimo 4 tools e 1 resource
- [ ] Um client externo (Claude Desktop, Cursor ou script próprio) operando o produto via MCP
- [ ] Tracing de prompt e custo funcionando

---

## Unidade 4 — Front-end, interação e deploy (semana 32)

- Interface do micro-SaaS. **A ementa original pede Angular**; este curso recomenda **Next.js** por
  ser o seu stack — escolha e justifique no documento de arquitetura
- Integração do front com as APIs de IA do back
- Validação do MCP: provar que um agente interage corretamente com a aplicação pelo protocolo
- Pipeline de CI/CD e implantação (Coolify ou Vercel)

**📦 Entrega 3:** solução completa no ar, com UI funcional e demonstração de agente interagindo via MCP.

Critérios:
- [ ] URL pública acessível
- [ ] Streaming de resposta e estados de carregamento e erro tratados
- [ ] CI/CD: push na main dispara deploy
- [ ] Variáveis de ambiente e segredos fora do repositório
- [ ] Rate limit por usuário funcionando
- [ ] Vídeo de 2 minutos demonstrando o fluxo principal + a interação via MCP

---

## Unidade 5 — Apresentação e defesa técnica (semana 32)

### Estrutura da apresentação (10 minutos)
1. **Problema** (1 min) — quem sofre e quanto custa
2. **Solução** (1 min) — o que o produto faz
3. **Demo ao vivo** (4 min) — o fluxo principal, funcionando
4. **Arquitetura** (2 min) — diagrama e as 3 decisões mais difíceis
5. **Resultados** (1 min) — métricas, custo, limitações conhecidas
6. **Próximos passos** (1 min)

### Defesa técnica — prepare-se para
- Por que essa arquitetura e não outra?
- Por que esse modelo? Quanto custa por mil usuários?
- Como você impede prompt injection?
- O que quebra primeiro se o uso multiplicar por 100?
- Onde a IA está errando hoje? (Se disser "em lugar nenhum", você não testou)
- O que você faria diferente recomeçando?

### Documentação final
README claro (o que é, como rodar, como usar), diagrama de arquitetura, ADRs das decisões
importantes, e limitações declaradas por escrito.

---

## Avaliação final

| Critério | Peso | O que se avalia |
|---|---|---|
| Complexidade técnica | 20% | RAG, agentes, MCP, orquestração integrados de verdade |
| Funcionalidade | 20% | Funciona, no ar, com fluxo completo |
| Qualidade do código | 20% | Estrutura, testes, tratamento de erro, segurança |
| Apresentação | 20% | Clareza, demo, storytelling |
| Defesa técnica | 20% | Justificar decisão e reconhecer limitação |

**Nota de corte pessoal:** se você não mostraria esse projeto para um CTO que você respeita, ele não
está pronto.

---

## ✅ Checklist final do capstone

- [ ] Problema real, com público-alvo específico
- [ ] RAG funcionando com avaliação medida
- [ ] Agente com ferramentas e guardrails
- [ ] MCP exposto e validado por client externo
- [ ] API autenticada com isolamento por tenant
- [ ] Front no ar com URL pública
- [ ] CI/CD ativo
- [ ] Observabilidade: custo, latência e trace
- [ ] Segurança: segredos protegidos, rate limit, guardrails de entrada e saída
- [ ] README + diagrama + ADRs
- [ ] Vídeo de demonstração
- [ ] Apresentação de 10 minutos ensaiada

---

**Anterior:** [Módulo 10](../10-seguranca-governanca/) · **Próximo:** [Módulo 12 — Carreira](../12-carreira/)
