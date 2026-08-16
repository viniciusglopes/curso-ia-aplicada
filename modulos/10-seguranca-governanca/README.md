# Módulo 10 — Segurança e Governança em IA

**Semanas 27 e 28 · ≈ 20h · Pré-requisitos: módulos 01 a 09**

O módulo que ninguém quer fazer e que decide se o seu sistema entra ou não numa empresa séria.

---

## Ao final deste módulo você será capaz de

1. Escrever uma política de uso de IA aplicável de verdade, não decorativa
2. Explicar decisões de modelo para auditoria, cliente e área jurídica
3. Identificar viés e definir responsabilidade quando o sistema erra
4. Mapear risco humano, técnico, de dados e regulatório
5. Auditar um sistema de IA existente e produzir plano de correção
6. Calcular e controlar o custo financeiro de IA

---

## Unidade 1 — O que é governança em IA

Governança responde quatro perguntas antes do sistema existir:
1. **Quem decide** o que a IA pode fazer?
2. **Quem responde** quando ela erra?
3. **Como se prova** o que ela fez?
4. **Quando ela é desligada?**

- Diferença entre governança (regra e responsabilidade), compliance (aderência a norma) e ética
  (o que é certo mesmo quando é permitido)
- Papéis: dono do sistema, dono do dado, revisor humano, responsável pelo incidente
- Referências: NIST AI Risk Management Framework, ISO/IEC 42001, EU AI Act
- Inventário de IA: a empresa precisa saber **onde** existe IA. A maioria não sabe

**Exercício 27.1:** faça o inventário de IA da sua operação. Cada uso, qual dado toca, quem é o dono,
qual o impacto se falhar. Você provavelmente vai achar coisa que esqueceu que existia.

---

## Unidade 2 — Interpretabilidade e explicabilidade

- **Interpretabilidade**: entender como o modelo funciona por dentro. Em LLM, muito limitada
- **Explicabilidade**: justificar uma saída específica. É o que dá para entregar na prática
- Técnicas viáveis: citação de fonte (RAG), rastro de raciocínio, log de ferramenta chamada, score de
  confiança calibrado
- **Cuidado sério:** o "raciocínio" que o modelo mostra nem sempre é o processo real que gerou a
  resposta. É uma narrativa plausível. Trate como indício, não como prova
- Direito à explicação: LGPD, art. 20 — o titular pode pedir revisão de decisão automatizada

---

## Unidade 3 — Vieses e responsabilidade

- De onde vem o viés: dado de treino, seleção de amostra, prompt, e o *feedback loop* (o sistema
  reforça o próprio viés com o tempo)
- Tipos: representação, histórico, medição, automação (confiar demais na máquina)
- Como testar: conjunto de casos pareados variando só o atributo sensível, e comparar a saída
- Mitigação: dado balanceado, revisão humana em decisão sensível, métrica de equidade monitorada
- **Responsabilidade:** o modelo não responde por nada. A empresa responde. Sempre

**Exercício 27.2:** teste de viés em um sistema seu. Monte pares de entrada iguais variando região,
gênero ou faixa de renda. Compare as saídas. Documente o achado, inclusive se não houver diferença.

---

## Unidade 4 — Riscos: aspectos humanos e éticos

- Substituição vs aumento de capacidade: seja claro sobre qual dos dois você está fazendo
- Excesso de confiança: quando o humano só assina o que a IA decidiu, o "human-in-the-loop" é teatro
- Transparência com o usuário: ele precisa saber que está falando com IA
- Consentimento: gravar reunião, treinar com dado de cliente, analisar mensagem
- Impacto no trabalho: quem opera o sistema precisa participar do desenho dele
- **Limite pessoal:** decida hoje o que você não constrói. É mais fácil decidir antes de te oferecerem
  dinheiro para construir

---

## Unidade 5 — Riscos: segurança e dados

### Ameaças específicas de IA
| Ameaça | O que é | Mitigação |
|---|---|---|
| **Prompt injection** | Instrução escondida em conteúdo processado | Separar dado de instrução; nunca dar peso de sistema a conteúdo externo |
| **Jailbreak** | Contornar as restrições do modelo | Guardrail na saída, não só no prompt |
| **Data exfiltration** | Modelo vaza dado do contexto | Escopo mínimo; nunca ponha no contexto o que o usuário não pode ver |
| **Model DoS** | Entrada que força consumo enorme | Limite de tamanho, timeout, quota |
| **Supply chain** | Modelo, MCP ou pacote de terceiro comprometido | Origem verificada, pinagem de versão, sandbox |
| **Envenenamento** | Dado malicioso no treino ou no índice do RAG | Controle de ingestão e revisão de fonte |

### Dados
- Minimização: não mande para a API o que não precisa ir
- Anonimização e pseudonimização antes de sair do seu perímetro
- Retenção do provedor: leia o contrato. Alguns treinam com o seu dado por padrão
- Residência: dado que não pode sair do país exige modelo local ou região específica
- **LGPD**: base legal, direito de eliminação (que inclui a memória do agente do módulo 04),
  registro de tratamento

### Guardrails
Entrada (filtro de PII, tamanho, injeção) e saída (PII vazando, conteúdo impróprio, ação fora do
escopo, alucinação verificável contra a fonte).

---

## Unidade 6 — Riscos: aspectos legais e regulatórios

- **LGPD** — decisão automatizada, base legal, direitos do titular, DPO
- **EU AI Act** — classificação por risco (inaceitável, alto, limitado, mínimo); alcança quem atende
  usuário europeu
- **Direito autoral** — de quem é o conteúdo gerado; risco de reproduzir material protegido
- **Responsabilidade civil** — quem paga quando a IA causa prejuízo ao cliente
- **Setoriais** — saúde, finanças e jurídico têm regra própria e mais dura
- **Contrato** — o que você promete sobre precisão do sistema. Cuidado com "a IA garante"

---

## Unidade 7 — Custos financeiros em IA

- Componentes: token, infraestrutura, armazenamento vetorial, observabilidade, **e pessoas**
- Custo por unidade de negócio (por conversa, por documento, por cliente) — a métrica que a diretoria
  entende
- Orçamento e alerta: limite por ambiente, por cliente e por funcionalidade
- Modos de estouro: loop de agente, prompt crescendo sem controle, retry sem teto, contexto inflando
- Build vs buy: quando self-host compensa e quando é ilusão de economia
- **ROI honesto**: horas economizadas × custo da hora − custo total. Se não fecha, diga que não fecha

---

## 🎯 Projeto 10 — Auditoria de IA

**Entrega da semana 28.** Spec em [../../projetos/10-auditoria-ia.md](../../projetos/10-auditoria-ia.md).

Escolha um sistema de IA seu que já está no ar e audite de verdade.

Critérios de aceite:
- [ ] Inventário: onde há IA, que dado toca, quem é o dono
- [ ] Mapa de risco: humano, técnico, de dados, regulatório
- [ ] Teste prático de prompt injection e de vazamento de dado entre tenants
- [ ] Teste de viés com casos pareados
- [ ] Análise de custo com projeção de 12 meses
- [ ] Verificação de conformidade LGPD (base legal, retenção, direito de eliminação)
- [ ] Plano de correção priorizado por risco × esforço, com prazo
- [ ] Política de uso de IA escrita, em uma página, que uma pessoa não técnica entende

---

## ✅ Checklist de domínio

- [ ] Respondo as 4 perguntas da governança para qualquer sistema
- [ ] Diferencio interpretabilidade de explicabilidade
- [ ] Explico por que o raciocínio exibido não é prova do processo
- [ ] Desenho um teste de viés com casos pareados
- [ ] Listo 6 ameaças específicas de IA e a mitigação de cada
- [ ] Explico as obrigações de LGPD em decisão automatizada
- [ ] Calculo custo por unidade de negócio
- [ ] Sei dizer o que eu não construiria

---

## 💬 Perguntas de entrevista deste módulo

1. Como você impede prompt injection num agente que lê e-mail de cliente?
2. O cliente pede eliminação dos dados dele. O que acontece com a memória do agente e com o índice do RAG?
3. Seu sistema negou crédito e o cliente quer explicação. O que você entrega?
4. Como testar viés num sistema de IA em produção?
5. O provedor treina com o dado enviado. Como isso muda a sua arquitetura?
6. Quem é responsável quando a IA erra: o dev, o produto, ou a empresa?

---

## 📚 Recursos

- **NIST AI Risk Management Framework** — o mais prático de aplicar
- **OWASP Top 10 for LLM Applications** — leitura obrigatória, curta e concreta
- **LGPD** — Lei 13.709/2018, com atenção aos arts. 20 (decisão automatizada) e 18 (direitos)
- **EU AI Act** — resumo por nível de risco
- ISO/IEC 42001 — sistema de gestão de IA

---

**Anterior:** [Módulo 09](../09-fine-tuning/) · **Próximo:** [Módulo 11 — Capstone](../11-capstone/)
