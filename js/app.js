// Complete JavaScript functionality for FurniCraft
class FurniCraft {
    constructor() {
        this.cart = this.loadCart();
        this.products = [];
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.initializeHeroSlider();
        this.loadFeaturedProducts();
    }

    loadProducts() {
        this.products = [
            {
                id: 1,
                name: 'Modern Sectional Sofa',
                price: 1299.99,
                originalPrice: 1599.99,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                category: 'living-room',
                brand: 'west-elm',
                rating: 4.5,
                reviews: 128,
                inStock: true,
                badge: 'Sale',
                description: 'Comfortable and stylish sectional sofa perfect for modern living rooms'
            },
            {
                id: 2,
                name: 'Leather Recliner Chair',
                price: 899.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
                category: 'living-room',
                brand: 'pottery-barn',
                rating: 4.7,
                reviews: 89,
                inStock: true,
                badge: null,
                description: 'Premium leather recliner with built-in footrest'
            },
            {
                id: 3,
                name: 'Glass Coffee Table',
                price: 599.99,
                originalPrice: 799.99,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
                category: 'living-room',
                brand: 'crate-barrel',
                rating: 4.3,
                reviews: 67,
                inStock: true,
                badge: 'New',
                description: 'Contemporary glass coffee table with metal legs'
            },
            {
                id: 4,
                name: 'King Size Bed Frame',
                price: 1599.99,
                originalPrice: 1999.99,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
                category: 'bedroom',
                brand: 'ikea',
                rating: 4.8,
                reviews: 156,
                inStock: true,
                badge: 'Sale',
                description: 'Solid wood king size bed frame with storage'
            },
            {
                id: 5,
                name: 'Dresser with Mirror',
                price: 799.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                category: 'bedroom',
                brand: 'wayfair',
                rating: 4.4,
                reviews: 92,
                inStock: true,
                badge: null,
                description: '6-drawer dresser with attached mirror'
            },
            {
                id: 6,
                name: 'Oak Dining Table',
                price: 1299.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
                category: 'dining-room',
                brand: 'west-elm',
                rating: 4.6,
                reviews: 134,
                inStock: true,
                badge: null,
                description: 'Solid oak dining table seats 6-8 people'
            },
            {
                id: 7,
                name: 'Executive Office Chair',
                price: 399.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
                category: 'office',
                brand: 'ikea',
                rating: 4.5,
                reviews: 203,
                inStock: true,
                badge: null,
                description: 'Ergonomic executive office chair with lumbar support'
            },
            {
                id: 8,
                name: 'Standing Desk',
                price: 899.99,
                originalPrice: 1199.99,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
                category: 'office',
                brand: 'wayfair',
                rating: 4.7,
                reviews: 145,
                inStock: true,
                badge: 'Sale',
                description: 'Electric height-adjustable standing desk'
            },
            {
                id: 9,
                name: 'Bookshelf 5S',
                price: 349.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                category: 'living-room',
                brand: 'crate-barrel',
                rating: 4.2,
                reviews: 112,
                inStock: true,
                badge: null,
                description: '5-shelf open bookshelf'
            },
            {
                id: 10,
                name: 'Luxury Armchair',
                price: 699.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                category: 'living-room',
                brand: 'pottery-barn',
                rating: 4.6,
                reviews: 98,
                inStock: true,
                badge: null,
                description: 'Elegant armchair with premium upholstery'
            },
            {
                id: 11,
                name: 'Queen Size Bed',
                price: 1199.99,
                originalPrice: null,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
                category: 'bedroom',
                brand: 'ikea',
                rating: 4.4,
                reviews: 87,
                inStock: true,
                badge: null,
                description: 'Modern queen size bed with headboard'
            },
            {
                id: 12,
                name: 'Dining Chair Set',
                price: 499.99,
                originalPrice: 699.99,
                currency: 'SAR',
                image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
                category: 'dining-room',
                brand: 'west-elm',
                rating: 4.3,
                reviews: 76,
                inStock: true,
                badge: 'Sale',
                description: 'Set of 4 modern dining chairs'
            }
        ];
    }

    setupEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Language switching
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e);
            });
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    initializeHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-play slider
        setInterval(nextSlide, 5000);
    }

    loadFeaturedProducts() {
        const featuredProductsContainer = document.getElementById('featuredProducts');
        if (!featuredProductsContainer) return;

        const featuredProducts = this.products.slice(0, 6);
        featuredProductsContainer.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
        
        this.setupProductCardListeners();
    }

    createProductCard(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.brand}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${product.price.toFixed(2)} ${product.currency || 'SAR'}</span>
                        ${product.originalPrice ? `<span class="original-price">${product.originalPrice.toFixed(2)} ${product.currency || 'SAR'}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn" data-product-id="${product.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    setupProductCardListeners() {
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            });
        });

        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.toggleWishlist(productId);
            });
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    saveCart() {
        localStorage.setItem('furnicraft_cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('furnicraft_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    toggleWishlist(productId) {
        let wishlist = this.loadWishlist();
        const index = wishlist.indexOf(productId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            this.showNotification('Removed from wishlist', 'info');
        } else {
            wishlist.push(productId);
            this.showNotification('Added to wishlist', 'success');
        }
        
        this.saveWishlist(wishlist);
        this.updateWishlistUI();
    }

    loadWishlist() {
        const savedWishlist = localStorage.getItem('furnicraft_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    }

    saveWishlist(wishlist) {
        localStorage.setItem('furnicraft_wishlist', JSON.stringify(wishlist));
    }

    updateWishlistUI() {
        const wishlist = this.loadWishlist();
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        
        wishlistBtns.forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            if (wishlist.includes(productId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    }

    handleSearch(query) {
        if (query.length < 2) return;
        
        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        localStorage.setItem('furnicraft_language', lang);
    }

    handleNewsletterSignup(event) {
        const email = event.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            setTimeout(() => {
                this.showNotification('Thank you for subscribing!', 'success');
                event.target.reset();
            }, 1000);
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        return colors[type] || '#17a2b8';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.furniCraft = new FurniCraft();
});
