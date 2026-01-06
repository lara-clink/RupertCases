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
                
                const linkWhatsApp = `https://web.whatsapp.com/send?phone=${numeroVendedor}&text=${encodeURIComponent(mensagem)}`;
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
        // Aplica animações via CSS/Classes, mas listeners podem ser adicionados aqui se necessário
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

// ===== SISTEMA DE MODAL DE PRODUTOS COMPLETO (COM CARROSSEL E ZOOM) =====
class ProductModalManager {
    constructor() {
        this.modal = null;
        this.products = {};
        this.selectedColor = null;
        this.selectedPrice = null;
        
        // Estado do Carrossel
        this.currentGallery = [];
        this.currentImageIndex = 0;

        this.init();
    }

    init() {
        this.modal = document.getElementById('productModal');
        this.imgElement = document.getElementById('modalProductImage');
        this.containerElement = document.getElementById('modalImageContainer');

        if (this.modal) {
            // Fechar ao clicar fora
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }

        // Event Listeners: Navegação do Carrossel
        const prevBtn = document.getElementById('modalPrevBtn');
        const nextBtn = document.getElementById('modalNextBtn');

        if (prevBtn) prevBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            this.prevImage(); 
        });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            this.nextImage(); 
        });

        // Event Listeners: Zoom
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

        // --- Configuração do Carrossel ---
        // Se existir "gallery" no JSON, usa ela. Caso contrário, usa a imagem principal.
        this.currentGallery = (product.gallery && product.gallery.length > 0) 
            ? product.gallery 
            : [product.image];
        
        this.currentImageIndex = 0;
        this.updateCarouselDisplay();
        // ---------------------------------

        // Preencher textos
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;

        // Gerar listas
        this.populatePrices(product.prices);
        this.populateColors(product.colors);
        this.populateSpecs(product.specs);

        // Selecionar primeira cor por padrão (se houver)
        const firstColorEl = document.querySelector('#modalProductColors .color-option');
        if (firstColorEl) this.selectColor(0, firstColorEl);

        // Mostrar Modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Bloqueia scroll da página
        
        // Pequena animação de entrada
        setTimeout(() => {
            const modalContent = this.modal.querySelector('.bg-white');
            if(modalContent) modalContent.classList.add('modal-animate-in');
        }, 10);
    }

    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Libera scroll
        
        const modalContent = this.modal.querySelector('.bg-white');
        if(modalContent) modalContent.classList.remove('modal-animate-in');
        
        this.resetZoom(); // Reseta zoom ao fechar
    }

    // --- Lógica do Carrossel ---
    updateCarouselDisplay() {
        if (!this.imgElement) return;

        // Atualiza src da imagem
        this.imgElement.src = this.currentGallery[this.currentImageIndex];
        
        // Controlar visibilidade das setas
        const prevBtn = document.getElementById('modalPrevBtn');
        const nextBtn = document.getElementById('modalNextBtn');
        const hasMultiple = this.currentGallery.length > 1;
        
        if (prevBtn) prevBtn.style.display = hasMultiple ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = hasMultiple ? 'block' : 'none';

        // Atualizar Bolinhas (Indicadores)
        const indicatorsContainer = document.getElementById('modalImageIndicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
            if (hasMultiple) {
                this.currentGallery.forEach((_, idx) => {
                    const dot = document.createElement('div');
                    // Estilo da bolinha: preta se ativa, cinza se inativa
                    dot.className = `w-2 h-2 rounded-full cursor-pointer transition-all ${idx === this.currentImageIndex ? 'bg-black w-4' : 'bg-gray-300 hover:bg-gray-400'}`;
                    dot.onclick = () => {
                        this.currentImageIndex = idx;
                        this.updateCarouselDisplay();
                    };
                    indicatorsContainer.appendChild(dot);
                });
            }
        }
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentGallery.length;
        this.updateCarouselDisplay();
    }

    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentGallery.length) % this.currentGallery.length;
        this.updateCarouselDisplay();
    }
    // ---------------------------

    // --- Lógica do Zoom ---
    handleZoom(e) {
        if (!this.imgElement) return;
        
        const rect = this.containerElement.getBoundingClientRect();
        
        // Posição do mouse dentro do container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Converter para porcentagem
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Define o ponto de origem da transformação para onde o mouse está
        this.imgElement.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        // Aplica escala (2x)
        this.imgElement.style.transform = 'scale(2.0)';
    }

    resetZoom() {
        if (!this.imgElement) return;
        this.imgElement.style.transform = 'scale(1)';
        // Resetar a origem depois da transição para evitar "pulo"
        setTimeout(() => {
             this.imgElement.style.transformOrigin = 'center center';
        }, 300);
    }
    // ----------------------

    // --- Métodos Auxiliares (Preços, Cores, Specs) ---
    populatePrices(prices) {
        const container = document.getElementById('modalProductPrices');
        if(!container) return;
        container.innerHTML = '';
        
        prices.forEach((price, index) => {
            const priceElement = document.createElement('div');
            // Classes CSS
            priceElement.className = `border border-gray-200 p-4 rounded cursor-pointer transition-all hover:border-black flex justify-between items-center ${index === 0 ? 'selected border-black bg-gray-50' : ''}`;
            
            priceElement.onclick = () => this.selectPrice(index, priceElement);
            priceElement.innerHTML = `
                <div>
                    <h4 class="font-semibold text-sm uppercase">${price.type}</h4>
                    <p class="text-xs text-gray-500">${price.description}</p>
                </div>
                <span class="font-bold text-lg">${price.price}</span>`;
            
            container.appendChild(priceElement);
            if (index === 0) this.selectedPrice = 0;
        });
    }

    populateColors(colors) {
        const container = document.getElementById('modalProductColors');
        if(!container) return;
        container.innerHTML = '';
        
        colors.forEach((color, index) => {
            const el = document.createElement('div');
            el.className = 'color-option w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:scale-110 transition-transform shadow-sm relative';
            el.style.backgroundColor = color.color;
            el.title = color.name;
            
            // Borda interna para preto
            if(color.color.toLowerCase() === '#000000' || color.color === '#000') {
                el.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.3)';
            }

            el.onclick = () => this.selectColor(index, el);
            container.appendChild(el);
        });
    }

    populateSpecs(specs) {
        const container = document.getElementById('modalProductSpecs');
        if(!container) return;
        container.innerHTML = '';
        
        specs.forEach(spec => {
            const specEl = document.createElement('div');
            specEl.className = 'flex justify-between border-b border-gray-100 py-1 last:border-0';
            specEl.innerHTML = `
                <span class="font-medium text-gray-800">${spec.label}</span>
                <span class="text-gray-500 text-right">${spec.value}</span>`;
            container.appendChild(specEl);
        });
    }

    selectPrice(index, element) {
        const container = document.getElementById('modalProductPrices');
        Array.from(container.children).forEach(el => {
            el.classList.remove('border-black', 'bg-gray-50');
            el.classList.add('border-gray-200');
        });
        
        element.classList.remove('border-gray-200');
        element.classList.add('border-black', 'bg-gray-50');
        this.selectedPrice = index;
    }

    selectColor(index, element) {
        // 1. Atualiza visual das bolinhas (borda preta na selecionada)
        const container = document.getElementById('modalProductColors');
        Array.from(container.children).forEach(el => {
            el.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
        });
        element.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        
        this.selectedColor = index;

        // 2. LÓGICA NOVA: Trocar as fotos do carrossel
        const colorData = this.product.colors[index];
        
        if (colorData && colorData.gallery && colorData.gallery.length > 0) {
            // Se a cor tem fotos específicas (como o Marrom), usa elas
            this.currentGallery = colorData.gallery;
        } else {
            // Se não tem (como o Preto), volta para as fotos originais do produto
            this.currentGallery = (this.product.gallery && this.product.gallery.length > 0) 
                ? this.product.gallery 
                : [this.product.image];
        }

        // 3. Reseta o carrossel para a primeira foto e atualiza a tela
        this.currentImageIndex = 0;
        this.updateCarouselDisplay();
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

        comprarPeloWhatsApp(produto);
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
  
    const linkWhatsApp = `https://web.whatsapp.com/send?phone=${numeroVendedor}&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, "_blank");
}

// ===== INICIALIZAÇÃO =====

// Instanciar o gerenciador do modal
const productModalManager = new ProductModalManager();

// Expor funções para o HTML
window.openProductModal = (id) => productModalManager.openModal(id);
window.closeProductModal = () => productModalManager.closeModal();
window.finalizePurchase = () => productModalManager.finalizePurchase();

// Inicialização principal
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        new AnimationManager();
    }
    
    new NavigationManager();
    new FormManager();
    new SpecialAnimations();
    
    loadProducts(); // Carrega o JSON
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

function renderNextProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid || !ALL_PRODUCTS.length) return;

    const pageSize = getGridColumnCount(); 
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
        
        // Simples delay para animação CSS
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
        
        // Passar produtos para o modal manager
        productModalManager.setProducts(ALL_PRODUCTS);

        const grid = document.getElementById('productGrid');
        if (grid) grid.innerHTML = '';
        renderedCount = 0;

        renderNextProducts();

        const btn = document.getElementById('showMoreBtn');
        if (btn) {
            btn.onclick = () => renderNextProducts();
            btn.style.display = renderedCount >= ALL_PRODUCTS.length ? 'none' : 'inline-flex';
        }
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
    }
}