// Cart page functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cartList');
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = document.querySelector('.cart-items');
    const itemCount = document.querySelector('.item-count');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('furnicraft_cart') || '[]');

    // Render cart
    renderCart();

    function renderCart() {
        if (cart.length === 0) {
            showEmptyCart();
            return;
        }

        hideEmptyCart();
        cartList.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
        updateSummary();
        setupCartItemListeners();
    }

    function createCartItemHTML(item) {
        return `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <div class="item-price">${item.price.toFixed(2)} SAR</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-product-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-product-id="${item.id}">
                    <button class="quantity-btn plus" data-product-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="item-total">
                    ${(item.price * item.quantity).toFixed(2)} SAR
                </div>
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    function setupCartItemListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const isPlus = e.target.classList.contains('plus');
                updateQuantity(productId, isPlus ? 1 : -1);
            });
        });

        // Quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const newQuantity = parseInt(e.target.value);
                setQuantity(productId, newQuantity);
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                removeItem(productId);
            });
        });
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItem(productId);
            } else {
                saveCart();
                renderCart();
                updateCartCount();
            }
        }
    }

    function setQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                removeItem(productId);
            } else {
                item.quantity = quantity;
                saveCart();
                renderCart();
                updateCartCount();
            }
        }
    }

    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
        updateCartCount();
    }

    function updateSummary() {
        const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingAmount = subtotalAmount > 500 ? 0 : 50;
        const taxAmount = subtotalAmount * 0.15; // 15% tax
        const totalAmount = subtotalAmount + shippingAmount + taxAmount;

        if (subtotal) subtotal.textContent = `${subtotalAmount.toFixed(2)} SAR`;
        if (shipping) shipping.textContent = shippingAmount === 0 ? 'Free' : `${shippingAmount.toFixed(2)} SAR`;
        if (tax) tax.textContent = `${taxAmount.toFixed(2)} SAR`;
        if (total) total.textContent = `${totalAmount.toFixed(2)} SAR`;

        // Update item count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (itemCount) itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }

    function saveCart() {
        localStorage.setItem('furnicraft_cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    function showEmptyCart() {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
    }

    function hideEmptyCart() {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    // Promo code functionality
    const promoInput = document.getElementById('promoInput');
    const applyPromo = document.getElementById('applyPromo');
    
    if (applyPromo) {
        applyPromo.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === 'SAVE10') {
                // Apply 10% discount
                alert('Promo code applied! 10% discount added.');
                // You can implement discount logic here
            } else if (code === 'FREESHIP') {
                // Free shipping
                alert('Promo code applied! Free shipping added.');
                // You can implement free shipping logic here
            } else {
                alert('Invalid promo code. Please try again.');
            }
        });
    }
});