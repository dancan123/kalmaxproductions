document.addEventListener('DOMContentLoaded', () => {
    // Smooth fade-in for all page elements
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '2rem 5%';
            nav.style.backgroundColor = 'rgba(20, 20, 20, 0.85)';
        }
    });

    // Contact Form submission (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent!';
                btn.style.backgroundColor = '#28a745';
                btn.style.color = '#fff';
                btn.style.borderColor = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = 'Send Message';
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = 'var(--accent-color)';
                    btn.style.borderColor = 'var(--accent-color)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Portfolio interaction (Subtle entrance)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});
