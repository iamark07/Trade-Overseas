document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const searchBar = document.getElementById("mobile-search-bar");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // --- Categories Dropdown Logic ---
    const categoriesBtn = document.querySelector(".all-categories-btn");
    const categoriesDropdown = document.getElementById("categories-dropdown");

    if (categoriesBtn && categoriesDropdown) {
        categoriesBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the window click event from firing immediately
            categoriesDropdown.classList.toggle('active');
            categoriesBtn.classList.toggle('active');
        });

        // Close dropdown if clicked outside
        window.addEventListener('click', (event) => {
            if (!categoriesDropdown.contains(event.target) && !categoriesBtn.contains(event.target)) {
                categoriesDropdown.classList.remove('active');
                categoriesBtn.classList.remove('active');
            }
        });
    }

    // --- Full-Screen Search Overlay Logic ---
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = searchOverlay.querySelector('input');
    const openSearchDesktop = document.getElementById('search-trigger');
    const openSearchMobile = document.getElementById('search-trigger-mobile');
    const closeSearchBtn = document.getElementById('close-search-btn');

    const openSearch = (e) => {
        e.preventDefault();
        searchOverlay.classList.add('search-overlay-visible');
        searchOverlay.classList.remove('search-overlay-hidden');
        setTimeout(() => searchInput.focus(), 400); // Focus after transition
    };

    const closeSearch = () => {
        searchOverlay.classList.remove('search-overlay-visible');
        searchOverlay.classList.add('search-overlay-hidden');
    };

    openSearchDesktop.addEventListener('click', openSearch);
    openSearchMobile.addEventListener('click', openSearch);
    closeSearchBtn.addEventListener('click', closeSearch);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('search-overlay-visible')) {
            closeSearch();
        }
    });
});
