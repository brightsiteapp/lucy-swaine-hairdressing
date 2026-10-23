/* Lucy Swaine Hairdressing — shared site behaviour. No dependencies. */
(function () {
  var MOBILE = '(max-width: 860px)';
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var drop = document.querySelector('.has-drop');

  function isMobile() { return window.matchMedia(MOBILE).matches; }

  function closeMenu() {
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (drop) drop.classList.remove('open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (!open && drop) drop.classList.remove('open');
    });
  }

  /* On mobile the Treatments link opens the submenu instead of navigating;
     the submenu's own "All Treatments" link goes to the page. */
  if (drop) {
    var parentLink = drop.querySelector('a');
    parentLink.addEventListener('click', function (e) {
      if (!isMobile()) return;
      e.preventDefault();
      drop.classList.toggle('open');
    });
    drop.querySelectorAll('.drop a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* Any other menu link closes the full-screen menu (in-page anchors included). */
  nav && nav.querySelectorAll(':scope > a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) closeMenu();
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) closeMenu();
  });

  /* Scroll reveals: tag the content blocks, then fade them up on entry.
     Anything already on screen at load reveals immediately. */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    var targets = [].slice.call(document.querySelectorAll(
      '.section:not(.hero) .eyebrow, .section h2, .section .lede, ' +
      '.card, .cat-head, .gallery figure, .find > div, .notes .card, .cat-nav'
    ));
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      var stagger = i % 3;
      if (stagger === 1) el.classList.add('reveal-d1');
      if (stagger === 2) el.classList.add('reveal-d2');
    });

    var pending = targets.slice();
    function revealPass() {
      var limit = window.innerHeight * 0.92;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
        return true;
      });
    }
    var ticking = false;
    function onScrollReveal() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { revealPass(); ticking = false; });
    }
    revealPass();
    window.addEventListener('scroll', onScrollReveal, { passive: true });
    window.addEventListener('resize', onScrollReveal);
    window.addEventListener('load', revealPass);
    /* Safety net: nothing stays invisible if scroll events never arrive. */
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('in'); });
    }, 4000);
  }

  /* Header lifts off the page once you start scrolling. */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Gallery: hide tiles whose photo hasn't been added yet. */
  document.querySelectorAll('.gallery img').forEach(function (img) {
    function hide() { img.closest('figure').style.display = 'none'; }
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

})();
