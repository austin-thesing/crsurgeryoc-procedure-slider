// Import Swiper and required modules
import Swiper from "swiper";
Æ;
import { Navigation } from "swiper/modules";

// Only initialize Swiper once, on the .swiper container
function initializeSlider() {
  const sliderContainer = document.querySelector(".swiper");
  const nextBtn = document.querySelector(".swiper-btn-next");
  const prevBtn = document.querySelector(".swiper-btn-prev");

  console.log("Slider container:", sliderContainer);
  console.log("Next button:", nextBtn);
  console.log("Prev button:", prevBtn);

  if (!sliderContainer) {
    console.error("No .swiper container found");
    return;
  }

  if (!nextBtn || !prevBtn) {
    console.error("Navigation buttons not found");
    return;
  }

  console.log("Initializing Swiper...");
  const swiper = new Swiper(sliderContainer, {
    modules: [Navigation],
    direction: "horizontal",
    loop: false,
    slidesPerView: "auto",
    initialSlide: 0,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    mousewheel: {
      forceToAxis: true,
    },
    speed: 300,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
  });

  console.log("Swiper initialized:", swiper);
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}
