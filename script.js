// Contador animado com IntersectionObserver
function animateCounter(el, target, isViews = false, isPercent = false) {
    let count = 0;
    const steps = 100; // suavidade
    const increment = target / steps;
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
            // Valor final
            if (isViews) {
                // Exibe compacto em milhões quando aplicável (ex.: 2M)
                if (target >= 1000000 && target % 1000000 === 0) {
                    el.textContent = `${Math.round(target / 1000000)}M`;
                } else {
                    el.textContent = target.toLocaleString('pt-BR');
                }
            } else if (isPercent) {
                el.textContent = `${target}%`;
            } else {
                el.textContent = target.toLocaleString('pt-BR');
            }
            return;
        }
        const value = Math.floor(count);
        // Durante a animação
        if (isViews) {
            el.textContent = value.toLocaleString('pt-BR');
        } else if (isPercent) {
            el.textContent = `${value}%`;
        } else {
            el.textContent = value.toLocaleString('pt-BR');
        }
    }, 20);
}

function initCountersObserver() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const section = counters[0].closest('section') || document;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            counters.forEach(el => {
                if (el.dataset.animated === 'true') return;
                const target = parseInt(el.getAttribute('data-target'));
                const label = el.nextElementSibling?.textContent || '';
                const isViews = /Visualiza/i.test(label);
                const isPercent = /% de Satisf/i.test(label);
                el.dataset.animated = 'true';
                animateCounter(el, target, isViews, isPercent);
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });
    observer.observe(section);
}

// Conect+ Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('header');
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('bg-white/95');
            header.classList.remove('bg-white/80');
        } else {
            header.classList.add('bg-white/80');
            header.classList.remove('bg-white/95');
        }
    }
    
    window.addEventListener('scroll', updateHeader);

    // Iniciar animação dos contadores quando visíveis
    initCountersObserver();
    
    // Portfolio slider
    const portfolioContainer = document.querySelector('.portfolio-container');
    const portfolioPrev = document.querySelector('.portfolio-prev');
    const portfolioNext = document.querySelector('.portfolio-next');
    
    if (portfolioContainer && portfolioPrev && portfolioNext) {
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.portfolio-item').length;
        const slidesToShow = window.innerWidth >= 768 ? 3 : 1;
        const maxSlide = Math.max(0, totalSlides - slidesToShow);
        
        function updateSlider() {
            const translateX = -(currentSlide * (100 / slidesToShow));
            portfolioContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update button states
            portfolioPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';
            portfolioNext.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
        }
        
        portfolioPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        portfolioNext.addEventListener('click', () => {
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        });
        
        // Auto-slide (optional)
        setInterval(() => {
            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateSlider();
        }, 5000);
        
        // Update slider on window resize
        window.addEventListener('resize', () => {
            const newSlidesToShow = window.innerWidth >= 768 ? 3 : 1;
            if (newSlidesToShow !== slidesToShow) {
                location.reload(); // Simple solution for responsive changes
            }
        });
        
        updateSlider();
    }
    

    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Animate counters when they come into view
                if (entry.target.querySelector('.counter')) {
                    console.log('🎯 Counter section visible, starting animation');
                    // Não fazer nada aqui - deixar o initCountersObserver() cuidar
                }
                
                // Animate service cards
                if (entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .blog-card');
    animatedElements.forEach(el => {
        el.style.transform = 'translateY(30px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Observe metrics section with correct selector
    const metricsSection = document.querySelector('.counter')?.closest('section');
    if (metricsSection) {
        console.log('✅ Metrics section found, observing for animations');
        observer.observe(metricsSection);
    } else {
        console.log('❌ Metrics section not found');
    }
    
    // Form now sends directly via WhatsApp - EmailJS removed for simplicity
    
    // Direct WhatsApp form handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Validate form
            if (!validateForm(this)) {
                showNotification('❌ Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Preparando...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const nome = formData.get('nome')?.trim();
            const email = formData.get('email')?.trim();
            const telefone = formData.get('telefone')?.trim();
            const servico = formData.get('servico');
            const mensagem = formData.get('mensagem')?.trim();
            
            // Map service values to readable text
            const servicoTexto = {
                'gestao-midias': 'Gestão de Mídias Sociais',
                'publicidade': 'Publicidade Digital',
                'criacao-conteudo': 'Criação de Conteúdo',
                'seo-sem': 'SEO & SEM',
                'influencer': 'Influencer Marketing',
                'consultoria': 'Consultoria Completa'
            }[servico] || servico;
            
            // Create WhatsApp message
            let whatsappMessage = `🎯 *Contato via Site - Conect+*\n\n`;
            whatsappMessage += `📛 *Nome:* ${nome}\n`;
            whatsappMessage += `📧 *E-mail:* ${email}\n`;
            if (telefone) {
                whatsappMessage += `📞 *Telefone:* ${telefone}\n`;
            }
            whatsappMessage += `🎯 *Serviço de Interesse:* ${servicoTexto}\n\n`;
            whatsappMessage += `💬 *Mensagem:*\n${mensagem}\n\n`;
            whatsappMessage += `_Mensagem enviada através do formulário do site da Conect+_`;
            
            // Create WhatsApp URL
            const whatsappNumber = '5551982649682';
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            console.log('📱 Opening WhatsApp with form data:', {
                nome,
                email,
                telefone,
                servico: servicoTexto,
                mensagem: mensagem.substring(0, 50) + '...'
            });
            
            // Simulate loading and then redirect
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success notification
                showNotification('✅ Redirecionando para WhatsApp...', 'success');
                
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'contact',
                        'event_label': 'contact_form_whatsapp_direct',
                        'value': 1
                    });
                }
                
                // Additional success notification after short delay
                setTimeout(() => {
                    showNotification('📱 Se o WhatsApp não abriu, verifique se pop-ups estão permitidos.', 'info');
                }, 2000);
                
            }, 1500); // 1.5 seconds loading time
        });

        // Fallback: clique no botão também dispara o envio via WhatsApp
        const enviarBtn = document.getElementById('enviar-mensagem');
        if (enviarBtn) {
            enviarBtn.addEventListener('click', (evt) => {
                // Se o listener de submit não rodar por algum motivo, montamos aqui
                // Validação rápida
                const requiredFields = contactForm.querySelectorAll('[required]');
                for (const field of requiredFields) {
                    if (!field.value.trim()) {
                        showNotification('❌ Por favor, preencha todos os campos obrigatórios.', 'error');
                        return;
                    }
                }

                const nome = document.getElementById('nome')?.value.trim() || '';
                const email = document.getElementById('email')?.value.trim() || '';
                const telefone = document.getElementById('telefone')?.value.trim() || '';
                const servicoVal = document.getElementById('servico')?.value || '';
                const mensagem = document.getElementById('mensagem')?.value.trim() || '';

                const servicoTexto = {
                    'gestao-midias': 'Gestão de Mídias Sociais',
                    'publicidade': 'Publicidade Digital',
                    'criacao-conteudo': 'Criação de Conteúdo',
                    'seo-sem': 'SEO & SEM',
                    'influencer': 'Influencer Marketing',
                    'consultoria': 'Consultoria Completa'
                }[servicoVal] || servicoVal;

                const texto = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nServiço de Interesse: ${servicoTexto}\nMensagem: ${mensagem}`;
                const url = `https://wa.me/5551982649682?text=${encodeURIComponent(texto)}`;

                window.open(url, '_blank');
            });
        }
    }
    

    
    // Form validation function
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
            
            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            }
        });
        
        return isValid;
    }
    
    // CTA buttons handling and WhatsApp tracking
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track WhatsApp clicks for analytics
            if (this.href && this.href.includes('wa.me')) {
                // Fire analytics event
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'event_category': 'contact',
                        'event_label': 'header_cta'
                    });
                }
                console.log('WhatsApp CTA clicked');
            } else if (!this.closest('form')) {
                e.preventDefault();
                
                // Scroll to contact section
                const contactSection = document.getElementById('contato');
                if (contactSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus on first form field
                    setTimeout(() => {
                        const firstInput = contactSection.querySelector('input');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 1000);
                }
            }
        });
    });
    
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 max-w-md`;
        
        let icon = '';
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                icon = '<i class="fas fa-check-circle mr-2"></i>';
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500', 'text-white');
                icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
                break;
            default:
                notification.classList.add('bg-blue-500', 'text-white');
                icon = '<i class="fas fa-info-circle mr-2"></i>';
        }
        
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-1">
                    ${icon}<span>${message}</span>
                </div>
                <button class="ml-4 text-white hover:text-gray-200 flex-shrink-0" onclick="this.closest('.custom-notification').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 6000);
        
        // Log notification for debugging
        console.log(`Notification [${type}]:`, message);
    }
    
    // Enhanced lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading state
                img.classList.add('image-loading');
                
                // Preload image
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.classList.remove('image-loading');
                    img.classList.add('responsive-image');
                };
                tempImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => {
        img.classList.add('responsive-image');
        imageObserver.observe(img);
    });
    
    // Preload critical images
    const heroImage = document.querySelector('img[alt*="Equipe da Conect+"]');
    if (heroImage) {
        heroImage.classList.add('responsive-image');
        // Add priority loading for hero image
        heroImage.setAttribute('fetchpriority', 'high');
    }
    
    // Parallax effect
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
    
    // Track scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You can use this to show a progress bar if needed
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Performance monitoring
    function reportWebVitals() {
        if (typeof PerformanceObserver !== 'undefined') {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    // Log performance metrics (replace with actual analytics)
                    console.log(entry.name, entry.value);
                }
            }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }
    
    // Initialize performance monitoring
    reportWebVitals();
    
    // Service worker registration (for PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(registrationError => console.log('SW registration failed'));
        });
    }
    
    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple effect to CTA buttons
    ctaButtons.forEach(addRippleEffect);
    
    // Initialize tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.textContent = this.dataset.tooltip;
            tooltip.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50';
            tooltip.id = 'tooltip';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('#tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Track all WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Fire analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': this.getAttribute('aria-label') || 'whatsapp_link'
                });
            }
            console.log('WhatsApp link clicked:', this.href);
        });
    });
    
    // Debug information
    console.log('🚀 Conect+ Website loaded successfully!');
    console.log('📱 Contact Form: Direct WhatsApp submission enabled');
    console.log('📞 WhatsApp Number: +55 51 98264-9682');
    
    // Test form accessibility
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        console.log('✅ Contact form found and configured for WhatsApp');
    } else {
        console.log('❌ Contact form not found');
    }
    
    // Debug para contadores
    console.log('🔍 Debug contadores:');
    const allCounters = document.querySelectorAll('.counter');
    console.log('📊 Contadores .counter encontrados:', allCounters.length);
    allCounters.forEach((counter, index) => {
        const target = counter.getAttribute('data-target');
        const text = counter.textContent;
        console.log(`Counter ${index + 1}: target=${target}, text="${text}"`);
    });
    
    // Fallback: forçar animação após um tempo se não acontecer
    setTimeout(() => {
        const stillZero = Array.from(allCounters).filter(c => c.textContent === '0');
        if (stillZero.length > 0) {
            console.log('🔄 Fallback: Forçando animação dos contadores');
            stillZero.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const label = counter.nextElementSibling?.textContent || '';
                const isViews = /Visualiza/i.test(label);
                const isPercent = /% de Satisf/i.test(label);
                counter.dataset.animated = 'true';
                animateCounter(counter, target, isViews, isPercent);
            });
        }
    }, 2000);
    
    // Função global para teste manual
    window.testCounters = function() {
        console.log('🧪 Teste manual dos contadores');
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.dataset.animated = 'false'; // Reset animation flag
            const target = parseInt(counter.getAttribute('data-target'));
            const label = counter.nextElementSibling?.textContent || '';
            const isViews = /Visualiza/i.test(label);
            const isPercent = /% de Satisf/i.test(label);
            counter.dataset.animated = 'true';
            animateCounter(counter, target, isViews, isPercent);
        });
    };
});

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
