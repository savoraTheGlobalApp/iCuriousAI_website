document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form[name='contact']");
    if (form && !form.hasAttribute("data-netlify")) {
      form.setAttribute("data-netlify", "true");
      console.log("Restored data-netlify attribute to form");
    }
  });
  
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            const yPos = -(scrolled * speed * 0.5);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.vision-card, .timeline-content, .age-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form submission handling
// const contactForm = document.querySelector('.contact-form form');

// For non‑Netlify forms only (demo behavior)
// if (contactForm && !contactForm.hasAttribute('data-netlify')) {
//   contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const submitBtn = this.querySelector('button[type="submit"]');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Sending...';
//     submitBtn.disabled = true;
//     setTimeout(() => {
//       alert('Thank you for your interest! We\'ll get back to you soon.');
//       this.reset();
//       submitBtn.textContent = originalText;
//       submitBtn.disabled = false;
//     }, 2000);
//   });
// }

// Netlify Forms: prevent submit if reCAPTCHA not solved; preserve field values
    const contactForm = document.querySelector('form[data-netlify="true"]');

    if (contactForm) {
        const captchaContainer = contactForm.querySelector('[data-netlify-recaptcha]');
        let errorEl = document.querySelector('#captcha-error');

        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.id = 'captcha-error';
            errorEl.style.color = 'red';
            errorEl.style.marginTop = '8px';
            if (captchaContainer) captchaContainer.insertAdjacentElement('afterend', errorEl);
        }

        const solved = () => {
            const tokenEl = contactForm.querySelector('textarea[name="g-recaptcha-response"]');
            return !!(tokenEl && tokenEl.value.trim().length);
        };

        const showError = (msg) => {
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        };

        const hideError = () => {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        };

        // Save inputs to sessionStorage
        const saveFormValues = () => {
            contactForm.querySelectorAll('input, textarea, select').forEach(input => {
                sessionStorage.setItem(`form_${input.name}`, input.value);
            });
        };

        // Restore inputs from sessionStorage
        const restoreFormValues = () => {
            contactForm.querySelectorAll('input, textarea, select').forEach(input => {
                const saved = sessionStorage.getItem(`form_${input.name}`);
                if (saved !== null) input.value = saved;
            });
        };

        // Save on each change
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', saveFormValues);
        });

        restoreFormValues();

        // Mutation observer to hide error when captcha is solved
        const mo = new MutationObserver(() => {
            if (solved()) hideError();
        });
        mo.observe(contactForm, { subtree: true, childList: true });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // STOP native submit always

            if (!solved()) {
                saveFormValues();
                showError('⚠ Please check the reCAPTCHA box before submitting.');
                captchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Send manually to Netlify only when CAPTCHA solved
            const formData = new FormData(contactForm);

            try {
                await fetch('/', {
                    method: 'POST',
                    body: formData
                });

                sessionStorage.clear();
                window.location.href = contactForm.getAttribute('action'); // Redirect to thank-you.html
            } catch (err) {
                showError('Something went wrong. Please try again.');
            }
        });
    }

    // Button click handlers
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Get Started') || this.textContent.includes('Request Demo')) {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation when page loads
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text !== '∞') {
                    const number = parseInt(text);
                    animateCounter(statNumber, number);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // Gradient animation for background orbs
    function animateGradients() {
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * 2}s`;
        });
    }

    animateGradients();

    // Add hover effects for interactive elements
    document.querySelectorAll('.vision-card, .age-card, .timeline-content').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Add some modern CSS effects
const style = document.createElement('style');
style.textContent = `
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn-primary:hover::before {
        left: 100%;
    }
    
    .floating-card {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    }
    
    .vision-card, .age-card, .timeline-content {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    .gradient-text {
        background-size: 200% 200%;
        animation: shimmer 3s ease-in-out infinite;
    }

    .form-error {
      color: #ef4444;
      font-size: 0.9rem;
      margin-top: 8px;
      display: none; /* Hidden by default */
    }
`;

document.head.appendChild(style); 