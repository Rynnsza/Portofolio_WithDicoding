document.addEventListener('DOMContentLoaded', () => {
    // Magnetic Effect for Buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0) scale(1)`;
        });
    });

    // Scroll Reveal with Staggering
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.main-card, .project-card, .profile-card, .hero-wrapper');

    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.98)';
        el.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        revealObserver.observe(el);
    });

    // Handle the CSS class injection for revealed state
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }
    `;
    document.head.appendChild(style);

    /**
     * Fitur Active Menu: Mendeteksi seksi yang aktif saat di-scroll
     */
    const sections = document.querySelectorAll('section[id], article[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const activeMenuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Deteksi saat 50% seksi terlihat

    sections.forEach(section => activeMenuObserver.observe(section));

    // Navbar scroll effect
    const nav = document.querySelector('header nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = '0.5rem 1.5rem';
            nav.style.width = '85%';
            nav.style.background = 'rgba(17, 24, 39, 0.9)';
        } else {
            nav.style.padding = '0.8rem 2rem';
            nav.style.width = '90%';
            nav.style.background = 'rgba(17, 24, 39, 0.7)';
        }
    });
});
