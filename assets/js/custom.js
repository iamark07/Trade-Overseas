// HEADER SCROLL SHADOW FUNCTIONALITY
(function () {
  const header = document.querySelector(".main-header");
  const mobSearchOverlay = document.querySelector(".mob-search-overlay");

  // Only proceed if header exists
  if (header) {
    function handleScroll() {
      if (window.scrollY > 50) {
        if (mobSearchOverlay.classList.contains("active")) {
          header.classList.remove("shadow-md");
        } else {
          header.classList.add("shadow-md");
        }
      }
      else {
        header.classList.remove("shadow-md");
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();
  }
})();

// document.addEventListener("DOMContentLoaded", function () {
//   const categoryDropdownButton = document.querySelector(".category-dropdown");
//   const categorySideMenu = document.querySelector(".categorySideMenu");
//   const subcategoryPanel = document.querySelector(".subcategory-panel");
//   const megaMenu = document.querySelector(".mega-menu");

//   categoryDropdownButton.addEventListener("mouseenter", function () {
//     megaMenu.classList.remove("hidden");
//   });
//   categorySideMenu.addEventListener("mouseenter", function () {
//     megaMenu.classList.remove("hidden");
//   });
//   subcategoryPanel.addEventListener("mouseenter", function () {
//     megaMenu.classList.remove("hidden");
//   });

//   subcategoryPanel.addEventListener("mouseleave", function () {
//     megaMenu.classList.add("hidden");
//   });
//   categorySideMenu.addEventListener("mouseleave", function () {
//     megaMenu.classList.add("hidden");
//   });
//   categoryDropdownButton.addEventListener("mouseleave", function () {
//     megaMenu.classList.add("hidden");
//   });
// });

// ENHANCED SUBCATEGORY PANEL FUNCTIONALITY
(function () {
  const categoryItems = document.querySelectorAll(".category-item");
  const subcategoryPanels = document.querySelectorAll(".subcategory-panel");

  // Only proceed if elements exist
  if (categoryItems.length === 0 || subcategoryPanels.length === 0) {
    return;
  }

  let currentActivePanel = null;
  let hoverTimeout = null;

  // Function to hide all subcategory panels
  function hideAllPanels() {
    subcategoryPanels.forEach((panel) => {
      if (panel) {
        panel.classList.remove("active");
        panel.style.display = "none";
      }
    });
    currentActivePanel = null;
  }

  // Function to show a specific subcategory panel
  function showPanel(panel) {
    if (!panel || currentActivePanel === panel) return;

    hideAllPanels();

    panel.style.display = "block";
    // Small delay to ensure display is set before adding active class
    setTimeout(() => {
      if (panel) {
        panel.classList.add("active");
      }
    }, 10);

    currentActivePanel = panel;
  }

  // Add hover event listeners to category items
  categoryItems.forEach((item, index) => {
    const panel = subcategoryPanels[index];

    if (!item || !panel) return;

    // Mouse enter event
    item.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        showPanel(panel);
      }, 150); // Small delay to prevent accidental triggers
    });

    // Mouse leave event
    item.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        hideAllPanels();
      }, 200); // Delay before hiding to allow moving to panel
    });
  });

  // Add hover event listeners to subcategory panels
  subcategoryPanels.forEach((panel) => {
    if (!panel) return;

    // Mouse enter event for panel
    panel.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
    });

    // Mouse leave event for panel
    panel.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        hideAllPanels();
      }, 100);
    });
  });

  // Close panels when clicking outside
  document.addEventListener("click", (e) => {
    const isInsideCategory = e.target.closest(".category-dropdown");
    if (!isInsideCategory) {
      hideAllPanels();
    }
  });

  // Close panels on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAllPanels();
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    hideAllPanels();
  });
})();

// === Responsive Slider Menu & Search Overlay ===
(function () {
  const body = document.body;
  // Select elements from HTML
  const sliderMenu = document.querySelector(".slider-menu");
  const sliderOverlay = document.querySelector(".slider-overlay");
  const mobSearchOverlay = document.querySelector(".mob-search-overlay");

  // Mobile menu button
  const openMenuBtn = document.querySelector(".menu-btn");

  // Open menu
  if (openMenuBtn && sliderMenu && sliderOverlay) {
    openMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      sliderMenu.classList.remove("-left-full");
      sliderMenu.classList.add("left-0");
      sliderOverlay.classList.add("active");
      body.style.overflow = "hidden";
    });
  }
  // Close menu
  function closeMenu() {
    if (sliderMenu && sliderOverlay) {
      sliderMenu.classList.add("-left-full");
      sliderMenu.classList.remove("left-0");
      sliderOverlay.classList.remove("active");
      body.style.overflow = "";
    }
  }
  if (sliderMenu) {
    const closeBtn = sliderMenu.querySelector(".slider-close");
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  }
  if (sliderOverlay) sliderOverlay.addEventListener("click", closeMenu);

  // === Search Overlay ===
  const mobileSearchBtn = document.querySelector(".mob-search-btn");
  if (mobileSearchBtn && mobSearchOverlay) {
    mobileSearchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (mobSearchOverlay.classList.contains("active")) {
        mobSearchOverlay.classList.remove("active");
      } else {
        mobSearchOverlay.classList.add("active");
        setTimeout(() => {
          const input = mobSearchOverlay.querySelector("input");
          if (input) input.focus();
        }, 100);
      }
    });
  }
  function closeSearch() {
    if (mobSearchOverlay) {
      mobSearchOverlay.classList.remove("active");
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeSearch();
    }
  });

  // === Mobile Language Modal Feature ===
  function openMobileLanguageModal() {
    closeMenu();
    const modal = document.getElementById('mobileLanguageModal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeMobileLanguageModal() {
    const modal = document.getElementById('mobileLanguageModal');
    if (modal) modal.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const langBtn = document.getElementById('mobileLanguageBtn');
    const closeBtn = document.getElementById('closeMobileLanguageModal');
    const modal = document.getElementById('mobileLanguageModal');

    if (langBtn) {
      langBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openMobileLanguageModal();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeMobileLanguageModal();
      });
    }
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeMobileLanguageModal();
      });
    }
  });

})();

// User Account Dropdown: Show on hover and click (for accessibility)
document.addEventListener("DOMContentLoaded", function () {
  const accountBtn = document.querySelector('.user-account-dropdown .account-btn');
  const accountMenu = document.getElementById('accountDropdownMenu');
  const languageBtn = document.querySelector('.language-btn');
  const languageMenu = document.getElementById('languageDropdownMenu');

  // Toggle account dropdown on click
  if (accountBtn && accountMenu) {
    accountBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      accountMenu.classList.toggle('show');
    });
  }

  // Hide account dropdown on outside click
  document.addEventListener('click', function (e) {
    if (accountMenu && !accountMenu.contains(e.target) && !accountBtn.contains(e.target)) {
      accountMenu.classList.remove('show');
    }
  });

  // Toggle language dropdown on click
  if (languageBtn && languageMenu) {
    languageBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      languageMenu.classList.toggle('show');
    });
  }

  // Hide language dropdown on outside click
  document.addEventListener('click', function (e) {
    if (languageMenu && !languageMenu.contains(e.target) && !languageBtn.contains(e.target)) {
      languageMenu.classList.remove('show');
    }
  });
});
