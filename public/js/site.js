// GoGreen Builders - Lightweight Native Interactivity
document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Navigation Hamburger Menu Toggle
  var mobileToggles = document.querySelectorAll('.gg-hamburger-menu, .jkit-hamburger-menu, [aria-label="open-menu"]');
  var closeToggles = document.querySelectorAll('.gg-close-menu, .jkit-close-menu, [aria-label="close-menu"]');
  var navWrappers = document.querySelectorAll('.gg-menu-wrapper, .jkit-menu-wrapper');
  var overlays = document.querySelectorAll('.gg-overlay, .jkit-overlay');

  mobileToggles.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      navWrappers.forEach(function(nav) {
        var isActive = nav.classList.toggle('active');
        nav.style.display = isActive ? 'block' : '';
      });
      overlays.forEach(function(ov) {
        var isActive = ov.classList.toggle('active');
        ov.style.display = isActive ? 'block' : '';
      });
    });
  });

  closeToggles.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      navWrappers.forEach(function(nav) {
        nav.classList.remove('active');
        nav.style.display = '';
      });
      overlays.forEach(function(ov) {
        ov.classList.remove('active');
        ov.style.display = '';
      });
    });
  });

  overlays.forEach(function(ov) {
    ov.addEventListener('click', function() {
      navWrappers.forEach(function(nav) {
        nav.classList.remove('active');
        nav.style.display = '';
      });
      ov.classList.remove('active');
      ov.style.display = '';
    });
  });

  // 2. Submenu Dropdown Toggle on Mobile
  var dropdownToggles = document.querySelectorAll('.dropdown-menu-toggle, li.menu-item-has-children > a');
  dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      var parentLi = this.closest('li.menu-item-has-children');
      if (parentLi) {
        var sub = parentLi.querySelector('.sub-menu');
        if (sub) {
          var isMobileNav = this.closest('.gg-menu-wrapper, .jkit-menu-wrapper');
          if (isMobileNav || this.classList.contains('dropdown-menu-toggle')) {
            e.preventDefault();
            sub.classList.toggle('dropdown-open');
            sub.style.display = (sub.style.display === 'block') ? 'none' : 'block';
          }
        }
      }
    });
  });

  // 3. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          navWrappers.forEach(function(nav) {
            nav.classList.remove('active');
            nav.style.display = '';
          });
          overlays.forEach(function(ov) {
            ov.classList.remove('active');
            ov.style.display = '';
          });
        }
      }
    });
  });
});
