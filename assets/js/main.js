/* DYNOPRO — tapis kategori, carian produk & butang kembali ke atas */
(function () {
  'use strict';

  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var search = document.getElementById('search');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var reset = document.getElementById('reset');
  var total = cards.length;
  var category = 'Semua';

  // Teks carian dibina daripada kandungan kad (nama, tagline, penerangan, ciri, kategori)
  cards.forEach(function (card) {
    card.dataset.search = (card.textContent + ' ' + card.dataset.cat).toLowerCase().replace(/\s+/g, ' ');
  });

  function setCategory(cat) {
    category = cat;
    buttons.forEach(function (b) {
      var on = b.dataset.filter === cat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function filter() {
    var q = search.value.toLowerCase().trim();
    var shown = 0;
    cards.forEach(function (card) {
      var show = (category === 'Semua' || card.dataset.cat === category) &&
        (!q || card.dataset.search.indexOf(q) !== -1);
      card.hidden = !show;
      if (show) shown++;
    });
    count.textContent = shown + ' daripada ' + total + ' penyelesaian';
    empty.classList.toggle('show', shown === 0);
  }

  function showAll() {
    search.value = '';
    setCategory('Semua');
    filter();
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      setCategory(b.dataset.filter);
      filter();
    });
  });
  search.addEventListener('input', filter);
  if (reset) reset.addEventListener('click', showAll);

  // Pautan terus ke produk (cth. #produk-focus) — pastikan kad tidak tersembunyi oleh tapisan
  function revealHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.classList.contains('card') && target.hidden) {
      showAll();
      target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href^="#produk-"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t && t.hidden) showAll();
    });
  });

  // Butang kembali ke atas
  var top = document.getElementById('top');
  function onScroll() {
    top.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var year = document.getElementById('tahun');
  if (year) year.textContent = new Date().getFullYear();

  filter();
  onScroll();
  revealHash();
})();
