# Projeto 10 — Auditoria de IA

**Módulo 10 · semana 28 · ≈ 10h**

## Objetivo
Auditar um sistema de IA seu que já está em produção e entregar um plano de correção priorizado.

## Escopo

### 1. Inventário
Onde existe IA, que dado toca, quem é o dono, qual o impacto se falhar.

### 2. Mapa de risco
Humano e ético · técnico e de segurança · de dados · legal e regulatório.

### 3. Testes práticos
- [ ] **Prompt injection**: tente fazer o sistema ignorar as instruções via conteúdo processado
- [ ] **Vazamento entre tenants**: tente ler dado de outro cliente
- [ ] **Exfiltração de contexto**: tente fazer o modelo revelar o prompt de sistema ou dado do contexto
- [ ] **Viés**: casos pareados variando região, gênero ou faixa de renda
- [ ] **Custo**: entrada que force consumo desproporcional

### 4. LGPD
Base legal, retenção, direito de eliminação (incluindo memória de agente e índice de RAG), registro
de tratamento, transparência com o usuário.

### 5. Custo
Custo atual, custo por unidade de negócio, projeção de 12 meses, modos de estouro.

### 6. Entregáveis
- [ ] Relatório de auditoria com achados classificados por severidade
- [ ] Plano de correção priorizado por risco × esforço, com prazo e responsável
- [ ] **Política de uso de IA em uma página**, que uma pessoa não técnica entende

## Aviso
Execute os testes de ataque em ambiente controlado ou com autorização explícita, e nunca contra
sistema de terceiro. Documente o que testou e o que decidiu não testar, e por quê.
