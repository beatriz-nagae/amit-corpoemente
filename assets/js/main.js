/* ============================================================
   AMIT — Corpo e Mente
   main.js
   Estrutura:
     1. Navbar — sombra ao rolar
     2. Menu mobile — hambúrguer
     3. Scroll reveal — IntersectionObserver
     4. Modal das Profissionais — dados + abrir/fechar
     5. Páginas de Massagem — abrir/fechar
     6. Atalho de teclado — fechar com Escape
============================================================ */


/* ── 1. NAVBAR — SOMBRA AO ROLAR ─────────────────────────── */
/*
  Adiciona a classe .scrolled na navbar quando o usuário
  rolar mais de 20px. O CSS usa essa classe para aplicar
  box-shadow, dando profundidade ao header.
*/

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});


/* ── 2. MENU MOBILE — HAMBÚRGUER ──────────────────────────── */
/*
  O botão hambúrguer alterna as classes .open no próprio
  botão (anima as 3 linhas em X) e no overlay fullscreen
  (.mobile-menu). Bloqueia o scroll do body enquanto aberto.
*/

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow =
    mobileMenu.classList.contains('open') ? 'hidden' : '';
});

/* Fecha o menu ao clicar em qualquer link interno */
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}


/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
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
      observer.unobserve(entry.target); // dispara só uma vez
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));


/* ── 4. MODAL DAS PROFISSIONAIS ───────────────────────────── */
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
    role:  'Massoterapeuta & Pilates',
    img:   'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    tags:  ['Massoterapia', 'Pilates', 'Drenagem Linfática', 'Bem-estar'],
    bio:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Marina é especialista em massoterapia com foco no equilíbrio entre corpo e mente. Sua abordagem combina técnicas clássicas e contemporâneas, oferecendo um atendimento personalizado e acolhedor para cada cliente. Acredita que o autocuidado é um direito de todas as mulheres, independente da rotina.',
    creds: [
      'Formação em Massoterapia — Lorem Institut, 2016',
      'Especialização em Drenagem Linfática Manual — Método Vodder',
      'Certificação em Pilates Solo e Aparelho — 200h',
      'Curso de Aromaterapia Aplicada — Escola Brasileira de Aromaterapia',
      'Mais de 8 anos de experiência clínica',
    ],
  },
  kessia: {
    name:  'Késsia',
    role:  'Hipnoterapeuta & Coach de Saúde',
    img:   'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80',
    tags:  ['Hipnoterapia', 'Saúde Mental', 'Coaching', 'Neurociência'],
    bio:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Késsia é hipnoterapeuta clínica com formação em neurociência comportamental. Sua prática une a hipnose clínica moderna com ferramentas de coaching e psicologia positiva, auxiliando clientes a superar bloqueios emocionais, fobias, ansiedade e hábitos que limitam seu pleno desenvolvimento.',
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
