# Projeto 1 — RAG sobre acervo próprio

**Módulo 01 · semana 3 · ≈ 10h**

## Objetivo
Construir um sistema de perguntas e respostas sobre documentos seus, do zero, **sem LangChain**, para
entender cada peça do RAG antes de deixar um framework escondê-las.

## Base sugerida
Sua documentação operacional: procedimentos, decisões registradas, runbooks, memória de projeto.
Escolha algo que você realmente consulta — assim o projeto vira ferramenta, não demonstração.

## Escopo

### Ingestão
1. Carregar arquivos (markdown, txt, PDF)
2. Dividir em chunks com tamanho e sobreposição configuráveis
3. Gerar embeddings (OpenAI `text-embedding-3-small` ou `nomic-embed-text` no Ollama)
4. Gravar em Postgres com pgvector, junto com metadados (arquivo, posição, data)

### Consulta
1. Embeddar a pergunta
2. Buscar top-k por similaridade do cosseno, com filtro opcional por metadado
3. Montar o contexto respeitando um teto de tokens
4. Gerar a resposta exigindo citação do trecho de origem
5. Registrar custo e latência

## Critérios de aceite
- [ ] Ingestão idempotente — rodar duas vezes não duplica
- [ ] Chunking com sobreposição configurável
- [ ] Busca top-k com filtro por metadado
- [ ] Toda resposta cita a fonte
- [ ] Quando não há contexto suficiente, responde que não sabe (e existe teste provando)
- [ ] Custo por consulta medido e registrado
- [ ] CLI utilizável: `pnpm rag "pergunta"`

## Como se avaliar
Monte 15 perguntas com resposta conhecida, incluindo 3 cujas respostas **não** estão na base. Meça
acerto e, principalmente, se ele admite não saber nas 3.

## Extensões (opcionais)
Busca híbrida com full-text, re-ranking, reescrita de pergunta, interface web mínima.
