// Simple custom slider that moves one slide at a time
function initializeSlider() {
  console.log("🔍 Looking for slider elements...");
  
  const sliderContainer = document.querySelector(".swiper");
  const nextBtn = document.querySelector(".swiper-btn-next");
  const prevBtn = document.querySelector(".swiper-btn-prev");
  
  console.log("Slider container:", sliderContainer);
  console.log("Next button:", nextBtn);
  console.log("Prev button:", prevBtn);
  
  if (!sliderContainer) {
    console.error("❌ No .swiper container found");
    return;
  }
  
  const wrapper = sliderContainer.querySelector(".swiper-wrapper");
  const slides = sliderContainer.querySelectorAll(".swiper-slide");
  
  console.log("Swiper wrapper:", wrapper);
  console.log("Slides found:", slides.length);
  
  if (!wrapper || slides.length === 0) {
    console.error("❌ No slides found");
    return;
  }
  
  let currentIndex = 0;
  
  function updateSlider() {
    // Get the width of one slide (assuming they're all the same width)
    const slideWidth = slides[0].offsetWidth;
    const spaceBetween = 24; // Match your spacing
    const translateX = -(currentIndex * (slideWidth + spaceBetween));
    
    wrapper.style.transform = `translateX(${translateX}px)`;
    wrapper.style.transition = "transform 0.3s ease";
    
    console.log(`Moved to slide ${currentIndex + 1}/${slides.length}`);
    
    // Update button states
    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
    }
    
    if (nextBtn) {
      nextBtn.style.opacity = currentIndex === slides.length - 1 ? "0.5" : "1";
      nextBtn.style.pointerEvents = currentIndex === slides.length - 1 ? "none" : "auto";
    }
  }
  
  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  }
  
  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }
  
  // Initialize
  updateSlider();
  
  console.log("✅ Custom slider initialized successfully!");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}