# Módulo 12 — Carreira e Entrevistas para Engenheiros de IA Aplicada

**Contínuo · 30 minutos por semana, da semana 1 até a 32**

Este módulo **não** é para o fim do curso. Se você começar na semana 30, vai ter 4 semanas de conteúdo
para publicar e zero histórico. Começando na semana 1, chega no fim com 32 posts, 11 projetos e uma
presença construída.

---

## Cronograma paralelo

| Semanas | O que fazer |
|---|---|
| 1–4 | Arrumar LinkedIn e GitHub. Primeiro post técnico |
| 5–12 | Publicar 1 aprendizado por semana. Conectar com 5 pessoas de IA por semana |
| 13–20 | Publicar os projetos com README bom. Participar de 2 comunidades |
| 21–26 | Um artigo técnico mais denso. Começar simulados de entrevista |
| 27–30 | Simulados de system design e live coding. Pesquisa salarial |
| 31–32 | Capstone publicado, portfólio fechado, currículo revisado |

**Regra:** 30 minutos por semana, sempre no mesmo dia. É pouco, e é justamente por ser pouco que
funciona por 8 meses seguidos.

---

## 1. LinkedIn otimizado para recrutador

- **Headline**: o que você faz + a especialidade + prova. Ex.: "Engenheiro de IA Aplicada · RAG,
  agentes e MCP em produção · Micro-SaaS com IA no ar"
- **Palavras-chave** que recrutador busca: LLM, RAG, agentes de IA, MCP, LangChain, LangGraph,
  fine-tuning, vector database, prompt engineering, IA generativa
- **Sobre**: 3 parágrafos — o que você resolve, como (com projeto citado), e o que procura
- **Experiência**: resultado com número, não descrição de tarefa. "Reduzi 60% do custo de LLM
  implementando roteamento e cache semântico" bate "responsável por integrações de IA"
- **Projetos**: os 11 do curso, com link
- **SSI alto** vem de atividade consistente, não de truque

**Tarefa (semanas 1–2):** reescrever headline, sobre e a experiência mais recente.

---

## 2. Networking estratégico

- Conectar com recrutador técnico e tech lead de IA — com nota curta e específica, nunca convite seco
- Comunidades: comunidades brasileiras de IA e dados, Discord de LangChain e de MCP, meetups locais
- Engajamento consistente: comentário que agrega vale mais que post próprio no começo
- Meta simples: **5 conexões novas relevantes por semana**. Em 8 meses são 160 pessoas

---

## 3. Marca pessoal e posicionamento

- Compartilhar aprendizado, não conquista. "Errei isso, descobri aquilo" tem alcance e credibilidade
  muito maiores que "concluí mais um curso"
- Suas notas semanais (`notas/semana-NN.md`) **são** o conteúdo. Só precisa editar
- Formato que funciona: problema → o que tentei → o que descobri → o que você pode aproveitar
- Posicionamento: seja o especialista em algo estreito. "IA aplicada a operação de cobrança e
  atendimento em escala" é muito mais forte que "especialista em IA"
- Frequência sustentável: 1 post por semana por 8 meses vence 5 por semana por 3 semanas

---

## 4. Portfólio GitHub profissional

- **Projeto deployado** > projeto no repositório > repositório vazio com README bonito
- README que responde em 30 segundos: o que é, print ou GIF, como rodar, arquitetura, decisões
- Código limpo: sem segredo commitado, sem `console.log` esquecido, com teste e com CI verde
- Perfil: README de perfil, projetos fixados, contribuição consistente
- **Demo ao vivo acessível** — o link é o que faz o recrutador parar

⚠ Auditoria antes de tornar público: procure token, chave e `.env` no histórico do git. Segredo em
repositório público é eliminatório em processo sério.

---

## 5. Expectativas por nível

| Nível | Escopo | Autonomia | Impacto |
|---|---|---|---|
| Júnior | Tarefa definida | Precisa de revisão | O próprio trabalho |
| Pleno | Feature completa | Trabalha sozinho | O time |
| Sênior | Sistema | Define o como | Vários times |
| Staff | Área técnica | Define o quê | A organização |
| Principal | Direção técnica | Define o porquê | A empresa e o mercado |

Em IA aplicada, o que mais acelera a subida é **decisão bem justificada**: saber quando **não** usar
IA é sinal de senioridade mais forte que saber usar.

---

## 6. Entrevista de RH

- **Método STAR**: Situação, Tarefa, Ação, Resultado. Resultado sempre com número
- Prepare 6 histórias que cobrem: conflito, falha sua, liderança sem cargo, prazo apertado, decisão
  técnica difícil, aprendizado recente. Uma boa história serve para 3 perguntas diferentes
- Ponto fraco: escolha um real, mostre o que está fazendo a respeito. Não use "sou perfeccionista"
- Alinhamento cultural: pesquise a empresa e tenha 3 perguntas boas para fazer

---

## 7. Expectativa salarial e proposta de valor

- Pesquise antes: Glassdoor, Levels.fyi, pesquisas salariais brasileiras, e conversa direta com pares
- Justifique valor por impacto: "a automação que construí economiza X horas por mês"
- **Timing**: não dê número primeiro se der para evitar. Se insistirem, dê faixa com piso confortável
- Considere o pacote inteiro: PLR, equity, benefício, flexibilidade, verba de estudo

---

## 8. Live coding e problem solving

- Pense em voz alta — o processo é avaliado tanto quanto a solução
- Esclareça o problema antes de codar; pergunte sobre restrição e volume
- Comece pela versão que funciona, otimize depois
- Teste caso de borda: vazio, nulo, muito grande, duplicado
- Se travar, diga o que está pensando. Silêncio é o pior sinal

**Prática:** 1 problema por semana a partir da semana 27, cronometrado, falando em voz alta.

---

## 9. System design para sistemas de IA

O formato mais cobrado em vaga sênior. Roteiro de 45 minutos:

1. **Requisitos** (5 min) — funcional, escala, latência, orçamento, precisão exigida
2. **API** (5 min) — endpoints e contratos
3. **Arquitetura macro** (10 min) — gateway, orquestração, RAG, agentes, dados
4. **Aprofundar** (15 min) — o entrevistador escolhe: RAG, roteamento, cache, avaliação
5. **Escala e custo** (5 min) — gargalo, custo por usuário, o que quebra primeiro
6. **Trade-offs** (5 min) — o que você sacrificou e por quê

Problemas para praticar: assistente de suporte para 100 mil usuários; sistema de análise de documento
para escritório de advocacia; copiloto interno sobre dados da empresa; moderação de conteúdo em tempo
real.

---

## 10. Explicar decisões técnicas

Estrutura que sempre funciona: **contexto → alternativas consideradas → critério de escolha →
trade-off aceito → como eu saberia que errei**.

O último item é o que impressiona. Quem diz "eu saberia que errei se o custo por conversa passasse de
X" demonstra maturidade que a maioria não tem.

---

## 11. Perguntas técnicas específicas de IA

As mais recorrentes — todas já respondidas nos módulos:

1. RAG ou fine-tuning? (módulo 09)
2. Quando usar agente em vez de workflow? (módulo 04)
3. Como otimizar custo de LLM? (módulos 02 e 08)
4. Como tratar falha de provedor? (módulo 02)
5. Como avaliar qualidade de saída de LLM? (módulos 02 e 09)
6. Como impedir prompt injection? (módulos 03 e 10)
7. Como versionar comportamento de IA? (módulo 08)
8. O que é MCP e por que importa? (módulo 03)

**Tarefa (semanas 27–30):** grave você mesmo respondendo cada uma em até 2 minutos. Assista. Vai doer
e vai melhorar rápido.

---

## 12. Negociação salarial

- Timing: negocie depois da oferta, nunca antes
- Âncora: quem fala número primeiro ancora a conversa; se possível, deixe eles falarem
- Múltiplas ofertas são a maior alavanca real que existe
- Negocie o pacote, não só o salário
- Sempre agradeça e nunca dê ultimato que você não cumpriria

---

## 13. Pedido de aumento ou promoção

- Documente impacto o ano inteiro, com número. Comece o arquivo hoje
- Timing: perto do ciclo de avaliação e depois de uma entrega visível
- Construa o caso: o que você faz hoje já é o escopo do nível seguinte? Mostre
- Apresente como proposta, com dados. Não como desabafo

---

## 14. Técnicas de diferenciação

O que realmente separa candidatos em IA aplicada hoje:

1. **Projeto ao vivo** que o entrevistador pode abrir e usar
2. **Case com resultado**: "reduzi custo em 62%, aqui está como medi"
3. **Contribuição open source** — um MCP server útil publicado já te coloca num grupo pequeno
4. **Presença técnica**: escrever, palestrar, ensinar
5. **Saber dizer não à IA**: mostrar um caso onde você concluiu que IA era a escolha errada

---

## ✅ Checklist do módulo

- [ ] LinkedIn com headline, sobre e experiências com resultado numérico
- [ ] GitHub auditado, sem segredo, com projetos fixados e README de perfil
- [ ] 20+ posts publicados ao longo do curso
- [ ] 100+ conexões novas relevantes
- [ ] 6 histórias STAR prontas
- [ ] 4 system designs de IA praticados
- [ ] As 8 perguntas técnicas respondidas em vídeo, em até 2 minutos cada
- [ ] Pesquisa salarial feita, com faixa definida
- [ ] Capstone no ar, com vídeo de demonstração
- [ ] Currículo de 1 página, focado em IA aplicada

---

## 📚 Recursos

- *Cracking the Coding Interview* — para a parte de algoritmo
- *System Design Interview* (Alex Xu) — base, com adaptação para IA
- Levels.fyi e Glassdoor — referência salarial
- Blog de engenharia de empresas que fazem IA em produção — fonte de case e de vocabulário

---

**Anterior:** [Módulo 11 — Capstone](../11-capstone/) · **Voltar ao [início](../../)**
