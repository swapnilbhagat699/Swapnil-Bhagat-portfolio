document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Removal
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);

    // 2. Custom Cursor (Desktop only)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Hover effects for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .skill-item, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.borderColor = 'var(--accent)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--primary)';
            });
        });
    }

    // 3. Typing Animation
    const typingText = document.querySelector('.typing-text');
    const words = ["Senior GIS Expert", "Geospatial Analyst", "Telecom GIS Specialist", "Cartographer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Scroll Reveal & Skill Bar Animation
    const reveals = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // Reveal sections
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.style.opacity = '1';
                reveal.style.transform = 'translateY(0)';
            }
        });

        // Animate skills
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }
    
    // Initial setup for reveal elements
    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(30px)';
        reveal.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load

    // 5. Scroll to Top & Sticky Navbar Active State
    const scrollTopBtn = document.querySelector('.scroll-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Scroll to top button visibility
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Active navigation highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Form Submission Prevention (for static demo)
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your geospatial transmission has been sent.');
        e.target.reset();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Radial Gauge Animation logic ---
    const gaugeCards = document.querySelectorAll('.skill-gauge-card');
    
    // Animate the number counting up
    const animateCounter = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target;
            }
        };
        updateCounter();
    };

    // Intersection Observer to trigger animations on scroll
    const gaugeObserverOptions = {
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const gaugeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger SVG stroke animation via CSS
                entry.target.classList.add('animate-gauge');
                
                // Find and trigger the counter number animation
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted'); // Prevent re-animating
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, gaugeObserverOptions);

    gaugeCards.forEach(card => {
        gaugeObserver.observe(card);
    });
});
