// Products functionality for FurniCraft e-commerce site

// Product data structure
const productData = {
    categories: {
        'living-room': {
            name: { en: 'Living Room', ar: 'غرفة المعيشة' },
            description: { en: 'Comfortable sofas, chairs, and coffee tables', ar: 'أرائك مريحة وكراسي وطاولات قهوة' }
        },
        'bedroom': {
            name: { en: 'Bedroom', ar: 'غرفة النوم' },
            description: { en: 'Beds, dressers, and nightstands', ar: 'أسرة وخزائن ومناضد جانبية' }
        },
        'dining-room': {
            name: { en: 'Dining Room', ar: 'غرفة الطعام' },
            description: { en: 'Dining tables, chairs, and buffets', ar: 'طاولات طعام وكراسي وخزائن' }
        },
        'office': {
            name: { en: 'Office', ar: 'المكتب' },
            description: { en: 'Desks, chairs, and storage solutions', ar: 'مكاتب وكراسي وحلول تخزين' }
        },
        'outdoor': {
            name: { en: 'Outdoor', ar: 'الخارجية' },
            description: { en: 'Patio furniture and outdoor accessories', ar: 'أثاث الفناء وملحقات خارجية' }
        }
    },
    
    brands: [
        { id: 'ikea', name: { en: 'IKEA', ar: 'إيكيا' } },
        { id: 'west-elm', name: { en: 'West Elm', ar: 'ويست إلم' } },
        { id: 'crate-barrel', name: { en: 'Crate & Barrel', ar: 'كريت آند باريل' } },
        { id: 'pottery-barn', name: { en: 'Pottery Barn', ar: 'بوتري بارن' } },
        { id: 'wayfair', name: { en: 'Wayfair', ar: 'وايفير' } }
    ],
    
    materials: [
        { id: 'wood', name: { en: 'Wood', ar: 'خشب' } },
        { id: 'metal', name: { en: 'Metal', ar: 'معدن' } },
        { id: 'fabric', name: { en: 'Fabric', ar: 'قماش' } },
        { id: 'leather', name: { en: 'Leather', ar: 'جلد' } },
        { id: 'glass', name: { en: 'Glass', ar: 'زجاج' } },
        { id: 'plastic', name: { en: 'Plastic', ar: 'بلاستيك' } }
    ],
    
    colors: [
        { id: 'black', name: { en: 'Black', ar: 'أسود' }, hex: '#000000' },
        { id: 'white', name: { en: 'White', ar: 'أبيض' }, hex: '#FFFFFF' },
        { id: 'brown', name: { en: 'Brown', ar: 'بني' }, hex: '#8B4513' },
        { id: 'gray', name: { en: 'Gray', ar: 'رمادي' }, hex: '#808080' },
        { id: 'beige', name: { en: 'Beige', ar: 'بيج' }, hex: '#F5F5DC' },
        { id: 'blue', name: { en: 'Blue', ar: 'أزرق' }, hex: '#0000FF' },
        { id: 'red', name: { en: 'Red', ar: 'أحمر' }, hex: '#FF0000' },
        { id: 'green', name: { en: 'Green', ar: 'أخضر' }, hex: '#008000' }
    ]
};

// Product filtering and sorting
class ProductFilter {
    constructor() {
        this.filters = {
            category: null,
            priceRange: { min: 0, max: 10000 },
            brand: [],
            material: [],
            color: [],
            availability: 'all',
            rating: 0
        };
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        this.currentPage = 1;
        this.itemsPerPage = 12;
    }
    
    applyFilters(products) {
        return products.filter(product => {
            // Category filter
            if (this.filters.category && product.category !== this.filters.category) {
                return false;
            }
            
            // Price range filter
            if (product.price < this.filters.priceRange.min || product.price > this.filters.priceRange.max) {
                return false;
            }
            
            // Brand filter
            if (this.filters.brand.length > 0 && !this.filters.brand.includes(product.brand)) {
                return false;
            }
            
            // Material filter
            if (this.filters.material.length > 0 && !this.filters.material.some(material => 
                product.materials.includes(material))) {
                return false;
            }
            
            // Color filter
            if (this.filters.color.length > 0 && !this.filters.color.some(color => 
                product.colors.includes(color))) {
                return false;
            }
            
            // Availability filter
            if (this.filters.availability === 'in-stock' && !product.inStock) {
                return false;
            }
            if (this.filters.availability === 'sale' && !product.onSale) {
                return false;
            }
            
            // Rating filter
            if (this.filters.rating > 0 && product.rating < this.filters.rating) {
                return false;
            }
            
            return true;
        });
    }
    
    sortProducts(products) {
        return products.sort((a, b) => {
            let aValue, bValue;
            
            switch (this.sortBy) {
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'newest':
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }
            
            if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    paginateProducts(products) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return products.slice(startIndex, endIndex);
    }
}

// Product gallery functionality
class ProductGallery {
    constructor(container) {
        this.container = container;
        this.images = [];
        this.currentIndex = 0;
        this.zoomLevel = 1;
        this.isZoomed = false;
        
        this.init();
    }
    
    init() {
        this.loadImages();
        this.createGallery();
        this.bindEvents();
    }
    
    loadImages() {
        // In a real application, this would load from product data
        this.images = [
            { src: 'images/products/sofa-1.jpg', alt: 'Product view 1' },
            { src: 'images/products/sofa-2.jpg', alt: 'Product view 2' },
            { src: 'images/products/sofa-3.jpg', alt: 'Product view 3' },
            { src: 'images/products/sofa-4.jpg', alt: 'Product view 4' }
        ];
    }
    
    createGallery() {
        this.container.innerHTML = `
            <div class="product-gallery">
                <div class="gallery-main">
                    <div class="gallery-image-container">
                        <img id="main-image" src="${this.images[0].src}" alt="${this.images[0].alt}">
                        <div class="gallery-zoom-overlay"></div>
                    </div>
                    <div class="gallery-controls">
                        <button class="gallery-prev" aria-label="Previous image">‹</button>
                        <button class="gallery-next" aria-label="Next image">›</button>
                    </div>
                </div>
                <div class="gallery-thumbnails">
                    ${this.images.map((image, index) => `
                        <button class="thumbnail ${index === 0 ? 'active' : ''}" 
                                data-index="${index}" aria-label="View image ${index + 1}">
                            <img src="${image.src}" alt="${image.alt}">
                        </button>
                    `).join('')}
                </div>
                <div class="gallery-360">
                    <button class="btn-360" aria-label="360° view">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        360° View
                    </button>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        const mainImage = this.container.querySelector('#main-image');
        const prevBtn = this.container.querySelector('.gallery-prev');
        const nextBtn = this.container.querySelector('.gallery-next');
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        const zoomOverlay = this.container.querySelector('.gallery-zoom-overlay');
        const btn360 = this.container.querySelector('.btn-360');
        
        // Navigation
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());
        
        // Thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToImage(index));
        });
        
        // Zoom functionality
        mainImage.addEventListener('click', (e) => this.toggleZoom(e));
        mainImage.addEventListener('mousemove', (e) => this.handleZoom(e));
        mainImage.addEventListener('mouseleave', () => this.resetZoom());
        
        // 360° view
        btn360.addEventListener('click', () => this.open360View());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.container.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'Escape') this.resetZoom();
            }
        });
    }
    
    goToImage(index) {
        if (index < 0 || index >= this.images.length) return;
        
        this.currentIndex = index;
        const mainImage = this.container.querySelector('#main-image');
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        
        // Update main image
        mainImage.src = this.images[index].src;
        mainImage.alt = this.images[index].alt;
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Reset zoom
        this.resetZoom();
    }
    
    previousImage() {
        const prevIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
        this.goToImage(prevIndex);
    }
    
    nextImage() {
        const nextIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
        this.goToImage(nextIndex);
    }
    
    toggleZoom(e) {
        if (this.isZoomed) {
            this.resetZoom();
        } else {
            this.zoomImage(e);
        }
    }
    
    zoomImage(e) {
        const mainImage = this.container.querySelector('#main-image');
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.zoomLevel = 2;
        this.isZoomed = true;
        
        mainImage.style.transform = `scale(${this.zoomLevel})`;
        mainImage.style.transformOrigin = `${x}px ${y}px`;
        mainImage.style.cursor = 'zoom-out';
    }
    
    handleZoom(e) {
        if (!this.isZoomed) return;
        
        const mainImage = this.container.querySelector('#main-image');
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mainImage.style.transformOrigin = `${x}px ${y}px`;
    }
    
    resetZoom() {
        const mainImage = this.container.querySelector('#main-image');
        this.zoomLevel = 1;
        this.isZoomed = false;
        
        mainImage.style.transform = 'scale(1)';
        mainImage.style.transformOrigin = 'center';
        mainImage.style.cursor = 'zoom-in';
    }
    
    open360View() {
        // Placeholder for 360° view functionality
        alert('360° view feature would be implemented here');
    }
}

// Product variants functionality
class ProductVariants {
    constructor(container, product) {
        this.container = container;
        this.product = product;
        this.selectedVariants = {};
        
        this.init();
    }
    
    init() {
        this.createVariantSelectors();
        this.bindEvents();
    }
    
    createVariantSelectors() {
        const variants = this.product.variants || {};
        
        Object.keys(variants).forEach(variantType => {
            const variantOptions = variants[variantType];
            const variantContainer = document.createElement('div');
            variantContainer.className = 'variant-selector';
            variantContainer.innerHTML = `
                <label class="variant-label">${this.getVariantLabel(variantType)}</label>
                <div class="variant-options">
                    ${variantOptions.map(option => `
                        <button class="variant-option ${option.default ? 'selected' : ''}" 
                                data-variant="${variantType}" 
                                data-value="${option.value}"
                                style="${option.color ? `background-color: ${option.color}` : ''}">
                            ${option.label}
                        </button>
                    `).join('')}
                </div>
            `;
            
            this.container.appendChild(variantContainer);
        });
    }
    
    getVariantLabel(variantType) {
        const labels = {
            size: { en: 'Size', ar: 'المقاس' },
            color: { en: 'Color', ar: 'اللون' },
            material: { en: 'Material', ar: 'المادة' }
        };
        
        return labels[variantType]?.[currentLanguage] || variantType;
    }
    
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('variant-option')) {
                this.selectVariant(e.target);
            }
        });
    }
    
    selectVariant(option) {
        const variantType = option.dataset.variant;
        const value = option.dataset.value;
        
        // Update selected variants
        this.selectedVariants[variantType] = value;
        
        // Update UI
        const variantOptions = this.container.querySelectorAll(`[data-variant="${variantType}"]`);
        variantOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Update product price if variant affects price
        this.updatePrice();
        
        // Trigger variant change event
        document.dispatchEvent(new CustomEvent('variantChanged', {
            detail: { variantType, value, selectedVariants: this.selectedVariants }
        }));
    }
    
    updatePrice() {
        // Calculate price based on selected variants
        let basePrice = this.product.price;
        let variantPrice = 0;
        
        Object.values(this.selectedVariants).forEach(variant => {
            // In a real application, this would calculate price adjustments
            // based on variant pricing rules
        });
        
        const totalPrice = basePrice + variantPrice;
        const priceElement = document.querySelector('.product-price .current-price');
        if (priceElement) {
            priceElement.textContent = formatPrice(totalPrice);
        }
    }
}

// Infinite scroll functionality
class InfiniteScroll {
    constructor(container, loadMoreCallback) {
        this.container = container;
        this.loadMoreCallback = loadMoreCallback;
        this.isLoading = false;
        this.hasMore = true;
        
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoading && this.hasMore) {
                    this.loadMore();
                }
            });
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });
        
        this.createLoadMoreTrigger();
    }
    
    createLoadMoreTrigger() {
        this.trigger = document.createElement('div');
        this.trigger.className = 'infinite-scroll-trigger';
        this.trigger.innerHTML = '<div class="loading-spinner"></div>';
        this.container.appendChild(this.trigger);
        
        this.observer.observe(this.trigger);
    }
    
    async loadMore() {
        if (this.isLoading || !this.hasMore) return;
        
        this.isLoading = true;
        this.trigger.innerHTML = '<div class="loading-spinner">Loading more products...</div>';
        
        try {
            const newProducts = await this.loadMoreCallback();
            
            if (newProducts && newProducts.length > 0) {
                this.appendProducts(newProducts);
            } else {
                this.hasMore = false;
                this.trigger.innerHTML = '<p>No more products to load</p>';
            }
        } catch (error) {
            console.error('Error loading more products:', error);
            this.trigger.innerHTML = '<p>Error loading products. Please try again.</p>';
        } finally {
            this.isLoading = false;
        }
    }
    
    appendProducts(products) {
        const productsGrid = this.container.querySelector('.products-grid');
        if (productsGrid) {
            products.forEach(product => {
                const productElement = this.createProductElement(product);
                productsGrid.appendChild(productElement);
            });
        }
    }
    
    createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="action-icon wishlist-btn" data-product-id="${product.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        
        return productDiv;
    }
    
    reset() {
        this.hasMore = true;
        this.isLoading = false;
        this.trigger.innerHTML = '<div class="loading-spinner"></div>';
    }
}

// Product search functionality
class ProductSearch {
    constructor() {
        this.searchResults = [];
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.suggestions = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.handleSearchInput(e.target.value);
            }, 300));
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }
    }
    
    handleSearchInput(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        this.generateSuggestions(query);
        this.showSuggestions();
    }
    
    generateSuggestions(query) {
        // In a real application, this would search through product data
        const mockSuggestions = [
            'Modern Sofa',
            'Dining Table',
            'Office Chair',
            'Bed Frame',
            'Coffee Table'
        ];
        
        this.suggestions = mockSuggestions.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    showSuggestions() {
        // Implementation for showing search suggestions
        console.log('Suggestions:', this.suggestions);
    }
    
    hideSuggestions() {
        // Implementation for hiding search suggestions
    }
    
    async performSearch(query) {
        if (!query.trim()) return;
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Perform search
        try {
            const results = await this.searchProducts(query);
            this.displaySearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    }
    
    addToSearchHistory(query) {
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
    
    async searchProducts(query) {
        // In a real application, this would make an API call
        // For now, return mock results
        return [
            {
                id: 1,
                name: 'Modern Sofa Set',
                price: 1299.99,
                image: 'images/products/sofa-1.jpg',
                rating: 4.5,
                reviews: 128
            }
        ];
    }
    
    displaySearchResults(results) {
        // Implementation for displaying search results
        console.log('Search results:', results);
    }
}

// Export classes and functions
window.ProductFilter = ProductFilter;
window.ProductGallery = ProductGallery;
window.ProductVariants = ProductVariants;
window.InfiniteScroll = InfiniteScroll;
window.ProductSearch = ProductSearch;
