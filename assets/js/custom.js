// HEADER SCROLL SHADOW FUNCTIONALITY
(function () {
  const header = document.querySelector(".premium-header");

  // Only proceed if header exists
  if (header) {
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();
  }
})();

// ENHANCED SUBCATEGORY PANEL FUNCTIONALITY
(function () {
  const categoryItems = document.querySelectorAll('.category-item');
  const subcategoryPanels = document.querySelectorAll('.subcategory-panel');
  
  // Only proceed if elements exist
  if (categoryItems.length === 0 || subcategoryPanels.length === 0) {
    return;
  }
  
  let currentActivePanel = null;
  let hoverTimeout = null;

  // Function to hide all subcategory panels
  function hideAllPanels() {
    subcategoryPanels.forEach(panel => {
      if (panel) {
        panel.classList.remove('active');
        panel.style.display = 'none';
      }
    });
    currentActivePanel = null;
  }

  // Function to show a specific subcategory panel
  function showPanel(panel) {
    if (!panel || currentActivePanel === panel) return;
    
    hideAllPanels();
    
    panel.style.display = 'block';
    // Small delay to ensure display is set before adding active class
    setTimeout(() => {
      if (panel) {
        panel.classList.add('active');
      }
    }, 10);
    
    currentActivePanel = panel;
  }

  // Add hover event listeners to category items
  categoryItems.forEach((item, index) => {
    const panel = subcategoryPanels[index];
    
    if (!item || !panel) return;

    // Mouse enter event
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        showPanel(panel);
      }, 150); // Small delay to prevent accidental triggers
    });

    // Mouse leave event
    item.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        hideAllPanels();
      }, 200); // Delay before hiding to allow moving to panel
    });
  });

  // Add hover event listeners to subcategory panels
  subcategoryPanels.forEach(panel => {
    if (!panel) return;
    
    // Mouse enter event for panel
    panel.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
    });

    // Mouse leave event for panel
    panel.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        hideAllPanels();
      }, 100);
    });
  });

  // Close panels when clicking outside
  document.addEventListener('click', (e) => {
    const isInsideCategory = e.target.closest('.category-dropdown');
    if (!isInsideCategory) {
      hideAllPanels();
    }
  });

  // Close panels on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideAllPanels();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    hideAllPanels();
  });
})();
