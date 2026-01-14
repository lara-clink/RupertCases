// JavaScript for Rubet Atelier

// ===== SISTEMA DE ANIMAÇÕES AVANÇADO =====
class AnimationManager {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Verificar se o utilizador prefere animações reduzidas
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
        // Animar elementos que já estão visíveis no ecrã
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

            // Fechar menu ao clicar num link
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
                
                const nome = document.getElementById('contact-name').value;
                const mensagemUsuario = document.getElementById('contact-message').value;

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
                
                const numeroVendedor = "5511947029458"; 
                let mensagem = `Olá! Meu nome é *${nome}*.\n\n${mensagemUsuario}`;
                
                // CORREÇÃO: api.whatsapp.com para funcionar no telemóvel
                const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroVendedor}&text=${encodeURIComponent(mensagem)}`;
                window.open(linkWhatsApp, "_blank");

                setTimeout(() => {
                    this.showSuccessMessage();
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 1000); 
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
        
        setTimeout(() => { message.style.transform = 'translateX(0)'; }, 100);
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => { document.body.removeChild(message); }, 300);
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
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.floating');
        parallaxElements.forEach(element => {
            element.classList.add('floating');
        });
    }
}

// ===== SISTEMA DE MODAL COM MINIATURAS E ZOOM =====
class ProductModalManager {
    constructor() {
        this.modal = null;
        this.products = {};
        this.selectedColor = null;
        this.selectedPrice = null;
        
        this.currentGallery = [];
        this.currentImageIndex = 0;

        this.init();
    }

    init() {
        this.modal = document.getElementById('productModal');
        this.imgElement = document.getElementById('modalProductImage');
        this.containerElement = document.getElementById('modalImageContainer');
        this.thumbnailsContainer = document.getElementById('modalThumbnails');

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }

        // Lógica do Zoom (Mouse Move)
        if (this.containerElement && this.imgElement) {
            this.containerElement.addEventListener('mousemove', (e) => this.handleZoom(e));
            this.containerElement.addEventListener('mouseleave', () => this.resetZoom());
        }
    }

    setProducts(productsArray) {
        this.products = {};
        productsArray.forEach(p => {
            this.products[p.id] = p;
        });
    }

    openModal(productId) {
        const product = this.products[productId];
        if (!product || !this.modal) return;

        this.product = product;
        this.selectedColor = null;
        this.selectedPrice = null;

        // Configuração inicial da galeria
        this.currentGallery = (product.gallery && product.gallery.length > 0) 
            ? product.gallery 
            : [product.image];
        
        this.currentImageIndex = 0;
        
        // Preencher dados
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;

        this.populatePrices(product.prices);
        this.populateColors(product.colors);
        this.populateSpecs(product.specs);

        // Selecionar primeira cor se houver
        const firstColorEl = document.querySelector('#modalProductColors .color-option');
        if (firstColorEl) this.selectColor(0, firstColorEl);
        
        // Atualiza a exibição (Imagem principal + Miniaturas)
        if (!firstColorEl) this.updateCarouselDisplay(); 

        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.resetZoom();
    }

    updateCarouselDisplay() {
        if (!this.imgElement || !this.thumbnailsContainer) return;

        // 1. Atualiza Imagem Principal
        const currentSrc = this.currentGallery[this.currentImageIndex];
        this.imgElement.src = currentSrc;

        // 2. Gera as Miniaturas
        this.thumbnailsContainer.innerHTML = '';
        
        if (this.currentGallery.length > 1) {
            this.currentGallery.forEach((src, index) => {
                const thumb = document.createElement('img');
                thumb.src = src;
                
                const isActive = index === this.currentImageIndex;
                let classes = "w-16 h-16 lg:w-20 lg:h-20 object-cover rounded cursor-pointer border-2 transition-all hover:opacity-100 ";
                classes += isActive ? "border-black opacity-100 shadow-md" : "border-transparent opacity-60 hover:border-gray-300";
                
                thumb.className = classes;
                
                thumb.onclick = () => {
                    this.currentImageIndex = index;
                    this.updateCarouselDisplay(); 
                };

                this.thumbnailsContainer.appendChild(thumb);
            });
        }
    }

    handleZoom(e) {
        if (!this.imgElement) return;
        
        const rect = this.containerElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        this.imgElement.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        this.imgElement.style.transform = 'scale(2.2)'; 
    }

    resetZoom() {
        if (!this.imgElement) return;
        this.imgElement.style.transform = 'scale(1)';
        setTimeout(() => {
             this.imgElement.style.transformOrigin = 'center center';
        }, 300);
    }

    populatePrices(prices) {
        const container = document.getElementById('modalProductPrices');
        if(!container) return;
        container.innerHTML = '';
        
        prices.forEach((price, index) => {
            const el = document.createElement('div');
            el.className = `border p-3 rounded cursor-pointer transition-all flex justify-between items-center ${index === 0 ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`;
            
            el.onclick = () => {
                Array.from(container.children).forEach(c => {
                    c.classList.remove('border-black', 'bg-gray-50');
                    c.classList.add('border-gray-200');
                });
                el.classList.remove('border-gray-200');
                el.classList.add('border-black', 'bg-gray-50');
                this.selectedPrice = index;
            };

            el.innerHTML = `
                <div>
                    <h4 class="font-bold text-sm uppercase">${price.type}</h4>
                    <p class="text-xs text-gray-500">${price.description}</p>
                </div>
                <span class="font-bold text-lg">${price.price}</span>`;
            
            container.appendChild(el);
            if (index === 0) this.selectedPrice = 0;
        });
    }

    populateColors(colors) {
        const container = document.getElementById('modalProductColors');
        if(!container) return;
        container.innerHTML = '';
        
        colors.forEach((color, index) => {
            const el = document.createElement('div');
            el.className = 'color-option w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:scale-110 transition-transform shadow-sm relative';
            el.style.backgroundColor = color.color;
            el.title = color.name;
            
            if(color.color.toLowerCase() === '#000000' || color.color === '#000') {
                el.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.3)';
            }

            el.onclick = () => this.selectColor(index, el);
            container.appendChild(el);
        });
    }

    selectColor(index, element) {
        const container = document.getElementById('modalProductColors');
        Array.from(container.children).forEach(el => {
            el.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
        });
        element.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        
        this.selectedColor = index;

        const colorData = this.product.colors[index];
        if (colorData && colorData.gallery && colorData.gallery.length > 0) {
            this.currentGallery = colorData.gallery;
        } else {
            this.currentGallery = (this.product.gallery && this.product.gallery.length > 0) 
                ? this.product.gallery 
                : [this.product.image];
        }

        this.currentImageIndex = 0;
        this.updateCarouselDisplay();
    }

    populateSpecs(specs) {
        const container = document.getElementById('modalProductSpecs');
        if(!container) return;
        container.innerHTML = '';
        specs.forEach(spec => {
            const div = document.createElement('div');
            div.className = 'flex justify-between border-b border-gray-100 py-1 last:border-0';
            div.innerHTML = `<span class="font-medium text-gray-800">${spec.label}</span><span class="text-gray-500">${spec.value}</span>`;
            container.appendChild(div);
        });
    }

    finalizePurchase() {
        if (!this.product) return;
        const produto = {
            nome: this.product.name,
            preco: (this.selectedPrice !== null && this.product.prices[this.selectedPrice]) ? {
                tipo: this.product.prices[this.selectedPrice].type,
                valor: this.product.prices[this.selectedPrice].price
            } : null,
            cor: (this.selectedColor !== null && this.product.colors[this.selectedColor]) ? {
                nome: this.product.colors[this.selectedColor].name
            } : null
        };
        
        if (typeof comprarPeloWhatsApp === 'function') {
            comprarPeloWhatsApp(produto);
        }
        this.closeModal();
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

function comprarPeloWhatsApp(produto) {
    const numeroVendedor = "5511947029458"; 
  
    let mensagem = `Olá! Tenho interesse no produto *${produto.nome}*`;
  
    if (produto.preco) {
      mensagem += `\n• Versão: ${produto.preco.tipo} (${produto.preco.valor})`;
    }
    if (produto.cor) {
      mensagem += `\n• Cor: ${produto.cor.nome}`;
    }
    if (produto.frete) {
      mensagem += `\n• Frete: ${produto.frete}`;
    }
  
    mensagem += `\nGostaria de saber mais detalhes e finalizar a compra.`;
  
    // CORREÇÃO: api.whatsapp.com para funcionar no telemóvel
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroVendedor}&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, "_blank");
}

// ===== INICIALIZAÇÃO =====

const productModalManager = new ProductModalManager();

window.openProductModal = (id) => productModalManager.openModal(id);
window.closeProductModal = () => productModalManager.closeModal();
window.finalizePurchase = () => productModalManager.finalizePurchase();

document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        new AnimationManager();
    }
    
    new NavigationManager();
    new FormManager();
    new SpecialAnimations();
    
    loadProducts(); 
});


// ===== CARREGAMENTO DE PRODUTOS (JSON) =====
let ALL_PRODUCTS = [];
let renderedCount = 0;

function getGridColumnCount() {
    const grid = document.getElementById('productGrid');
    if (!grid) return 1;
    const cols = getComputedStyle(grid).getPropertyValue('grid-template-columns') || '';
    const count = cols.split(' ').filter(Boolean).length || 1;
    return Math.max(1, count);
}

function renderNextProducts(initialLoad = false) {
    const grid = document.getElementById('productGrid');
    if (!grid || !ALL_PRODUCTS.length) return;

    let pageSize;
    if (initialLoad) {
        pageSize = 3;
    } else {
        pageSize = ALL_PRODUCTS.length - renderedCount;
    }
    
    const slice = ALL_PRODUCTS.slice(renderedCount, renderedCount + pageSize);
    slice.forEach(p => {
        const card = document.createElement('div');
        card.className = "product-card bg-white rounded-none shadow-lg overflow-hidden cursor-pointer scale-in";
        card.onclick = () => window.openProductModal(p.id);

        card.innerHTML = `
            <div class="relative">
                <img src="${p.image}" alt="${p.name}" class="product-image w-full aspect-square object-cover object-center">
                
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div class="text-center text-white">
                        <p class="text-lg font-semibold tracking-wide">Ver Detalhes</p>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 class="text-xl font-semibold text-white tracking-wide">${p.name}</h3>
                </div>
            </div>`;

        grid.appendChild(card);
        
        setTimeout(() => card.classList.add('visible'), 50);
    });

    renderedCount += slice.length;
    const btn = document.getElementById('showMoreBtn');
    if (btn) btn.style.display = renderedCount >= ALL_PRODUCTS.length ? 'none' : 'inline-flex';
}

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        ALL_PRODUCTS = Array.isArray(products) ? products : [];
        
        productModalManager.setProducts(ALL_PRODUCTS);

        const grid = document.getElementById('productGrid');
        if (grid) grid.innerHTML = '';
        renderedCount = 0;

        renderNextProducts(true);

        const btn = document.getElementById('showMoreBtn');
        if (btn) {
            btn.onclick = () => renderNextProducts();
            btn.style.display = renderedCount >= ALL_PRODUCTS.length ? 'none' : 'inline-flex';
        }
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
    }
}