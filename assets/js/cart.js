// // Cart Management System
// let cartData = {
//     items: [
//         {
//             id: 1,
//             name: "Premium Wireless Bluetooth Headphones",
//             price: 22.80,
//             originalPrice: 25.50,
//             quantity: 100,
//             minQuantity: 100,
//             color: "Black",
//             supplier: "AudioTech Manufacturing Co.",
//             sku: "WBH-2024-001",
//             image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
//             rating: 4.8,
//             freeShipping: true
//         },
//         {
//             id: 2,
//             name: "Portable Bluetooth Speaker",
//             price: 15.99,
//             originalPrice: 18.99,
//             quantity: 150,
//             minQuantity: 100,
//             color: "Blue",
//             supplier: "SoundTech Electronics",
//             sku: "PBS-2024-002",
//             image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=300",
//             rating: 4.5,
//             freeShipping: true
//         },
//         {
//             id: 3,
//             name: "Smart Fitness Watch",
//             price: 45.99,
//             originalPrice: 52.99,
//             quantity: 50,
//             minQuantity: 10,
//             color: "Silver",
//             supplier: "WearTech Solutions",
//             sku: "SFW-2024-003",
//             image: "https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?auto=compress&cs=tinysrgb&w=300",
//             rating: 4.7,
//             freeShipping: false,
//             shippingCost: 25.00
//         }
//     ],
//     promoCode: null,
//     promoDiscount: 0
// };

// // Initialize cart on page load
// document.addEventListener('DOMContentLoaded', function() {
//     updateCartDisplay();
//     updateOrderSummary();
// });

// // Update quantity function
// function updateQuantity(itemId, change, isDirectInput = false) {
//     const item = cartData.items.find(item => item.id === itemId);
//     if (!item) return;

//     if (isDirectInput) {
//         // Direct input from input field
//         const newQuantity = parseInt(change) || item.minQuantity;
//         item.quantity = Math.max(item.minQuantity, newQuantity);
//     } else {
//         // Increment/decrement
//         const newQuantity = item.quantity + change;
//         item.quantity = Math.max(item.minQuantity, newQuantity);
//     }

//     // Update the input field
//     const quantityInput = document.querySelector(`[data-id="${itemId}"] .quantity-input`);
//     if (quantityInput) {
//         quantityInput.value = item.quantity;
//     }

//     // Update item total display
//     updateItemTotal(itemId);
//     updateOrderSummary();
//     showMessage('Quantity updated successfully!', 'success');
    
//     // Add animation to updated price
//     const itemElement = document.querySelector(`[data-id="${itemId}"]`);
//     if (itemElement) {
//         itemElement.classList.add('price-updated');
//         setTimeout(() => {
//             itemElement.classList.remove('price-updated');
//         }, 600);
//     }
// }

// // Update individual item total
// function updateItemTotal(itemId) {
//     const item = cartData.items.find(item => item.id === itemId);
//     if (!item) return;

//     const itemElement = document.querySelector(`[data-id="${itemId}"]`);
//     if (!itemElement) return;

//     const total = item.price * item.quantity;
//     const totalElement = itemElement.querySelector('.text-lg.font-bold.text-gray-900');
//     const quantityElement = itemElement.querySelector('.text-sm.text-gray-600');
    
//     if (totalElement) {
//         totalElement.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
//     }
//     if (quantityElement) {
//         quantityElement.textContent = `${item.quantity} pieces`;
//     }
// }

// // Remove item from cart
// function removeItem(itemId) {
//     const itemElement = document.querySelector(`[data-id="${itemId}"]`);
    
//     if (itemElement) {
//         // Add removal animation
//         itemElement.classList.add('removing');
        
//         setTimeout(() => {
//             // Remove from data
//             cartData.items = cartData.items.filter(item => item.id !== itemId);
            
//             // Remove from DOM
//             itemElement.remove();
            
//             // Update displays
//             updateCartDisplay();
//             updateOrderSummary();
//             showMessage('Item removed from cart', 'success');
            
//             // Check if cart is empty
//             if (cartData.items.length === 0) {
//                 showEmptyCart();
//             }
//         }, 300);
//     }
// }

// // Clear entire cart
// function clearCart() {
//     if (cartData.items.length === 0) return;
    
//     if (confirm('Are you sure you want to clear your entire cart?')) {
//         cartData.items = [];
//         cartData.promoCode = null;
//         cartData.promoDiscount = 0;
        
//         showEmptyCart();
//         updateOrderSummary();
//         showMessage('Cart cleared successfully', 'success');
//     }
// }

// // Show empty cart state
// function showEmptyCart() {
//     const cartItemsList = document.getElementById('cartItemsList');
//     if (cartItemsList) {
//         cartItemsList.innerHTML = `
//             <div class="empty-cart">
//                 <i class="ri-shopping-cart-line empty-cart-icon"></i>
//                 <h3 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
//                 <p class="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
//                 <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                     <i class="ri-arrow-left-line mr-2"></i>
//                     Continue Shopping
//                 </a>
//             </div>
//         `;
//     }
// }

// // Update cart display (item count, etc.)
// function updateCartDisplay() {
//     const totalItems = cartData.items.length;
//     const totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
    
//     // Update item counts
//     const totalItemsElement = document.getElementById('totalItems');
//     const summaryItemsElement = document.getElementById('summaryItems');
//     const cartCountElement = document.getElementById('cartCount');
    
//     if (totalItemsElement) totalItemsElement.textContent = totalItems;
//     if (summaryItemsElement) summaryItemsElement.textContent = totalItems;
//     if (cartCountElement) {
//         cartCountElement.textContent = totalItems;
//         if (totalItems > 0) {
//             cartCountElement.classList.add('cart-updated');
//             setTimeout(() => {
//                 cartCountElement.classList.remove('cart-updated');
//             }, 600);
//         }
//     }
// }

// // Update order summary
// function updateOrderSummary() {
//     const subtotal = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const originalTotal = cartData.items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
//     const bulkDiscount = originalTotal - subtotal;
    
//     // Calculate shipping
//     const shippingCost = cartData.items.reduce((sum, item) => {
//         return sum + (item.freeShipping ? 0 : (item.shippingCost || 0));
//     }, 0);
    
//     // Calculate tax (18% GST)
//     const taxRate = 0.18;
//     const taxAmount = (subtotal + shippingCost - cartData.promoDiscount) * taxRate;
    
//     // Calculate final total
//     const finalTotal = subtotal + shippingCost + taxAmount - cartData.promoDiscount;
    
//     // Update DOM elements
//     const subtotalElement = document.getElementById('subtotal');
//     const shippingElement = document.getElementById('shipping');
//     const discountElement = document.getElementById('discount');
//     const taxElement = document.getElementById('tax');
//     const totalElement = document.getElementById('total');
    
//     if (subtotalElement) {
//         subtotalElement.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
//     }
    
//     if (shippingElement) {
//         if (shippingCost === 0) {
//             shippingElement.textContent = 'Free';
//             shippingElement.className = 'font-medium text-green-600';
//         } else {
//             shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
//             shippingElement.className = 'font-medium';
//         }
//     }
    
//     if (discountElement) {
//         const totalDiscount = bulkDiscount + cartData.promoDiscount;
//         discountElement.textContent = `-$${totalDiscount.toFixed(2)}`;
//     }
    
//     if (taxElement) {
//         taxElement.textContent = `$${taxAmount.toFixed(2)}`;
//     }
    
//     if (totalElement) {
//         totalElement.textContent = `$${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
//     }
// }

// // Apply promo code
// function applyPromoCode() {
//     const promoInput = document.getElementById('promoCode');
//     const promoCode = promoInput.value.trim().toUpperCase();
    
//     if (!promoCode) {
//         showMessage('Please enter a promo code', 'error');
//         return;
//     }
    
//     // Sample promo codes
//     const validPromoCodes = {
//         'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off' },
//         'BULK50': { discount: 50, type: 'fixed', description: '$50 off' },
//         'WELCOME': { discount: 0.05, type: 'percentage', description: '5% off' },
//         'FIRST100': { discount: 100, type: 'fixed', description: '$100 off' }
//     };
    
//     if (validPromoCodes[promoCode]) {
//         const promo = validPromoCodes[promoCode];
//         const subtotal = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
//         if (promo.type === 'percentage') {
//             cartData.promoDiscount = subtotal * promo.discount;
//         } else {
//             cartData.promoDiscount = Math.min(promo.discount, subtotal);
//         }
        
//         cartData.promoCode = promoCode;
        
//         // Show success message
//         const successMessage = document.createElement('div');
//         successMessage.className = 'promo-success';
//         successMessage.textContent = `Promo code applied! ${promo.description}`;
//         promoInput.parentNode.appendChild(successMessage);
        
//         // Remove success message after 3 seconds
//         setTimeout(() => {
//             if (successMessage.parentNode) {
//                 successMessage.parentNode.removeChild(successMessage);
//             }
//         }, 3000);
        
//         promoInput.value = '';
//         updateOrderSummary();
//         showMessage(`Promo code applied: ${promo.description}`, 'success');
//     } else {
//         showMessage('Invalid promo code', 'error');
        
//         // Show error message
//         const errorMessage = document.createElement('div');
//         errorMessage.className = 'promo-error';
//         errorMessage.textContent = 'Invalid promo code. Please try again.';
//         promoInput.parentNode.appendChild(errorMessage);
        
//         // Remove error message after 3 seconds
//         setTimeout(() => {
//             if (errorMessage.parentNode) {
//                 errorMessage.parentNode.removeChild(errorMessage);
//             }
//         }, 3000);
//     }
// }

// // Proceed to checkout
// function proceedToCheckout() {
//     if (cartData.items.length === 0) {
//         showMessage('Your cart is empty', 'error');
//         return;
//     }
    
//     // Add loading state
//     const checkoutBtn = document.querySelector('.checkout-btn');
//     const originalText = checkoutBtn.innerHTML;
    
//     checkoutBtn.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Processing...';
//     checkoutBtn.disabled = true;
//     checkoutBtn.classList.add('loading');
    
//     // Simulate checkout process
//     setTimeout(() => {
//         // In a real application, you would redirect to checkout page
//         showMessage('Redirecting to secure checkout...', 'success');
        
//         // Reset button after 2 seconds
//         setTimeout(() => {
//             checkoutBtn.innerHTML = originalText;
//             checkoutBtn.disabled = false;
//             checkoutBtn.classList.remove('loading');
            
//             // Redirect to checkout page (placeholder)
//             // window.location.href = 'checkout.html';
//             console.log('Redirecting to checkout with cart data:', cartData);
//         }, 2000);
//     }, 1500);
// }

// // Show notification message
// function showMessage(message, type = 'success') {
//     // Remove existing messages
//     const existingMessages = document.querySelectorAll('.message');
//     existingMessages.forEach(msg => msg.remove());
    
//     // Create new message
//     const messageElement = document.createElement('div');
//     messageElement.className = `message ${type}`;
//     messageElement.textContent = message;
    
//     document.body.appendChild(messageElement);
    
//     // Show message
//     setTimeout(() => {
//         messageElement.classList.add('show');
//     }, 100);
    
//     // Hide message after 3 seconds
//     setTimeout(() => {
//         messageElement.classList.remove('show');
//         setTimeout(() => {
//             if (messageElement.parentNode) {
//                 messageElement.parentNode.removeChild(messageElement);
//             }
//         }, 300);
//     }, 3000);
// }

// // Handle quantity input changes
// document.addEventListener('input', function(e) {
//     if (e.target.classList.contains('quantity-input')) {
//         const cartItem = e.target.closest('.cart-item');
//         const itemId = parseInt(cartItem.dataset.id);
//         const value = parseInt(e.target.value) || 0;
        
//         const item = cartData.items.find(item => item.id === itemId);
//         if (item && value >= item.minQuantity) {
//             updateQuantity(itemId, value, true);
//         } else if (item) {
//             e.target.value = item.minQuantity;
//             updateQuantity(itemId, item.minQuantity, true);
//         }
//     }
// });

// // Handle Enter key on promo code input
// document.addEventListener('keypress', function(e) {
//     if (e.target.id === 'promoCode' && e.key === 'Enter') {
//         e.preventDefault();
//         applyPromoCode();
//     }
// });

// // Recently viewed products click handler
// document.addEventListener('click', function(e) {
//     if (e.target.closest('.recently-viewed-item')) {
//         const item = e.target.closest('.recently-viewed-item');
//         const productName = item.querySelector('h4').textContent;
//         showMessage(`Viewing ${productName}...`, 'success');
        
//         // In a real application, you would redirect to product page
//         // window.location.href = `product.html?id=${productId}`;
//         console.log('Viewing product:', productName);
//     }
// });

// // Save for later functionality
// document.addEventListener('click', function(e) {
//     if (e.target.closest('.action-btn') && e.target.closest('.action-btn').textContent.includes('Save for Later')) {
//         e.preventDefault();
//         const cartItem = e.target.closest('.cart-item');
//         const itemId = parseInt(cartItem.dataset.id);
//         const item = cartData.items.find(item => item.id === itemId);
        
//         if (item) {
//             showMessage(`${item.name} saved for later`, 'success');
//             // In a real application, you would move item to saved items
//             console.log('Saved for later:', item);
//         }
//     }
// });

// // Auto-save cart data to localStorage
// function saveCartToStorage() {
//     localStorage.setItem('tradeOverseasCart', JSON.stringify(cartData));
// }

// // Load cart data from localStorage
// function loadCartFromStorage() {
//     const savedCart = localStorage.getItem('tradeOverseasCart');
//     if (savedCart) {
//         try {
//             cartData = JSON.parse(savedCart);
//         } catch (e) {
//             console.error('Error loading cart from storage:', e);
//         }
//     }
// }

// // Save cart data whenever it changes
// const originalUpdateQuantity = updateQuantity;
// updateQuantity = function(...args) {
//     originalUpdateQuantity.apply(this, args);
//     saveCartToStorage();
// };

// const originalRemoveItem = removeItem;
// removeItem = function(...args) {
//     originalRemoveItem.apply(this, args);
//     saveCartToStorage();
// };

// const originalClearCart = clearCart;
// clearCart = function(...args) {
//     originalClearCart.apply(this, args);
//     saveCartToStorage();
// };

// // Load cart data on page load
// document.addEventListener('DOMContentLoaded', function() {
//     loadCartFromStorage();
//     updateCartDisplay();
//     updateOrderSummary();
// });

// // Handle page visibility change to save cart data
// document.addEventListener('visibilitychange', function() {
//     if (document.hidden) {
//         saveCartToStorage();
//     }
// });

// // Handle beforeunload to save cart data
// window.addEventListener('beforeunload', function() {
//     saveCartToStorage();
// });