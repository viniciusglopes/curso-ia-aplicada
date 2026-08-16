# Módulo 02 — APIs de IA Generativa e Prompt Engineering

**Semanas 4 a 6 · ≈ 30h · Pré-requisito: módulo 01**

---

## Ao final deste módulo você será capaz de

1. Escolher provedor e modelo por critério técnico e de custo, não por moda
2. Encadear prompts para tarefas que um prompt só não resolve
3. Reduzir alucinação com técnica, não com "por favor não invente"
4. Projetar chamadas de API pensando em custo desde o desenho
5. Instrumentar uma aplicação de IA para saber o que aconteceu quando der errado
6. Trabalhar com texto, imagem, áudio e vídeo no mesmo fluxo

---

## Semana 4 — Mercado, provedores e multimodalidade

### 4.1 Panorama do mercado de IA como serviço
- Empresas chamadas de "ChatGPT wrapper" que levantaram capital relevante — e o que elas realmente
  têm além do wrapper: distribuição, dados proprietários, workflow embutido e confiança
- Onde está a oportunidade real para dev: **não** é no modelo. É na integração com sistema legado, no
  dado que só a empresa tem e no processo que ninguém quer refazer na mão
- Exercício de honestidade: liste 5 processos da sua operação onde IA economizaria horas por semana.
  Estime as horas. Esse é o seu backlog de valor real

### 4.2 Principais provedores
| Provedor | Força | Observação |
|---|---|---|
| Anthropic (Claude) | Raciocínio longo, tool use, seguir instrução | Prompt caching maduro |
| OpenAI | Ecossistema, multimodal, fine-tuning acessível | Maior variedade de modelos |
| Google (Gemini) | Contexto muito longo, multimodal nativo, tier gratuito | Ótimo para vídeo |
| Hugging Face | Modelos abertos, inference endpoints | Base para self-host |
| OpenRouter | Um contrato, muitos modelos | Ideal para comparar e para fallback |

Diferenças que importam na prática: formato de mensagens, como cada um declara ferramentas, limites
de rate, comportamento de streaming e política de retenção de dados.

**Exercício 4.1 (entrega da semana):** implemente a *mesma* tarefa (ex.: extrair dados estruturados
de uma mensagem de cobrança) em 3 provedores. Tabela final com qualidade (você julga, com critério
escrito), latência p50/p95 e custo por 1.000 chamadas.

### 4.3 Modelos multimodais
- Quando usar texto, imagem, áudio, vídeo — e o custo de cada modalidade
- Visão: OCR, análise de documento, leitura de gráfico, verificação de layout
- Áudio: Whisper e equivalentes; transcrição, diarização, resumo de reunião
- Vídeo: amostragem de frames vs modelo com suporte nativo
- Cuidado: imagem consome muito mais token do que parece. Meça antes de colocar em loop

---

## Semana 5 — Engenharia de prompts avançada e custo

### 5.1 Prompt chaining
Quebrar tarefa complexa em etapas, cada uma com um prompt especializado:
```
extrair → validar → decidir → redigir → revisar
```
Vantagens: cada etapa é testável isoladamente, você pode usar modelo barato onde dá, e o erro fica
localizável. Desvantagem: latência acumulada e mais pontos de falha — trate os dois explicitamente.

### 5.2 Prompt templates e versionamento
- Prompt é código. Vai para o repositório, tem versão, tem teste e tem changelog
- Separe template de dado; nunca concatene entrada do usuário direto na instrução (é injeção de prompt)
- Estrutura sugerida: `prompts/<dominio>/<tarefa>.v3.md` + registro central com metadados

**Exercício 5.1:** crie um registro de prompts tipado em TypeScript, com variáveis validadas por Zod
e um teste de regressão que roda um conjunto de casos-âncora a cada mudança de versão.

### 5.3 Reduzir alucinação
Técnicas em ordem de eficácia:
1. **Dar o contexto certo** — a maior parte da alucinação é falta de informação, não maldade do modelo
2. **Permitir "não sei"** — e recompensar isso explicitamente na instrução
3. **Pedir citação** da fonte dentro do contexto fornecido
4. **Saída estruturada** com schema — reduz espaço de invenção
5. **Verificação em segunda passada** — outro modelo (ou o mesmo) checa a resposta contra o contexto
6. **Decompor** — perguntas menores alucinam menos

### 5.4 Custo e cache
- Contabilidade real: tokens de entrada, de saída e de raciocínio têm preços diferentes
- **Prompt caching**: coloque o que é estável no começo do prompt e o que varia no fim
- Cache semântico: pergunta parecida reaproveita resposta (aprofundado no módulo 08)
- Escolha de modelo por etapa: modelo pequeno classifica, modelo grande redige
- Truncamento e resumo progressivo de histórico longo

**Exercício 5.2 (entrega da semana):** pegue um fluxo de IA seu e reduza o custo em pelo menos 40%
sem perda mensurável de qualidade. Documente cada mudança e o quanto cada uma economizou.

### 5.5 Previsibilidade
- Saída estruturada nativa (JSON schema / tool use) em vez de "responda em JSON"
- Parsing defensivo mesmo assim: modelo devolve JSON quebrado em produção, e você precisa não cair
- Idempotência: mesma entrada, mesma ação — importa quando a saída dispara efeito colateral

---

## Semana 6 — Resiliência, observabilidade e integração

### 6.1 RAG avançado e orquestração
- LangChain e similares: o que ganham (integrações prontas, abstrações de retrieval) e o que custam
  (indireção, upgrade quebrando, dificuldade de debugar)
- **Regra do curso:** conhecer o framework, mas ter a versão crua funcionando primeiro
- Re-ranking, query rewriting, HyDE, busca híbrida (vetorial + full text)

### 6.2 Erros, re-tentativas e degradação
- Taxonomia: rate limit (429), sobrecarga (529), timeout, filtro de conteúdo, contexto estourado,
  saída malformada. **Cada uma pede tratamento diferente** — 429 pede backoff, saída malformada pede
  reprompt com o erro, contexto estourado pede redução, não retry
- Backoff exponencial com jitter; teto de tentativas; circuit breaker
- Fallback de modelo: provedor caiu, troque; qualidade cai, mas o sistema responde
- Timeout sempre. Chamada de LLM sem timeout é incidente esperando o horário errado

### 6.3 Logging e observabilidade
Registre, para toda chamada: prompt final (com dado sensível mascarado), modelo e versão, parâmetros,
tokens de entrada e saída, custo calculado, latência, tentativas, resultado e ID de correlação.

Ferramentas: **Langfuse** (self-host no seu Coolify), LangSmith, ou OpenTelemetry puro.

> Sem isso, quando o usuário disser "a IA respondeu errado ontem às 15h", você não tem o que olhar.

### 6.4 Integrando IA a um back-end existente
- Onde a chamada mora: rota síncrona, fila, worker ou cron — e por que a resposta muda tudo
- Chamada de LLM é lenta e falha: **fila com worker** é o padrão seguro; rota síncrona só com timeout
  curto e resposta em streaming
- Autenticação, autorização por tenant e limite de uso por cliente
- Versionamento de comportamento: mudar prompt é mudar produto — precisa de flag e rollback

### 6.5 Aplicações práticas
- **OCR inteligente**: extrair *e entender* documento — boleto, contrato, comprovante. Saída estruturada
  + verificação de consistência (soma bate? data é válida? CPF é válido?)
- **Análise de mídia** para insight e automação
- **Bot multimodal** que aceita texto, imagem, áudio e vídeo na mesma conversa

---

## 🎯 Projeto 2 — `llm-core`: camada resiliente de LLM

**Entrega da semana 6.** Spec em [../../projetos/02-llm-core.md](../../projetos/02-llm-core.md).

Biblioteca TypeScript que todo projeto seguinte do curso vai importar.

Critérios de aceite:
- [ ] Interface única para Anthropic, OpenAI, Gemini e Ollama
- [ ] Retry com backoff e jitter, por tipo de erro
- [ ] Fallback automático de modelo, configurável
- [ ] Cache de resposta (chave por hash do prompt + parâmetros) com TTL
- [ ] Saída estruturada validada por Zod, com reprompt automático em falha de schema
- [ ] Telemetria: tokens, custo, latência, tentativas — exportável
- [ ] Registro de prompts versionado com teste de regressão
- [ ] Testes com provedor mockado (não gasta token para rodar a suíte)
- [ ] README com exemplo de uso em 5 linhas

---

## ✅ Checklist de domínio

- [ ] Escolho provedor justificando em 4 eixos técnicos
- [ ] Desenho um prompt chain e digo por que não é um prompt só
- [ ] Cito 5 técnicas de redução de alucinação em ordem de eficácia
- [ ] Explico prompt caching e onde posicionar o conteúdo estável
- [ ] Diferencio os erros de API e o tratamento correto de cada um
- [ ] Listo o que registrar em log de uma chamada de LLM
- [ ] Explico por que chamada de LLM em rota síncrona é arriscada
- [ ] Sei estimar o custo mensal de uma feature antes de construí-la

---

## 💬 Perguntas de entrevista deste módulo

1. Sua feature de IA custa 8 mil por mês. Como você corta pela metade? Dê 5 alavancas em ordem.
2. O provedor está com 40% de erro 529. O que o seu sistema faz?
3. Como você testa um prompt? O que é regressão nesse contexto?
4. Latência p95 de 12 segundos numa rota de usuário. Como resolve sem trocar de modelo?
5. Qual a diferença entre pedir JSON na instrução e usar saída estruturada nativa?
6. Como você impede injeção de prompt vinda de conteúdo do usuário?

---

## 📚 Recursos

- Docs de prompt engineering: Anthropic, OpenAI, Google AI
- Prompt caching: documentação da Anthropic (economia real de 90% em prefixo estável)
- Langfuse — observabilidade de LLM self-hosted
- Zod + saída estruturada — padrão do curso inteiro
- OpenRouter: rankings e comparativo de preço por modelo

---

**Anterior:** [Módulo 01](../01-fundamentos-llm/) · **Próximo:** [Módulo 03 — MCP](../03-mcp/)
