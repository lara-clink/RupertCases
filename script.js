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

// ===== SISTEMA DE MODAL DE PRODUTOS =====
class ProductModalManager {
    constructor() {
        this.modal = null;
        this.products = this.initializeProducts();
        this.selectedColor = null;
        this.selectedPrice = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('productModal');
        
        // Fechar modal ao clicar no fundo
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }

    initializeProducts() {
        return {
            'guitar-rigid': {
                name: 'Case Rígido Guitarra',
                description: 'Proteção máxima com interior em veludo e fechos de segurança. Ideal para guitarristas que valorizam a proteção completa do seu instrumento.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Rígido+Guitarra',
                prices: [
                    { type: 'Básico', price: 'R$ 299,90', description: 'Fibra de vidro padrão, veludo interno' },
                    { type: 'Premium', price: 'R$ 399,90', description: 'Fibra de vidro reforçada, veludo premium' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Marrom', color: '#8B4513' },
                    { name: 'Azul', color: '#0000FF' }
                ],
                specs: [
                    { label: 'Material', value: 'Fibra de vidro' },
                    { label: 'Interior', value: 'Veludo de alta densidade' },
                    { label: 'Fechos', value: 'Metal usinado' },
                    { label: 'Dimensões', value: '110 x 40 x 15 cm' },
                    { label: 'Peso', value: '3,2 kg' }
                ]
            },
            'guitar-semi': {
                name: 'Case Semi-Rígido Guitarra',
                description: 'Leveza e proteção para o dia a dia. Perfeito para músicos que precisam de praticidade sem abrir mão da proteção.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Semi-Rígido+Guitarra',
                prices: [
                    { type: 'Padrão', price: 'R$ 189,90', description: 'Proteção adequada para uso diário' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Vermelho', color: '#FF0000' },
                    { name: 'Verde', color: '#008000' }
                ],
                specs: [
                    { label: 'Material', value: 'ABS moldado' },
                    { label: 'Interior', value: 'Espuma customizada' },
                    { label: 'Fechos', value: 'Plástico reforçado' },
                    { label: 'Dimensões', value: '110 x 40 x 15 cm' },
                    { label: 'Peso', value: '2,1 kg' }
                ]
            },
            'bass-rigid': {
                name: 'Case Rígido Baixo',
                description: 'Projetado especificamente para contrabaixos de 4 e 5 cordas. Proteção superior para baixistas profissionais.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Rígido+Baixo',
                prices: [
                    { type: '4 Cordas', price: 'R$ 349,90', description: 'Modelo para baixo de 4 cordas' },
                    { type: '5 Cordas', price: 'R$ 379,90', description: 'Modelo para baixo de 5 cordas' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Azul', color: '#0000FF' },
                    { name: 'Prata', color: '#C0C0C0' }
                ],
                specs: [
                    { label: 'Material', value: 'Fibra de vidro' },
                    { label: 'Interior', value: 'Veludo premium' },
                    { label: 'Fechos', value: 'Metal cromado' },
                    { label: 'Dimensões', value: '120 x 45 x 18 cm' },
                    { label: 'Peso', value: '4,1 kg' }
                ]
            },
            'violin-premium': {
                name: 'Case Premium Violino',
                description: 'Elegância e proteção para instrumentos clássicos. Design refinado que combina com a sofisticação do violino.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Premium+Violino',
                prices: [
                    { type: 'Standard', price: 'R$ 459,90', description: 'Proteção completa para violinos' },
                    { type: 'Master', price: 'R$ 599,90', description: 'Versão premium com acabamento especial' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Marrom', color: '#8B4513' },
                    { name: 'Dourado', color: '#FFD700' }
                ],
                specs: [
                    { label: 'Material', value: 'Madeira e fibra' },
                    { label: 'Interior', value: 'Veludo aveludado' },
                    { label: 'Fechos', value: 'Latão polido' },
                    { label: 'Dimensões', value: '75 x 25 x 12 cm' },
                    { label: 'Peso', value: '2,8 kg' }
                ]
            },
            'trumpet': {
                name: 'Case Trompete',
                description: 'Proteção especializada para instrumentos de sopro. Compartimentos organizados para todos os acessórios.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Trompete',
                prices: [
                    { type: 'Standard', price: 'R$ 279,90', description: 'Proteção completa para trompete' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Azul', color: '#0000FF' },
                    { name: 'Branco', color: '#FFFFFF' }
                ],
                specs: [
                    { label: 'Material', value: 'ABS moldado' },
                    { label: 'Interior', value: 'Espuma customizada' },
                    { label: 'Compartimentos', value: 'Para bocal e acessórios' },
                    { label: 'Dimensões', value: '60 x 35 x 20 cm' },
                    { label: 'Peso', value: '1,8 kg' }
                ]
            },
            'saxophone': {
                name: 'Case Saxofone',
                description: 'Design ergonômico com compartimentos específicos para saxofone e todos os seus acessórios essenciais.',
                image: 'https://placehold.co/600x400/000000/FFFFFF?text=Case+Saxofone',
                prices: [
                    { type: 'Alto', price: 'R$ 399,90', description: 'Para saxofone alto' },
                    { type: 'Tenor', price: 'R$ 449,90', description: 'Para saxofone tenor' }
                ],
                colors: [
                    { name: 'Preto', color: '#000000' },
                    { name: 'Marrom', color: '#8B4513' },
                    { name: 'Vermelho', color: '#FF0000' }
                ],
                specs: [
                    { label: 'Material', value: 'Fibra de vidro' },
                    { label: 'Interior', value: 'Veludo customizado' },
                    { label: 'Compartimentos', value: 'Para bocal, palhetas e acessórios' },
                    { label: 'Dimensões', value: '75 x 40 x 25 cm' },
                    { label: 'Peso', value: '3,5 kg' }
                ]
            }
        };
    }

    openModal(productId) {
        const product = this.products[productId];
        if (!product || !this.modal) return;

        // Reset seleções
        this.selectedColor = null;
        this.selectedPrice = null;

        // Preencher dados do produto
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductImage').alt = product.name;

        // Preencher preços
        this.populatePrices(product.prices);

        // Preencher cores
        this.populateColors(product.colors);

        // Preencher especificações
        this.populateSpecs(product.specs);

        // Mostrar modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Animar entrada
        setTimeout(() => {
            this.modal.querySelector('.bg-white').classList.add('modal-animate-in');
        }, 10);
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.modal.querySelector('.bg-white').classList.remove('modal-animate-in');
    }

    populatePrices(prices) {
        const container = document.getElementById('modalProductPrices');
        container.innerHTML = '';

        prices.forEach((price, index) => {
            const priceElement = document.createElement('div');
            priceElement.className = 'price-option';
            priceElement.onclick = () => this.selectPrice(index, priceElement);
            
            priceElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-semibold text-lg">${price.type}</h4>
                        <p class="text-gray-600 text-sm">${price.description}</p>
                    </div>
                    <span class="text-2xl font-bold text-black">${price.price}</span>
                </div>
            `;
            
            container.appendChild(priceElement);
        });
    }

    populateColors(colors) {
        const container = document.getElementById('modalProductColors');
        container.innerHTML = '';

        colors.forEach((color, index) => {
            const colorElement = document.createElement('div');
            colorElement.className = 'color-option';
            colorElement.style.backgroundColor = color.color;
            colorElement.title = color.name;
            colorElement.onclick = () => this.selectColor(index, colorElement);
            
            container.appendChild(colorElement);
        });
    }

    populateSpecs(specs) {
        const container = document.getElementById('modalProductSpecs');
        container.innerHTML = '';

        specs.forEach(spec => {
            const specElement = document.createElement('div');
            specElement.className = 'spec-item';
            specElement.innerHTML = `
                <span class="font-medium">${spec.label}</span>
                <span class="text-gray-600">${spec.value}</span>
            `;
            
            container.appendChild(specElement);
        });
    }

    selectPrice(index, element) {
        // Remover seleção anterior
        document.querySelectorAll('.price-option').forEach(el => el.classList.remove('selected'));
        
        // Selecionar novo preço
        element.classList.add('selected');
        this.selectedPrice = index;
    }

    selectColor(index, element) {
        // Remover seleção anterior
        document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
        
        // Selecionar nova cor
        element.classList.add('selected');
        this.selectedColor = index;
    }

    finalizePurchase() {
        if (this.selectedPrice === null) {
            alert('Por favor, selecione uma opção de preço.');
            return;
        }

        // Aqui você pode integrar com um sistema de pagamento
        const productName = document.getElementById('modalProductName').textContent;
        alert(`Compra do ${productName} iniciada! Você será redirecionado para o checkout.`);
        
        this.closeModal();
    }
}

// Instanciar o gerenciador de modal
const productModalManager = new ProductModalManager();

// Funções globais para o HTML
function openProductModal(productId) {
    productModalManager.openModal(productId);
}

function closeProductModal() {
    productModalManager.closeModal();
}

function finalizePurchase() {
    productModalManager.finalizePurchase();
}