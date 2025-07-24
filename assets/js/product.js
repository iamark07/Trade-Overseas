// Product Image Gallery
const images = [
  "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=800",
];

let currentImageIndex = 0;
let selectedColor = "Black";
let isWishlisted = false;

// Price breaks for bulk pricing
const priceBreaks = [
  { min: 1, max: 99, price: 25.5 },
  { min: 100, max: 499, price: 22.8 },
  { min: 500, max: 999, price: 19.99 },
  { min: 1000, max: null, price: 17.5 },
];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initImageGallery();
  initColorOptions();
  updatePricing();
});

// Image Gallery Functions
function initImageGallery() {
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  images.forEach((image, index) => {
    const thumbnail = document.createElement("button");
    thumbnail.className = `aspect-square rounded-lg overflow-hidden border-2 transition-all ${
      index === 0 ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
    }`;
    thumbnail.onclick = () => selectImage(index);

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Product ${index + 1}`;
    img.className = "w-full h-full object-cover";

    thumbnail.appendChild(img);
    thumbnailContainer.appendChild(thumbnail);
  });

  updateImageCounter();
}

function selectImage(index) {
  currentImageIndex = index;
  document.getElementById("mainImage").src = images[index];
  updateImageCounter();
  updateThumbnailSelection();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  selectImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  selectImage(currentImageIndex);
}

function updateImageCounter() {
  document.getElementById("imageCounter").textContent = `${
    currentImageIndex + 1
  } / ${images.length}`;
}

function updateThumbnailSelection() {
  const thumbnails = document.querySelectorAll("#thumbnailContainer button");
  thumbnails.forEach((thumbnail, index) => {
    if (index === currentImageIndex) {
      thumbnail.className =
        "aspect-square rounded-lg overflow-hidden border-2 border-blue-500 transition-all";
    } else {
      thumbnail.className =
        "aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all";
    }
  });
}

// Zoom Modal Functions
function openZoom() {
  const modal = document.getElementById("zoomModal");
  const zoomImage = document.getElementById("zoomImage");
  zoomImage.src = images[currentImageIndex];
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeZoom() {
  const modal = document.getElementById("zoomModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Color Selection Functions
function initColorOptions() {
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectColor(this.dataset.color);
    });
  });
}

function selectColor(color) {
  selectedColor = color;
  document.getElementById("selectedColorText").textContent = color;

  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    if (option.dataset.color === color) {
      option.className =
        "color-option px-3 sm:px-4 py-2 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm transition-all";
    } else {
      option.className =
        "color-option px-3 sm:px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-xs sm:text-sm transition-all";
    }
  });
}

// Quantity Functions
function increaseQuantity() {
  const quantityInput = document.getElementById("quantityInput");
  let currentQuantity = parseInt(quantityInput.value) || 100;
  quantityInput.value = currentQuantity + 50;
  updatePricing();
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("quantityInput");
  let currentQuantity = parseInt(quantityInput.value) || 100;
  if (currentQuantity > 100) {
    quantityInput.value = Math.max(100, currentQuantity - 50);
    updatePricing();
  }
}

// Listen for quantity input changes
document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantityInput");
  if (quantityInput) {
    quantityInput.addEventListener("input", function () {
      const value = parseInt(this.value) || 100;
      if (value < 100) {
        this.value = 100;
      }
      updatePricing();
    });
  }
});

// Pricing Functions
function getCurrentPrice() {
  const quantityInput = document.getElementById("quantityInput");
  const quantity = parseInt(quantityInput?.value) || 100;
  const priceBreak = priceBreaks.find(
    (pb) => quantity >= pb.min && (pb.max === null || quantity <= pb.max)
  );
  return priceBreak?.price || priceBreaks[0].price;
}

function updatePricing() {
  const quantityInput = document.getElementById("quantityInput");
  const quantity = parseInt(quantityInput?.value) || 100;
  const currentPrice = getCurrentPrice();
  const totalCost = currentPrice * quantity;

  const currentPriceElement = document.getElementById("currentPrice");
  const totalCostElement = document.getElementById("totalCost");
  const totalBreakdownElement = document.getElementById("totalBreakdown");

  if (currentPriceElement) {
    currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
  }
  if (totalCostElement) {
    totalCostElement.textContent = `$${totalCost.toLocaleString()}`;
  }
  if (totalBreakdownElement) {
    totalBreakdownElement.textContent = `${quantity} pieces × $${currentPrice.toFixed(
      2
    )} each`;
  }
}

// Wishlist Function
function toggleWishlist() {
  isWishlisted = !isWishlisted;
  const wishlistBtn = document.getElementById("wishlistBtn");

  if (wishlistBtn) {
    if (isWishlisted) {
      wishlistBtn.className =
        "wishlist-active flex items-center justify-center space-x-2 py-2 px-4 border border-red-500 text-red-500 bg-red-50 rounded-lg transition-colors";
      wishlistBtn.innerHTML =
        '<i class="ri-heart-fill"></i><span class="text-sm">Saved</span>';
    } else {
      wishlistBtn.className =
        "flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors";
      wishlistBtn.innerHTML =
        '<i class="ri-heart-line"></i><span class="text-sm">Save</span>';
    }
  }
}

// Tab Functions
function switchTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.add("hidden");
  });

  // Show selected tab content
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.remove("hidden");
  }

  // Update tab button styles
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.className =
      "tab-btn py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors";
  });

  // Set active tab button style
  event.target.className =
    "tab-btn py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm transition-colors";
}

// Close zoom modal when clicking outside the image
document.addEventListener("DOMContentLoaded", function () {
  const zoomModal = document.getElementById("zoomModal");
  if (zoomModal) {
    zoomModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeZoom();
      }
    });
  }
});

// Keyboard navigation for zoom modal
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("zoomModal");
  if (modal && !modal.classList.contains("hidden")) {
    if (e.key === "Escape") {
      closeZoom();
    } else if (e.key === "ArrowRight") {
      nextImage();
      const zoomImage = document.getElementById("zoomImage");
      if (zoomImage) {
        zoomImage.src = images[currentImageIndex];
      }
    } else if (e.key === "ArrowLeft") {
      prevImage();
      const zoomImage = document.getElementById("zoomImage");
      if (zoomImage) {
        zoomImage.src = images[currentImageIndex];
      }
    }
  }
});

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Back to top button functionality
window.addEventListener("scroll", function () {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  }
});
