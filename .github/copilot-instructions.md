# FurniCraft AI Coding Guidelines

## Project Overview
FurniCraft is a static e-commerce website for furniture built with vanilla HTML, CSS, and JavaScript. No frameworks, build tools, or backend - pure client-side implementation with localStorage for data persistence.

## Architecture Patterns
- **Multi-page static site**: Separate HTML files for each page (index.html, products.html, cart.html, etc.)
- **Shared resources**: Single CSS file (`css/style.css`) and main JS (`js/app.js`) loaded across pages
- **Page-specific logic**: Individual JS files per page (e.g., `js/products.js`, `js/cart.js`)
- **Data storage**: Products defined as hardcoded arrays in JS; cart/wishlist persisted in localStorage
- **No backend**: All functionality client-side, no API calls or server communication

## Key Conventions
- **CSS Variables**: Use CSS custom properties in `:root` for colors, shadows, transitions. Example:
  ```css
  :root {
      --primary-color: #2563eb;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  ```
- **JavaScript Classes**: Main app logic in ES6 classes (e.g., `FurniCraft` class in `js/app.js`)
- **Data Structures**: Products as objects with consistent properties (id, name, price, image, category, etc.)
- **Multilingual Support**: Text objects with 'en' and 'ar' keys for English/Arabic localization
- **Event Handling**: DOM manipulation with vanilla JS, no jQuery or frameworks

## Development Workflow
- **No build process**: Edit HTML/CSS/JS files directly, test by opening in browser
- **File organization**: Keep related functionality in dedicated JS files (products.js for catalog, cart.js for shopping cart)
- **Persistence**: Use `localStorage.setItem()` and `localStorage.getItem()` for cart/wishlist data
- **Styling**: All styles in single `css/style.css` with section comments for navigation

## Common Patterns
- **Cart operations**: Add/update/remove items via methods like `addToCart()`, `updateCartQuantity()` in app.js
- **Product display**: Loop through product arrays to generate HTML cards dynamically
- **Responsive design**: Mobile-first with CSS Grid/Flexbox, no external responsive frameworks
- **Notifications**: Use `showNotification()` method for user feedback (success/error messages)

## Key Files to Reference
- [js/app.js](js/app.js): Core application logic, cart management, event handlers
- [css/style.css](css/style.css): All styling with CSS variables and component classes
- [js/products.js](js/products.js): Product filtering, search, and display logic
- [index.html](index.html): Homepage structure and component examples

## Adding New Features
1. Define data structures in appropriate JS file
2. Add HTML structure to relevant page
3. Style with existing CSS variables and classes
4. Implement functionality in page-specific JS file
5. Test persistence with localStorage if needed

Avoid introducing frameworks, build tools, or backend dependencies - maintain the pure vanilla approach.