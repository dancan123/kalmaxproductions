document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER & INITIAL ANIMATION
    const loader = document.getElementById('loader');
    const body = document.body;
    body.classList.add('js-enabled');

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
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // 4. TYPING EFFECT
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) {
        const text = heroH1.innerHTML;
        heroH1.innerHTML = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Skip HTML tags
                    const end = text.indexOf('>', i);
                    heroH1.innerHTML += text.substring(i, end + 1);
                    i = end + 1;
                } else {
                    heroH1.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, 30);
            }
        };
        setTimeout(type, 1500);
    }

    // 5. BEFORE/AFTER SLIDER
    const baSlider = document.querySelector('.ba-slider-container');
    if (baSlider) {
        const handle = baSlider.querySelector('.ba-handle');
        const before = baSlider.querySelector('.ba-before');
        const beforeImg = before.querySelector('img');
        
        const moveSlider = (e) => {
            let rect = baSlider.getBoundingClientRect();
            let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
            let x = pageX - rect.left;
            let width = baSlider.offsetWidth;
            
            if (beforeImg) beforeImg.style.width = width + 'px';
            
            if (x < 0) x = 0;
            if (x > width) x = width;
            let percent = (x / width) * 100;
            handle.style.left = percent + '%';
            before.style.width = percent + '%';
        };

        // Initial sync
        if (beforeImg) beforeImg.style.width = baSlider.offsetWidth + 'px';

        baSlider.addEventListener('mousemove', moveSlider);
        baSlider.addEventListener('touchmove', moveSlider);
        baSlider.addEventListener('mousedown', moveSlider);
        
        window.addEventListener('resize', () => {
            if (beforeImg) beforeImg.style.width = baSlider.offsetWidth + 'px';
        });
    }

    // 6. COUNTER ANIMATION
    const counters = document.querySelectorAll('h2[style*="font-size: 4rem"]');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.innerText.replace(/\D/g, '');
            const count = +counter.getAttribute('data-count') || 0;
            const suffix = counter.innerText.includes('+') ? '+' : (counter.innerText.includes('M') ? 'M+' : '');
            
            if (count < target) {
                const inc = target / 50;
                const nextCount = Math.ceil(count + inc);
                counter.innerText = (nextCount > target ? target : nextCount) + suffix;
                counter.setAttribute('data-count', nextCount);
                setTimeout(animateCounters, 20);
            }
        });
    };

    // 7. EXIT INTENT POPUP
    let exitIntentTriggered = false;
    const exitModal = document.getElementById('exit-modal');
    const closeModal = document.querySelector('.close-modal');

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !exitIntentTriggered && exitModal) {
            exitModal.style.display = 'flex';
            setTimeout(() => exitModal.classList.add('active'), 10);
            exitIntentTriggered = true;
        }
    });

    if (closeModal && exitModal) {
        closeModal.addEventListener('click', () => {
            exitModal.classList.remove('active');
            setTimeout(() => exitModal.style.display = 'none', 400);
        });
        
        exitModal.addEventListener('click', (e) => {
            if (e.target === exitModal) {
                exitModal.classList.remove('active');
                setTimeout(() => exitModal.style.display = 'none', 400);
            }
        });
    }

    // 8. MOBILE MENU
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

    // 9. SCROLL REVEAL (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Check if it's the section with counters
                if (entry.target.querySelector('h2[style*="font-size: 4rem"]')) {
                    animateCounters();
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealContainers = document.querySelectorAll('.section-padding:not(.hero), .portfolio-grid, .footer, .ba-slider-container, .project-spotlight');
    revealContainers.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // Safety Reveal: Ensure content is visible after 3 seconds no matter what
    setTimeout(() => {
        document.querySelectorAll('.reveal-init').forEach(el => el.classList.add('revealed'));
    }, 3000);

    // smooth scroll check
    if (counters && counters.length > 0) {
        // Initial check in case they are already in view
        animateCounters();
    }

    // 10. PAGE TRANSITIONS (leaving)
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.includes('wa.me')) {
                e.preventDefault();
                body.classList.add('transitioning');
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });

    // 11. CONTACT FORM (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending Brief...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully';
                btn.style.background = '#25D366';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--accent-color)';
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
});
