// Portfolio Data
const portfolioData = {
    personalInfo: {
        name: "Yogesh Dhembare",
        title: "Data Analyst | ETL Developer | SQL Expert | GCP | Power BI",
        location: "Pune, India",
        email: "yogeshdhembare@gmail.com",
        phone: "+91-9876543210",
        profileImage: "https://customer-assets.emergentagent.com/job_b2cc62f0-e028-439d-8c73-777c94a1f562/artifacts/f4skezdc_WhatsApp%20Image%202025-07-02%20at%2002.01.46.jpeg",
        linkedinUrl: "https://linkedin.com/in/yogeshdhembare",
        resumeUrl: "https://github.com/yogeshdhembare/Portfolio/blob/main/Resume_Yogesh_Dhembare_SQL_DataAnalyst_ETL.pdf"
    }
};

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
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
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .experience-card, .education-card, .award-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const glow = this.querySelector('.skill-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const glow = this.querySelector('.skill-glow');
            if (glow) {
                glow.style.opacity = '0.75';
            }
        });
    });
    
    // Add typing effect to hero title (optional)
    animateHeroTitle();
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroPattern = document.querySelector('.hero-pattern');
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add counter animation for metrics
    animateCounters();
});

// Function to open LinkedIn
function openLinkedIn() {
    window.open(portfolioData.personalInfo.linkedinUrl, 'https://www.linkedin.com/in/yogeshdhembare23/');
    
    // Analytics tracking (optional)
    trackEvent('linkedin_click', {
        source: 'portfolio',
        location: 'cta_button'
    });
}

// Function to download resume
function downloadResume() {
    const resumeUrl = 'Resume_Yogesh_Dhembare_SQL_DataAnalyst_ETL.pdf'; // Relative path to the PDF file

    window.open(resumeUrl, '_blank');

    // Analytics tracking (optional)
    trackEvent('resume_download', {
        source: 'portfolio',
        format: 'pdf'
    });
}


// Function to open email
function openEmail() {
    window.open(`mailto:${portfolioData.personalInfo.email}`, '_blank');
    
    // Analytics tracking (optional)
    trackEvent('email_click', {
        source: 'portfolio',
        location: 'footer'
    });
}

// Typing effect for hero title
function animateHeroTitle() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '2px solid #3b82f6';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Counter animation for metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isSize = target.includes('GB');
        
        if (isPercentage) {
            const number = parseInt(target);
            animateNumber(counter, 0, number, 2000, '%');
        } else if (isSize) {
            const number = parseInt(target);
            animateNumber(counter, 0, number, 2000, 'GB+');
        }
    });
}

// Number animation helper
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

// Easing function for smooth animation
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Analytics tracking function (optional)
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
}

// Utility function to debounce scroll events
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

// Add scroll-based animations
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for background patterns
    const patterns = document.querySelectorAll('[class*="bg-pattern"]');
    patterns.forEach((pattern, index) => {
        const speed = 0.3 + (index * 0.1);
        pattern.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Header background opacity
    const header = document.querySelector('.header');
    if (header) {
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.background = `rgba(255, 255, 255, ${0.8 + (opacity * 0.15)})`;
    }
    
    // Progress indicator (optional)
    updateScrollProgress();
}, 16)); // ~60fps

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // You can add a progress bar element and update it here
    // const progressBar = document.querySelector('.scroll-progress');
    // if (progressBar) {
    //     progressBar.style.width = scrollPercent + '%';
    // }
}

// Form validation and submission (if you add a contact form)
function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Theme switching (if you want to add dark mode)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    
    // Handle missing images
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Image not available';
    }
});
