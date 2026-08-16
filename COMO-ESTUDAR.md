# Como estudar este curso

## 1. O método

Quatro passos por tópico. Nenhum é opcional.

### Passo 1 — Contexto antes do detalhe (20% do tempo)
Antes de abrir documentação, responda em uma frase: **que problema essa técnica resolve, e o que as
pessoas faziam antes dela existir?** Se você não sabe o que veio antes, não vai saber quando *não*
usar. Anote a resposta. Você vai reler no fim do módulo e às vezes vai rir.

### Passo 2 — Construir a versão feia (50% do tempo)
Implemente sem framework primeiro. RAG antes do LangChain. Agent loop antes do LangGraph. Function
calling na mão antes do SDK de agentes.

O motivo é prático: **framework de IA quebra em produção e o stack trace não te ajuda.** Quem
implementou a versão crua debuga em minutos; quem só usou o framework abre issue e espera.

### Passo 3 — Quebrar de propósito (20% do tempo)
Para cada coisa que funcionou, faça funcionar errado:
- Estoure o contexto e veja o que o modelo esquece
- Corte a internet no meio de um agente e veja o estado que ele deixa
- Passe um schema inválido no function calling
- Mande o RAG buscar algo que não está na base e veja se ele inventa

**Anote o comportamento.** Metade das perguntas de entrevista sênior é sobre modos de falha.

### Passo 4 — Explicar sem consultar (10% do tempo)
Feche tudo e escreva a explicação em `notas/`. Se travar, você não aprendeu — voltou ao passo 2.
Essas notas viram os posts do módulo 12.

---

## 2. Como usar IA para aprender (sem virar dependente)

Você vai estudar IA usando IA. Isso é uma armadilha: dá para "terminar" o curso inteiro sem aprender
nada, aceitando código gerado. Regras:

| Permitido | Proibido |
|---|---|
| Pedir para a IA **te questionar** sobre o tema | Pedir a solução do exercício antes de tentar |
| Pedir explicação de um erro **depois** de você ler o stack trace | Colar o erro sem ler |
| Pedir revisão do seu código **depois** de funcionar | Pedir o código do projeto do módulo |
| Pedir 3 abordagens alternativas para comparar | Aceitar a primeira sem entender |
| Gerar boilerplate, tipos, testes repetitivos | Gerar a lógica de negócio central |

Prompts prontos para estudo em [recursos/PROMPTS.md](recursos/PROMPTS.md) — inclusive um modo
"professor socrático" que se recusa a dar a resposta.

**Teste honesto:** se apagarem sua conexão com a internet, você consegue explicar no quadro branco o
que construiu essa semana? Se não, refaça.

---

## 3. Setup do ambiente

### Base

```bash
# Node 20+ (via nvm)
nvm install 20 && nvm use 20
npm i -g pnpm tsx typescript

# Repositório de exercícios (separado deste)
mkdir estudos-ia && cd estudos-ia && pnpm init && git init
pnpm add -D typescript tsx @types/node vitest
pnpm add dotenv zod
```

### Chaves de API

Crie `.env` (e **coloque no `.gitignore` antes de qualquer commit**):

```env
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=
OPENROUTER_API_KEY=
DATABASE_URL=postgres://...
```

Onde pegar:
- **Anthropic** — console.anthropic.com
- **OpenAI** — platform.openai.com
- **Google Gemini** — aistudio.google.com (tem tier gratuito generoso)
- **OpenRouter** — openrouter.ai (um token, dezenas de modelos, ótimo para comparar)

**Ponha limite de gasto mensal em todas.** Um loop de agente mal fechado às 2h da manhã custa caro —
é literalmente conteúdo do módulo 04 (runaway loops).

### Modelo local

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:7b       # bom custo-benefício de qualidade/RAM
ollama pull nomic-embed-text # embeddings locais, sem custo por token
```

### Banco vetorial

Use um projeto Supabase novo (não o de produção):

```sql
create extension if not exists vector;

create table documentos (
  id bigserial primary key,
  conteudo text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(768)          -- 768 = nomic-embed-text; 1536 = text-embedding-3-small
);

create index on documentos using hnsw (embedding vector_cosine_ops);
```

### Ferramentas de apoio

- **Cursor** ou **VS Code + Claude Code** — módulo 01 cobre `.cursor/rules` e equivalentes
- **Langfuse** (self-hosted no seu Coolify) ou **LangSmith** — tracing de LLM, usado a partir do módulo 02
- **Bruno** ou **Insomnia** — testar APIs de LLM na mão antes de escrever cliente

---

## 4. Estrutura sugerida do repositório de exercícios

```
estudos-ia/
├── semana-01/
├── semana-02/
├── ...
├── projetos/
│   ├── 01-rag-basico/
│   ├── 02-llm-core/
│   └── ...
├── notas/
│   ├── semana-01.md
│   └── ...
└── custos.md          # quanto gastou por semana, por provedor
```

`custos.md` parece burocracia até a semana 6, quando você percebe que consegue responder em
entrevista "quanto custa rodar isso em escala" com número real em vez de chute.

---

## 5. Quando pedir ajuda

Regra dos 30 minutos: travou 30 minutos no *mesmo* erro, sem hipótese nova? Pare de tentar e faça
nesta ordem:

1. Leia a mensagem de erro inteira, em voz alta
2. Isole em 10 linhas que reproduzem o problema
3. Procure na documentação oficial (não em blog)
4. Só então pergunte — e pergunte com o repro de 10 linhas em mãos

Esse é exatamente o processo do módulo 06 (troubleshooting com ReAct). Você está treinando o método
que depois vai automatizar.

---

## 6. Critério de conclusão de módulo

Um módulo está concluído quando as **quatro** condições valem:

- [ ] Todos os exercícios commitados
- [ ] Projeto do módulo funcionando e com README próprio
- [ ] Checklist de domínio respondido **sem consultar** o material
- [ ] Você consegue responder às perguntas de entrevista do módulo em voz alta, em 2 minutos cada

Três de quatro não é concluído. É o terceiro item que as pessoas pulam — e é o que separa quem
"fez o curso" de quem sabe.
