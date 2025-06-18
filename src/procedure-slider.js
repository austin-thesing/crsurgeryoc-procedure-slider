// Import Swiper and required modules
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

// Configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay, A11y]);

// Only initialize Swiper once, on the .swiper container
function initializeSlider() {
  // Check if Swiper is available
  if (typeof Swiper === "undefined") {
    console.error("Swiper.js is not loaded. Please include Swiper.js before this script.");
    return;
  }

  // Log the number of .swiper containers found
  const allSwiperContainers = document.querySelectorAll(".swiper");
  console.log(`[Swiper Init] Found ${allSwiperContainers.length} .swiper container(s) on the page.`, allSwiperContainers);

  // Check if the slider container exists
  const sliderContainer = document.querySelector(".swiper");
  if (!sliderContainer) {
    console.warn("[Swiper Init] Slider container .swiper not found");
    return;
  }
  console.log("[Swiper Init] Using slider container:", sliderContainer);

  // Add required Swiper classes to Webflow structure (if not already present)
  sliderContainer.classList.add("swiper");

  // Find the wrapper element (should already be .swiper-wrapper in your HTML)
  let swiperWrapper = sliderContainer.querySelector(".swiper-wrapper");
  if (!swiperWrapper) {
    console.warn("[Swiper Init] Swiper wrapper .swiper-wrapper not found inside .swiper");
    return;
  }
  console.log("[Swiper Init] Found swiper wrapper:", swiperWrapper);

  // Ensure all slide items have the swiper-slide class
  const slides = swiperWrapper.querySelectorAll(".w-dyn-item, .collection-item, .swiper-slide");
  console.log(`[Swiper Init] Found ${slides.length} slide(s) in wrapper.`, slides);
  slides.forEach((slide) => {
    slide.classList.add("swiper-slide");
  });

  // Try initializing the slider and catch any errors
  try {
    console.log("[Swiper Init] Initializing Swiper with options...");
    new Swiper(sliderContainer, {
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      navigation: {
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev",
      },
      speed: 600,
      effect: "slide",
      a11y: {
        enabled: true,
      },
      slideClass: "swiper-slide",
      wrapperClass: "swiper-wrapper",
    });
    console.log("[Swiper Init] Swiper initialized successfully.");
  } catch (err) {
    console.error("[Swiper Init] Error initializing Swiper:", err);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}
