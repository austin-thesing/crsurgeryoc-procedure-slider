// Import Swiper and required modules
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay, A11y]);

// Only initialize Swiper once, on the .swiper container
function initializeSlider() {
  // Check if Swiper is available
  if (typeof Swiper === "undefined") {
    console.error("Swiper.js is not loaded. Please include Swiper.js before this script.");
    return;
  }

  // Check if the slider container exists
  const sliderContainer = document.querySelector(".swiper");
  if (!sliderContainer) {
    console.warn("Slider container .swiper not found");
    return;
  }

  // Add required Swiper classes to Webflow structure (if not already present)
  sliderContainer.classList.add("swiper");

  // Find the wrapper element (should already be .swiper-wrapper in your HTML)
  let swiperWrapper = sliderContainer.querySelector(".swiper-wrapper");
  if (!swiperWrapper) {
    console.warn("Swiper wrapper .swiper-wrapper not found inside .swiper");
    return;
  }

  // Ensure all slide items have the swiper-slide class
  const slides = swiperWrapper.querySelectorAll(".w-dyn-item, .collection-item, .swiper-slide");
  slides.forEach((slide) => {
    slide.classList.add("swiper-slide");
  });

  // Initialize the slider
  new Swiper(".swiper", {
    slidesPerView: 2.8,
    spaceBetween: 24,
    loop: true,
    breakpoints: {
      480: {
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2.8,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: ".slider-button.swiper-button-next",
      prevEl: ".slider-button.swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 600,
    effect: "slide",
    a11y: {
      enabled: true,
    },
    slideClass: "swiper-slide",
    wrapperClass: "swiper-wrapper",
  });
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}
