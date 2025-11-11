// Account page functionality
document.addEventListener('DOMContentLoaded', () => {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    const dashboardNav = document.querySelectorAll('.nav-item');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    const logoutBtn = document.getElementById('logoutBtn');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showDashboard();
    } else {
        showAuthForms();
    }

    // Auth tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchAuthTab(tab.dataset.tab);
        });
    });

    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Dashboard navigation
    dashboardNav.forEach(navItem => {
        navItem.addEventListener('click', (e) => {
            if (navItem.id !== 'logoutBtn') {
                e.preventDefault();
                switchDashboardSection(navItem.dataset.section);
            }
        });
    });

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Password toggle functionality
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            togglePasswordVisibility(toggle);
        });
    });

    // Password strength indicator
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', updatePasswordStrength);
    }

    function switchAuthTab(tabName) {
        // Update tab active state
        authTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update form visibility
        authForms.forEach(form => {
            form.classList.toggle('active', form.id === tabName + 'Form');
        });
    }

    function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;

        // Simulate login
        setTimeout(() => {
            // Simulate successful login
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify({
                name: 'Ahmed Al-Rashid',
                email: data.email,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            }));

            showNotification('Login successful!', 'success');
            showDashboard();
        }, 1500);
    }

    function handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);

        // Validate passwords match
        if (data.password !== data.confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;

        // Simulate registration
        setTimeout(() => {
            // Simulate successful registration
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify({
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            }));

            showNotification('Account created successfully!', 'success');
            showDashboard();
        }, 2000);
    }

    function switchDashboardSection(sectionName) {
        // Update nav active state
        dashboardNav.forEach(nav => {
            nav.classList.toggle('active', nav.dataset.section === sectionName);
        });

        // Update section visibility
        dashboardSections.forEach(section => {
            section.classList.toggle('active', section.id === sectionName + 'Section');
        });
    }

    function handleLogout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
        showNotification('Logged out successfully', 'success');
        showAuthForms();
    }

    function showDashboard() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'flex';
        
        // Load user data
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.name) {
            document.getElementById('userName').textContent = userData.name;
        }
        if (userData.email) {
            document.getElementById('userEmail').textContent = userData.email;
        }
        if (userData.avatar) {
            document.getElementById('userAvatar').src = userData.avatar;
        }
    }

    function showAuthForms() {
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('dashboardContainer').style.display = 'none';
    }

    function togglePasswordVisibility(toggle) {
        const input = toggle.parentElement.querySelector('input');
        const icon = toggle.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    function updatePasswordStrength() {
        const password = registerPassword.value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        let strength = 0;
        let strengthLabel = '';
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        switch (strength) {
            case 0:
            case 1:
                strengthLabel = 'Very Weak';
                strengthBar.style.width = '20%';
                strengthBar.style.backgroundColor = '#dc2626';
                break;
            case 2:
                strengthLabel = 'Weak';
                strengthBar.style.width = '40%';
                strengthBar.style.backgroundColor = '#f59e0b';
                break;
            case 3:
                strengthLabel = 'Fair';
                strengthBar.style.width = '60%';
                strengthBar.style.backgroundColor = '#eab308';
                break;
            case 4:
                strengthLabel = 'Good';
                strengthBar.style.width = '80%';
                strengthBar.style.backgroundColor = '#10b981';
                break;
            case 5:
                strengthLabel = 'Strong';
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = '#059669';
                break;
        }
        
        strengthText.textContent = strengthLabel;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
});
