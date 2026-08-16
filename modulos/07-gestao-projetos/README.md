# Módulo 07 — Ferramentas de IA para Gestão de Projetos

**Semanas 19 e 20 · ≈ 20h · Pré-requisitos: módulos 01 a 04**

Módulo curto em teoria e alto em retorno. É onde o engenheiro de IA vira alguém que a diretoria
procura, porque o resultado aparece em relatório e em prazo cumprido.

---

## Ao final deste módulo você será capaz de

1. Transformar conversa em requisito, épico e história com critério de aceite
2. Priorizar backlog com framework (RICE, WSJF, MoSCoW) apoiado por IA, de forma auditável
3. Estimar prazo e custo com base em histórico e simulação probabilística
4. Detectar risco de projeto antes dele virar atraso
5. Automatizar status report e reunião sem perder informação
6. Construir bots que operam Jira, Notion, ClickUp e Slack por linguagem natural

---

## Unidade 1 — Planejamento e escopo (Requirements Copilot)

- Levantamento e definição de requisito com apoio de IA: transcrever reunião, extrair necessidade,
  separar o que foi pedido do que é solução disfarçada
- Linguagem natural → épico, história de usuário, requisito de mudança
- Decomposição de tarefa e geração de **critério de aceite** — o maior ganho isolado do módulo, porque
  critério de aceite mal escrito é a origem de metade do retrabalho
- Detecção de ambiguidade: a IA é boa em perguntar "o que acontece se o usuário não tiver X?"

**Exercício 19.1:** pegue uma demanda real sua, escrita do jeito que chegou. Gere épico, histórias e
critérios de aceite. Depois revise à mão e conte quantos casos de borda a IA levantou que você não
tinha pensado.

---

## Unidade 2 — Priorização inteligente de backlog

| Framework | Fórmula / lógica | Quando usar |
|---|---|---|
| **RICE** | (Reach × Impact × Confidence) / Effort | Produto com muita ideia e pouco dado |
| **WSJF** | Custo do atraso / duração | Ambiente com dependência e prazo |
| **MoSCoW** | Must / Should / Could / Won't | Escopo de release com data fixa |

- IA como apoio: ela **estima os fatores** e explica o raciocínio; você valida. Nunca deixe a
  pontuação final sem revisão humana — o modelo não sabe da política interna nem do contrato assinado
- Simulação de impacto de funcionalidade e sugestão de roadmap
- **Regra de auditabilidade:** toda pontuação gerada precisa vir com a justificativa registrada. Sem
  isso, ninguém confia no ranking e o processo morre em duas semanas

**Exercício 19.2 (entrega da semana 19):** priorize seu backlog real com RICE assistido por IA. Gere
uma tabela com pontuação, justificativa por fator e nível de confiança. Compare com a ordem que você
teria escolhido no instinto e analise as divergências.

---

## Unidade 3 — Cronograma, capacidade e alocação

- Criação dinâmica de cronograma e identificação de dependência entre tarefas
- Análise "what-if": e se essa pessoa sair do projeto? E se o fornecedor atrasar 2 semanas?
- Balanceamento de capacidade da equipe
- Ajuste automático de cronograma por previsão de carga e restrição operacional

---

## Unidade 4 — Estimativas e previsões

- Previsão de prazo, custo e esforço com base em dado histórico — e a pergunta que vem antes:
  **você tem histórico?** Se não tem, comece a registrar hoje; sem base, IA só produz chute educado
- Melhoria de acurácia analisando estimado vs realizado
- **Simulação de Monte Carlo**: em vez de "termina dia 20", você entrega "70% de chance de terminar
  até dia 20, 95% até dia 28". Muda completamente a conversa com stakeholder

**Exercício 20.1:** implemente uma simulação de Monte Carlo em JavaScript sobre o histórico de
entregas de um projeto seu. Produza a curva de probabilidade de conclusão.

---

## Unidade 5 — Riscos e mitigação (AIOps de projeto)

- Detecção automática de risco de escopo, cronograma e recurso
- Sinais que a IA lê bem: tarefa parada há muito tempo, reabertura recorrente, estimativa crescendo,
  concentração de conhecimento em uma pessoa, PR envelhecendo sem revisão
- Análise de padrão e anomalia para prever gargalo
- Geração de plano de mitigação com base em histórico e heurística

---

## Unidade 6 — Reuniões turbinadas

- Transcrição e resumo automáticos
- Extração de **decisão, pendência e ação** — com responsável e prazo
- Integração com calendário e board: a ação sai da reunião já virando card
- Cuidado: gravar e transcrever reunião tem implicação de privacidade e consentimento (módulo 10)

---

## Unidade 7 — Status report e executive summary

- Geração automática de relatório de sprint, de projeto e de portfólio
- **Adaptação por público** — o mesmo dado, três textos:
  - técnico: o que mudou, o que quebrou, dívida acumulada
  - gestor: prazo, escopo, risco, bloqueio
  - diretoria: impacto no negócio, custo, decisão necessária
- Consolidação de métrica de desempenho em linguagem natural

**Exercício 20.2:** automação que lê a atividade real do repositório e do board da semana e gera as
três versões do relatório. Rode por 3 semanas e ajuste.

---

## Unidade 8 — Governança, compliance e qualidade

- Verificação de conformidade e rastreabilidade
- Checklist automatizado e trilha de decisão para auditoria interna
- Geração e controle de documentação de qualidade
- Verificações automáticas em JavaScript para auditoria e controle de versão (ex.: todo PR referencia
  card? todo card tem critério de aceite? toda decisão tem ADR?)

---

## Unidade 9 — Automação em Jira, Asana, Trello, Notion e Slack

- Automação inteligente integrada às plataformas de gestão
- Bot em JavaScript que cria, atualiza e prioriza card
- **NL → workflow**: "cria uma task pro Pedro revisar o disparo de sexta e me avisa se não fechar até
  quinta" vira card + lembrete + regra
- Regra de negócio automatizada para lembrete, notificação e aprovação

**Exercício 20.3:** bot que aceita comando em português no seu canal e opera o board de verdade.
Comece por leitura e criação; escrita destrutiva só com confirmação.

---

## Unidade 10 — Portfólio e OKRs

- Alinhamento de projeto com OKR
- Análise de métrica de *outcome* (resultado) em vez de *output* (entrega) — distinção que a maioria
  dos times erra
- Avaliação de impacto e proposta de ajuste com base em dado

---

## 🎯 Projeto 7 — Copiloto de gestão

**Entrega da semana 20.** Spec em [../../projetos/07-copiloto-gestao.md](../../projetos/07-copiloto-gestao.md).

Critérios de aceite:
- [ ] Lê fonte real (repositório, board ou ambos)
- [ ] Gera status report nas 3 versões de público
- [ ] Prioriza backlog com framework declarado e justificativa auditável
- [ ] Detecta pelo menos 3 tipos de risco automaticamente
- [ ] Roda agendado, sem você acionar
- [ ] Entrega onde a equipe já está (Telegram, Slack ou e-mail)
- [ ] Rodou por 3 semanas com relatório de acerto e erro

---

## ✅ Checklist de domínio

- [ ] Escrevo critério de aceite bom e sei reconhecer um ruim
- [ ] Explico RICE, WSJF e MoSCoW e quando usar cada um
- [ ] Justifico por que pontuação gerada por IA precisa de justificativa registrada
- [ ] Explico Monte Carlo aplicado a prazo, para quem não é técnico
- [ ] Listo sinais de risco de projeto detectáveis automaticamente
- [ ] Diferencio outcome de output com exemplo
- [ ] Adapto o mesmo relatório para 3 públicos

---

## 💬 Perguntas de entrevista deste módulo

1. Como você usaria IA para melhorar a acurácia das estimativas do time?
2. A IA priorizou o backlog e o time discordou. O que isso revela sobre o processo?
3. Como automatizar status report sem que ele vire texto que ninguém lê?
4. Que riscos de projeto dá para detectar sozinho a partir de dado de repositório?
5. Qual o limite ético de usar IA para avaliar produtividade de pessoas?

---

## 📚 Recursos

- APIs: Jira, Notion, ClickUp, Linear, Slack, Telegram Bot API
- *Team Topologies* e o Google SRE Book (capítulos de gestão de carga)
- Monte Carlo para prazo: material do #NoEstimates e de Troy Magennis
- Medição de outcome: framework DORA e SPACE

---

**Anterior:** [Módulo 06](../06-devops/) · **Próximo:** [Módulo 08 — Arquitetura de Sistemas com IA](../08-arquitetura/)
