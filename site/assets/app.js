'use strict';

const CHAVE = 'curso-ia-progresso-v1';
const CHAVE_TEMA = 'curso-ia-tema';
const CHAVE_ABERTOS = 'curso-ia-abertos';

let dados = null;
let feitos = carregar(CHAVE, {});
let abertos = carregar(CHAVE_ABERTOS, {});

const cacheAulas = {};   // { "01": {aulas:[...]} }
let aulaAtual = null;    // { mod, i }

function carregar(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch {
    return padrao;
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* modo privativo ou storage cheio — o site segue funcionando sem persistir */
  }
}

/* ---------------- tema ---------------- */

function aplicarTema(t) {
  document.documentElement.setAttribute('data-tema', t);
  salvar(CHAVE_TEMA, t);
}

(function iniciarTema() {
  const guardado = carregar(CHAVE_TEMA, null);
  const escuroPorPadrao = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarTema(guardado || (escuroPorPadrao ? 'escuro' : 'claro'));
})();

function rotuloTema() {
  const escuro = document.documentElement.getAttribute('data-tema') === 'escuro';
  document.getElementById('tema').textContent = escuro ? 'Claro' : 'Escuro';
}
rotuloTema();

document.getElementById('tema').addEventListener('click', () => {
  const atual = document.documentElement.getAttribute('data-tema');
  aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
  rotuloTema();
});

/* ---------------- markdown mínimo ---------------- */

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*\n]*?)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function md(texto) {
  const linhas = String(texto || '').split('\n');
  const saida = [];
  let i = 0;

  const fechaLista = (tipo) => saida.push(tipo === 'ol' ? '</ol>' : '</ul>');

  while (i < linhas.length) {
    const l = linhas[i];

    // bloco de código
    if (/^```/.test(l)) {
      const corpo = [];
      i++;
      while (i < linhas.length && !/^```/.test(linhas[i])) corpo.push(linhas[i++]);
      i++;
      saida.push(`<pre><code>${esc(corpo.join('\n'))}</code></pre>`);
      continue;
    }

    // tabela
    if (/^\s*\|/.test(l) && i + 1 < linhas.length && /^\s*\|[\s:|-]+\|?\s*$/.test(linhas[i + 1])) {
      const celulas = (linha) =>
        linha.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const cab = celulas(l);
      i += 2;
      const corpo = [];
      while (i < linhas.length && /^\s*\|/.test(linhas[i])) corpo.push(celulas(linhas[i++]));
      saida.push(
        '<div class="tab-wrap"><table><thead><tr>' +
          cab.map((c) => `<th>${inline(c)}</th>`).join('') +
          '</tr></thead><tbody>' +
          corpo.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
          '</tbody></table></div>'
      );
      continue;
    }

    // títulos
    const t = l.match(/^(#{2,4})\s+(.*)$/);
    if (t) {
      const nivel = Math.min(t[1].length + 1, 5); // ## -> h3
      saida.push(`<h${nivel}>${inline(t[2])}</h${nivel}>`);
      i++;
      continue;
    }

    // citação
    if (/^>\s?/.test(l)) {
      const corpo = [];
      while (i < linhas.length && /^>\s?/.test(linhas[i])) corpo.push(linhas[i++].replace(/^>\s?/, ''));
      saida.push(`<blockquote><p>${inline(corpo.join(' '))}</p></blockquote>`);
      continue;
    }

    // listas
    if (/^\s*[-*]\s+/.test(l) || /^\s*\d+\.\s+/.test(l)) {
      const ordenada = /^\s*\d+\.\s+/.test(l);
      saida.push(ordenada ? '<ol>' : '<ul>');
      while (
        i < linhas.length &&
        (ordenada ? /^\s*\d+\.\s+/.test(linhas[i]) : /^\s*[-*]\s+/.test(linhas[i]))
      ) {
        saida.push(`<li>${inline(linhas[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ''))}</li>`);
        i++;
      }
      fechaLista(ordenada ? 'ol' : 'ul');
      continue;
    }

    // parágrafo
    if (l.trim() === '') {
      i++;
      continue;
    }
    const par = [];
    while (
      i < linhas.length &&
      linhas[i].trim() !== '' &&
      !/^```|^\s*\|/.test(linhas[i]) &&
      !/^#{2,4}\s/.test(linhas[i]) &&
      !/^>\s?/.test(linhas[i]) &&
      !/^\s*[-*]\s+/.test(linhas[i]) &&
      !/^\s*\d+\.\s+/.test(linhas[i])
    ) {
      par.push(linhas[i++]);
    }
    saida.push(`<p>${inline(par.join(' '))}</p>`);
  }

  return saida.join('\n');
}

/* ---------------- itens de um módulo ---------------- */

function itensDoModulo(m) {
  const itens = [];
  m.aulas.forEach((t, i) => itens.push({ id: `${m.id}:a${i}`, texto: t, grupo: 'aulas', i }));
  m.projeto.criterios.forEach((t, i) => itens.push({ id: `${m.id}:p${i}`, texto: t, grupo: 'projeto' }));
  m.checklist.forEach((t, i) => itens.push({ id: `${m.id}:c${i}`, texto: t, grupo: 'checklist' }));
  return itens;
}

function contarModulo(m) {
  const itens = itensDoModulo(m);
  return { total: itens.length, feitos: itens.filter((x) => feitos[x.id]).length };
}

function acharModulo(id) {
  return dados.modulos.find((m) => m.id === id);
}

/* ---------------- render ---------------- */

function render() {
  document.getElementById('titulo').textContent = dados.titulo;
  document.getElementById('subtitulo').textContent = dados.subtitulo;

  if (dados.repo) {
    document.getElementById('link-repo-topo').href = dados.repo;
    document.getElementById('link-repo').innerHTML =
      `<a href="${dados.repo}" target="_blank" rel="noopener">Repositório do curso</a>`;
  }

  const fases = document.getElementById('fases');
  fases.innerHTML = '';
  dados.fases.forEach((f, idx) => {
    const li = document.createElement('li');
    li.innerHTML =
      `<span class="f-n">Fase ${String(idx + 1).padStart(2, '0')}</span>` +
      `<span class="f-t">${esc(f.nome)}</span>` +
      `<span class="f-s">Semanas ${esc(f.semanas)}</span>`;
    fases.appendChild(li);
  });

  const cont = document.getElementById('modulos');
  cont.innerHTML = '';
  dados.modulos.forEach((m) => cont.appendChild(cardModulo(m)));

  atualizarResumo();
}

function caixa(id, marcado) {
  return (
    `<span class="marca-box"><input type="checkbox" data-check="${id}"` +
    `${marcado ? ' checked' : ''} aria-label="Marcar como concluído"><i></i></span>`
  );
}

function cardModulo(m) {
  const { total, feitos: n } = contarModulo(m);
  const completo = total > 0 && n === total;
  const aberto = !!abertos[m.id];

  const card = document.createElement('section');
  card.className = 'mod' + (completo ? ' completo' : '') + (aberto ? ' aberto' : '');
  card.dataset.mod = m.id;

  const cab = document.createElement('button');
  cab.className = 'mod-cab';
  cab.setAttribute('aria-expanded', String(aberto));
  cab.innerHTML =
    `<span class="m-num">${completo ? '✓' : m.id}</span>` +
    `<span class="m-tit">${esc(m.titulo)}<span class="m-sub">${esc(m.projeto.nome)}</span></span>` +
    `<span class="m-sem">${esc(m.semanas)} · ${m.horas}h</span>` +
    `<span class="m-prog"><span class="m-frac">${n}/${total}</span>` +
    `<span class="m-bar"><i style="width:${total ? (n / total) * 100 : 0}%"></i></span></span>`;

  cab.addEventListener('click', () => {
    const agora = !card.classList.contains('aberto');
    card.classList.toggle('aberto', agora);
    cab.setAttribute('aria-expanded', String(agora));
    abertos[m.id] = agora;
    salvar(CHAVE_ABERTOS, abertos);
    if (agora) precarregarAulas(m.id);
  });

  const corpo = document.createElement('div');
  corpo.className = 'mod-corpo';

  const col = document.createElement('div');
  col.className = 'col';

  const obj = document.createElement('p');
  obj.className = 'obj';
  obj.textContent = m.objetivo;
  col.appendChild(obj);

  const itens = itensDoModulo(m);
  col.appendChild(secaoAulas(m, itens.filter((x) => x.grupo === 'aulas')));
  col.appendChild(secaoSimples('Projeto — ' + m.projeto.nome, itens.filter((x) => x.grupo === 'projeto'), m));
  col.appendChild(secaoSimples('Checklist de domínio', itens.filter((x) => x.grupo === 'checklist'), m));

  if (dados.repo && m.pasta) {
    const link = document.createElement('a');
    link.className = 'link-mod';
    link.href = `${dados.repo}/tree/main/${m.pasta}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Material completo do módulo ↗';
    col.appendChild(link);
  }

  corpo.appendChild(col);
  card.appendChild(cab);
  card.appendChild(corpo);
  if (aberto) precarregarAulas(m.id);
  return card;
}

function secaoAulas(m, itens) {
  const div = document.createElement('div');
  div.className = 'secao';
  div.innerHTML = '<span class="rotulo">Aulas</span>';

  const ol = document.createElement('ol');
  ol.className = 'aulas';

  itens.forEach((item) => {
    const li = document.createElement('li');
    const linha = document.createElement('div');
    linha.className = 'aula-linha' + (feitos[item.id] ? ' feito' : '');
    linha.dataset.item = item.id;

    const botao = document.createElement('button');
    botao.className = 'abrir-aula';
    botao.innerHTML =
      `<span class="tit">${esc(item.texto)}</span>` +
      `<span class="min" data-min></span><span class="seta">→</span>`;
    botao.addEventListener('click', () => abrirAula(m.id, item.i));

    linha.appendChild(botao);
    linha.insertAdjacentHTML('beforeend', caixa(item.id, !!feitos[item.id]));
    linha.querySelector('input').addEventListener('change', (e) => marcar(item.id, e.target.checked, m));

    li.appendChild(linha);
    ol.appendChild(li);
  });

  div.appendChild(ol);
  return div;
}

function secaoSimples(titulo, itens, m) {
  const div = document.createElement('div');
  div.className = 'secao';

  const h = document.createElement('span');
  h.className = 'rotulo';
  h.textContent = titulo;
  div.appendChild(h);

  const ul = document.createElement('ul');
  ul.className = 'simples';

  itens.forEach((item) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.className = 'item' + (feitos[item.id] ? ' feito' : '');
    label.innerHTML = caixa(item.id, !!feitos[item.id]) + `<span>${esc(item.texto)}</span>`;
    label.querySelector('input').addEventListener('change', (e) => {
      marcar(item.id, e.target.checked, m);
      label.classList.toggle('feito', e.target.checked);
    });
    li.appendChild(label);
    ul.appendChild(li);
  });

  div.appendChild(ul);
  return div;
}

function marcar(id, valor, m) {
  if (valor) feitos[id] = true;
  else delete feitos[id];
  salvar(CHAVE, feitos);

  document.querySelectorAll(`input[data-check="${id}"]`).forEach((cb) => {
    cb.checked = valor;
  });
  const linha = document.querySelector(`.aula-linha[data-item="${id}"]`);
  if (linha) linha.classList.toggle('feito', valor);

  if (m) atualizarCard(m);
  atualizarResumo();
}

function atualizarCard(m) {
  const card = document.querySelector(`.mod[data-mod="${m.id}"]`);
  if (!card) return;
  const { total, feitos: n } = contarModulo(m);
  const completo = total > 0 && n === total;
  card.classList.toggle('completo', completo);
  card.querySelector('.m-num').textContent = completo ? '✓' : m.id;
  card.querySelector('.m-frac').textContent = `${n}/${total}`;
  card.querySelector('.m-bar i').style.width = `${total ? (n / total) * 100 : 0}%`;
}

function atualizarResumo() {
  let total = 0;
  let n = 0;
  let modsCompletos = 0;
  let projetosFeitos = 0;
  let horas = 0;

  dados.modulos.forEach((m) => {
    const c = contarModulo(m);
    total += c.total;
    n += c.feitos;
    if (c.total > 0 && c.feitos === c.total) modsCompletos++;

    const crit = m.projeto.criterios.map((_, i) => `${m.id}:p${i}`);
    if (crit.length && crit.every((id) => feitos[id])) projetosFeitos++;

    horas += m.horas * (c.total ? c.feitos / c.total : 0);
  });

  const pct = total ? Math.round((n / total) * 100) : 0;
  document.getElementById('pct-geral').innerHTML = `${pct}<i>%</i>`;
  document.getElementById('barra-geral').style.width = `${pct}%`;
  document.getElementById('resumo').textContent = `${n} de ${total} itens concluídos`;

  const met = [
    ['Módulos', `${modsCompletos}/${dados.modulos.length}`],
    ['Projetos', `${projetosFeitos}/${dados.modulos.length}`],
    ['Horas', `${Math.round(horas)}`],
    ['Itens', `${n}`],
  ];
  document.getElementById('stats').innerHTML = met
    .map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`)
    .join('');
}

/* ---------------- conteúdo das aulas ---------------- */

function precarregarAulas(modId) {
  buscarAulas(modId).then((pacote) => {
    if (!pacote) return;
    const card = document.querySelector(`.mod[data-mod="${modId}"]`);
    if (!card) return;
    card.querySelectorAll('.aula-linha').forEach((linha, idx) => {
      const aula = pacote.aulas[idx];
      const min = linha.querySelector('[data-min]');
      if (aula && aula.tempo && min) min.textContent = `${aula.tempo} min`;
    });
  });
}

function buscarAulas(modId) {
  if (cacheAulas[modId]) return Promise.resolve(cacheAulas[modId]);
  return fetch(`aulas/${modId}.json`)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      cacheAulas[modId] = d;
      return d;
    })
    .catch(() => null);
}

const gaveta = document.getElementById('gaveta');
const fundo = document.getElementById('fundo');

function abrirAula(modId, indice, semHash) {
  const m = acharModulo(modId);
  if (!m || indice < 0 || indice >= m.aulas.length) return;
  aulaAtual = { mod: modId, i: indice };
  if (!semHash) history.replaceState(null, '', `#${modId}/${indice + 1}`);

  document.getElementById('g-tag').textContent =
    `Módulo ${modId} · ${m.titulo} · aula ${indice + 1} de ${m.aulas.length}`;
  document.getElementById('g-titulo').textContent = m.aulas[indice];
  document.getElementById('g-resumo').textContent = '';
  document.getElementById('g-corpo').innerHTML = '<p class="vazio">Carregando conteúdo…</p>';

  const check = document.getElementById('g-check');
  check.checked = !!feitos[`${modId}:a${indice}`];

  gaveta.hidden = false;
  fundo.hidden = false;
  document.body.classList.add('travado');
  document.getElementById('g-fechar').focus();

  buscarAulas(modId).then((pacote) => {
    if (!aulaAtual || aulaAtual.mod !== modId || aulaAtual.i !== indice) return;
    const aula = pacote && pacote.aulas && pacote.aulas[indice];
    if (!aula) {
      document.getElementById('g-corpo').innerHTML =
        '<p class="vazio">O conteúdo detalhado desta aula ainda não foi publicado. ' +
        'A ementa e os exercícios do módulo estão no repositório.</p>';
      return;
    }
    document.getElementById('g-resumo').textContent = aula.resumo || '';
    document.getElementById('g-corpo').innerHTML = montarAula(aula);
    document.getElementById('g-corpo').scrollTop = 0;
  });

  atualizarNav();
}

function montarAula(aula) {
  let html = `<div class="md">${md(aula.conteudo)}</div>`;

  if (aula.exercicio) {
    html += `<div class="bloco"><span class="g-rot">Exercício</span>` +
      `<div class="exercicio">${inline(aula.exercicio)}</div></div>`;
  }

  if (aula.videos && aula.videos.length) {
    html += `<div class="bloco"><span class="g-rot">Vídeos de referência</span>` +
      `<ul class="recursos">${aula.videos
        .map(
          (v) =>
            `<li><a href="${esc(v.u)}" target="_blank" rel="noopener">` +
            `<span class="k">${esc(v.k || 'vídeo')}</span>` +
            `<span>${esc(v.t)}</span><span class="ext">↗</span></a></li>`
        )
        .join('')}</ul></div>`;
  }

  if (aula.leitura && aula.leitura.length) {
    html += `<div class="bloco"><span class="g-rot">Leitura e documentação</span>` +
      `<ul class="recursos">${aula.leitura
        .map(
          (l) =>
            `<li><a href="${esc(l.u)}" target="_blank" rel="noopener">` +
            `<span class="k">doc</span><span>${esc(l.t)}</span><span class="ext">↗</span></a></li>`
        )
        .join('')}</ul></div>`;
  }

  return html;
}

function atualizarNav() {
  if (!aulaAtual) return;
  const m = acharModulo(aulaAtual.mod);
  document.getElementById('g-ant').disabled = aulaAtual.i === 0;
  document.getElementById('g-prox').disabled = aulaAtual.i >= m.aulas.length - 1;
}

function fecharGaveta() {
  gaveta.hidden = true;
  fundo.hidden = true;
  document.body.classList.remove('travado');
  if (aulaAtual) history.replaceState(null, '', `#${aulaAtual.mod}`);
  aulaAtual = null;
}

/* Deep link: #03 abre o módulo, #03/7 abre a aula 7 desse módulo. */
function aplicarHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!h) return;
  const [modId, aula] = h.split('/');
  const m = acharModulo(modId);
  if (!m) return;

  abertos[modId] = true;
  salvar(CHAVE_ABERTOS, abertos);
  const card = document.querySelector(`.mod[data-mod="${modId}"]`);
  if (card) {
    card.classList.add('aberto');
    card.querySelector('.mod-cab').setAttribute('aria-expanded', 'true');
    precarregarAulas(modId);
    card.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  const n = parseInt(aula, 10);
  if (Number.isInteger(n)) abrirAula(modId, n - 1, true);
}

document.getElementById('g-fechar').addEventListener('click', fecharGaveta);
fundo.addEventListener('click', fecharGaveta);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !gaveta.hidden) fecharGaveta();
});

document.getElementById('g-check').addEventListener('change', (e) => {
  if (!aulaAtual) return;
  marcar(`${aulaAtual.mod}:a${aulaAtual.i}`, e.target.checked, acharModulo(aulaAtual.mod));
});

document.getElementById('g-ant').addEventListener('click', () => {
  if (aulaAtual && aulaAtual.i > 0) abrirAula(aulaAtual.mod, aulaAtual.i - 1);
});

document.getElementById('g-prox').addEventListener('click', () => {
  if (!aulaAtual) return;
  const m = acharModulo(aulaAtual.mod);
  if (aulaAtual.i < m.aulas.length - 1) abrirAula(aulaAtual.mod, aulaAtual.i + 1);
});

/* ---------------- exportar / importar / limpar ---------------- */

document.getElementById('exportar').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ versao: 1, feitos }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'progresso-curso-ia.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

document.getElementById('importar-btn').addEventListener('click', () => {
  document.getElementById('importar').click();
});

document.getElementById('importar').addEventListener('change', (e) => {
  const arq = e.target.files && e.target.files[0];
  if (!arq) return;
  const leitor = new FileReader();
  leitor.onload = () => {
    try {
      const obj = JSON.parse(String(leitor.result));
      if (!obj || typeof obj.feitos !== 'object' || obj.feitos === null) throw new Error('formato');
      feitos = obj.feitos;
      salvar(CHAVE, feitos);
      render();
    } catch {
      alert('Não consegui ler esse arquivo. Use um arquivo exportado por este site.');
    }
  };
  leitor.readAsText(arq);
  e.target.value = '';
});

document.getElementById('limpar').addEventListener('click', () => {
  if (!confirm('Isso apaga todo o seu progresso salvo neste navegador. Continuar?')) return;
  feitos = {};
  salvar(CHAVE, feitos);
  render();
});

/* ---------------- boot ---------------- */

fetch('curso.json')
  .then((r) => {
    if (!r.ok) throw new Error('http ' + r.status);
    return r.json();
  })
  .then((d) => {
    dados = d;
    render();
    aplicarHash();
  })
  .catch(() => {
    document.getElementById('resumo').textContent =
      'Não consegui carregar o conteúdo do curso. Rode o site por um servidor HTTP, não abrindo o arquivo direto.';
  });
