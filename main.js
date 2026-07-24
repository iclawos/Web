document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    var navOverlay = document.querySelector('.nav-overlay');

    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (!link.parentElement.classList.contains('nav-item-has-children')) {
                    closeMenu();
                }
            });
        });
    }

    document.querySelectorAll('.nav-item-has-children > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    var path = window.location.pathname;
    var currentPage = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function(link) {
        var href = link.getAttribute('href') || '';
        var linkPage = href.split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    var langBtn = document.querySelector('.lang-btn');
    var targetPage;
    if (currentPage === 'index.html') {
        targetPage = 'index.zh.html';
    } else if (currentPage === 'index.zh.html') {
        targetPage = 'index.html';
    } else if (currentPage.endsWith('.zh.html')) {
        targetPage = currentPage.replace('.zh.html', '.html');
    } else if (currentPage.endsWith('.html')) {
        targetPage = currentPage.replace('.html', '.zh.html');
    }
    if (langBtn && targetPage) {
        langBtn.href = targetPage;
    }

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
    };

    var revealTargets = document.querySelectorAll(
        '.feature-card, .spec-card, .architecture-layer, .contact-card'
    );

    if (prefersReducedMotion) {
        revealTargets.forEach(function(el) { el.classList.add('fade-in'); });
    } else {
        var observer = new IntersectionObserver(function(entries) {
            var batch = entries.filter(function(e) { return e.isIntersecting; });
            batch.forEach(function(entry, index) {
                setTimeout(function() {
                    entry.target.classList.add('fade-in');
                }, index * 80);
                observer.unobserve(entry.target);
            });
        }, observerOptions);

        revealTargets.forEach(function(el) { observer.observe(el); });
    }

    var navbar = document.querySelector('.navbar');
    if (navbar) {
        var lastScrolled = false;
        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY > 24;
            if (scrolled !== lastScrolled) {
                navbar.classList.toggle('scrolled', scrolled);
                lastScrolled = scrolled;
            }
        }, { passive: true });
    }
});
