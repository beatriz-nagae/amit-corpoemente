const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow =
    mobileMenu.classList.contains('open') ? 'hidden' : '';
});

/* fecha o menu quando clicado em algum link */
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}


/* feature scroll reveal */
/*
  IntersectionObserver monitora todos os elementos com .reveal.
  Quando 12% do elemento entra na viewport, adiciona .visible
  (o CSS faz o fade-in + slide-up). Depois de revelar,
  o observer para de monitorar aquele elemento (unobserve).
*/

const reveals  = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // dispara so uma vez
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));


/*  MODAL DAS PROFISSIONAIS */
/*
  profData contém os dados de cada profissional.
  openProfModal(id) injeta os dados no modal e o exibe.
  closeProfModal() fecha — aceita clique no overlay ou no botão X.

  Para editar os dados de Marina ou Késsia,
  basta alterar os campos abaixo.
*/

const profData = {
  marina: {
    name:  'Marina',
    role:  'Pilates & Massoterapeuta',
    img:   'assets/img/sobre/sobre-marina.jpg',
    tags:  ['Massoterapia', 'Pilates', 'Limpeza de Pele'],
    bio:   'Marina é especialista em pilates e massoterapia, com 15 anos de experiência. Formada em Educação Física no Mackenzie, aprofundou-se em Pilates na Universidade Castilla La Mancha, Toledo - Espanha. Mantém relacionamento próximo com seus alunos, que formam a comunidade Amit.',
    creds: [
      'Formação em Educação Física (Mackenzie) — 2007',
      'Curso de Formação Profissional de “Pilates – Uma visão atual na área da saúde”. - METACORPUS',
    ],
  },
  kessia: {
    name:  'Késsia',
    role:  'Hipnoterapeuta & Massoterapeuta',
    img:   'assets/img/sobre/sobre-kessia.jpg',
    tags:  ['Hipnoterapia', 'Neurociência', 'Massoterapia', 'Terapia de Alta Performance'],
    bio:   'Kessia Laronga é hipnoterapeuta clínica especializada em desenvolvimento humano, saúde mental e reprogramação comportamental. Possui formação sólida em Hipnoterapia Clínica, Programação Neurolinguística (PNL), Neurociência aplicada e Psicoterapia, com mais de mil horas de capacitação em instituições reconhecidas como a Universidade Brasileira de Hipnose e institutos de neurociência e comportamento.',
    creds: [
      'Formação em Hipnoterapia Clínica — ABH, 2018',
      'Especialização em Neurociência Comportamental — Lorem Universidade',
      'Certificação Internacional em Coaching de Saúde e Bem-estar',
      'Formação em Programação Neurolinguística (PNL) — Practitioner e Master',
      'Mais de 500 sessões realizadas',
    ],
  },
};

function openProfModal(id) {
  const d = profData[id];
  if (!d) return;

  // Injeta foto, nome e cargo
  document.getElementById('profModalImg').src        = d.img;
  document.getElementById('profModalImg').alt        = d.name;
  document.getElementById('profModalName').textContent = d.name;
  document.getElementById('profModalRole').textContent = d.role;
  document.getElementById('profModalBio').textContent  = d.bio;

  // Injeta tags dinamicamente
  document.getElementById('profModalTags').innerHTML =
    d.tags.map(t => `<span class="prof-tag">${t}</span>`).join('');

  // Injeta credenciais
  document.getElementById('profModalCreds').innerHTML =
    d.creds.map(c => `<li>${c}</li>`).join('');

  // Exibe o overlay
  document.getElementById('profModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProfModal(e, force) {
  // Fecha se: botão X (force=true) OU clique fora do card (no overlay)
  if (force || (e && e.target === document.getElementById('profModalOverlay'))) {
    document.getElementById('profModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}


/* ── 5. PÁGINAS DE MASSAGEM ───────────────────────────────── */
/*
  Cada massagem tem um painel fixo com id="page-{nome}".
  openMassaPage(id)  → adiciona .open (desliza da direita)
  closeMassaPage(id) → remove .open (volta para fora)
*/

function openMassaPage(id) {
  const page = document.getElementById('page-' + id);
  if (!page) return;
  page.classList.add('open');
  document.body.style.overflow = 'hidden';
  page.scrollTop = 0; // sempre começa do topo
}

function closeMassaPage(id) {
  const page = document.getElementById('page-' + id);
  if (!page) return;
  page.classList.remove('open');
  document.body.style.overflow = '';
}


/* ── 6. ATALHO DE TECLADO — ESC ───────────────────────────── */
/*
  Pressionar Escape fecha qualquer painel ou modal aberto.
*/

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  // Fecha páginas de massagem
  document.querySelectorAll('.massa-page.open')
    .forEach(p => p.classList.remove('open'));

  // Fecha modal de profissional
  document.getElementById('profModalOverlay').classList.remove('open');

  // Restaura scroll
  document.body.style.overflow = '';
});
