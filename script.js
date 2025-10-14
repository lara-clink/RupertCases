// JavaScript for Rubet Cases

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Navigation link handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Product filtering
function filterProducts(category, event) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');
    if (!products.length) return;

    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-yellow-custom', 'text-black');
        btn.classList.add('bg-white', 'text-black');
    });

    if (event?.target) {
        event.target.classList.add('active', 'bg-yellow-custom', 'text-black');
        event.target.classList.remove('bg-white');
    }

    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Star rating functionality
document.querySelectorAll('.star-rating').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        const stars = document.querySelectorAll('.star-rating');
        stars.forEach((s, index) => {
            s.classList.toggle('text-yellow-custom', index < rating);
            s.classList.toggle('text-gray-300', index >= rating);
        });
    });
});

// Form submissions
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
        this.reset();
        document.querySelectorAll('.star-rating').forEach(star => {
            star.classList.remove('text-yellow-custom');
            star.classList.add('text-gray-300');
        });
    });
}

// Scroll animations
function handleScrollAnimations() {
    document.querySelectorAll('.fade-in').forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);
