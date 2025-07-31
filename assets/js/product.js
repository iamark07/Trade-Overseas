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
  // No images array, thumbnails are in HTML
  const thumbnailBtns = document.querySelectorAll("#thumbnailContainer .thumbnail-btn");
  thumbnailBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      selectImage(index);
    });
  });
  // Set first image as active
  selectImage(0);
}

function selectImage(index) {
  const thumbnailBtns = document.querySelectorAll("#thumbnailContainer .thumbnail-btn");
  const thumbnails = document.querySelectorAll("#thumbnailContainer img");
  const selectedImgSrc = thumbnails[index].getAttribute("src");

  currentImageIndex = index;
  document.getElementById("mainImage").src = selectedImgSrc;

  updateImageCounter();
  updateThumbnailSelection();
}

function nextImage() {
  const thumbnails = document.querySelectorAll("#thumbnailContainer img");
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  selectImage(currentImageIndex);
}

function prevImage() {
  const thumbnails = document.querySelectorAll("#thumbnailContainer img");
  currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  selectImage(currentImageIndex);
}

function updateImageCounter() {
  const thumbnails = document.querySelectorAll("#thumbnailContainer img");
  document.getElementById("imageCounter").textContent = `${
    currentImageIndex + 1
  } / ${thumbnails.length}`;
}

function updateThumbnailSelection() {
  const thumbnailBtns = document.querySelectorAll("#thumbnailContainer .thumbnail-btn");
  thumbnailBtns.forEach((btn, idx) => {
    if (idx === currentImageIndex) {
      btn.classList.add("border-blue-500", "active");
    } else {
      btn.classList.remove("border-blue-500", "active");
    }
  });
}

// Zoom Modal Functions
function openZoom() {
  const thumbnails = document.querySelectorAll("#thumbnailContainer img");
  const zoomImage = document.getElementById("zoomImage");
  zoomImage.src = thumbnails[currentImageIndex].getAttribute("src");

  const modal = document.getElementById("zoomModal");
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
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
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
    currentPriceElement.textContent = `₹${currentPrice.toFixed(2)}`;
  }
  if (totalCostElement) {
    totalCostElement.textContent = `₹${totalCost.toLocaleString()}`;
  }
  if (totalBreakdownElement) {
    totalBreakdownElement.textContent = `${quantity} pieces × ₹${currentPrice.toFixed(
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
      wishlistBtn.classList.add("wishlist-active");
      wishlistBtn.innerHTML = '<i class="ri-heart-fill"></i><span class="text-sm">Saved</span>';
    } else {
      wishlistBtn.classList.remove("wishlist-active");
      wishlistBtn.innerHTML = '<i class="ri-heart-line"></i><span class="text-sm">Save</span>';
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
  const tabButtons = document.querySelectorAll(".product-tab-btn");
  tabButtons.forEach((btn) => {
    btn.classList.remove("active", "selected");
  });

  // Set active tab button style
  event.target.classList.add("active");
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
