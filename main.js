document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER & INITIAL ANIMATION
    const loader = document.getElementById('loader');
    const body = document.body;

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                body.classList.remove('loading');
            }
        }, 1000);
    });

    // 2. CUSTOM CURSOR
    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorOutline.className = 'custom-cursor-outline';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });

    // Smooth outline following
    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;

        outlineX += distX * 0.15;
        outlineY += distY * 0.15;

        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform += ' scale(1.5)';
            cursorOutline.style.background = 'rgba(197, 160, 89, 0.1)';
            cursorOutline.style.borderColor = 'transparent';
            cursor.style.transform += ' scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
            cursorOutline.style.background = 'transparent';
            cursorOutline.style.borderColor = 'var(--accent-color)';
            cursor.style.transform = cursor.style.transform.replace(' scale(0.5)', '');
        });
    });

    // 3. NAVBAR SCROLL EFFECT
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'var(--glass-bg)';
                nav.style.padding = window.innerWidth > 768 ? '1rem 5%' : '0.8rem 5%';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                nav.style.background = 'transparent';
                nav.style.padding = window.innerWidth > 768 ? '2rem 5%' : '1.5rem 5%';
                nav.style.boxShadow = 'none';
            }
        });
    }

    // 4. MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 5. SCROLL REVEAL (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal to sections and items
    const revealElements = document.querySelectorAll('.section-padding, .portfolio-item, .footer, header > *');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // 6. CONTACT FORM (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Success';
                btn.classList.add('success');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('success');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
