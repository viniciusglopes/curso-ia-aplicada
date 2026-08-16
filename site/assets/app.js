'use strict';

const CHAVE = 'curso-ia-progresso-v1';
const CHAVE_TEMA = 'curso-ia-tema';
const CHAVE_ABERTOS = 'curso-ia-abertos';

let dados = null;
let feitos = carregar(CHAVE, {});
let abertos = carregar(CHAVE_ABERTOS, {});

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

/* ---------- tema ---------- */

function aplicarTema(t) {
  document.documentElement.setAttribute('data-tema', t);
  salvar(CHAVE_TEMA, t);
}

(function iniciarTema() {
  const guardado = carregar(CHAVE_TEMA, null);
  const escuroPorPadrao = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarTema(guardado || (escuroPorPadrao ? 'escuro' : 'claro'));
})();

document.getElementById('tema').addEventListener('click', () => {
  const atual = document.documentElement.getAttribute('data-tema');
  aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
});

/* ---------- itens de um módulo ---------- */

function itensDoModulo(m) {
  const itens = [];
  m.aulas.forEach((t, i) => itens.push({ id: `${m.id}:a${i}`, texto: t, grupo: 'aulas' }));
  m.projeto.criterios.forEach((t, i) => itens.push({ id: `${m.id}:p${i}`, texto: t, grupo: 'projeto' }));
  m.checklist.forEach((t, i) => itens.push({ id: `${m.id}:c${i}`, texto: t, grupo: 'checklist' }));
  return itens;
}

function contarModulo(m) {
  const itens = itensDoModulo(m);
  return { total: itens.length, feitos: itens.filter((i) => feitos[i.id]).length };
}

/* ---------- render ---------- */

function render() {
  document.getElementById('titulo').textContent = dados.titulo;
  document.getElementById('subtitulo').textContent = dados.subtitulo;

  if (dados.repo) {
    document.getElementById('link-repo').innerHTML =
      `Conteúdo completo no repositório: <a href="${dados.repo}" target="_blank" rel="noopener">${dados.repo}</a>`;
  }

  const fases = document.getElementById('fases');
  fases.innerHTML = '';
  dados.fases.forEach((f) => {
    const el = document.createElement('div');
    el.className = 'fase';
    el.innerHTML = `<b>${f.nome}</b> · semanas ${f.semanas}`;
    fases.appendChild(el);
  });

  const cont = document.getElementById('modulos');
  cont.innerHTML = '';
  dados.modulos.forEach((m) => cont.appendChild(cardModulo(m)));

  atualizarResumo();
}

function cardModulo(m) {
  const { total, feitos: n } = contarModulo(m);
  const completo = total > 0 && n === total;
  const aberto = !!abertos[m.id];

  const card = document.createElement('article');
  card.className = 'mod' + (completo ? ' completo' : '') + (aberto ? ' aberto' : '');
  card.dataset.mod = m.id;

  const cab = document.createElement('button');
  cab.className = 'mod-cab';
  cab.setAttribute('aria-expanded', String(aberto));
  cab.innerHTML = `
    <span class="num">${completo ? '✓' : m.id}</span>
    <span class="mod-info">
      <h3>${m.titulo}</h3>
      <span class="meta">Semanas ${m.semanas} · ${m.horas}h · ${m.projeto.nome}</span>
    </span>
    <span class="mod-prog">
      <span class="n">${n}/${total}</span>
      <span class="barra"><span class="preencher" style="width:${total ? (n / total) * 100 : 0}%"></span></span>
    </span>
    <span class="seta">›</span>`;
  cab.addEventListener('click', () => {
    const agora = !card.classList.contains('aberto');
    card.classList.toggle('aberto', agora);
    cab.setAttribute('aria-expanded', String(agora));
    abertos[m.id] = agora;
    salvar(CHAVE_ABERTOS, abertos);
  });

  const corpo = document.createElement('div');
  corpo.className = 'mod-corpo';

  const obj = document.createElement('p');
  obj.className = 'obj';
  obj.textContent = m.objetivo;
  corpo.appendChild(obj);

  const itens = itensDoModulo(m);
  corpo.appendChild(grupo('Aulas', itens.filter((i) => i.grupo === 'aulas'), m));
  corpo.appendChild(grupo(`Projeto — ${m.projeto.nome}`, itens.filter((i) => i.grupo === 'projeto'), m, true));
  corpo.appendChild(grupo('Checklist de domínio', itens.filter((i) => i.grupo === 'checklist'), m));

  if (dados.repo && m.pasta) {
    const link = document.createElement('a');
    link.className = 'link-mod';
    link.href = `${dados.repo}/tree/main/${m.pasta}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Abrir material completo do módulo ↗';
    corpo.appendChild(link);
  }

  card.appendChild(cab);
  card.appendChild(corpo);
  return card;
}

function grupo(titulo, itens, m, ehProjeto) {
  const div = document.createElement('div');
  div.className = 'grupo' + (ehProjeto ? ' projeto' : '');

  const h = document.createElement('h4');
  h.textContent = titulo;
  div.appendChild(h);

  const ul = document.createElement('ul');
  ul.className = 'itens';

  itens.forEach((item) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.className = 'item' + (feitos[item.id] ? ' feito' : '');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!feitos[item.id];
    cb.addEventListener('change', () => {
      if (cb.checked) feitos[item.id] = true;
      else delete feitos[item.id];
      salvar(CHAVE, feitos);
      label.classList.toggle('feito', cb.checked);
      atualizarCard(m);
      atualizarResumo();
    });

    const span = document.createElement('span');
    span.textContent = item.texto;

    label.appendChild(cb);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  });

  div.appendChild(ul);
  return div;
}

function atualizarCard(m) {
  const card = document.querySelector(`.mod[data-mod="${m.id}"]`);
  if (!card) return;
  const { total, feitos: n } = contarModulo(m);
  const completo = total > 0 && n === total;
  card.classList.toggle('completo', completo);
  card.querySelector('.num').textContent = completo ? '✓' : m.id;
  card.querySelector('.mod-prog .n').textContent = `${n}/${total}`;
  card.querySelector('.mod-prog .preencher').style.width = `${total ? (n / total) * 100 : 0}%`;
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
  document.getElementById('pct-geral').textContent = `${pct}%`;
  document.getElementById('barra-geral').style.width = `${pct}%`;
  document.getElementById('resumo').textContent = `${n} de ${total} itens concluídos`;

  document.getElementById('stats').innerHTML = `
    <div class="stat"><b>${modsCompletos}/${dados.modulos.length}</b><span>Módulos</span></div>
    <div class="stat"><b>${projetosFeitos}/${dados.modulos.length}</b><span>Projetos</span></div>
    <div class="stat"><b>${Math.round(horas)}h</b><span>Estudadas</span></div>
    <div class="stat"><b>${n}</b><span>Itens</span></div>`;
}

/* ---------- exportar / importar / limpar ---------- */

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
      if (!obj || typeof obj.feitos !== 'object' || obj.feitos === null) {
        throw new Error('formato');
      }
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

/* ---------- boot ---------- */

fetch('curso.json')
  .then((r) => {
    if (!r.ok) throw new Error('http ' + r.status);
    return r.json();
  })
  .then((d) => {
    dados = d;
    render();
  })
  .catch(() => {
    document.getElementById('resumo').textContent =
      'Não consegui carregar o conteúdo do curso. Rode o site por um servidor HTTP, não abrindo o arquivo direto.';
  });
