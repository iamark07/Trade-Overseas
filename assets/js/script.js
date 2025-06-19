document.addEventListener("DOMContentLoaded", () => {
  const flipDiv = document.querySelector(".animate-flip-placeholder");
  const textItems = flipDiv.querySelectorAll("div");
  const input = document.getElementById("searchInput");
  const flipWrapper = document.getElementById("flipPlaceholder");

  if (!textItems.length) return;

  const itemHeight = textItems[0].offsetHeight;
  let index = 0;
  const intervalTime = 3000;

  // Start flip animation
  setInterval(() => {
    if (document.activeElement === input) return; // Don't scroll if input focused

    index++;
    flipDiv.style.marginTop = `-${index * itemHeight}px`;

    if (index === textItems.length - 1) {
      setTimeout(() => {
        flipDiv.style.transition = "none";
        flipDiv.style.marginTop = "0";
        index = 0;
        setTimeout(() => {
          flipDiv.style.transition = "margin-top 0.6s ease-in-out";
        }, 50);
      }, 600);
    }
  }, intervalTime);

  // Hide flip text on input focus
  input.addEventListener("focus", () => {
    flipWrapper.style.display = "none";
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      flipWrapper.style.display = "block";
    }
  });
});
