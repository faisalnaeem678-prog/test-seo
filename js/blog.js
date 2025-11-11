// Blog page functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchWidget = document.querySelector('.search-widget');
    const categoryList = document.querySelectorAll('.category-list a');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const newsletterWidget = document.querySelector('.newsletter-widget');

    // Search functionality
    if (searchWidget) {
        const searchInput = searchWidget.querySelector('input');
        const searchBtn = searchWidget.querySelector('button');
        
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    // Category filtering
    categoryList.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterByCategory(link.textContent.trim());
        });
    });

    // Pagination
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled && !btn.classList.contains('active')) {
                handlePagination(btn);
            }
        });
    });

    // Newsletter subscription
    if (newsletterWidget) {
        newsletterWidget.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNewsletterSubscription();
        });
    }

    function performSearch(query) {
        if (!query.trim()) return;
        
        // Simulate search
        console.log('Searching for:', query);
        
        // In a real application, this would make an API call
        showSearchResults(query);
    }

    function filterByCategory(category) {
        // Remove active class from all category links
        categoryList.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked category
        event.target.classList.add('active');
        
        // Filter blog posts by category
        console.log('Filtering by category:', category);
        
        // In a real application, this would filter the blog posts
        showFilteredPosts(category);
    }

    function handlePagination(btn) {
        // Remove active class from all pagination buttons
        paginationBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Load new page
        const pageNumber = btn.textContent;
        console.log('Loading page:', pageNumber);
        
        // In a real application, this would load the new page content
        loadPageContent(pageNumber);
    }

    function handleNewsletterSubscription() {
        const email = newsletterWidget.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = newsletterWidget.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterWidget.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    function showSearchResults(query) {
        // This would show filtered results based on search query
        console.log('Showing search results for:', query);
    }

    function showFilteredPosts(category) {
        // This would show filtered blog posts
        console.log('Showing filtered posts for category:', category);
    }

    function loadPageContent(pageNumber) {
        // This would load new page content
        console.log('Loading page content for page:', pageNumber);
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
