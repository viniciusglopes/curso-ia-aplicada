# Módulo 05 — Ferramentas de IA para UX & UI

**Semanas 14 e 15 · ≈ 20h · Pré-requisitos: módulos 01 a 04**

---

## Ao final deste módulo você será capaz de

1. Usar IA em cada etapa do processo de produto — pesquisa, ideação, protótipo, código, teste
2. Gerar interface a partir de linguagem natural e saber o que sempre precisa de ajuste humano
3. Trabalhar com agentes de codificação em fluxo previsível, não em tentativa e erro
4. Automatizar teste E2E com agente consumindo o MCP da própria aplicação
5. Decidir o que roda de IA no cliente e o que **nunca** pode rodar

---

## Unidade 1 — A revolução da IA no design de interfaces

- **AI-driven UX/UI**: IA como ferramenta do processo *e* como material da interface
- Panorama por etapa:

| Etapa | O que a IA faz bem | O que ela ainda não faz |
|---|---|---|
| Pesquisa | Sintetizar entrevista, agrupar dor, gerar persona | Descobrir o que o usuário não disse |
| Ideação | Volume de alternativa, referência visual | Escolher com bom gosto e contexto de negócio |
| Protótipo | Wireframe e mockup a partir de texto | Hierarquia visual sofisticada |
| Código | Componente, estado, responsividade, acessibilidade básica | Arquitetura de front de longo prazo |
| Teste | Roteiro, dado sintético, E2E | Julgar se a experiência é boa |

- Análise de caso: onde a IA realmente encurtou o ciclo de produto e onde criou dívida de design
  (componente duplicado, design system ignorado, acessibilidade quebrada em silêncio)

---

## Unidade 2 — Prototipação e geração de UI

### Text-to-UI
- Da descrição em linguagem natural ao wireframe e ao mockup
- Ferramentas: v0, Figma AI, Firebase Studio, Uizard e equivalentes
- O que sempre precisa de humano: hierarquia, densidade de informação, estados de erro e vazio,
  microcopy e acessibilidade real

### Figma → código
- **Mão na massa:** transformar um design do Figma em front-end e **analisar criticamente** o
  resultado. O exercício não é aceitar: é listar o que está errado
- Checklist de crítica: semântica de HTML, contraste, foco de teclado, responsividade em 3 breakpoints,
  uso do design system existente, componentes duplicados, tamanho do bundle

### Validação de usabilidade com IA
- Revisão heurística automatizada (Nielsen) sobre screenshot
- Geração de roteiro de teste e de persona para teste simulado
- **Limite honesto:** IA simula reação plausível, não reação real. Isso reduz custo de triagem, não
  substitui usuário

**Exercício 14.1 (entrega da semana 14):** pegue uma tela real de um sistema seu. Gere uma versão por
IA a partir da descrição. Refine à mão. Publique um diff comentado: o que a IA acertou, o que errou,
e quanto tempo economizou de fato.

---

## Unidade 3 — Agentes de codificação no fluxo do front-end

- O que é um agente de codificação e como ele opera no repositório (lê, edita, roda, corrige)
- CLIs: Claude Code, Gemini CLI, Codex e similares — scaffolding, geração de componente, refatoração
- **Fluxo previsível** (o ponto do módulo):
  1. Descreva o resultado, não os passos
  2. Aponte os arquivos de referência e o design system
  3. Exija teste junto com o componente
  4. Revise o diff antes de rodar
  5. Rode, veja quebrar, devolva o erro para o agente
  6. Só então peça polimento
- Regras de projeto (`CLAUDE.md`, `.cursor/rules`) aplicadas a front: convenção de componente,
  tokens de estilo, o que nunca inventar
- Boas práticas de prompt para código: contexto de tipo, exemplo de componente existente, restrição
  explícita de dependência ("não adicione biblioteca nova")

---

## Unidade 4 — Automação e interação inteligente com a UI

- **E2E com agente**: em vez de seletor frágil, o agente entende a intenção ("finalize a compra") e
  navega. Ganho: teste que sobrevive a refatoração de markup. Custo: mais lento e não determinístico —
  use em fluxo crítico, mantenha Playwright no resto
- Agente consumindo o **MCP da própria aplicação** (módulo 03): o app expõe suas capacidades, o agente
  testa pelo protocolo em vez de pela tela
- Ferramentas de inspeção de contexto MCP (ex.: mcpui.dev) para depurar o que o app expõe

**Exercício 15.1:** escreva um teste E2E agentivo de um fluxo crítico seu. Compare com o mesmo teste
em Playwright: tempo de execução, custo, e quantas vezes cada um quebrou em 10 rodadas.

---

## Unidade 5 — IA no cliente e no servidor

### Consumindo IA direto do front-end
- Casos válidos: streaming de resposta, feature local com modelo pequeno (transformers.js, WebGPU)
- **Desafios de segurança — inegociáveis:**
  - chave de API nunca no cliente. Nunca. Proxy no servidor, sempre
  - rate limit por usuário no servidor, não no front
  - conteúdo do usuário é entrada não confiável até prova em contrário
  - custo é seu: sem limite, um usuário mal-intencionado gasta a sua conta

### Backend com lógica de IA
- Firebase AI Logic, Vercel AI SDK, ou o seu próprio `llm-core` do módulo 02
- Padrão recomendado: rota fina no servidor → fila → worker → streaming de volta
- Features inteligentes: busca semântica, chatbot de suporte, personalização em tempo real

---

## 🎯 Projeto 5 — Feature de front construída com agente

**Entrega da semana 15.** Spec em [../../projetos/05-front-agentivo.md](../../projetos/05-front-agentivo.md).

Critérios de aceite:
- [ ] Feature real, integrada a um sistema seu
- [ ] Construída majoritariamente via agente, com registro do processo (prompts usados e correções)
- [ ] Busca semântica ou assistente embutido na interface
- [ ] Chave de API no servidor, com rate limit por usuário — e um teste provando
- [ ] Teste E2E agentivo do fluxo principal
- [ ] Acessibilidade verificada (teclado, contraste, leitor de tela no fluxo principal)
- [ ] Retrospectiva: o que a IA acelerou, o que atrapalhou, quanto tempo levou de verdade

---

## ✅ Checklist de domínio

- [ ] Digo em que etapas do processo de produto a IA ajuda e em quais atrapalha
- [ ] Listo o que sempre revisar em UI gerada por IA
- [ ] Descrevo um fluxo de trabalho previsível com agente de codificação
- [ ] Explico quando teste E2E agentivo vale mais que Playwright — e quando não
- [ ] Enumero os riscos de chamar IA direto do front-end
- [ ] Sei como um agente testa uma aplicação via MCP

---

## 💬 Perguntas de entrevista deste módulo

1. Seu time gerou 40 componentes com IA em uma semana. Que dívida técnica isso cria?
2. Como você protege uma feature de IA no front contra abuso de custo?
3. Vale a pena substituir a suíte E2E por agentes? Defenda os dois lados.
4. Como você garante acessibilidade em código gerado por IA?
5. O designer entrega no Figma e a IA gera o código. Onde entra o engenheiro?

---

## 📚 Recursos

- Vercel AI SDK — streaming e UI de IA em React/Next
- transformers.js — modelo rodando no navegador
- Playwright + MCP para automação de navegador
- WCAG 2.2 — referência de acessibilidade
- Documentação do Firebase Studio e do Gemini CLI

---

**Anterior:** [Módulo 04](../04-agentes-autonomos/) · **Próximo:** [Módulo 06 — IA para DevOps](../06-devops/)
