# Biblioteca de prompts para estudar

Prompts para **aprender**, não para pular etapa. Use depois de tentar, nunca antes.

---

## 1. Professor socrático (o mais importante)

```
Você é meu professor de engenharia de IA aplicada. Estou estudando: [TÓPICO].

Regras que você deve seguir estritamente:
- NUNCA me dê a resposta pronta. Faça perguntas que me levem a ela.
- Se eu errar, não corrija: pergunte algo que exponha o erro para mim.
- Se eu acertar sem entender, aprofunde até eu travar.
- Comece perguntando o que eu já sei sobre o tópico.
- Máximo de duas perguntas por vez.

Comece agora.
```

---

## 2. Me questione sobre o que estudei

```
Estudei [TÓPICO] esta semana. Me faça 8 perguntas em ordem crescente de dificuldade:
- 2 de definição
- 3 de aplicação ("como você faria X")
- 2 de trade-off ("quando NÃO usar")
- 1 de modo de falha ("o que quebra primeiro")

Uma por vez. Avalie minha resposta, aponte o que faltou e só então passe à próxima.
```

---

## 3. Explique o meu erro (depois que eu li o stack trace)

```
Estou com este erro: [ERRO]
O que eu já verifiquei: [O QUE VOCÊ TENTOU]
Minha hipótese atual: [SUA HIPÓTESE]

Não me dê a correção direto. Me diga:
1. Se minha hipótese faz sentido e por quê
2. Que informação eu deveria coletar para confirmar ou descartar
3. Quais outras 2 hipóteses eu não considerei
```

---

## 4. Revisão de código (depois de funcionar)

```
Este código funciona. Revise como um engenheiro sênior de IA revisaria, focando em:
- Tratamento de erro de API de LLM (retry, timeout, fallback)
- Custo: há chamada desnecessária ou contexto inflado?
- Segurança: injeção de prompt, vazamento de dado, segredo exposto
- Testabilidade: dá para testar sem gastar token?
- Observabilidade: se falhar em produção, eu descubro por quê?

Para cada achado: severidade, por que importa, e como corrigir.

[CÓDIGO]
```

---

## 5. Três abordagens comparadas

```
Preciso resolver: [PROBLEMA]

Me dê 3 abordagens diferentes. Para cada uma:
- Como funciona, em 3 linhas
- Custo estimado (desenvolvimento e operação)
- Quando ela é a escolha certa
- Como ela falha
- O que você precisaria saber do meu contexto para recomendá-la

No fim, diga qual você escolheria e que pergunta faria antes de decidir de verdade.
```

---

## 6. Simulado de entrevista técnica

```
Você é um entrevistador sênior de uma empresa que usa IA em produção.
Me entreviste para uma vaga de Engenheiro de IA Aplicada, nível [pleno/sênior].

Formato:
- Uma pergunta por vez
- Se eu responder raso, aprofunde em vez de aceitar
- Depois de 6 perguntas, dê feedback: o que ficou forte, o que ficou fraco, o que estudar

Comece.
```

---

## 7. System design de IA

```
Me proponha um problema de system design de um sistema com IA, nível sênior.
Depois conduza a entrevista de 45 minutos:
- Deixe eu levantar os requisitos
- Questione minhas escolhas ("por que esse modelo?", "e se o uso multiplicar por 100?")
- Aponte o que eu esqueci só no final

Não me dê a solução. Me faça chegar nela.
```

---

## 8. Traduzir para a diretoria

```
Escrevi isto para um público técnico: [TEXTO]

Reescreva para um diretor não técnico. Regras:
- Comece pelo impacto no negócio
- Nenhum jargão sem explicação em linguagem comum
- Inclua custo e risco
- Máximo de 200 palavras
- Termine com a decisão que ele precisa tomar
```

---

## 9. Fechar o módulo

```
Terminei o módulo [N] sobre [TEMA]. Estes foram meus entregáveis: [LISTA]

Faça uma auditoria do meu aprendizado:
1. Que conceito central desse tema eu provavelmente NÃO cobri, julgando pelos entregáveis?
2. Que pergunta de entrevista eu ainda não conseguiria responder?
3. Que erro comum de iniciante eu provavelmente ainda cometo?

Seja duro. Elogio não me ajuda aqui.
```

---

## 10. Post do LinkedIn a partir das notas

```
Estas são minhas notas de estudo da semana: [NOTAS]

Transforme em um post de LinkedIn com esta estrutura:
- Problema concreto que eu enfrentei
- O que eu tentei e não funcionou
- O que descobriu
- O que o leitor pode aplicar hoje

Regras: primeira pessoa, tom direto, sem emoji em excesso, sem "vou te contar um segredo",
sem chamada para ação vazia. Máximo de 200 palavras.
```

---

## Regra final

Se você usou um destes prompts e recebeu a resposta pronta de um exercício, **você prompatou errado**.
Volte, reescreva pedindo condução em vez de solução. A dificuldade é o produto, não o obstáculo.
