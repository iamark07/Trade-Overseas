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

