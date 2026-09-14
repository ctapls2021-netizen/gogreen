// GoGreen Builders - Lightweight Native Interactivity
document.addEventListener('DOMContentLoaded', function() {
  // 1. Safeguard: Ensure all containers and galleries render immediately
  try {
    var parents = document.querySelectorAll('.e-con.e-parent');
    for (var i = 0; i < parents.length; i++) {
      if (!parents[i].classList.contains('e-lazyloaded')) {
        parents[i].classList.add('e-lazyloaded');
      }
    }

    var galleryImages = document.querySelectorAll('.e-gallery-image[data-thumbnail]');
    for (var g = 0; g < galleryImages.length; g++) {
      var el = galleryImages[g];
      var thumb = el.getAttribute('data-thumbnail');
      if (thumb && (!el.style.backgroundImage || el.style.backgroundImage === 'none')) {
        var cleanUrl = thumb.replace(/^https?:\/\/[^\/]+/, '');
        if (!cleanUrl.startsWith('/')) cleanUrl = '/' + cleanUrl;
        el.style.backgroundImage = 'url("' + cleanUrl + '")';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    }
  } catch (e) {
    console.error('Visual initialization error:', e);
  }

  // 2. Mobile Navigation Hamburger Menu Toggle
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

  // 3. Submenu Dropdown Toggle on Mobile
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

  // 4. Smooth scrolling for internal anchor links
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
