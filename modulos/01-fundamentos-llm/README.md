# Módulo 01 — Fundamentos de IA e LLMs para Programadores

**Semanas 1 a 3 · ≈ 30h · Pré-requisitos: JavaScript/TypeScript e SQL básico**

---

## Ao final deste módulo você será capaz de

1. Explicar, sem analogia mágica, o que acontece entre o seu prompt e a resposta do modelo
2. Treinar uma rede neural do zero e explicar cada etapa do ciclo dados → treino → validação → inferência
3. Diferenciar IA, Machine Learning, Deep Learning e LLM com exemplos concretos de quando usar cada um
4. Construir um RAG funcional com JavaScript e Postgres, sem framework
5. Escrever prompts que produzem saída previsível e testável — e saber por que os ruins falham
6. Rodar modelos localmente com Ollama e orquestrar múltiplos provedores com OpenRouter

---

## Semana 1 — Da máquina de Turing ao tensor

### 1.1 História e contexto da IA
- A primeira ideia de "máquina inteligente": autômatos, Lovelace, Turing (1950, *Computing Machinery
  and Intelligence*), a conferência de Dartmouth (1956)
- Os dois invernos da IA e **por que eles aconteceram** — promessa acima da capacidade computacional.
  Guarde isso: é o mesmo padrão que você vai reconhecer em hype atual
- Linha do tempo útil: perceptron (1958) → backpropagation (1986) → SVM/estatística (1990s) →
  deep learning e ImageNet (2012) → *Attention Is All You Need* (2017) → GPT-3 (2020) → ChatGPT (2022)
  → era dos agentes (2024+)

**Exercício 1.1:** escreva 1 página conectando cada salto acima ao recurso que o habilitou (dado,
compute ou arquitetura). Você vai usar isso para responder "por que agora?" em entrevista.

### 1.2 IA vs ML vs DL — a distinção que quase todo mundo erra
- **IA**: o campo. Inclui sistemas de regras, busca, planejamento — nada disso aprende
- **ML**: subconjunto onde o comportamento vem de dados, não de regras escritas
- **DL**: subconjunto do ML com redes neurais profundas; aprende as *features* sozinho
- **LLM**: um modelo de DL, arquitetura transformer, treinado para prever o próximo token

Critério prático: se você consegue escrever a regra, **não use ML**. Isso volta como decision
framework no módulo 08.

### 1.3 Tensores e redes neurais
- Escalar → vetor → matriz → tensor. Por que GPU: são multiplicações de matriz massivamente paralelas
- Neurônio = soma ponderada + bias + função de ativação
- Forward pass, função de perda, gradiente, backpropagation, learning rate
- Overfitting, underfitting e por que existe conjunto de validação separado

**Exercício 1.2:** implemente um neurônio único em JS puro (sem biblioteca) que aprenda a função
lógica AND. Depois tente OR. Depois tente XOR — **vai falhar**. Descubra por quê. Esse é o problema
que matou a IA nos anos 70.

### 1.4 Sua primeira IA do zero
Com TensorFlow.js:

```bash
pnpm add @tensorflow/tfjs-node
```

Ciclo completo: coletar dados → normalizar → separar treino/validação → definir arquitetura →
treinar → avaliar → inferir.

**Exercício 1.3 (entrega da semana 1):** treine uma rede que classifique algo **seu** de verdade.
Sugestão com dados que você já tem: classificar mensagens recebidas em categorias (dúvida de boleto /
reclamação / interesse comercial / outro), ou prever se um registro de disparo vai falhar a partir de
features como regional, horário e tipo de fluxo. Entregue com métrica de acurácia no conjunto de
validação e uma análise honesta de onde erra.

---

## Semana 2 — Como o LLM realmente funciona

### 2.1 Tokenização
- Modelo não vê letras, vê tokens. BPE (Byte Pair Encoding)
- Em português os tokens rendem menos que em inglês — impacto direto no seu custo
- Por que o modelo erra contar letras: ele nunca viu as letras

**Exercício 2.1:** use `tiktoken` (ou o tokenizer do provedor) para tokenizar o mesmo texto em
português e inglês. Meça a diferença. Calcule o sobrecusto anual se você processasse 1M de mensagens.

### 2.2 Embeddings
- Vetor denso que representa significado; proximidade vetorial ≈ proximidade semântica
- Similaridade do cosseno; por que não usar distância euclidiana em texto normalizado
- Dimensionalidade e o custo de armazenar

**Exercício 2.2:** gere embeddings de 20 frases suas, calcule a matriz de similaridade e mostre os 3
pares mais próximos e os 3 mais distantes. Confira se bate com sua intuição. Onde não bate, investigue.

### 2.3 Transformers e attention
- *Attention Is All You Need* — leia o abstract e a figura 1, no mínimo
- Self-attention: cada token olha para todos os outros e pondera relevância
- Multi-head attention; positional encoding (ordem não é grátis)
- Encoder-only (BERT) vs decoder-only (GPT, Claude, Gemini) vs encoder-decoder (T5)
- Janela de contexto: o que é, por que custa quadrático, o que acontece quando estoura

### 2.4 Inferência e seus parâmetros
- Amostragem: `temperature`, `top_p`, `top_k`
- `max_tokens`, sequências de parada, penalidades
- Por que `temperature: 0` **não** garante determinismo total em API
- Streaming: por que a UX melhora sem o sistema ficar mais rápido

**Exercício 2.3 (entrega da semana 2):** rode o mesmo prompt 10× em `temperature` 0, 0.7 e 1.2.
Documente variação de saída, de latência e de custo. Escreva a regra que você vai seguir para
escolher temperatura em produção.

### 2.5 Panorama de modelos
Claude (Anthropic), GPT (OpenAI), Gemini (Google), Llama (Meta), Qwen, DeepSeek, Mistral.
Eixos de comparação que importam: janela de contexto, custo por milhão de tokens de entrada e saída,
latência, suporte a tool use, multimodalidade e licença.

---

## Semana 3 — Prompt, ferramentas e o primeiro RAG

### 3.1 Prompt engineering na prática
Estrutura que funciona:
1. **Papel e objetivo** — quem o modelo é e o que precisa entregar
2. **Contexto** — dados relevantes, delimitados (XML ou markdown)
3. **Instruções** — passo a passo, em ordem
4. **Formato de saída** — explícito; JSON schema quando aplicável
5. **Exemplos** (few-shot) — 2 a 5, incluindo pelo menos um caso difícil
6. **Restrições** — o que não fazer, e o que fazer quando não souber

Padrões para dev: gerar teste a partir da implementação, explicar diff, revisar PR, escrever migração
reversível, documentar função legada, converter erro em hipóteses de causa.

**Anti-padrões:** prompt vago ("melhore isso"), instrução negativa sem alternativa ("não invente" sem
dizer o que fazer no lugar), contexto sem delimitador, pedir raciocínio e resposta no mesmo campo.

### 3.2 Ferramentas de IA para acelerar sua vida como dev
- Cursor: origem e proposta; comparação honesta com VS Code + extensões e com Windsurf
- `.cursor/rules` (e `CLAUDE.md`, `AGENTS.md`): como codificar convenções do projeto para a IA não
  reinventar padrão a cada sessão
- **Vibe coding**: o que é, onde funciona, onde destrói o projeto. O case do levelsio (micro-SaaS
  com receita alta e time de uma pessoa) — e o viés de sobrevivência embutido nesse case

**Exercício 3.1:** escreva um arquivo de regras para um projeto seu real, cobrindo stack, convenções
de nome, o que nunca alterar e como escrever commits. Meça: as próximas 10 gerações precisaram de
menos correção?

### 3.3 MCPs e automação — primeira visão
Panorama apenas; o aprofundamento é o módulo 03.
- O problema que MCP resolve: N modelos × M ferramentas = N×M integrações customizadas
- Usos imediatos: gerar testes, consultar documentação atualizada, navegar e extrair de sites
- N8N e orquestração de fluxo com IA

### 3.4 RAG, embeddings e busca semântica
- Por que RAG: o modelo não conhece seus dados, e retreinar é caro e lento
- Pipeline: **ingestão** (carregar → dividir em chunks → embeddar → indexar) e **consulta**
  (embeddar pergunta → buscar top-k → montar contexto → gerar → citar fonte)
- Chunking: tamanho, sobreposição, e por que dividir no meio de uma frase estraga a recuperação
- Vector database: pgvector, Qdrant, Pinecone, Chroma. Aqui usamos **Postgres + pgvector**
- Busca por significado vs busca literal — e quando a literal ganha (código, SKU, placa, CPF)

### 3.5 Modelos abertos vs proprietários
- Trade-offs reais: custo, privacidade do dado, latência, teto de qualidade, lock-in
- **OpenRouter**: um token, dezenas de modelos, troca de modelo por string
- **Ollama**: rodar local, sem custo por token, sem enviar dado para fora

**Exercício 3.2:** resolva a mesma tarefa com um modelo proprietário e com um local via Ollama.
Compare qualidade, latência e custo. Escreva em que cenário cada um ganha.

### 3.6 Agentes — primeira visão
Definição: sistema que decide **quais** passos dar, em vez de seguir um fluxo fixo. Loop
percepção → raciocínio → ação → observação. Aprofundamento no módulo 04.

---

## 🎯 Projeto 1 — RAG sobre acervo próprio

**Entrega da semana 3.** Especificação completa em [../../projetos/01-rag-basico.md](../../projetos/01-rag-basico.md).

Resumo: pipeline de ingestão + busca semântica + geração com citação de fonte, em TypeScript e
Postgres/pgvector, **sem LangChain**. Base sugerida: sua documentação operacional (procedimentos de
disparo, decisões registradas, runbooks) — assim o resultado é útil, não demonstração.

Critérios de aceite:
- [ ] Ingestão idempotente (rodar duas vezes não duplica)
- [ ] Chunking com sobreposição configurável
- [ ] Busca top-k com filtro por metadados
- [ ] Resposta sempre citando o trecho de origem
- [ ] Quando não houver contexto suficiente, responder que não sabe — e você testou isso
- [ ] Custo por consulta medido e registrado

---

## ✅ Checklist de domínio

Responda **sem consultar**. Se travar em algum, volte ao tópico.

- [ ] Explico a diferença entre IA, ML, DL e LLM com um exemplo de cada
- [ ] Descrevo o ciclo de treino de uma rede neural e o papel do conjunto de validação
- [ ] Explico o que é um token e por que texto em português custa mais
- [ ] Explico o que é um embedding e por que similaridade do cosseno funciona
- [ ] Descrevo self-attention em duas frases
- [ ] Sei o que muda entre `temperature` e `top_p`
- [ ] Desenho o pipeline de RAG completo de memória
- [ ] Sei dizer quando **não** usar RAG
- [ ] Explico o trade-off entre modelo aberto e proprietário em 4 eixos
- [ ] Sei por que XOR quebra um perceptron de camada única

---

## 💬 Perguntas de entrevista deste módulo

1. Por que um LLM alucina? Cite duas causas estruturais, não comportamentais.
2. Seu RAG está retornando trechos irrelevantes. Liste 5 hipóteses em ordem de custo de investigação.
3. Quando você escolheria fine-tuning em vez de RAG? (Prévia do módulo 09 — responda mesmo assim.)
4. Explique embeddings para um diretor não técnico, em 30 segundos.
5. Como você reduziria em 50% o custo de uma feature de LLM sem perder qualidade perceptível?
6. Qual o problema de usar `temperature: 0` achando que garante reprodutibilidade?

---

## 📚 Recursos

**Essenciais**
- *Attention Is All You Need* — arxiv.org/abs/1706.03762
- 3Blue1Brown, série *Neural Networks* (YouTube) — a melhor intuição visual que existe
- Karpathy, *Let's build GPT: from scratch* (YouTube) — é Python, veja mesmo assim
- Documentação de prompt engineering da Anthropic e da OpenAI

**Ferramentas**
- TensorFlow.js · Ollama · OpenRouter · pgvector

**Leitura complementar**
- *The Bitter Lesson*, Rich Sutton — ensaio curto, muda a forma de escolher abordagem
- Documentação do pgvector sobre índices HNSW vs IVFFlat

---

**Próximo:** [Módulo 02 — APIs de IA Generativa e Prompt Engineering](../02-apis-generativas/)
