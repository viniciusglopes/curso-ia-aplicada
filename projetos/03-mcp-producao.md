# Projeto 3 — MCP em produção

**Módulo 03 · semana 9 · ≈ 12h · 🎖 projeto de portfólio**

## Objetivo
Expor um sistema seu como MCP server, no ar, autenticado — o tipo de projeto que quase ninguém tem
no GitHub.

## Sugestão de domínio
Operação de disparo/cobrança, catálogo de produto, ou base de conhecimento. Escolha algo com dado
real e regra de negócio de verdade.

## Escopo

### Capacidades
- **5+ tools**, sendo ao menos uma de escrita com confirmação explícita
- **2 resources** (ex.: `config://regras`, `registro://cliente/{id}`)
- **1 prompt** (fluxo pronto, tipo "diagnosticar bloco travado")

### Segurança (o coração do projeto)
- Autenticação por token, com escopo por consumidor
- **Autorização por tenant validada no server** — nunca no prompt
- Rate limit por token e por tool
- Validação de entrada com Zod em toda tool
- Log de auditoria: quem chamou, o quê, com qual argumento, qual resultado
- Tratamento de conteúdo não confiável vindo do dado (prompt injection)

### Operação
- Transport HTTP streamable, publicado no Coolify
- Healthcheck
- Observabilidade: chamadas por tool, latência, erro

## Critérios de aceite
- [ ] Todas as capacidades acima implementadas
- [ ] **Teste automatizado provando que o tenant A não lê dado do tenant B**
- [ ] Rate limit testado
- [ ] No ar, com URL e healthcheck
- [ ] Funciona em 2 clients diferentes
- [ ] README com instruções de conexão e diagrama
- [ ] Camada `services/` sem nenhuma dependência de MCP

## Diferencial
Se o domínio for genérico o bastante, publique como open source. Um MCP server útil no GitHub vale
mais que dez repositórios de tutorial.
