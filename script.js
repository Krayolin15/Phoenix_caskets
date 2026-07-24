// ============================================
// PHOENIX COFFINS & CASKETS - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // Animate hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ============================================
    // HERO SLIDER DOTS
    // ============================================
    const heroDots = document.querySelectorAll('.hero-dots .dot');

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            heroDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Auto-rotate hero dots
    let currentHeroSlide = 0;
    setInterval(() => {
        heroDots.forEach(d => d.classList.remove('active'));
        currentHeroSlide = (currentHeroSlide + 1) % heroDots.length;
        heroDots[currentHeroSlide].classList.add('active');
    }, 5000);

    // ============================================
    // COFFIN IMAGE SLIDER (Hero)
    // ============================================
    const coffinImages = [
        "pic(1).png",
        "pic(2).png",
        "pic(3).png"
    ];

    let currentSlide = 0;
    const coffinImage = document.getElementById("coffinImage");
    const dots = document.querySelectorAll(".dot");

    function changeSlide(index) {
        currentSlide = index;

        // Fade Out
        if (coffinImage) {
            coffinImage.style.opacity = "0";

            setTimeout(() => {
                coffinImage.src = coffinImages[index];

                // Remove active dot
                dots.forEach(dot => dot.classList.remove("active"));

                // Activate selected dot
                if (dots[index]) {
                    dots[index].classList.add("active");
                }

                // Fade In
                coffinImage.style.opacity = "1";
            }, 250);
        }
    }

    // Auto-rotate coffin images
    if (coffinImage) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % coffinImages.length;
            changeSlide(currentSlide);
        }, 5000);
    }

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // Trigger stats animation when in view
    const statsSection = document.querySelector('.stats');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonials = [
        {
            text: '"Phoenix Coffins provided exceptional service and quality. Their attention to detail and care is unmatched."',
            author: '- Funeral Home Partner'
        },
        {
            text: '"The craftsmanship is outstanding. Every coffin is a work of art. Highly recommended for any funeral home."',
            author: '- Durban Funeral Services'
        },
        {
            text: '"Professional, compassionate, and reliable. Phoenix Coffins made a difficult time much easier for our family."',
            author: '- Satisfied Client'
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    function updateTestimonial(index) {
        // Fade out
        if (testimonialText) testimonialText.style.opacity = '0';
        if (testimonialAuthor) testimonialAuthor.style.opacity = '0';

        setTimeout(() => {
            if (testimonialText) testimonialText.textContent = testimonials[index].text;
            if (testimonialAuthor) testimonialAuthor.textContent = testimonials[index].author;

            // Fade in
            if (testimonialText) testimonialText.style.opacity = '1';
            if (testimonialAuthor) testimonialAuthor.style.opacity = '1';

            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 300);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 6000);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.product-card, .why-feature, .stat-item, .feature-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ============================================
    // PRODUCT CARD HOVER EFFECT
    // ============================================
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ============================================
    // NAVBAR DROPDOWN ON MOBILE
    // ============================================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // ============================================
    // LOADING SCREEN
    // ============================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // ============================================
    // FORM VALIDATION
    // ============================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // COOKIE CONSENT
    // ============================================
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c Phoenix Coffins & Caskets ', 'background: linear-gradient(135deg, #C9A962, #A88B4A); color: #0D0D0D; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Crafted with Dignity. Delivered with Care. ', 'color: #C9A962; font-size: 14px; font-style: italic;');

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// GSAP-LIKE ANIMATIONS (Vanilla JS)
// ============================================

function fadeIn(element, duration = 600) {
    element.style.opacity = '0';
    element.style.display = 'block';

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);

        element.style.opacity = percent;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function slideUp(element, duration = 600) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);

        element.style.opacity = percent;
        element.style.transform = `translateY(${30 * (1 - percent)}px)`;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}