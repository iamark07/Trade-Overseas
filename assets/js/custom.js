// // Announcement bar slider duplication for seamless animation
// window.addEventListener('DOMContentLoaded', function() {
//     const slider = document.querySelector('.announcement-bar-slider');
//     if (slider) {
//         const clone = slider.cloneNode(true);
//         slider.parentNode.appendChild(clone);
//     }
// });

// Modal open/close for header selectors
function modalToggle(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Location modal
    document.getElementById('open-location-modal')?.addEventListener('click', function(e) {
        e.preventDefault();
        modalToggle('location-modal', true);
    });
    document.getElementById('close-location-modal')?.addEventListener('click', function() {
        modalToggle('location-modal', false);
    });
    // Language modal
    document.getElementById('open-lang-modal')?.addEventListener('click', function(e) {
        e.preventDefault();
        modalToggle('lang-modal', true);
    });
    document.getElementById('close-lang-modal')?.addEventListener('click', function() {
        modalToggle('lang-modal', false);
    });
    // Close modal on outside click
    document.querySelectorAll('.header-modal').forEach(function(modal) {
        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

// Profile dropdown open/close
const profileGroup = document.getElementById('header-profile-group');
const profileBtn = document.getElementById('open-profile-dropdown');
if (profileGroup && profileBtn) {
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        profileGroup.classList.toggle('open');
    });
    document.addEventListener('mousedown', function(e) {
        if (!profileGroup.contains(e.target)) {
            profileGroup.classList.remove('open');
        }
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.ecom-header-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenu = document.getElementById('close-mobile-menu');

function toggleMobileMenu(show) {
    if (show) {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
    } else {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    }
}
hamburger?.addEventListener('click', () => toggleMobileMenu(true));
closeMobileMenu?.addEventListener('click', () => toggleMobileMenu(false));
mobileMenuOverlay?.addEventListener('click', () => toggleMobileMenu(false));

// Mobile menu selectors open same modals as desktop
const mobileOpenLocation = document.getElementById('mobile-open-location-modal');
const mobileOpenLang = document.getElementById('mobile-open-lang-modal');
mobileOpenLocation?.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMobileMenu(false);
    modalToggle('location-modal', true);
});
mobileOpenLang?.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMobileMenu(false);
    modalToggle('lang-modal', true);
});
