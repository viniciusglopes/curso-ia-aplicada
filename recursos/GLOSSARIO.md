# Glossário

Termos que aparecem no curso inteiro. Consulte quando travar; releia no fim de cada fase.

## Fundamentos

**Agente** — Sistema em que o modelo decide quais passos dar, em vez de seguir um fluxo fixo.

**Alucinação** — Saída plausível e factualmente errada. Causa mais comum: falta de contexto, não
"maldade" do modelo.

**Attention** — Mecanismo pelo qual cada token pondera a relevância de todos os outros. Base do
transformer.

**Contexto (janela de)** — Quantidade máxima de tokens que o modelo processa de uma vez. Custo cresce
de forma mais que linear.

**Deep Learning (DL)** — Subconjunto do ML com redes neurais profundas; aprende as features sozinho.

**Embedding** — Vetor denso que representa significado. Proximidade vetorial ≈ proximidade semântica.

**Fine-tuning** — Ajustar os pesos de um modelo com dados próprios para mudar comportamento.

**Function calling / Tool use** — O modelo pede a execução de uma função declarada; quem executa é o
seu código.

**Inferência** — Uso do modelo já treinado para gerar resposta.

**LLM** — Large Language Model. Modelo de DL, arquitetura transformer, treinado para prever o próximo
token.

**Machine Learning (ML)** — Comportamento derivado de dados, não de regras escritas à mão.

**Multimodal** — Modelo que processa mais de uma modalidade (texto, imagem, áudio, vídeo).

**Prompt** — A instrução enviada ao modelo. É código: versione, teste e revise.

**RAG** — Retrieval-Augmented Generation. Buscar contexto relevante e injetar no prompt antes de gerar.

**Temperature** — Controla aleatoriedade da amostragem. 0 é o mais determinístico possível — o que não
significa determinístico.

**Tensor** — Estrutura de dados multidimensional; a unidade de computação dos modelos.

**Token** — Pedaço de texto (≈ 4 caracteres em inglês, menos eficiente em português). A unidade de
cobrança.

**Transformer** — Arquitetura de rede neural baseada em attention. Base de todos os LLMs atuais.

## RAG e busca

**Chunking** — Dividir documento em pedaços indexáveis. Tamanho e sobreposição afetam muito o resultado.

**HNSW / IVFFlat** — Tipos de índice vetorial no pgvector, com trade-offs de velocidade e memória.

**Busca híbrida** — Combinar busca vetorial com full-text. Necessária para código, SKU, placa e nome
próprio.

**HyDE** — Gerar uma resposta hipotética e buscar por ela, em vez de buscar pela pergunta.

**pgvector** — Extensão do Postgres para armazenar e buscar vetores.

**Re-ranking** — Reordenar os resultados recuperados com um modelo mais preciso antes de gerar.

**Similaridade do cosseno** — Métrica de proximidade entre vetores. Padrão em busca semântica.

**Top-k** — Quantidade de trechos recuperados por consulta.

**Vector database** — Banco otimizado para busca por similaridade vetorial.

## Agentes

**Agent loop** — percepção → raciocínio → ação → observação, repetido até o objetivo ou o limite.

**Checkpointing** — Salvar o estado do agente para retomar depois de falha.

**Context pruning** — Remover do contexto o que já não é relevante.

**Guardrail** — Limite técnico que impede o agente de causar dano (teto, allowlist, kill switch).

**Human-in-the-loop (HITL)** — Aprovação humana obrigatória em pontos definidos.

**LangGraph** — Framework de orquestração de agentes como grafo de execução.

**Memória episódica** — Registro estruturado do que aconteceu em execuções anteriores.

**Plan-and-Execute** — Planejar tudo antes, executar depois.

**ReAct** — Reasoning + Acting: alterna pensamento e ação a cada passo.

**Reflection** — O agente critica a própria saída antes de entregar.

**Runaway loop** — Agente que entra em ciclo e consome recurso sem parar. O modo de falha mais caro.

**Supervisor** — Padrão multi-agente em que um agente distribui e cobra os demais.

## MCP

**Client** — Conector dentro do host, 1:1 com um server.

**Host** — A aplicação que usa MCP (Claude Desktop, Cursor, seu app).

**MCP** — Model Context Protocol. Padrão para conectar LLMs a ferramentas e dados.

**Prompt (primitiva MCP)** — Fluxo pronto invocado pelo usuário.

**Resource** — Dado de contexto que a aplicação escolhe e injeta.

**Server** — Processo que expõe capacidades via MCP.

**stdio / HTTP streamable** — Os dois transportes do MCP: local e remoto.

**Tool** — Ação que o modelo decide chamar.

## Produção

**Avaliação (eval)** — Conjunto de casos com resultado esperado, rodado a cada mudança de prompt ou
modelo.

**Backoff exponencial** — Esperar cada vez mais entre tentativas. Com jitter, evita sincronizar
clientes.

**Cache semântico** — Reaproveitar resposta de pergunta semanticamente equivalente. Exige escopo de
dado na chave.

**Circuit breaker** — Parar de chamar um serviço que está falhando, para não piorar.

**Model router** — Escolher o modelo por complexidade da tarefa, para cortar custo.

**Model tiering** — Níveis de modelo definidos por criticidade e custo.

**Observabilidade** — Conseguir reconstruir o que aconteceu: prompt, modelo, custo, latência,
resultado.

**Prompt caching** — Reaproveitamento, pelo provedor, do prefixo estável do prompt.

**Prompt injection** — Instrução maliciosa escondida em conteúdo processado pelo modelo.

**Saída estruturada** — Resposta forçada a obedecer um schema (JSON Schema / Zod).

**Streaming** — Enviar a resposta em pedaços. Melhora a percepção, não o custo.

## Dados e treino

**Dataset** — Conjunto de exemplos de treino. Qualidade e diversidade importam mais que volume.

**Épocas** — Quantas vezes o treino percorre o dataset inteiro.

**JSONL** — Um JSON por linha. Formato padrão de dataset de fine-tuning.

**LoRA** — Low-Rank Adaptation. Fine-tuning eficiente que congela o modelo e treina matrizes pequenas.

**Overfitting** — O modelo decora o treino e piora no que não viu.

**PEFT** — Parameter-Efficient Fine-Tuning. Família que inclui LoRA e QLoRA.

**Conjunto de teste** — Separado no início e **não tocado** até a avaliação final.

## Governança

**EU AI Act** — Regulação europeia que classifica sistemas de IA por nível de risco.

**Explicabilidade** — Justificar uma saída específica. É o que dá para entregar na prática.

**Interpretabilidade** — Entender o funcionamento interno do modelo. Muito limitada em LLM.

**LGPD** — Lei Geral de Proteção de Dados. Atenção especial aos arts. 18 e 20.

**NIST AI RMF** — Framework de gestão de risco de IA. O mais prático de aplicar.

**Viés** — Distorção sistemática na saída, vinda de dado, amostra, prompt ou feedback loop.
