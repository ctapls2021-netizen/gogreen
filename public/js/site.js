// GoGreen Builders - High Performance Native Interactivity
document.addEventListener('DOMContentLoaded', function() {
  var navWrappers = document.querySelectorAll('.gg-menu-wrapper, .jkit-menu-wrapper');
  var overlays = document.querySelectorAll('.gg-overlay, .jkit-overlay');

  // Mobile Hamburger Toggle
  document.querySelectorAll('.gg-hamburger-menu, .jkit-hamburger-menu, [aria-label="open-menu"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var active = false;
      navWrappers.forEach(function(nav) { active = nav.classList.toggle('active'); nav.style.display = active ? 'block' : ''; });
      overlays.forEach(function(ov) { ov.classList.toggle('active'); ov.style.display = active ? 'block' : ''; });
    });
  });

  // Close Menu
  document.querySelectorAll('.gg-close-menu, .jkit-close-menu, [aria-label="close-menu"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      navWrappers.forEach(function(nav) { nav.classList.remove('active'); nav.style.display = ''; });
      overlays.forEach(function(ov) { ov.classList.remove('active'); ov.style.display = ''; });
    });
  });

  // Overlay Click
  overlays.forEach(function(ov) {
    ov.addEventListener('click', function() {
      navWrappers.forEach(function(nav) { nav.classList.remove('active'); nav.style.display = ''; });
      ov.classList.remove('active');
      ov.style.display = '';
    });
  });

  // Dropdown Toggle
  document.querySelectorAll('.dropdown-menu-toggle, li.menu-item-has-children > a').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      var parentLi = this.closest('li.menu-item-has-children');
      if (parentLi) {
        var sub = parentLi.querySelector('.sub-menu');
        if (sub && (this.closest('.gg-menu-wrapper, .jkit-menu-wrapper') || this.classList.contains('dropdown-menu-toggle'))) {
          e.preventDefault();
          sub.classList.toggle('dropdown-open');
          sub.style.display = (sub.style.display === 'block') ? 'none' : 'block';
        }
      }
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          navWrappers.forEach(function(nav) { nav.classList.remove('active'); nav.style.display = ''; });
          overlays.forEach(function(ov) { ov.classList.remove('active'); ov.style.display = ''; });
        }
      }
    });
  });
});
