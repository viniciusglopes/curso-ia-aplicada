# Engenharia de Software em IA Aplicada — Curso Autodidata

Curso completo, estruturado a partir da ementa de *Engenharia de Software em IA Aplicada*, adaptado
para estudo autônomo com **projetos reais** em vez de exercícios de brinquedo.

> **Premissa deste curso:** você não aprende IA aplicada assistindo aula. Você aprende construindo
> sistemas que quebram em produção e consertando eles. Cada módulo termina com algo rodando.

---

## Como este curso é diferente da ementa original

| Ementa original | Aqui |
|---|---|
| 12 módulos temáticos | Os mesmos 12 módulos, com ordem de estudo e dependências explícitas |
| Exercícios genéricos | Projetos ancorados em sistemas que você já opera (disparo WhatsApp, painel, bots) |
| Sem calendário | Plano de 32 semanas com carga semanal e entregas datadas |
| Sem critério de "aprendi" | Checklist de domínio + perguntas de entrevista por módulo |
| Angular no capstone | Next.js recomendado (seu stack), Angular como alternativa |

---

## Índice dos módulos

| # | Módulo | Semanas | Entrega |
|---|---|---|---|
| [01](modulos/01-fundamentos-llm/) | Fundamentos de IA e LLMs para Programadores | 1–3 | Rede neural do zero + primeiro RAG |
| [02](modulos/02-apis-generativas/) | APIs de IA Generativa e Prompt Engineering | 4–6 | Camada de LLM com cache, retry e observabilidade |
| [03](modulos/03-mcp/) | MCP — Model Context Protocol | 7–9 | MCP server em produção expondo um sistema real |
| [04](modulos/04-agentes-autonomos/) | Criação de Agentes Autônomos | 10–13 | Agente com memória, ferramentas e guardrails |
| [05](modulos/05-ux-ui/) | Ferramentas de IA para UX & UI | 14–15 | Feature de front-end gerada e validada por agente |
| [06](modulos/06-devops/) | Ferramentas de IA para DevOps | 16–18 | Copiloto de diagnóstico + ChatOps com aprovação |
| [07](modulos/07-gestao-projetos/) | Ferramentas de IA para Gestão de Projetos | 19–20 | Automação de backlog e status report |
| [08](modulos/08-arquitetura/) | Arquitetura de Sistemas com IA | 21–23 | Documento de arquitetura AI-first + roteador de modelos |
| [09](modulos/09-fine-tuning/) | Processamento de Dados e Fine-Tuning | 24–26 | Modelo customizado avaliado contra baseline |
| [10](modulos/10-seguranca-governanca/) | Segurança e Governança em IA | 27–28 | Política de IA + auditoria de um sistema seu |
| [11](modulos/11-capstone/) | Projeto Integrador (Capstone) | 29–32 | Micro-SaaS de IA no ar, com MCP e CI/CD |
| [12](modulos/12-carreira/) | Carreira e Entrevistas | contínuo | Portfólio, LinkedIn e simulados de entrevista |

---

## Documentos de apoio

- **[PLANO-DE-ESTUDOS.md](PLANO-DE-ESTUDOS.md)** — calendário de 32 semanas, carga horária, trilha acelerada de 16 semanas
- **[COMO-ESTUDAR.md](COMO-ESTUDAR.md)** — método de estudo, setup do ambiente, como usar IA para aprender sem virar dependente
- **[projetos/](projetos/)** — especificação dos 12 entregáveis + capstone
- **[recursos/GLOSSARIO.md](recursos/GLOSSARIO.md)** — termos que aparecem o curso inteiro
- **[recursos/LINKS.md](recursos/LINKS.md)** — documentação oficial, papers e repositórios de referência
- **[recursos/PROMPTS.md](recursos/PROMPTS.md)** — biblioteca de prompts para estudar, revisar e ser questionado
- **[recursos/CERTIFICACOES.md](recursos/CERTIFICACOES.md)** — o que existe de certificação de IA e o que vale a pena
- **[recursos/PLANO-GENAI-LEADER.md](recursos/PLANO-GENAI-LEADER.md)** — trilha paralela de 3 semanas para o Google Cloud Generative AI Leader

---

## Site de acompanhamento

O diretório [`site/`](site/) é um painel estático que lista todas as aulas, projetos e checklists com
marcação de progresso salva no navegador (localStorage). É o que sobe no Coolify.

Rodar local:

```bash
cd site && python3 -m http.server 8080
# http://localhost:8080
```

---

## Stack do curso

| Camada | Escolha | Por quê |
|---|---|---|
| Linguagem | TypeScript / Node 20+ | A ementa é JS-first e é o seu stack |
| LLM APIs | Anthropic, OpenAI, Google Gemini, OpenRouter | Cobre proprietário + roteamento |
| Local | Ollama | Rodar modelo aberto sem custo por token |
| Vetores | Postgres + pgvector (Supabase) | Você já opera Supabase; evita mais um serviço |
| Orquestração | LangChain / LangGraph + SDK cru | Framework *e* o que ele esconde |
| Protocolo | `@modelcontextprotocol/sdk` | MCP oficial |
| Front | Next.js (alternativa: Angular, como na ementa) | Seu stack de produção |
| Deploy | Coolify (VPS) + Vercel | O que você já usa |

---

## Regra de ouro

**Nenhum módulo é dado por concluído sem o artefato no repositório.** Ler ≠ aprender. O checklist de
domínio de cada módulo existe para você ser honesto consigo mesmo antes de avançar.
