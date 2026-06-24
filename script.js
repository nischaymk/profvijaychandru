// script.js - Global functionality with dark theme

document.addEventListener('DOMContentLoaded', function() {
    // ==================== COUNTDOWN TIMER ====================
    function updateCountdown() {
        const targetDate = new Date('Jan 1, 2030 00:00:00').getTime();
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (86400000)) / (3600000));
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            updateCountdownElement('days', days);
            updateCountdownElement('hours', String(hours).padStart(2, '0'));
            updateCountdownElement('minutes', String(minutes).padStart(2, '0'));
            updateCountdownElement('seconds', String(seconds).padStart(2, '0'));
        }
    }

    function updateCountdownElement(id, value) {
        const element = document.getElementById(id);
        if (element && element.innerText != value) {
            element.classList.add('update');
            element.innerText = value;
            setTimeout(() => {
                element.classList.remove('update');
            }, 300);
        } else if (element) {
            element.innerText = value;
        }
    }

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ==================== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER ====================
    const animatedElements = document.querySelectorAll(`
        .animate-in,
        .animate-fade-left,
        .animate-fade-right,
        .animate-scale,
        .pub-card,
        .bento-card-equal,
        .service-card,
        .pursuit-card,
        .portrait-card,
        .contact-info-card.centered
    `);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));

    // ==================== MOBILE MENU ====================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const spans = menuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ==================== TIMELINE SCROLL SPY ====================
    const sections = document.querySelectorAll('.timeline-section');
    const navLinksTimeline = document.querySelectorAll('.timeline-link');
    if (sections.length && navLinksTimeline.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinksTimeline.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});