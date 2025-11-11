// Checkout page functionality
document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    
    const steps = document.querySelectorAll('.step');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    // Load cart data
    let cart = JSON.parse(localStorage.getItem('furnicraft_cart') || '[]');

    // Initialize checkout
    loadOrderSummary();
    updateStepDisplay();

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            placeOrder();
        });
    }

    // Payment method change
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', updatePaymentForm);
    });

    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepDisplay();
                
                if (currentStep === 3) {
                    loadOrderReview();
                }
            }
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
        }
    }

    function updateStepDisplay() {
        // Update progress steps
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
            step.classList.toggle('completed', index + 1 < currentStep);
        });

        // Update checkout steps
        checkoutSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });

        // Update navigation buttons
        if (prevBtn) {
            prevBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        }

        if (nextBtn) {
            nextBtn.style.display = currentStep < totalSteps ? 'inline-block' : 'none';
        }

        if (placeOrderBtn) {
            placeOrderBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
        }

        // Update button text
        if (nextBtn) {
            nextBtn.textContent = currentStep === totalSteps - 1 ? 'Review Order' : 'Next';
        }
    }

    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step${currentStep}`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                field.focus();
                alert(`Please fill in the ${field.previousElementSibling.textContent} field.`);
                return false;
            }
        }

        // Additional validation for specific steps
        if (currentStep === 1) {
            const email = document.getElementById('email').value;
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return false;
            }
        }

        if (currentStep === 2) {
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            if (paymentMethod === 'creditCard') {
                const cardNumber = document.getElementById('cardNumber').value;
                const expiryDate = document.getElementById('expiryDate').value;
                const cvv = document.getElementById('cvv').value;
                
                if (!cardNumber || !expiryDate || !cvv) {
                    alert('Please fill in all credit card details.');
                    return false;
                }
            }
        }

        return true;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updatePaymentForm() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        const creditCardForm = document.getElementById('creditCardForm');
        
        if (creditCardForm) {
            creditCardForm.style.display = selectedMethod === 'creditCard' ? 'block' : 'none';
        }
    }

    function loadOrderSummary() {
        const summaryItems = document.getElementById('summaryItems');
        if (!summaryItems) return;

        if (cart.length === 0) {
            summaryItems.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        summaryItems.innerHTML = cart.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="item-price">${(item.price * item.quantity).toFixed(2)} SAR</div>
            </div>
        `).join('');

        updateSummaryTotals();
    }

    function loadOrderReview() {
        const orderItems = document.getElementById('orderItems');
        if (!orderItems) return;

        orderItems.innerHTML = cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="item-price">${(item.price * item.quantity).toFixed(2)} SAR</div>
            </div>
        `).join('');

        updateOrderTotals();
    }

    function updateSummaryTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 500 ? 0 : 50;
        const tax = subtotal * 0.15;
        const total = subtotal + shipping + tax;

        updateElement('summarySubtotal', `${subtotal.toFixed(2)} SAR`);
        updateElement('summaryShipping', shipping === 0 ? 'Free' : `${shipping.toFixed(2)} SAR`);
        updateElement('summaryTax', `${tax.toFixed(2)} SAR`);
        updateElement('summaryTotal', `${total.toFixed(2)} SAR`);
    }

    function updateOrderTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 500 ? 0 : 50;
        const tax = subtotal * 0.15;
        const total = subtotal + shipping + tax;

        updateElement('orderSubtotal', `${subtotal.toFixed(2)} SAR`);
        updateElement('orderShipping', shipping === 0 ? 'Free' : `${shipping.toFixed(2)} SAR`);
        updateElement('orderTax', `${tax.toFixed(2)} SAR`);
        updateElement('orderTotal', `${total.toFixed(2)} SAR`);
    }

    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function placeOrder() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Show loading state
        if (placeOrderBtn) {
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            placeOrderBtn.disabled = true;
        }

        // Simulate order processing
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('furnicraft_cart');
            
            // Move to completion step
            currentStep = 4;
            updateStepDisplay();
            
            // Reset button
            if (placeOrderBtn) {
                placeOrderBtn.innerHTML = 'Place Order';
                placeOrderBtn.disabled = false;
            }
        }, 2000);
    }

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
});
