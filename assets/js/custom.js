// HEADER SCROLL SHADOW FUNCTIONALITY
(function () {
  const header = document.querySelector(".premium-header");

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
})();
