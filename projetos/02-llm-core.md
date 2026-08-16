# Projeto 2 — `llm-core`: camada resiliente de LLM

**Módulo 02 · semana 6 · ≈ 12h**

## Objetivo
Uma biblioteca TypeScript que todos os projetos seguintes vão importar. É o investimento de maior
retorno do curso: você escreve uma vez e usa nove vezes.

## API alvo

```ts
const llm = createLLM({
  provider: 'anthropic',
  model: 'claude-sonnet-5',
  fallback: [{ provider: 'openai', model: 'gpt-...' }],
  cache: { ttl: 3600 },
  telemetry: true,
})

const r = await llm.complete({ prompt: 'texto', maxTokens: 1000 })
const dados = await llm.structured({ prompt: 'extraia', schema: MeuSchema })  // Zod
```

## Escopo
- Adaptadores: Anthropic, OpenAI, Gemini, Ollama — interface única
- Retry com backoff exponencial e jitter, **diferenciado por tipo de erro**
  (429 → backoff; schema inválido → reprompt com o erro; contexto estourado → reduzir, não repetir)
- Fallback automático entre provedores
- Cache por hash de (prompt + parâmetros + modelo), com TTL
- Saída estruturada validada por Zod, com reprompt automático em falha
- Telemetria: tokens de entrada e saída, custo calculado, latência, tentativas, ID de correlação
- Registro de prompts versionado, com teste de regressão sobre casos-âncora

## Critérios de aceite
- [ ] 4 provedores funcionando pela mesma interface
- [ ] Retry por tipo de erro, com teste para cada tipo
- [ ] Fallback testado (simule queda do provedor primário)
- [ ] Cache com hit medido
- [ ] `structured()` reprompta sozinho quando o schema falha
- [ ] Telemetria exportável
- [ ] Suíte de testes roda **sem gastar token** (provedor mockado)
- [ ] README com exemplo de uso em 5 linhas

## Armadilha comum
Abstrair demais. Se a sua interface impede usar um recurso específico de um provedor, ela está
errada — deixe uma porta de saída (`raw`) para o caso não previsto.
