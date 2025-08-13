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

    // Form submission handling - Debug all possible selectors
    console.log('=== Form Debugging ===');
    console.log('All forms on page:', document.querySelectorAll('form'));
    console.log('Forms with name="contact":', document.querySelectorAll('form[name="contact"]'));
    console.log('Forms with data-netlify:', document.querySelectorAll('form[data-netlify]'));
    console.log('Forms in .contact-form:', document.querySelectorAll('.contact-form form'));

    const contactForm = document.querySelector('.contact-form form');
    console.log('Selected form:', contactForm);
    console.log('Form has data-netlify:', contactForm?.hasAttribute('data-netlify'));

    // Form handling: Supabase + Netlify backup
    if (contactForm && contactForm.hasAttribute('data-netlify')) {
    console.log('Contact form found and Netlify attribute detected'); // Debug log

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const errorEl = contactForm.querySelector('#captcha-error') || (() => {
        const d = document.createElement('div');
        d.id = 'captcha-error';
        d.className = 'form-error';
        d.setAttribute('aria-live', 'polite');
        d.setAttribute('role', 'alert');
        const captchaContainer = contactForm.querySelector('[data-netlify-recaptcha]');
        if (captchaContainer) captchaContainer.insertAdjacentElement('afterend', d);
        return d;
    })();

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'submit-tooltip';
    tooltip.textContent = 'Please complete the reCAPTCHA first';
    tooltip.style.display = 'none';
    if (submitBtn) submitBtn.parentNode.appendChild(tooltip);

    // Start with button disabled
    if (submitBtn) submitBtn.disabled = true;

    const checkCaptcha = () => {
        const tokenEl = contactForm.querySelector('textarea[name="g-recaptcha-response"]');
        const isSolved = !!(tokenEl && tokenEl.value.trim().length);
        
        if (submitBtn) {
        submitBtn.disabled = !isSolved;
        if (isSolved) {
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            tooltip.style.display = 'none';
        } else {
            submitBtn.style.opacity = '0.6';
            submitBtn.style.cursor = 'not-allowed';
        }
        }
        
        if (isSolved) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
        }
        return isSolved;
    };

    // Add hover events for tooltip
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
        if (submitBtn.disabled) {
            tooltip.style.display = 'block';
        }
        });
        
        submitBtn.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        });
    }

    // Handle form submission - CRITICAL: This must be attached
    contactForm.addEventListener('submit', async (e) => {
        console.log('Form submit event triggered'); // Debug log
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Form submission prevented'); // Debug log
        
        if (!checkCaptcha()) {
        console.log('reCAPTCHA not solved'); // Debug log
        errorEl.textContent = 'Please complete the reCAPTCHA to send your message.';
        errorEl.style.display = 'block';
        return false;
        }

        console.log('reCAPTCHA solved, proceeding with submission'); // Debug log

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
        // Get form data
        const formData = new FormData(contactForm);
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            message: formData.get('message')
        };

        console.log('Sending payload to function:', payload); // Debug log

        // Submit to Supabase via Netlify Function
        const response = await fetch('/.netlify/functions/submit-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log('Function response status:', response.status); // Debug log

        const result = await response.json();
        console.log('Function response result:', result); // Debug log

        if (response.ok && result.success) {
            console.log('Submission successful, redirecting'); // Debug log
            // Success - redirect to thank you page
            window.location.href = '/thank-you.html';
        } else {
            throw new Error(result.error || 'Submission failed');
        }

        } catch (error) {
        console.error('Submission error:', error);
        errorEl.textContent = 'Something went wrong. Please try again.';
        errorEl.style.display = 'block';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        }
    });

    // Check immediately and then watch for changes
    checkCaptcha();
    const mo = new MutationObserver(checkCaptcha);
    mo.observe(contactForm, { subtree: true, childList: true });
    
    console.log('Form handler setup complete'); // Debug log
    } else {
    console.log('Contact form not found or missing data-netlify attribute'); // Debug log
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