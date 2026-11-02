/**
 * Part 3 JavaScript Engine
 * Features: Department 3-Box Click Filtering, Strict Gender/Category/Price Filtering,
 * Reset State for Home/Logo, Instant Search with Thumbnails, Support Chatbot, Cart, Reviews.
 */

let cart = JSON.parse(localStorage.getItem('nike_cart')) || [];

// Enhanced Product Database with Accurate Category, Gender, and Price attributes
const productDatabase = [
    { name: "Nike Tshirt", category: "Apparel", gender: "Unisex", price: 699.00, priceStr: "R 699.00", image: "images/tshirt.png" },
    { name: "Nike Tech Fleece Hoodie", category: "Apparel", gender: "Men", price: 1699.00, priceStr: "R 1,699.00", image: "images/hoodie.png" },
    { name: "Nike Air Zoom Running Shoes", category: "Footwear", gender: "Men", price: 2199.00, priceStr: "R 2,199.00", image: "images/running.png" },
    { name: "Nike Utility Backpack", category: "Accessories", gender: "Unisex", price: 899.00, priceStr: "R 899.00", image: "images/bag.png" },
    { name: "Nike Club Cap", category: "Accessories", gender: "Unisex", price: 399.00, priceStr: "R 399.00", image: "images/cap.png" },
    { name: "Nike Dri-FIT Shorts", category: "Apparel", gender: "Men", price: 799.00, priceStr: "R 799.00", image: "images/shorts.png" },
    { name: "Nike Everyday Socks (3-Pack)", category: "Accessories", gender: "Unisex", price: 299.00, priceStr: "R 299.00", image: "images/socks.png" },
    { name: "Nike Windrunner Jacket", category: "Apparel", gender: "Women", price: 1999.00, priceStr: "R 1,999.00", image: "images/jacket.png" }
];

let productReviews = JSON.parse(localStorage.getItem('nike_reviews')) || {
    "Nike Tshirt": [
        { author: "Thabo M.", rating: "⭐⭐⭐⭐⭐", comment: "Fantastic quality and fast delivery!" },
        { author: "Sarah K.", rating: "⭐⭐⭐⭐☆", comment: "Great fit and true to size recommendations." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    setupSearchSuggestions();
    setupImageFallbacks();
    resetCatalogView();
});

// Instant Search with Thumbnails & Clearing Search Input
function setupSearchSuggestions() {
    const searchInputs = document.querySelectorAll('.search-container input');

    searchInputs.forEach(input => {
        let wrapper = input.closest('.search-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'search-wrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
        }

        let dropdown = wrapper.querySelector('.search-suggestions-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'search-suggestions-dropdown';
            wrapper.appendChild(dropdown);
        }

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            filterProductsGrid(query);

            if (query.length === 0) {
                dropdown.style.display = 'none';
                return;
            }

            const matches = productDatabase.filter(p => p.name.toLowerCase().includes(query));

            if (matches.length > 0) {
                dropdown.innerHTML = matches.map(m => `
                    <div class="suggestion-item" onclick="selectSuggestion('${m.name}')">
                        <img src="${m.image}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/35?text=Nike'">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--primary-color);">${m.name}</div>
                            <div style="color: var(--accent-color); font-size: 0.8rem; font-weight: bold;">${m.priceStr}</div>
                        </div>
                    </div>
                `).join('');
                dropdown.style.display = 'block';
            } else {
                dropdown.innerHTML = `<div class="suggestion-item" style="color: var(--gray-text); padding: 12px;">No products found</div>`;
                dropdown.style.display = 'block';
            }
        });

        document.addEventListener('click', (ev) => {
            if (!wrapper.contains(ev.target)) {
                dropdown.style.display = 'none';
            }
        });
    });
}

function selectSuggestion(productName) {
    const searchInputs = document.querySelectorAll('.search-container input');
    searchInputs.forEach(inp => inp.value = ''); 
    
    document.querySelectorAll('.search-suggestions-dropdown').forEach(d => d.style.display = 'none');
    
    resetCatalogView();
    filterProductsGrid(productName.toLowerCase());
    
    const prodSection = document.getElementById('products');
    if (prodSection) {
        prodSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function filterProductsGrid(query) {
    const items = document.querySelectorAll('.product-item');
    if (items.length === 0) return;

    items.forEach(item => {
        const name = item.getAttribute('data-name') ? item.getAttribute('data-name').toLowerCase() : '';
        if (name.includes(query) || query === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Filter by Department 3-Box Click
function filterByDepartment(categoryName) {
    resetCatalogView();
    const catSelect = document.getElementById('filter-category');
    if (catSelect) {
        catSelect.value = categoryName;
        applyFilters();
    }
    const prodSection = document.getElementById('products');
    if (prodSection) {
        prodSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// ACCURATE FILTERING (Category, Gender, Price)
// ==========================================
function applyFilters() {
    const selectedCategory = document.getElementById('filter-category') ? document.getElementById('filter-category').value : 'all';
    const selectedGender = document.getElementById('filter-gender') ? document.getElementById('filter-gender').value : 'all';
    const selectedPriceSort = document.getElementById('filter-price') ? document.getElementById('filter-price').value : 'all';

    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    let filteredProducts = [...productDatabase];

    // 1. Strict Category Filter
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }

    // 2. Strict Gender Filter (Displays exact match for Men, Women, or Unisex)
    if (selectedGender !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    // 3. Price Sorting
    if (selectedPriceSort === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Handle Empty Results State
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--gray-text); padding: 40px 0; font-size: 1.1rem;">No products match the selected criteria.</div>';
        return;
    }

    // Render Filtered Products
    grid.innerHTML = filteredProducts.map(p => {
        const dataName = p.name.toLowerCase();
        const sizeOptions = p.category === 'Footwear' 
            ? '<option>US 8</option><option>US 9</option><option>US 10</option>' 
            : p.category === 'Accessories' ? '<option>One Size</option>' : '<option>Small</option><option>Medium</option><option>Large</option>';
        const sizeId = 'size-' + p.name.replace(/\s+/g, '').toLowerCase();

        return `
            <article class="product-item" data-name="${dataName}">
                <div class="product-image-container"><img src="${p.image}" alt="${p.name}"></div>
                <h3>${p.name}</h3>
                <p class="product-price">${p.priceStr}</p>
                <div class="size-selector">
                    <label for="${sizeId}">Size:</label>
                    <select id="${sizeId}">${sizeOptions}</select>
                </div>
                <div class="card-actions">
                    <button class="cta-button secondary" onclick="openReviewsModal('${p.name}')">Reviews</button>
                    <button class="cta-button" onclick="addToCart('${p.name}', '${p.priceStr}', '${sizeId}', '${p.image}')">Add Cart</button>
                </div>
            </article>
        `;
    }).join('');
}

// Reset Catalog View & Return Home Fully Loaded
function resetCatalogView() {
    const catalogView = document.getElementById('catalog-view');
    const checkoutView = document.getElementById('checkout-view');
    const successView = document.getElementById('success-view');

    if (successView) successView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    if (catalogView) catalogView.style.display = 'block';

    document.querySelectorAll('.search-container input').forEach(inp => inp.value = '');
    
    const catSelect = document.getElementById('filter-category');
    const genSelect = document.getElementById('filter-gender');
    const priceSelect = document.getElementById('filter-price');
    if (catSelect) catSelect.value = 'all';
    if (genSelect) genSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';

    applyFilters();
}

// Chatbot Logic
function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    chatBody.style.display = chatBody.style.display === 'flex' ? 'none' : 'flex';
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msgContainer = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    msgContainer.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    setTimeout(() => {
        let reply = "I'm here to help! You can ask me about sizing, shipping, or returns.";
        const lower = text.toLowerCase();

        if (lower.includes('shipping') || lower.includes('delivery')) {
            reply = "We offer nationwide delivery across South Africa within 3 to 5 working days.";
        } else if (lower.includes('size') || lower.includes('fit')) {
            reply = "Check our size guide reference: US 7-12 / UK 6-11 / EU 40-46 located above the product catalog.";
        } else if (lower.includes('return') || lower.includes('refund')) {
            reply = "We have a 30-day hassle-free return policy for unused items in original packaging.";
        } else if (lower.includes('contact') || lower.includes('support')) {
            reply = "You can reach our support team directly via email at support@nike.com or call +27 11 123 4567.";
        }

        msgContainer.innerHTML += `<div class="bot-msg">${reply}</div>`;
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 500);
}

// Cart System
function addToCart(title, priceStr, sizeId, imageSrc) {
    const sizeSelect = document.getElementById(sizeId);
    const selectedSize = sizeSelect ? sizeSelect.value : 'Standard';
    const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));

    const existingIndex = cart.findIndex(item => item.title === title && item.size === selectedSize);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            title: title,
            price: numericPrice,
            priceStr: priceStr,
            size: selectedSize,
            image: imageSrc,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${title} (${selectedSize}) to Cart!`);
    toggleCartDrawer(true);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart.');
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('nike_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const badgeCount = document.getElementById('cart-badge-count');
    const cartItemsContainer = document.getElementById('cart-drawer-items');
    const cartTotalEl = document.getElementById('cart-drawer-total');

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (badgeCount) badgeCount.innerText = totalQuantity;

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color: var(--gray-text); padding: 40px 0;">Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/50?text=Nike'">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div style="font-size: 0.8rem; color: var(--gray-text);">Size: ${item.size} | Qty: ${item.quantity}</div>
                        <div class="cart-item-price">R ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            `).join('');
        }
    }

    if (cartTotalEl) {
        cartTotalEl.innerText = `R ${totalPrice.toFixed(2)}`;
    }
}

function toggleCartDrawer(openState) {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        if (openState !== undefined) {
            drawer.classList.toggle('open', openState);
        } else {
            drawer.classList.toggle('open');
        }
    }
}

function openCheckout(productName, price, sizeId) {
    const catalogView = document.getElementById('catalog-view');
    const checkoutView = document.getElementById('checkout-view');
    const successView = document.getElementById('success-view');

    if (catalogView) catalogView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'block';
    if (successView) successView.style.display = 'none';

    const sizeVal = sizeId && document.getElementById(sizeId) ? document.getElementById(sizeId).value : 'Standard';
    const titleEl = document.getElementById('selected-product-title');
    if (titleEl) {
        titleEl.innerText = productName ? `Purchasing: ${productName} (${price})` : 'Cart Checkout Summary';
    }

    window.scrollTo({ top: checkoutView.offsetTop - 100, behavior: 'smooth' });
}

function processOrder(event) {
    event.preventDefault();
    const randomId = 'NK-' + Math.floor(100000 + Math.random() * 900000);

    document.getElementById('generated-order-id').innerText = randomId;
    document.getElementById('checkout-view').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';
    
    clearCart();
}

// Reviews Management
let currentReviewProduct = '';

function openReviewsModal(productName) {
    currentReviewProduct = productName;
    const modal = document.getElementById('reviews-modal');
    const modalTitle = document.getElementById('modal-product-title');
    const listContainer = document.getElementById('reviews-list');

    if (modal && modalTitle && listContainer) {
        modalTitle.innerText = `${productName} Reviews`;
        renderReviewsList();
        modal.style.display = 'flex';
    }
}

function renderReviewsList() {
    const listContainer = document.getElementById('reviews-list');
    const reviews = productReviews[currentReviewProduct] || [];

    if (reviews.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--gray-text); font-size: 0.9rem;">No reviews yet. Be the first to review!</p>';
    } else {
        listContainer.innerHTML = reviews.map(r => `
            <div class="review-item">
                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                    <span>${r.author}</span>
                    <span>${r.rating}</span>
                </div>
                <p style="color: var(--gray-text); margin-top: 4px;">${r.comment}</p>
            </div>
        `).join('');
    }
}

function submitCustomerReview(event) {
    event.preventDefault();
    const authorName = document.getElementById('reviewer-name').value.trim();
    const ratingVal = document.getElementById('reviewer-rating').value;
    const commentText = document.getElementById('reviewer-comment').value.trim();

    if (!productReviews[currentReviewProduct]) {
        productReviews[currentReviewProduct] = [];
    }

    productReviews[currentReviewProduct].push({
        author: authorName,
        rating: ratingVal,
        comment: commentText
    });

    localStorage.setItem('nike_reviews', JSON.stringify(productReviews));
    renderReviewsList();
    event.target.reset();
    showToast('Review submitted successfully!');
}

function closeReviewsModal() {
    const modal = document.getElementById('reviews-modal');
    if (modal) modal.style.display = 'none';
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function setupImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x200/111111/FFFFFF?text=Nike+Gear';
        };
    });
}

function handleFormSubmit(event, successMessage) {
    event.preventDefault();
    showToast(successMessage);
    event.target.reset();
}
