# Módulo 03 — MCP (Model Context Protocol)

**Semanas 7 a 9 · ≈ 30h · Pré-requisitos: módulos 01 e 02**

---

## Ao final deste módulo você será capaz de

1. Explicar que problema o MCP resolve e quando ele **não** é a resposta
2. Construir um MCP server em TypeScript expondo tools, resources e prompts
3. Consumir o mesmo MCP em clients diferentes sem reescrever nada
4. Expor um sistema interno como camada AI-ready, com autenticação e limite de uso
5. Avaliar o risco de segurança de dar ferramentas a um modelo — e mitigar

---

## Semana 7 — O protocolo

### 7.1 O problema
Antes do MCP: cada modelo tem seu formato de ferramenta, cada serviço tem sua API. Conectar
**N modelos** a **M serviços** dá N×M integrações customizadas, todas se quebrando em ritmos
diferentes. MCP transforma isso em N+M: o serviço fala MCP uma vez, qualquer client entende.

A analogia útil é USB-C, mas a comparação técnica melhor é **LSP** (Language Server Protocol): antes,
cada IDE implementava suporte a cada linguagem; depois, cada linguagem implementa um server e todas as
IDEs ganham de graça. MCP faz o mesmo entre LLM e ferramenta.

### 7.2 Anatomia
- **Host** — a aplicação (Claude Desktop, Cursor, seu app)
- **Client** — o conector dentro do host, 1:1 com um server
- **Server** — o seu processo, expondo capacidades
- **Transport** — stdio (local) ou HTTP streamable (remoto)
- Base: JSON-RPC 2.0

Três primitivas — a distinção cai em prova e em entrevista:

| Primitiva | Quem controla | Para quê |
|---|---|---|
| **Tools** | O modelo decide chamar | Ação com efeito: consultar, criar, atualizar |
| **Resources** | A aplicação escolhe e injeta | Dado de contexto: arquivo, registro, documento |
| **Prompts** | O usuário invoca | Fluxo pronto, tipo slash command |

### 7.3 MCP vs tools tradicionais
| | Function calling do provedor | MCP |
|---|---|---|
| Portabilidade | Preso ao provedor | Qualquer client |
| Descoberta | Você declara no código | O client descobre em runtime |
| Estado e sessão | Você resolve | Previsto no protocolo |
| Composição | Manual | Vários servers no mesmo host |
| Maturidade | Muito madura | Em evolução rápida |

**Quando não usar MCP:** integração única, interna, com um provedor só, sem intenção de reuso — o
function calling nativo é mais simples e você não paga a complexidade de mais um processo.

**Exercício 7.1 (entrega da semana):** MCP server mínimo com uma tool (`somar`), um resource
(`config://app`) e um prompt (`revisar-codigo`). Rode em stdio e conecte em **dois** clients
diferentes. Documente o que precisou mudar para o segundo client — a resposta certa é "nada".

---

## Semana 8 — MCP em TypeScript, de verdade

### 8.1 SDK e estrutura
```bash
pnpm add @modelcontextprotocol/sdk zod
```

Organização que escala:
```
src/
├── index.ts          # bootstrap e transport
├── tools/            # uma tool por arquivo, com schema Zod
├── resources/
├── prompts/
├── services/         # acesso a banco/API — sem saber que MCP existe
└── auth/
```

Regra de arquitetura: **a camada `services/` não pode saber que MCP existe.** Se souber, você não
consegue reaproveitar nem testar sem subir o protocolo.

### 8.2 Design de tools que o modelo usa direito
- Nome que diz a ação: `buscar_pedido_por_placa`, não `query1`
- Descrição escrita para o modelo, não para o dev: diga *quando* usar e *quando não* usar
- Schema estrito, com Zod: enums em vez de string livre, obrigatoriedade explícita
- Erro como texto acionável: `"Placa inválida. Formato esperado: ABC1D23"` — o modelo se corrige
- Granularidade: 5 tools bem definidas batem 1 tool genérica com parâmetro `action`
- Paginação sempre; retornar 10 mil linhas estoura o contexto do host

**Exercício 8.1:** escreva 3 tools sobre um sistema real seu, **somente leitura**. Teste com prompts
ambíguos de propósito e ajuste as descrições até o modelo escolher certo sem dica.

### 8.3 Resources e prompts
- URIs e templates de URI (`registro://cliente/{id}`)
- Quando é resource e quando é tool: **resource é dado que a aplicação escolhe; tool é ação que o
  modelo decide**. Se o modelo precisa decidir buscar, é tool
- Prompts como fluxo padronizado: "abrir incidente", "revisar disparo do dia"

### 8.4 Transformando sua empresa em um MCP
A ideia central do módulo: expor CRM, billing, suporte e dado de produto por uma camada padronizada,
e qualquer agente ou copiloto passa a operar em cima disso.

**Exercício 8.2 (entrega da semana):** projete (documento + diagrama) a camada AI-ready de uma
operação sua. Quais domínios viram server, quais tools cada um expõe, quem pode chamar o quê, e o que
**nunca** deve ser exposto. Implemente pelo menos um domínio.

---

## Semana 9 — Segurança, produção e composição

### 9.1 Segurança em MCP
Dar ferramenta a um modelo é dar execução a algo que pode ser manipulado por texto. Trate como
superfície de ataque, porque é.

- **Autenticação**: service tokens, OAuth para MCP remoto, um token por consumidor (nunca compartilhado)
- **Autorização**: por tool *e* por dado. O modelo pode chamar `buscar_cliente`, mas só dos tenants
  do usuário. Isso se checa no server, nunca no prompt
- **Rate limiting**: por token, por tool e global. Agente em loop chama 400 vezes em 30 segundos
- **Prompt injection**: conteúdo recuperado pode conter instrução. Nunca dê à saída de tool o mesmo
  peso da instrução do sistema; separe e marque como dado não confiável
- **WAF** e rede: MCP remoto exposto é API pública — vale tudo que vale para API pública
- **Auditoria**: log de quem chamou o quê, com qual argumento e qual resultado
- **Confused deputy**: o server age com privilégio próprio; sem checagem, ele vira o vetor

### 9.2 Casos de uso reais
- Copiloto interno consultando sistema legado sem projeto de migração
- Suporte que lê ticket, base de conhecimento e histórico do cliente numa conversa
- Agente de operação que consulta status e **propõe** ação, com humano aprovando
- Integração com IDE: copiloto que conhece o domínio da sua empresa

### 9.3 Composição e teste
- Vários servers no mesmo host: colisão de nomes, ordem de precedência, custo de contexto
- **Cada tool declarada consome contexto o tempo todo.** 60 tools ativas degradam a escolha do modelo
- Testar: MCP Inspector, client de teste próprio, e avaliação com casos-âncora
- Deploy: stdio para local, HTTP streamable para remoto; observabilidade igual módulo 02

---

## 🎯 Projeto 3 — MCP em produção

**Entrega da semana 9.** Spec em [../../projetos/03-mcp-producao.md](../../projetos/03-mcp-producao.md).

MCP server expondo um sistema seu, no ar, autenticado.

Critérios de aceite:
- [ ] Mínimo 5 tools, sendo ao menos 1 de escrita com confirmação explícita
- [ ] 2 resources e 1 prompt
- [ ] Autenticação por token, com escopo por consumidor
- [ ] Autorização por tenant validada no server (teste provando que vazamento não ocorre)
- [ ] Rate limit por token e por tool
- [ ] Log de auditoria de toda chamada
- [ ] Transport HTTP, publicado (Coolify), com healthcheck
- [ ] Funciona em 2 clients diferentes
- [ ] README com instruções de conexão e um diagrama

---

## ✅ Checklist de domínio

- [ ] Explico N×M → N+M com um exemplo próprio
- [ ] Diferencio tools, resources e prompts e digo quem controla cada um
- [ ] Justifico quando **não** usar MCP
- [ ] Escrevo uma descrição de tool que o modelo usa certo de primeira
- [ ] Listo 5 riscos de segurança de MCP e a mitigação de cada
- [ ] Explico prompt injection via retorno de ferramenta
- [ ] Sei o custo de contexto de declarar tools demais
- [ ] Descrevo como testar um MCP server sem client gráfico

---

## 💬 Perguntas de entrevista deste módulo

1. Um cliente pede para "conectar a IA ao ERP". MCP ou function calling? Justifique.
2. Como você impede que o agente de um tenant leia dado de outro?
3. Sua tool retorna 50 mil linhas. Qual o problema e como resolve?
4. O modelo está escolhendo a tool errada. Onde você mexe primeiro?
5. Como versionar um MCP server sem quebrar os clients existentes?
6. Qual o risco de instalar um MCP server de terceiro no seu ambiente?

---

## 📚 Recursos

- Especificação oficial: modelcontextprotocol.io
- `@modelcontextprotocol/sdk` (TypeScript) e MCP Inspector
- Repositório de servers de referência da comunidade
- Documentação de MCP da Anthropic (incluindo MCP remoto e autenticação)

---

**Anterior:** [Módulo 02](../02-apis-generativas/) · **Próximo:** [Módulo 04 — Agentes Autônomos](../04-agentes-autonomos/)
