/* ===================================================================
   CHARBEL SERHAL — PORTFOLIO
   Interactivity layer. All content already exists in the HTML;
   this script only enhances it (animations, nav state, form handling).
   =================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     Footer year
  ----------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------------------
     Live clock (Beirut local time)
  ----------------------------------------------------------- */
  var clockEl = document.getElementById('clock');
  function updateClock() {
    if (!clockEl) return;
    try {
      var formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Beirut',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockEl.textContent = formatter.format(new Date()) + ' BEY';
    } catch (e) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* -----------------------------------------------------------
     Mobile nav toggle
  ----------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // close mobile nav after choosing a link
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------------------------
     Active nav-link highlighting on scroll
  ----------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', match);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* -----------------------------------------------------------
     Scroll-reveal for content blocks
     (adds .reveal to elements at runtime so the page still works
     fully with JS disabled — content is never hidden by default)
  ----------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    '.about__text, .about__panel, .matrix__module, .ticket, .case, ' +
    '.education__card, .contact__info, .contact__form, .certs'
  );

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -----------------------------------------------------------
     Hero terminal typing effect
  ----------------------------------------------------------- */
  var typedEl = document.getElementById('heroTyped');
  var bootLines = [
    'initializing profile...',
    'identity verified: CHARBEL SERHAL',
    'clearance: GRANTED — welcome'
  ];

  function typeLine(el, text, speed, callback) {
    var i = 0;
    el.textContent = '';
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (callback) {
        setTimeout(callback, 900);
      }
    })();
  }

  function runBootSequence(index) {
    if (!typedEl || index >= bootLines.length) return;
    typeLine(typedEl, bootLines[index], 28, function () {
      if (index < bootLines.length - 1) {
        runBootSequence(index + 1);
      }
    });
  }

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = bootLines[bootLines.length - 1];
    } else {
      runBootSequence(0);
    }
  }

  /* -----------------------------------------------------------
     Contact form — opens a pre-filled Gmail / default mail client
     via mailto:, with basic inline validation feedback.
  ----------------------------------------------------------- */
  var form = document.getElementById('contactForm');
  var formHint = document.getElementById('formHint');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        if (formHint) {
          formHint.textContent = 'Please fill in every field before sending.';
          formHint.style.color = 'var(--amber)';
        }
        return;
      }

      var to = 'charbelserhal824@gmail.com';
      var body =
        message +
        '\n\n—\n' +
        'From: ' + name + ' (' + email + ')';

      var mailtoUrl =
        'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;

      if (formHint) {
        formHint.textContent = 'Opening your email client — review the message and hit send.';
        formHint.style.color = 'var(--green)';
      }
    });
  }

})();
