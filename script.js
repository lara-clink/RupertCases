// JavaScript for Rubet Atelier

// ===== SISTEMA DE ANIMAÇÕES AVANÇADO =====
class AnimationManager {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Verificar se o usuário prefere animações reduzidas
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        this.setupIntersectionObserver();
        this.handleInitialLoad();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observar todos os elementos com classes de animação
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        // Adicionar delay escalonado para elementos filhos
        const children = element.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('visible');
            }, index * 100);
        });

        // Animar o elemento principal
        element.classList.add('visible');
    }

    handleInitialLoad() {
        // Animar elementos que já estão visíveis na tela
        setTimeout(() => {
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    this.animateElement(el);
                    this.animatedElements.add(el);
                }
            });
        }, 100);
    }
}

// ===== NAVEGAÇÃO E SCROLL SUAVE =====
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Animar o ícone do menu
                const icon = mobileMenuBtn.querySelector('svg');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(90deg)';
                }
            });

            // Fechar menu ao clicar em um link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('svg');
                    icon.style.transform = 'rotate(0deg)';
                });
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    // Adicionar efeito de loading na navegação
                    anchor.style.opacity = '0.7';
                    setTimeout(() => {
                        anchor.style.opacity = '1';
                    }, 200);

                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===== GERENCIADOR DE FORMULÁRIOS =====
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupFormAnimations();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Animação de envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;

                // Simular envio
                setTimeout(() => {
                    this.showSuccessMessage();
                    contactForm.reset();
                    
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    setupFormAnimations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        message.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        
        document.body.appendChild(message);
        
        // Animar entrada
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }
}

// ===== ANIMAÇÕES ESPECIAIS =====
class SpecialAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimation();
        this.setupProductCardAnimations();
        this.setupParallaxEffect();
    }

    setupHeroAnimation() {
        const heroText = document.querySelector('#home .fade-in');
        if (heroText) {
            heroText.classList.add('hero-text');
        }
    }

    setupProductCardAnimations() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            // Adicionar delay escalonado
            card.style.transitionDelay = `${index * 0.1}s`;
            
            // Animação de hover mais suave
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.floating');
        parallaxElements.forEach(element => {
            element.classList.add('floating');
        });
    }
}

// ===== FUNÇÕES GLOBAIS =====
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se há suporte para IntersectionObserver
    if ('IntersectionObserver' in window) {
        new AnimationManager();
    } else {
        // Fallback para navegadores mais antigos
        function handleScrollAnimations() {
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 150) {
                    element.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('load', handleScrollAnimations);
    }
    
    new NavigationManager();
    new FormManager();
    new SpecialAnimations();
});

// ===== PERFORMANCE E OTIMIZAÇÃO =====
// Debounce para scroll events
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

// Otimizar scroll events
const optimizedScrollHandler = debounce(() => {
    // Código de scroll otimizado aqui se necessário
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);