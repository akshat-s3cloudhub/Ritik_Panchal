// DG Panchal Website JavaScript - Enhanced with Accessibility & Performance
(function() {
    'use strict';

    // Configuration
    const config = {
        animationDuration: 300,
        scrollOffset: 100,
        throttleDelay: 16,
        debounceDelay: 250,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    // DOM Elements with error checking
    const elements = {
        navToggle: document.getElementById('nav-toggle'),
        navMenu: document.getElementById('nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        header: document.querySelector('.header'),
        contactForm: document.getElementById('contact-form'),
        sections: document.querySelectorAll('section[id]'),
        skipLinks: document.querySelectorAll('.skip-link'),
        loadingIndicator: null // Will be created dynamically
    };

    // Performance utilities
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const debounce = (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Accessibility helpers
    const announceToScreenReader = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    };

    // Initialize all functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNavigation();
        initSmoothScrolling();
        initScrollEffects();
        initActiveNavLinks();
        initFormHandling();
        initAnimations();
        initAccessibility();
        initPerformanceOptimizations();
        initLoadingStates();
        initUserExperience();
        initScrollToTop();
        announceToScreenReader('Page loaded successfully');
    });

    // Mobile Navigation Toggle with Accessibility Enhancements
    function initMobileNavigation() {
        if (!elements.navToggle || !elements.navMenu) return;

        elements.navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Keyboard navigation for mobile menu
        elements.navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });

        // Focus trap for mobile menu
        if (elements.navMenu) {
            trapFocus(elements.navMenu);
        }

        // Close mobile menu when clicking on a link
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!elements.navToggle.contains(e.target) && !elements.navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - header.offsetHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Smooth scrolling for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - header.offsetHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Scroll Effects (Header background, scroll indicator)
    function initScrollEffects() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            // Header background effect
            if (scrollTop > 100) {
                header.style.background = 'rgba(13, 17, 23, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(13, 17, 23, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }

            // Hide scroll indicator after scrolling
            if (scrollIndicator) {
                if (scrollTop > 200) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            }
        });
    }

    // Active Navigation Links
    function initActiveNavLinks() {
        const observerOptions = {
            root: null,
            rootMargin: `-${header.offsetHeight}px 0px -70% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current nav link
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Form Handling
    function initFormHandling() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            // Validate form
            if (validateForm(formObject)) {
                submitForm(formObject);
            }
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    // Form Validation
    function validateForm(data) {
        let isValid = true;
        const errors = {};

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation (optional but if provided, should be valid)
        if (data.phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                errors.phone = 'Please enter a valid phone number';
                isValid = false;
            }
        }

        // Subject validation
        if (!data.subject) {
            errors.subject = 'Please select a subject';
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
            isValid = false;
        }

        // Display errors
        displayFormErrors(errors);

        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        let error = '';

        switch (field.name) {
            case 'name':
                if (value.length < 2) error = 'Name must be at least 2 characters long';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = 'Please enter a valid email address';
                break;
            case 'phone':
                if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    error = 'Please enter a valid phone number';
                }
                break;
            case 'subject':
                if (!value) error = 'Please select a subject';
                break;
            case 'message':
                if (value.length < 10) error = 'Message must be at least 10 characters long';
                break;
        }

        if (error) {
            showFieldError(field, error);
        } else {
            clearFieldError(field);
        }

        return !error;
    }

    // Display form errors
    function displayFormErrors(errors) {
        // Clear all previous errors
        const errorElements = contactForm.querySelectorAll('.field-error');
        errorElements.forEach(el => el.remove());

        // Add new errors
        Object.keys(errors).forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            if (field) {
                showFieldError(field, errors[fieldName]);
            }
        });
    }

    // Show field error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b35';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ff6b35';
    }

    // Clear field error
    function clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    // Submit form (placeholder - would integrate with backend)
    function submitForm(data) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);

        // In a real application, you would send the data to a server:
        /*
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Error sending message. Please try again.', 'error');
        })
        .finally(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
        */
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#238636' : type === 'error' ? '#ff6b35' : '#0969da'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;

        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        `;

        closeButton.addEventListener('mouseover', () => closeButton.style.opacity = '1');
        closeButton.addEventListener('mouseout', () => closeButton.style.opacity = '0.8');

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Initialize Enhanced Animations
    function initAnimations() {
        // Enhanced scroll-triggered animations with staggered delays
        const animateOnScrollElements = document.querySelectorAll(
            '.service-card, .team-member, .product-card, .feature-card, .value-item'
        );

        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation delay for multiple elements
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateOnScrollElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            animationObserver.observe(element);
        });

        // Enhanced section title animations
        const sectionTitles = document.querySelectorAll('.section-title');
        const titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                    const underline = entry.target.parentElement.querySelector('.title-underline');
                    if (underline) {
                        setTimeout(() => {
                            underline.style.animation = 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                            underline.style.transform = 'scaleX(1)';
                        }, 300);
                    }
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        sectionTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            const underline = title.parentElement.querySelector('.title-underline');
            if (underline) {
                underline.style.transform = 'scaleX(0)';
                underline.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            titleObserver.observe(title);
        });

        // Counter animation with enhanced easing
        const experienceBadge = document.querySelector('.experience-badge .years');
        if (experienceBadge) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target, 40, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(experienceBadge);
        }

        // Add hover animations for interactive elements
        initHoverAnimations();
        
        // Initialize loading animations
        initLoadingAnimations();
    }

    // Enhanced counter animation with easing
    function animateCounter(element, targetValue, duration = 2000) {
        const startTime = performance.now();
        const startValue = 0;
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
            
            element.textContent = currentValue + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue + '+';
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Initialize hover animations
    function initHoverAnimations() {
        const cards = document.querySelectorAll('.service-card, .product-card, .team-member, .feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize loading animations
    function initLoadingAnimations() {
        // Add loading states for images
        const images = document.querySelectorAll('img[src]');
        
        images.forEach(img => {
            if (img.complete) {
                img.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.animation = 'fadeInUp 0.6s ease forwards';
                    this.style.opacity = '1';
                });
            }
        });

        // Add skeleton loading for content
        addSkeletonLoaders();
    }

    // Add skeleton loading animations
    function addSkeletonLoaders() {
        const contentCards = document.querySelectorAll('.service-card, .product-card');
        
        contentCards.forEach(card => {
            // Add shimmer effect during loading
            const shimmerOverlay = document.createElement('div');
            shimmerOverlay.className = 'shimmer-overlay';
            shimmerOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                opacity: 0;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(shimmerOverlay);
            
            // Show shimmer on hover
            card.addEventListener('mouseenter', function() {
                shimmerOverlay.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', function() {
                shimmerOverlay.style.opacity = '0';
            });
        });
    }

    // Scroll to Top functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        // Scroll to top button styles
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            transform: translateY(10px);
        `;

        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'translateY(10px)';
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects for scroll to top button
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
        });
    }

    // Utility Functions

    // Debounce function for performance optimization
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

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Add CSS animations via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .scroll-to-top:hover {
            transform: translateY(-2px) scale(1.1) !important;
        }

        /* Loading animation for buttons */
        .btn .fa-spinner {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Enhanced focus styles for accessibility */
        .btn:focus,
        .nav-link:focus,
        input:focus,
        textarea:focus,
        select:focus {
            outline: 2px solid #ff6b35;
            outline-offset: 2px;
        }

        /* Smooth transitions for all interactive elements */
        .service-card,
        .team-member,
        .product-card,
        .feature-card,
        .contact-item {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Use requestAnimationFrame for animations
    window.requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function(callback) { setTimeout(callback, 1000 / 60); };

    // Error handling for unsupported features
    try {
        // Check for IntersectionObserver support
        if (typeof IntersectionObserver === 'undefined') {
            console.warn('IntersectionObserver not supported. Some animations may not work.');
        }
    } catch (error) {
        console.error('JavaScript initialization error:', error);
    }

    // Mobile Menu Helper Functions
    function toggleMobileMenu() {
        const isActive = elements.navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        elements.navMenu.classList.add('active');
        elements.navToggle.classList.add('active');
        elements.navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item
        const firstMenuItem = elements.navMenu.querySelector('.nav-link');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
        
        announceToScreenReader('Navigation menu opened');
    }

    function closeMobileMenu() {
        elements.navMenu.classList.remove('active');
        elements.navToggle.classList.remove('active');
        elements.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        elements.navToggle.focus();
        
        announceToScreenReader('Navigation menu closed');
    }

    // Initialize Accessibility Features
    function initAccessibility() {
        // Skip links functionality
        elements.skipLinks.forEach(skipLink => {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = skipLink.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                }
            });
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // ESC key closes mobile menu
            if (e.key === 'Escape' && elements.navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Improve form accessibility
        if (elements.contactForm) {
            const formInputs = elements.contactForm.querySelectorAll('input, textarea, select');
            formInputs.forEach(input => {
                // Add proper labels if missing
                if (!input.getAttribute('aria-label') && !input.getAttribute('id')) {
                    const label = input.getAttribute('placeholder') || input.getAttribute('name');
                    input.setAttribute('aria-label', label);
                }
            });
        }

        // Add role and aria attributes to interactive elements
        const cards = document.querySelectorAll('.service-card, .product-card, .team-member, .feature-card');
        cards.forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('tabindex', '0');
            
            // Add keyboard interaction
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // Initialize Performance Optimizations
    function initPerformanceOptimizations() {
        // Lazy loading for images
        const lazyImages = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                lazyImageObserver.observe(img);
            });
        }

        // Preload critical resources
        const criticalImages = [
            'assets/images/LOGO.png',
            'assets/images/Banner1.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Optimize scroll events with throttling
        const optimizedScrollHandler = throttle(() => {
            // Scroll-based animations and effects
            updateScrollIndicator();
            updateHeaderBackground();
        }, config.throttleDelay);

        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    function updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const scrollTop = window.pageYOffset;
            scrollIndicator.style.opacity = scrollTop > 200 ? '0' : '1';
        }
    }

    function updateHeaderBackground() {
        if (elements.header) {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 100) {
                elements.header.style.background = 'rgba(13, 17, 23, 0.98)';
                elements.header.style.backdropFilter = 'blur(15px)';
            } else {
                elements.header.style.background = 'rgba(13, 17, 23, 0.95)';
                elements.header.style.backdropFilter = 'blur(10px)';
            }
        }
    }

    // Initialize Loading States
    function initLoadingStates() {
        // Show loading indicator for form submissions
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', () => {
                showLoadingSpinner();
            });
        }

        // Initialize page loading complete state
        window.addEventListener('load', () => {
            hideLoadingSpinner();
            document.body.classList.add('page-loaded');
            announceToScreenReader('Page fully loaded');
        });
    }

    function showLoadingSpinner() {
        if (!elements.loadingIndicator) {
            elements.loadingIndicator = document.createElement('div');
            elements.loadingIndicator.className = 'loading-indicator';
            elements.loadingIndicator.innerHTML = `
                <div class="spinner"></div>
                <span class="sr-only">Loading...</span>
            `;
            
            elements.loadingIndicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(13, 17, 23, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                backdrop-filter: blur(5px);
            `;
            
            const spinner = elements.loadingIndicator.querySelector('.spinner');
            spinner.style.cssText = `
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 107, 53, 0.3);
                border-left-color: #ff6b35;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            `;
            
            document.body.appendChild(elements.loadingIndicator);
        }
        
        elements.loadingIndicator.style.display = 'flex';
    }

    function hideLoadingSpinner() {
        if (elements.loadingIndicator) {
            elements.loadingIndicator.style.display = 'none';
        }
    }

    // Fix variable references in existing functions
    function initSmoothScrolling() {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - elements.header.offsetHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Smooth scrolling for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - elements.header.offsetHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    function initActiveNavLinks() {
        const observerOptions = {
            root: null,
            rootMargin: `-${elements.header.offsetHeight}px 0px -70% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    elements.navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current nav link
                    if (navLink) {
                        navLink.classList.add('active');
                        navLink.setAttribute('aria-current', 'page');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        elements.sections.forEach(section => {
            observer.observe(section);
        });
    }

    function initFormHandling() {
        if (!elements.contactForm) return;

        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            // Validate form
            if (validateForm(formObject)) {
                submitForm(formObject);
            }
        });

        // Real-time validation
        const formInputs = elements.contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    function submitForm(data) {
        const submitButton = elements.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            elements.contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.setAttribute('aria-busy', 'false');
            
            announceToScreenReader('Form submitted successfully');
        }, 2000);
    }

    function displayFormErrors(errors) {
        // Clear all previous errors
        const errorElements = elements.contactForm.querySelectorAll('.field-error');
        errorElements.forEach(el => el.remove());

        // Add new errors
        Object.keys(errors).forEach(fieldName => {
            const field = elements.contactForm.querySelector(`[name="${fieldName}"]`);
            if (field) {
                showFieldError(field, errors[fieldName]);
            }
        });

        // Announce errors to screen readers
        const errorCount = Object.keys(errors).length;
        if (errorCount > 0) {
            announceToScreenReader(`Form has ${errorCount} error${errorCount > 1 ? 's' : ''}, please correct them`);
        }
    }

    // Initialize Enhanced User Experience Features
    function initUserExperience() {
        // Progressive form enhancement
        initProgressiveFormEnhancement();
        
        // Interactive card enhancements
        initInteractiveCards();
        
        // Enhanced mobile gestures
        initMobileGestures();
        
        // Contextual tooltips
        initContextualTooltips();
        
        // Enhanced scroll progress indicator
        initScrollProgress();
        
        // Smart preloading based on user behavior
        initSmartPreloading();
        
        // Enhanced error handling
        initEnhancedErrorHandling();
        
        // Page visibility API for performance
        initPageVisibilityHandling();
    }
    
    // Progressive Form Enhancement
    function initProgressiveFormEnhancement() {
        if (!elements.contactForm) return;
        
        // Add character count for textarea
        const messageField = elements.contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
            const charCount = document.createElement('div');
            charCount.className = 'char-count';
            charCount.style.cssText = `
                font-size: 0.75rem;
                color: var(--text-gray, #8b949e);
                text-align: right;
                margin-top: 0.25rem;
            `;
            
            messageField.parentNode.appendChild(charCount);
            
            messageField.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = `${length}/500 characters`;
                
                if (length > 450) {
                    charCount.style.color = '#ff6b35';
                } else {
                    charCount.style.color = 'var(--text-gray, #8b949e)';
                }
            });
            
            // Initial update
            messageField.dispatchEvent(new Event('input'));
        }
        
        // Add form progress indicator
        const formProgress = document.createElement('div');
        formProgress.className = 'form-progress';
        formProgress.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-text">0% Complete</span>
        `;
        
        formProgress.style.cssText = `
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: rgba(255, 107, 53, 0.1);
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 107, 53, 0.2);
        `;
        
        const progressBar = formProgress.querySelector('.progress-bar');
        progressBar.style.cssText = `
            height: 4px;
            background: rgba(255, 107, 53, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.25rem;
        `;
        
        const progressFill = formProgress.querySelector('.progress-fill');
        progressFill.style.cssText = `
            height: 100%;
            background: #ff6b35;
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        const progressText = formProgress.querySelector('.progress-text');
        progressText.style.cssText = `
            font-size: 0.75rem;
            color: var(--text-gray, #8b949e);
        `;
        
        elements.contactForm.insertBefore(formProgress, elements.contactForm.firstChild);
        
        // Update form progress
        function updateFormProgress() {
            const requiredFields = elements.contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            let filledFields = 0;
            
            requiredFields.forEach(field => {
                if (field.value.trim()) {
                    filledFields++;
                }
            });
            
            const progress = (filledFields / requiredFields.length) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = `${Math.round(progress)}% Complete`;
        }
        
        // Add event listeners for progress tracking
        const allFormFields = elements.contactForm.querySelectorAll('input, textarea, select');
        allFormFields.forEach(field => {
            field.addEventListener('input', updateFormProgress);
            field.addEventListener('change', updateFormProgress);
        });
    }
    
    // Interactive Card Enhancements
    function initInteractiveCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Add quick view functionality
            const overlay = card.querySelector('.product-overlay');
            if (overlay) {
                overlay.addEventListener('click', function() {
                    const productTitle = card.querySelector('h3').textContent;
                    const productDesc = card.querySelector('p').textContent;
                    
                    showQuickView(productTitle, productDesc, card);
                });
            }
            
            // Add bookmark functionality
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.setAttribute('aria-label', 'Bookmark this product');
            
            bookmarkBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(13, 17, 23, 0.8);
                color: #f0f6fc;
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
                opacity: 0;
                transform: scale(0.8);
                z-index: 2;
            `;
            
            card.style.position = 'relative';
            card.appendChild(bookmarkBtn);
            
            // Show bookmark on hover
            card.addEventListener('mouseenter', function() {
                bookmarkBtn.style.opacity = '1';
                bookmarkBtn.style.transform = 'scale(1)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (!bookmarkBtn.classList.contains('bookmarked')) {
                    bookmarkBtn.style.opacity = '0';
                    bookmarkBtn.style.transform = 'scale(0.8)';
                }
            });
            
            // Bookmark functionality
            bookmarkBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (this.classList.contains('bookmarked')) {
                    this.classList.remove('bookmarked');
                    this.innerHTML = '<i class="far fa-bookmark"></i>';
                    this.style.backgroundColor = 'rgba(13, 17, 23, 0.8)';
                    showNotification('Product removed from bookmarks', 'info');
                } else {
                    this.classList.add('bookmarked');
                    this.innerHTML = '<i class="fas fa-bookmark"></i>';
                    this.style.backgroundColor = '#ff6b35';
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                    showNotification('Product bookmarked!', 'success');
                }
            });
        });
    }
    
    // Quick View Modal
    function showQuickView(title, description, cardElement) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="window.location.href='contact.html'">
                            <i class="fas fa-phone"></i>
                            Contact Us
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.href='products.html'">
                            <i class="fas fa-list"></i>
                            View All Products
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            background: var(--secondary-dark, #161b22);
            border-radius: 0.75rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid var(--border-color, #30363d);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            animation: slideInUp 0.3s ease;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--text-gray, #8b949e);
            font-size: 1.25rem;
            cursor: pointer;
            transition: color 0.3s ease;
        `;
        
        const modalActions = modal.querySelector('.modal-actions');
        modalActions.style.cssText = `
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        // ESC key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    // Enhanced Mobile Gestures
    function initMobileGestures() {
        if (!('ontouchstart' in window)) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Swipe gestures for mobile navigation
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
        
        function handleSwipeGesture() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe right - open menu if closed
                    if (!elements.navMenu.classList.contains('active')) {
                        openMobileMenu();
                    }
                } else {
                    // Swipe left - close menu if open
                    if (elements.navMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                }
            }
        }
    }
    
    // Contextual Tooltips
    function initContextualTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            let tooltip;
            
            element.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                
                tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = tooltipText;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(13, 17, 23, 0.9);
                    color: #f0f6fc;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    white-space: nowrap;
                    z-index: 10001;
                    pointer-events: none;
                    opacity: 0;
                    transform: translateY(-5px);
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-color, #30363d);
                `;
                
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                
                // Show tooltip
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                }, 10);
            });
            
            element.addEventListener('mouseleave', function() {
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        if (tooltip.parentElement) {
                            document.body.removeChild(tooltip);
                        }
                    }, 200);
                }
            });
        });
    }
    
    // Enhanced Scroll Progress Indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b35, #f7931e);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }, 16));
    }
    
    // Smart Preloading Based on User Behavior
    function initSmartPreloading() {
        const links = document.querySelectorAll('a[href$=".html"]');
        const preloadedPages = new Set();
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                if (href && !preloadedPages.has(href) && !href.startsWith('#')) {
                    // Preload page on hover
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = href;
                    document.head.appendChild(preloadLink);
                    preloadedPages.add(href);
                }
            });
        });
    }
    
    // Enhanced Error Handling
    function initEnhancedErrorHandling() {
        // Global error handler for JavaScript errors
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            
            // Show user-friendly error message for critical errors
            if (e.error && e.error.message && !e.error.message.includes('Script error')) {
                showNotification('Something went wrong. Please refresh the page.', 'error');
            }
        });
        
        // Handle failed image loads
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.background = 'linear-gradient(45deg, #333, #555)';
                this.style.color = '#ccc';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.fontSize = '0.8rem';
                this.innerHTML = '<i class="fas fa-image"></i> Image unavailable';
            });
        });
        
        // Handle network connectivity
        window.addEventListener('online', function() {
            showNotification('Connection restored!', 'success');
        });
        
        window.addEventListener('offline', function() {
            showNotification('You are currently offline. Some features may not work.', 'info');
        });
    }
    
    // Page Visibility API for Performance
    function initPageVisibilityHandling() {
        if (typeof document.hidden !== 'undefined') {
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    // Page is hidden - pause non-critical animations
                    document.body.classList.add('page-hidden');
                } else {
                    // Page is visible - resume animations
                    document.body.classList.remove('page-hidden');
                }
            });
        }
    }

    // Expose some functions globally for debugging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.dgPanchalDebug = {
            showNotification,
            validateForm,
            animateCounter,
            toggleMobileMenu,
            announceToScreenReader,
            showQuickView
        };
    }

})();
