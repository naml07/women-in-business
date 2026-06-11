/* ============================================================
   EDUCULTE FEMMES — Javascript Principal
   Navigation, WhatsApp, Scroll Observer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scrolled State ---
    const header = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load

    // --- 2. Mobile Navigation ---
    const burgerBtn = document.querySelector('.burger-btn');
    const navMobile = document.querySelector('.nav-mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navClose = document.querySelector('.nav-mobile-close');
    const mobileLinks = document.querySelectorAll('.nav-mobile a');

    const toggleNav = () => {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        navMobile.classList.toggle('open');
        navOverlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    if (burgerBtn && navMobile && navOverlay && navClose) {
        burgerBtn.addEventListener('click', toggleNav);
        navClose.addEventListener('click', toggleNav);
        navOverlay.addEventListener('click', toggleNav);
        
        // Close nav when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleNav);
        });
    }

    // --- 3. Scroll Reveal Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. WhatsApp Links ---
    // Pre-fill default message if not specified on the link itself
    const waLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    const defaultMsg = encodeURIComponent("Bonjour, je souhaite obtenir des informations sur les formations Educulte Femmes.");
    
    waLinks.forEach(link => {
        if (!link.href.includes('text=')) {
            // Check if it already has parameters
            const separator = link.href.includes('?') ? '&' : '?';
            link.href = `${link.href}${separator}text=${defaultMsg}`;
        }
    });

    // --- 5. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        
        if (button) {
            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });
                
                // Toggle current
                if (!isOpen) {
                    item.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                }
            });
        }
    });
});
