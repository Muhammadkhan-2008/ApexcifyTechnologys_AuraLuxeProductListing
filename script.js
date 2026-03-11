// --- Product Data ---
const products = [
    {
        id: 1,
        title: "Sonic Eclipse",
        category: "electronics",
        price: 499,
        image: "assets/product1.png",
        owner: "Apexcify Designs",
        ownerLogo: "assets/logo.png",
        desc: "Next-generation wireless noise-cancelling headphones featuring graphene drivers.",
        specs: ["40h Battery", "Active Noise Cancelling", "Touch Controls", "Spatial Audio Support"]
    },
    {
        id: 2,
        title: "Nebula Chronos",
        category: "electronics",
        price: 1250,
        image: "assets/product2.png",
        owner: "AuraLuxe Labs",
        ownerLogo: "assets/logo.png",
        desc: "A mechanical masterpiece blending aerospace engineering with celestial aesthetics.",
        specs: ["Mechanical Movement", "Sapphire Glass", "50m Water Resistant", "Luminous Hands"]
    },
    {
        id: 3,
        title: "Vortex Hub",
        category: "electronics",
        price: 340,
        image: "assets/product3.png",
        owner: "Cortex Systems",
        ownerLogo: "assets/logo.png",
        desc: "The central nervous system for your smart home. Minimalist, powerful, and secure.",
        specs: ["AI Integration", "Zigbee / Matter", "OLED Display", "Voice Control"]
    },
    {
        id: 4,
        title: "Titan Carry",
        category: "fashion",
        price: 210,
        image: "assets/product4.png",
        owner: "Loom & Leather",
        ownerLogo: "assets/logo.png",
        desc: "Handcrafted minimalist wallet using sustainable, vegetable-tanned full-grain leather.",
        specs: ["RFID Blocking", "Up to 12 Cards", "Hidden Coin Pocket", "Slim Lifetime Build"]
    },
    {
        id: 5,
        title: "Prism Keys",
        category: "electronics",
        price: 280,
        image: "assets/product1.png", // Demo placeholder
        owner: "KeyFlow Pro",
        ownerLogo: "assets/logo.png",
        desc: "The ultimate wireless mechanical keyboard with high-fidelity switches and RGB aura.",
        specs: ["Hot-Swappable", "PBT Keycaps", "Tri-Mode Connectivity", "Aluminum Case"]
    },
    {
        id: 6,
        title: "Nova Lamp",
        category: "home",
        price: 155,
        image: "assets/product3.png", // Demo placeholder
        owner: "Lumina Labs",
        ownerLogo: "assets/logo.png",
        desc: "Circadian lighting that mimics natural sunlight to improve your focus and sleep.",
        specs: ["Smart Color Control", "Sunset Mode", "Eye-Ease Tech", "Wireless Charging Base"]
    },
    {
        id: 7,
        title: "Nomad Shield",
        category: "fashion",
        price: 195,
        image: "assets/product4.png", // Demo placeholder
        owner: "Atlas Gear",
        ownerLogo: "assets/logo.png",
        desc: "Weather-proof minimalist laptop sleeve with integrated accessory management.",
        specs: ["Waterproof Fabric", "Impact Shell", "Magnet Closure", "Slim Profile"]
    },
    {
        id: 8,
        title: "Echo One",
        category: "electronics",
        price: 399,
        image: "assets/product1.png", // Demo placeholder
        owner: "Sonic Bloom",
        ownerLogo: "assets/logo.png",
        desc: "Compact spatial audio speaker with room-filling sound and deep bass extension.",
        specs: ["360 Audio", "WiFi / AirPlay", "Multi-room Support", "Voice Assistant"]
    }
];

// --- DOM Elements ---
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const productGrid = document.getElementById('productGrid');
const filterTabs = document.querySelectorAll('.tab');

let currentSlide = 0;

// --- Carousel Logic ---
function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Auto-advance
let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}, 8000);

// Pause auto-slide on hover
const carouselSection = document.querySelector('.hero-carousel');
carouselSection.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselSection.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 8000);
});

// --- Product Grid Logic ---
function renderProducts(category = 'all') {
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;

        // Generate spec tags
        const specsHtml = product.specs.slice(0, 2).map(spec => `<span>${spec}</span>`).join('');

        card.innerHTML = `
            <div class="card-img">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-overlay">
                    <button class="btn-quick-view">Quick View</button>
                </div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <span class="card-category">${product.category}</span>
                    <div class="owner-tag">
                        <img src="${product.ownerLogo}" alt="${product.owner}">
                        <span>${product.owner}</span>
                    </div>
                </div>
                <h3 class="card-title">${product.title}</h3>
                <p class="card-desc">${product.desc}</p>
                <div class="card-specs">
                    ${specsHtml}
                </div>
                <div class="card-footer">
                    <div class="price-container">
                        <span class="currency">$</span>
                        <span class="amount">${product.price}</span>
                    </div>
                    <button class="btn-add-circle" aria-label="Add to cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// --- Filtering Logic ---
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.getAttribute('data-category');
        renderProducts(category);
    });
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Header transition
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});
