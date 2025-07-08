// HERO SLIDER FUNCTIONALITY
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-prev-btn');
  const nextBtn = document.querySelector('.hero-next-btn');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function goToSlide(idx) {
    showSlide(idx);
  }

  function startAutoSlide() {
    timer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(timer);
  }

  // Event Listeners
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(idx);
      startAutoSlide();
    });
  });

  // Pause on hover
  const sliderContainer = document.querySelector('.hero-slider-container');
  sliderContainer.addEventListener('mouseenter', stopAutoSlide);
  sliderContainer.addEventListener('mouseleave', startAutoSlide);

  // Init
  showSlide(0);
  startAutoSlide();
})();


// category card slider
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.category-swiper', {
      slidesPerView: 3,
      spaceBetween: 8,
      breakpoints: {
          415: { slidesPerView: 4, spaceBetween: 8 },
          768: { slidesPerView: 5, spaceBetween: 8 },
          1024: { slidesPerView: 6, spaceBetween: 8 },
          1280: { slidesPerView: 8, spaceBetween: 8 },
          1440: { slidesPerView: 10, spaceBetween: 8 }
      }
  });

  // Products Swiper slider
  new Swiper('.products-swiper', {
      slidesPerView: 2,
      spaceBetween: 10,
      navigation: {
          nextEl: '.product-swiper-button-next-custom',
          prevEl: '.product-swiper-button-prev-custom',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      breakpoints: {
          340: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 }
      }
  });
});