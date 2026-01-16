/* ═══════════════════════════════════════════════════════════════════
   Project: Dar Al-Hidaya Academy - Professional JS Edition V2.0
   Developed by: AAA Hub (aaahub.online)
   Description: Advanced Interactions, Animations & WhatsApp Integration
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ═══════════════════════════════════════════════════════════════════
    // 1. LOADING SCREEN
    // ═══════════════════════════════════════════════════════════════════
    
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000);
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // 2. DARK/LIGHT MODE TOGGLE
    // ═══════════════════════════════════════════════════════════════════
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const currentTheme = localStorage.getItem('theme') || 'light';

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    };

    // Initialize theme
    setTheme(currentTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            
            // Add rotation animation to button
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 3. STICKY NAVBAR WITH SCROLL EFFECTS
    // ═══════════════════════════════════════════════════════════════════
    
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add sticky class
        if (currentScroll > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ═══════════════════════════════════════════════════════════════════
    // 4. MOBILE MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════════
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 5. ACTIVE LINK HIGHLIGHT
    // ═══════════════════════════════════════════════════════════════════
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // 6. ANIMATED STATISTICS COUNTER
    // ═══════════════════════════════════════════════════════════════════
    
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };

    const observeCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    observeCounters();

    // ═══════════════════════════════════════════════════════════════════
    // 7. SCROLL ANIMATIONS - FADE IN ELEMENTS
    // ═══════════════════════════════════════════════════════════════════
    
    const observeElements = () => {
        const elements = document.querySelectorAll('.service-card, .team-member, .package-card, .faq-item, .gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    };

    observeElements();

    // ═══════════════════════════════════════════════════════════════════
    // 8. MODAL SYSTEM - POPUPS
    // ═══════════════════════════════════════════════════════════════════
    
    // Open Modal
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    };

    // Close Modal
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 400);
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 400);
            }
        });
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 400);
                }
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // 9. SERVICE REQUEST - AUTO-FILL FORM
    // ═══════════════════════════════════════════════════════════════════
    
    window.requestService = function(serviceName, price = '') {
        const serviceField = document.getElementById('form-service');
        const priceField = document.getElementById('form-price');
        const contactSection = document.getElementById('contact-section');

        // If on same page with contact form
        if (serviceField && contactSection) {
            serviceField.value = serviceName;
            if (price && priceField) {
                priceField.value = price;
            }
            
            // Smooth scroll to form
            contactSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });

            // Highlight effect
            contactSection.style.boxShadow = '0 0 40px var(--secondary)';
            setTimeout(() => {
                contactSection.style.boxShadow = 'var(--shadow-md)';
            }, 2000);

            // Focus on first input
            setTimeout(() => {
                const firstInput = contactSection.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 1000);
        } else {
            // Redirect to contact page with parameters
            const lang = document.documentElement.lang || 'ar';
            const targetPage = lang === 'ar' ? 'contact.html' : 'contact-en.html';
            const params = new URLSearchParams({
                service: serviceName,
                price: price
            });
            window.location.href = `${targetPage}?${params.toString()}`;
        }
    };

    // Auto-fill form from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const priceParam = urlParams.get('price');

    if (serviceParam) {
        const serviceField = document.getElementById('form-service');
        if (serviceField) {
            serviceField.value = decodeURIComponent(serviceParam);
        }
    }

    if (priceParam) {
        const priceField = document.getElementById('form-price');
        if (priceField) {
            priceField.value = decodeURIComponent(priceParam);
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // 10. WHATSAPP FORM SUBMISSION
    // ═══════════════════════════════════════════════════════════════════
    
    window.sendToWhatsApp = function(event) {
        event.preventDefault();

        // WhatsApp Numbers
        const wpNumbers = ['201023231780', '201118330582'];
        const primaryNumber = wpNumbers[0];

        // Get form data
        const name = document.getElementById('form-name')?.value || '';
        const phone = document.getElementById('form-phone')?.value || '';
        const age = document.getElementById('form-age')?.value || 'غير محدد';
        const service = document.getElementById('form-service')?.value || 'غير محدد';
        const price = document.getElementById('form-price')?.value || '';
        const message = document.getElementById('form-message')?.value || 'لا توجد تفاصيل إضافية';

        // Check if Arabic or English
        const isArabic = document.documentElement.lang === 'ar';

        // Build WhatsApp message
        const header = isArabic 
            ? '*🕌 طلب خدمة جديد - أكاديمية دار الهداية*' 
            : '*🕌 New Service Request - Dar Al-Hidaya Academy*';

        let whatsappMessage = `${header}%0A%0A`;
        whatsappMessage += `👤 *${isArabic ? 'الاسم' : 'Name'}:* ${name}%0A`;
        whatsappMessage += `📞 *${isArabic ? 'الهاتف' : 'Phone'}:* ${phone}%0A`;
        whatsappMessage += `🎂 *${isArabic ? 'السن' : 'Age'}:* ${age}%0A`;
        whatsappMessage += `🕋 *${isArabic ? 'الخدمة المطلوبة' : 'Service'}:* ${service}%0A`;
        
        if (price) {
            whatsappMessage += `💰 *${isArabic ? 'السعر' : 'Price'}:* ${price}%0A`;
        }
        
        whatsappMessage += `📝 *${isArabic ? 'تفاصيل إضافية' : 'Additional Details'}:* ${message}%0A%0A`;
        whatsappMessage += `⏰ *${isArabic ? 'وقت الإرسال' : 'Sent at'}:* ${new Date().toLocaleString(isArabic ? 'ar-EG' : 'en-US')}`;

        // Open WhatsApp
        const whatsappURL = `https://wa.me/${primaryNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');

        // Show success message
        const successMsg = isArabic 
            ? '✅ جاري توجيهك إلى واتساب...' 
            : '✅ Redirecting to WhatsApp...';
        
        alert(successMsg);

        // Reset form after 2 seconds
        setTimeout(() => {
            event.target.reset();
        }, 2000);
    };

    // ═══════════════════════════════════════════════════════════════════
    // 11. FAQ ACCORDION
    // ═══════════════════════════════════════════════════════════════════
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 12. GALLERY FILTER SYSTEM
    // ═══════════════════════════════════════════════════════════════════
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, index * 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 13. GALLERY LIGHTBOX
    // ═══════════════════════════════════════════════════════════════════
    
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 14. SMOOTH SCROLL FOR ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════════
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // 15. FORM VALIDATION
    // ═══════════════════════════════════════════════════════════════════
    
    const validateForm = (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = 'var(--secondary)';
                }
            });

            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = 'var(--secondary)';
                }
            });
        });
    };

    validateForm('contact-form');

    // ═══════════════════════════════════════════════════════════════════
    // 16. PARALLAX EFFECT FOR HERO VIDEO
    // ═══════════════════════════════════════════════════════════════════
    
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroVideo.style.transform = `translate(-50%, -${50 + scrolled * 0.5}%)`;
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 17. BACK TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════════
    
    const createBackToTop = () => {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-gold);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            box-shadow: var(--shadow-md);
            z-index: 999;
            transition: var(--transition-fast);
        `;
        
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) translateY(-5px)';
            btn.style.boxShadow = 'var(--shadow-glow)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translateY(0)';
            btn.style.boxShadow = 'var(--shadow-md)';
        });
    };

    createBackToTop();

    // ═══════════════════════════════════════════════════════════════════
    // 18. LANGUAGE SWITCHER
    // ═══════════════════════════════════════════════════════════════════
    
    window.switchLanguage = function(lang) {
        const currentPage = window.location.pathname.split('/').pop();
        let newPage;

        if (lang === 'ar') {
            newPage = currentPage.replace('-en.html', '.html');
        } else {
            if (currentPage.includes('-en')) {
                newPage = currentPage;
            } else {
                newPage = currentPage.replace('.html', '-en.html');
            }
        }

        window.location.href = newPage;
    };

    // ═══════════════════════════════════════════════════════════════════
    // 19. TYPING EFFECT FOR HERO TEXT (OPTIONAL)
    // ═══════════════════════════════════════════════════════════════════
    
    const typeWriter = (element, text, speed = 100) => {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // ═══════════════════════════════════════════════════════════════════
    // 20. CONSOLE SIGNATURE
    // ═══════════════════════════════════════════════════════════════════
    
    console.log('%c🕌 Dar Al-Hidaya Academy', 'font-size: 24px; font-weight: bold; color: #c4a457;');
    console.log('%c✨ Developed by AAA Hub', 'font-size: 14px; color: #102136;');
    console.log('%c🌐 Visit: https://aaahub.online', 'font-size: 12px; color: #55606e;');

});

// ═══════════════════════════════════════════════════════════════════
// ADDITIONAL GLOBAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const lang = document.documentElement.lang || 'ar';
        const message = lang === 'ar' ? 'تم النسخ!' : 'Copied!';
        alert(message);
    });
}

// Share on social media
function shareOnSocial(platform, url, text) {
    let shareURL;
    
    switch(platform) {
        case 'facebook':
            shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareURL = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareURL = `https://wa.me/?text=${text} ${url}`;
            break;
        case 'telegram':
            shareURL = `https://t.me/share/url?url=${url}&text=${text}`;
            break;
        default:
            return;
    }
    
    window.open(shareURL, '_blank', 'width=600,height=400');
}

// Print current page
function printPage() {
    window.print();
}

// Refresh page
function refreshPage() {
    location.reload();
}

/* END OF SCRIPT */
