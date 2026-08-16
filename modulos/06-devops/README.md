# Módulo 06 — Ferramentas de IA para DevOps

**Semanas 16 a 18 · ≈ 30h · Pré-requisitos: módulos 01 a 04**

O módulo mais longo em conteúdo (12 unidades). O foco aqui é **IA aplicada a infraestrutura** — não
é um curso de Kubernetes. Onde faltar base de infra, use as referências e siga.

---

## Ao final deste módulo você será capaz de

1. Gerar e **validar** infraestrutura como código com apoio de IA, sem aceitar cegamente
2. Diagnosticar incidentes com um agente ReAct que consulta logs, métricas e traces
3. Traduzir linguagem natural em PromQL, LogQL e dashboards
4. Construir ChatOps com aprovação humana, RBAC e auditoria
5. Implementar auto-remediação com guardrails que não pioram o incidente
6. Medir e cortar custo de infraestrutura com apoio de IA

---

## Unidade I — Fundamentos de IA generativa para infraestrutura (semana 16)

- Revisão dirigida: arquitetura de LLM aplicada a texto técnico (YAML, HCL, log, stack trace)
- APIs: OpenAI, Anthropic Claude, AWS Bedrock — e por que Bedrock aparece em ambiente corporativo
- Frameworks de agente aplicados a infra: LangChain, CrewAI, AutoGen
- **RAG sobre documentação técnica**: runbook, ADR, wiki interna, changelog
- Padrões de prompting para infra: sempre exigir versão de provider, sempre exigir explicação da
  mudança, sempre pedir o comando de validação junto
- **Limitações e alucinação em infra**: o modelo inventa flag que não existe, atributo depreciado e
  API version errada. Toda saída passa por validador determinístico. Sem exceção

---

## Unidade II — IaC Copilot (semana 16)

- Linguagem natural → Terraform, Pulumi, Helm Chart
- Validação automatizada obrigatória: `terraform validate`, `terraform plan`, `helm lint`,
  `kubeconform`
- **Policy-as-Code**: OPA/Rego e Sentinel — a política é o que impede o copiloto de aprovar besteira
- Workflow **PR-first**: a IA nunca aplica; ela abre PR. Revisão assistida no PR
- Detecção de drift e sugestão de correção

**Prática 1 (entrega da semana 16):** copiloto que recebe descrição em português, gera módulo
Terraform, roda `validate` + `plan` + política OPA, e só então abre PR. Se qualquer etapa falhar, ele
corrige e tenta de novo, com teto de tentativas.

---

## Unidade III — Agentes para Kubernetes (semana 17)

- Geração e ajuste de manifests via linguagem natural
- HPA e VPA: configuração inteligente a partir de perfil de carga
- Autoscaling por métrica customizada
- Ingress, Services e Network Policies gerados com política aplicada
- Estratégias de rollout guiadas por IA: canary, blue-green, progressive delivery
- GitOps: Argo CD e Flux — a IA propõe commit, o GitOps aplica. **Essa separação é o guardrail**

**Prática 2:** agente de deploy end-to-end com validação de readiness (só declara sucesso quando o
pod está `Ready` e o health check passou N vezes).

---

## Unidade IV — Troubleshooting assistido (semana 17)

- **ReAct aplicado a incidente**: hipótese → comando de verificação → observação → nova hipótese.
  É o método do [COMO-ESTUDAR.md](../../COMO-ESTUDAR.md), automatizado
- Diagnóstico dos clássicos: `CrashLoopBackOff`, `ImagePullBackOff`, `OOMKilled`, `Pending` sem nó
- Análise de log distribuído e stack trace: extrair o erro real do meio do ruído
- Correlação de traces (Jaeger, Zipkin) com métricas para root cause
- Detecção de latência, 5xx e degradação
- Sugestão de fix — **sugestão**, aplicada por humano nesta unidade

**Prática 3:** sistema que, dado um pod com problema, produz diagnóstico com evidência (qual log, qual
métrica, qual trace) e propõe correção. Teste contra 5 incidentes reais ou reproduzidos.

---

## Unidade V — AIOps e observabilidade (semana 17)

- Linguagem natural → PromQL e LogQL. Excelente ganho: a barreira de sintaxe some
- Geração de dashboard Grafana contextualizado
- Detecção de anomalia com ML clássico: Prophet, Isolation Forest — **não precisa de LLM**, e é aqui
  que fica claro que nem tudo é LLM
- Correlação entre métrica, log e trace
- Alerta preditivo e redução de falso positivo — o maior ganho real de AIOps: ninguém acorda à toa
- Forecasting de recurso

**Prática 4:** dashboard com detecção de anomalia em tempo real sobre uma métrica sua de verdade
(ex.: taxa de aceite de disparo por hora, latência do ERP, fila de pendentes).

---

## Unidade VI — ChatOps com aprovação humana (semana 18)

- Bot conversacional em Slack, Discord, Teams ou **Telegram**
- Comandos seguros: `/deploy`, `/scale`, `/rollback`, `/investigar`
- Mostrar **diff e análise de impacto antes** de executar — a etapa que evita quase todo desastre
- Fluxo de aprovação com guardrail e circuit breaker
- RBAC: quem pode pedir, quem pode aprovar, e por que nunca a mesma pessoa nas duas pontas em produção
- Auditoria e rastreabilidade de tudo que foi executado

**Prática 5 (entrega da semana 18):** bot de ChatOps com fluxo de aprovação. Requisitos: só age em
ambiente não produtivo por padrão, produção exige aprovação de segunda pessoa, e todo comando fica em
log imutável.

---

## Unidade VII — Segurança e compliance assistidos

- Scan automatizado de IaC e container: Snyk, Trivy, Checkov
- "AI fix" de vulnerabilidade — útil, e perigoso quando aplicado sem revisão
- Detecção e prevenção de vazamento de secret (o achado mais comum em repositório real)
- Explicar política OPA em linguagem natural — reduz atrito com o time de produto
- Remediação guiada de CVE
- Geração de relatório de compliance (SOC2, ISO 27001, PCI-DSS)

---

## Unidade VIII — CI/CD copilot

- Geração de pipeline: GitHub Actions, GitLab CI, Jenkins
- Gates inteligentes: teste, SAST, DAST, dependency scanning
- Análise de impacto de mudança em PR
- Recomendação de estratégia de deploy por perfil de risco da mudança
- Otimização de tempo de build e cache
- Rollback automático por métrica de qualidade

---

## Unidade IX — FinOps com IA

- Estimativa de custo direto no PR (Infracost) — o momento certo de mostrar o preço é antes do merge
- Rightsizing de pod e node por histórico
- Instância spot e reservada: quando compensa
- Recursos ociosos e *zombie resources*
- Forecasting de custo
- Otimização de storage e rede

**Inclua aqui o custo de IA.** Faça o FinOps das suas próprias chamadas de LLM: é o número que
ninguém tem e todo diretor pergunta.

---

## Unidade X — RAG de runbooks e post-mortem automático

- Arquitetura de RAG para documentação técnica interna
- Indexar playbook, README, wiki e — o mais valioso — **histórico de incidente resolvido**
- Agente que consulta e executa runbook
- Geração automática de timeline de incidente a partir de log, alerta e mensagem
- Extração de lição aprendida
- Template de post-mortem *blameless* automatizado

Este é o caso de uso com melhor retorno de todo o módulo: transforma conhecimento que hoje está na
cabeça de uma pessoa em algo consultável às 3h da manhã.

---

## Unidade XI — Auto-remediação segura

- Playbook acionado por alerta
- Fluxo: **alerta → verificação → mitigação → validação** (nunca pular a verificação)
- Canary automático com rollback inteligente
- Circuit breaker e rate limit nas próprias ações automatizadas
- **Dry-run obrigatório** antes de qualquer execução em produção
- Human-in-the-loop para ação crítica

Princípio: **auto-remediação só para causa conhecida e ação reversível.** Fora disso, o sistema
diagnostica e chama gente.

---

## Unidade XII — Projeto integrador

## 🎯 Projeto 6 — Copiloto de operação

**Spec em [../../projetos/06-copiloto-devops.md](../../projetos/06-copiloto-devops.md).**

Critérios de aceite:
- [ ] Integra pelo menos 2 de: IaC, Kubernetes/deploy, observabilidade
- [ ] Diagnóstico com evidência rastreável
- [ ] ChatOps com aprovação humana para ação em produção
- [ ] Guardrails: dry-run, circuit breaker, allowlist de ação, kill switch
- [ ] RAG sobre os seus runbooks reais
- [ ] Testado contra cenários simulados, com relatório de acerto e erro
- [ ] Análise de ROI: horas economizadas por mês vs custo de token

---

## ✅ Checklist de domínio

- [ ] Explico por que IaC gerada por IA sempre passa por validador determinístico
- [ ] Descrevo o loop ReAct aplicado a um `CrashLoopBackOff`
- [ ] Traduzo uma pergunta de negócio em PromQL
- [ ] Sei quando usar ML clássico em vez de LLM em observabilidade
- [ ] Desenho um fluxo de ChatOps com aprovação e RBAC
- [ ] Listo os guardrails de auto-remediação segura
- [ ] Sei calcular o custo de IA da minha própria automação

---

## 💬 Perguntas de entrevista deste módulo

1. Você automatizaria rollback de produção sem humano? Em que condições?
2. A IA gerou Terraform que apagaria um banco. O que no seu pipeline impediria isso?
3. Como reduzir fadiga de alerta com IA sem esconder incidente real?
4. Qual o risco de dar acesso de escrita ao cluster para um agente?
5. Como você provaria o ROI de um copiloto de DevOps para a diretoria?

---

## 📚 Recursos

- k8sgpt — diagnóstico de Kubernetes assistido por IA
- Infracost — custo no PR
- OPA / Rego — documentação oficial
- Prophet e Isolation Forest — detecção de anomalia
- Google SRE Book, capítulos de post-mortem e de gestão de incidente

---

**Anterior:** [Módulo 05](../05-ux-ui/) · **Próximo:** [Módulo 07 — IA para Gestão de Projetos](../07-gestao-projetos/)
