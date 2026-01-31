/* ═══════════════════════════════════════
   MATLAP DESIGN — Scripts
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Scroll Reveal ─── */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));


    /* ─── Staggered reveal for project items ─── */
    const projectItems = document.querySelectorAll('.project-item');

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const i = Array.from(projectItems).indexOf(item);
                item.style.transitionDelay = `${i * 0.1}s`;
                item.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(item);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `.project-item.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);


    /* ─── Smooth scroll for nav links ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
