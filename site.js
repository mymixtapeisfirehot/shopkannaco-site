// KANNACO LLC — shared behavior. No dependencies.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark current nav link
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('current');
  });

  // Header shadow after scroll
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Subtle hero-art parallax (capped, disabled under reduced motion)
  if (!reduceMotion) {
    var art = document.querySelector('.hero-art');
    if (art) {
      var ticking = false;
      var update = function () {
        var y = Math.min(window.scrollY, 400);
        art.style.transform = 'translateY(' + (y * 0.08) + 'px)';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
    }
  }
})();
