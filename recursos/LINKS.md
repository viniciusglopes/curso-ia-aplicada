# Links e referências

Curadoria por módulo. Prefira sempre a documentação oficial ao blog post.

## Documentação oficial (consulta constante)

- **Anthropic** — docs.anthropic.com · prompt engineering, tool use, prompt caching
- **OpenAI** — platform.openai.com/docs · API, structured outputs, fine-tuning
- **Google AI** — ai.google.dev · Gemini, contexto longo, multimodal
- **OpenRouter** — openrouter.ai/docs · roteamento e comparativo de preço
- **Ollama** — ollama.com · modelos locais
- **MCP** — modelcontextprotocol.io · especificação, SDKs, inspector
- **LangChain / LangGraph** — python.langchain.com e langchain-ai.github.io/langgraphjs
- **pgvector** — github.com/pgvector/pgvector · índices e operadores

## Papers que valem a leitura

| Paper | Por quê |
|---|---|
| *Attention Is All You Need* (2017) | A arquitetura de tudo |
| *RAG* — Lewis et al. (2020) | A origem do padrão |
| *ReAct* (2022) | O padrão de agente mais usado |
| *Reflexion* (2023) | Auto-correção de agentes |
| *LoRA* (2021) | Fine-tuning eficiente |
| *Chain-of-Thought Prompting* (2022) | Por que "pense passo a passo" funciona |
| *Self-RAG* (2023) | RAG que decide quando buscar |

## Leituras de engenharia

- **Building Effective Agents** (Anthropic) — curto, sem hype, obrigatório antes do módulo 04
- **The Bitter Lesson** (Rich Sutton) — muda como você escolhe abordagem
- **OWASP Top 10 for LLM Applications** — segurança concreta, módulo 10
- **NIST AI Risk Management Framework** — governança aplicável
- **Google SRE Book** — post-mortem e gestão de incidente, módulo 06

## Vídeo

- **3Blue1Brown** — série Neural Networks: a melhor intuição visual de redes neurais
- **Andrej Karpathy** — *Let's build GPT: from scratch* e *Intro to LLMs*

## Ferramentas por módulo

| Módulo | Ferramentas |
|---|---|
| 01 | TensorFlow.js, tiktoken, Ollama, pgvector |
| 02 | Zod, Langfuse, Vercel AI SDK, Bruno |
| 03 | `@modelcontextprotocol/sdk`, MCP Inspector |
| 04 | LangGraph, CrewAI, AutoGen |
| 05 | v0, Figma, Playwright, transformers.js |
| 06 | Terraform, OPA, k8sgpt, Infracost, Trivy, Grafana |
| 07 | APIs de Jira, Notion, ClickUp, Linear, Telegram |
| 08 | Langfuse, Redis, pgvector |
| 09 | APIs de fine-tuning, Hugging Face PEFT |
| 10 | Garak, OWASP LLM checklist |

## Comunidades

- Discords de LangChain e de MCP
- Comunidades brasileiras de IA e dados
- r/LocalLLaMA — o melhor lugar para acompanhar modelos abertos
- Hugging Face — modelos, datasets e discussões

## Onde acompanhar novidade sem se afogar

Escolha **duas** fontes e ignore o resto. O campo produz mais ruído do que qualquer pessoa consegue
ler, e tentar acompanhar tudo é a forma mais eficiente de não aprender nada com profundidade.

Sugestão: o blog de engenharia de um laboratório (Anthropic ou OpenAI) + uma newsletter semanal
curada.
