# Módulo 09 — Processamento de Dados e Fine-Tuning de Modelos

**Semanas 24 a 26 · ≈ 30h · Pré-requisitos: módulos 01, 02 e 08**

---

## Ao final deste módulo você será capaz de

1. Decidir com honestidade quando fine-tuning é a resposta — e quase sempre não é
2. Preparar dataset limpo, balanceado e versionado em JSONL
3. Executar fine-tuning via API, acompanhar e documentar
4. Explicar LoRA e PEFT e quando eles resolvem
5. Avaliar modelo ajustado contra baseline com métrica declarada antes do treino

---

## Unidade 1 — Quando fazer fine-tuning (semana 24)

### O framework de decisão

Percorra **nesta ordem**. Só desça quando o degrau anterior tiver sido tentado de verdade:

1. **Prompt melhor** — 60% dos casos param aqui. Custo: horas
2. **Few-shot** — exemplos no prompt. Custo: horas + tokens
3. **RAG** — o problema é falta de conhecimento, não de comportamento. Custo: dias
4. **Fine-tuning** — o problema é *comportamento* consistente: formato, tom, estilo, domínio muito
   específico. Custo: semanas + dinheiro + manutenção permanente

### Fine-tuning resolve
- Formato de saída rígido e repetitivo
- Tom e estilo de uma marca ou de uma área
- Vocabulário de domínio muito fechado
- Reduzir custo: modelo pequeno ajustado substituindo modelo grande em tarefa estreita
- Reduzir latência pelo mesmo motivo

### Fine-tuning **não** resolve
- Adicionar conhecimento factual novo → isso é RAG
- Conhecimento que muda com frequência → você retreinaria toda semana
- Falta de raciocínio → modelo pequeno ajustado não vira modelo grande
- Prompt mal escrito → você vai ensinar o modelo a errar com consistência

### O custo escondido
Fine-tuning cria um ativo que precisa de manutenção: quando sair a próxima geração do modelo base, o
seu ajustado fica para trás e você refaz tudo. Some isso na conta antes de começar.

**Exercício 24.1 (entrega da semana 24):** documento de decisão para um caso real seu. Compare RAG vs
few-shot vs fine-tuning com custo estimado, prazo e risco. Conclua — e a conclusão pode perfeitamente
ser "não fazer fine-tuning". Um documento assim vale mais em entrevista que um modelo treinado à toa.

---

## Unidade 2 — Preparação de datasets (semana 25)

Aqui está 80% do resultado. Dataset ruim com hiperparâmetro perfeito perde para dataset bom com
configuração padrão.

### Coleta
- Onde estão os seus dados: histórico de atendimento, mensagens, documentos, logs, tickets
- Consentimento e base legal antes de usar dado de cliente (módulo 10)
- Anonimização: remova nome, CPF, telefone, e-mail e endereço **antes** de subir para qualquer API

### Limpeza
- Duplicata exata e quase-duplicata
- Exemplo contraditório (mesma entrada, saída diferente) — veneno para o treino
- Ruído: mensagem quebrada, HTML, assinatura de e-mail, encoding errado
- Outlier: exemplo excepcionalmente longo distorce o aprendizado

### Balanceamento
- Distribuição por classe e por caso de uso
- Cuidado com o viés do histórico: se o atendimento antigo era ruim, você está ensinando a ser ruim
- Diversidade importa mais que volume. **500 exemplos bons e variados batem 50 mil repetitivos**

### Formato JSONL
```jsonl
{"messages":[{"role":"system","content":"..."},{"role":"user","content":"..."},{"role":"assistant","content":"..."}]}
```
Separação treino / validação / teste — o conjunto de teste **não** é tocado até o fim.

### Versionamento
Dataset é artefato versionado: hash, changelog, e a resposta sempre disponível para "com quais dados
esse modelo foi treinado?".

**Exercício 25.1 (entrega da semana 25):** pipeline em TypeScript que pega dado bruto seu e produz
JSONL limpo, anonimizado, balanceado e dividido, com relatório de estatísticas (quantos descartados e
por quê).

---

## Unidade 3 — Fine-tuning via API (semana 26)

- Processo em APIs comerciais (OpenAI, Gemini): upload → job → monitoramento → avaliação → deploy
- Hiperparâmetros básicos: épocas, learning rate multiplier, batch size — e por que mexer pouco
- Acompanhar o treino: curva de perda de treino vs validação. **Divergência = overfitting**
- Custo: treino cobrado por token processado; inferência do modelo ajustado costuma custar mais que a
  do base
- Versionamento e documentação: model card interno com dataset, data, hiperparâmetros e métricas

**Exercício 26.1:** script em TypeScript que automatiza upload, dispara o job, acompanha o status e
registra o resultado.

---

## Unidade 4 — LoRA e PEFT

- **Full fine-tuning**: atualiza todos os pesos. Caro, exige GPU pesada
- **LoRA**: congela o modelo e treina matrizes de baixo posto adicionadas às camadas. Fração do custo,
  qualidade próxima na maioria das tarefas
- **PEFT**: a família de técnicas eficientes em parâmetros (LoRA, QLoRA, prefix tuning, adapters)
- Trade-off: LoRA é mais rápido, mais barato, gera artefato pequeno e permite trocar adaptador por
  tarefa. Full fine-tuning ainda ganha em mudança profunda de comportamento
- No ecossistema JS: você consome via API ou serviço (Together, Replicate, Hugging Face). Treino local
  sério é Python — saiba disso e não finja o contrário

**Exercício 26.2:** compare, na mesma tarefa, o modelo base, o base com few-shot e um ajustado.
Tabela de qualidade, custo e latência.

---

## Unidade 5 — Avaliar modelos ajustados

**Defina a métrica antes de treinar.** Métrica escolhida depois vira justificativa, não avaliação.

- Quantitativas: acurácia, F1, exact match, conformidade de schema, taxa de alucinação em conjunto
  controlado
- Qualitativas: rubrica escrita com nota por critério; LLM-as-judge com rubrica explícita e amostra
  revisada por humano
- **A/B** entre customizado e genérico, no mesmo conjunto de teste intocado
- Riscos: overfitting, perda de generalização (o modelo fica ótimo na tarefa e burro no resto),
  esquecimento catastrófico
- Automatize: script que roda a suíte e registra o resultado versionado

---

## Unidade 6 — Projeto final do módulo

## 🎯 Projeto 9 — Modelo customizado para domínio específico

**Entrega da semana 26.** Spec em [../../projetos/09-fine-tuning.md](../../projetos/09-fine-tuning.md).

Domínio sugerido: classificação e resposta de mensagens de cobrança, ou extração estruturada de
documento do seu ERP.

Critérios de aceite:
- [ ] Documento de decisão justificando fine-tuning (unidade 1)
- [ ] Dataset limpo, anonimizado, balanceado, versionado, com relatório
- [ ] Baseline medido **antes** (modelo base + prompt bem feito)
- [ ] Métrica declarada antes do treino
- [ ] Modelo ajustado e avaliado no conjunto de teste intocado
- [ ] A/B vs baseline com resultado honesto — **incluindo "não superou", se for o caso**
- [ ] Protótipo funcional em TypeScript consumindo o modelo via API
- [ ] Model card interno completo

> Um projeto que conclui "o fine-tuning não valeu a pena e aqui está a evidência" é um **bom**
> projeto. Mostra critério. Fingir ganho é o que reprova.

---

## ✅ Checklist de domínio

- [ ] Percorro o framework de decisão e sei o custo de cada degrau
- [ ] Digo 3 coisas que fine-tuning resolve e 3 que não resolve
- [ ] Listo as etapas de preparação de dataset e o que descartar
- [ ] Explico por que diversidade importa mais que volume
- [ ] Explico LoRA em duas frases
- [ ] Detecto overfitting pela curva de perda
- [ ] Explico por que a métrica vem antes do treino
- [ ] Sei o custo de manutenção de um modelo ajustado

---

## 💬 Perguntas de entrevista deste módulo

1. Cliente quer "treinar uma IA com os dados da empresa". O que você pergunta antes de aceitar?
2. RAG ou fine-tuning para uma base de conhecimento que muda toda semana? Por quê?
3. Como você mede se o fine-tuning funcionou?
4. O modelo ajustado ficou ótimo na tarefa e péssimo no resto. O que aconteceu?
5. Que cuidados de privacidade existem ao treinar com dado de cliente?
6. Quanto custa manter um modelo fine-tunado por 2 anos?

---

## 📚 Recursos

- Guias de fine-tuning: OpenAI e Google
- *LoRA: Low-Rank Adaptation of Large Language Models* — arxiv.org/abs/2106.09685
- Hugging Face PEFT — documentação
- Model Cards (Mitchell et al.) — padrão de documentação de modelo

---

**Anterior:** [Módulo 08](../08-arquitetura/) · **Próximo:** [Módulo 10 — Segurança e Governança](../10-seguranca-governanca/)
