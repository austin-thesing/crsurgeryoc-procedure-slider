// Import Swiper and required modules
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay, A11y]);

// Procedure Slider with Swiper.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
  const swiper = new Swiper(".swiper-wrap", {
    // Basic configuration
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
    centeredSlides: false,

    // Responsive breakpoints
    breakpoints: {
      // Mobile
      480: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Desktop
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // Large Desktop
      1200: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },

    // Navigation arrows (optional)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Pagination (optional)
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Autoplay (optional)
    autoplay: {
      delay: 4000, // Changed from 5000 to 4000ms
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Smooth transitions
    speed: 600,
    effect: "slide",

    // Accessibility
    a11y: {
      enabled: true,
    },

    // Custom slide class mapping for Webflow
    slideClass: "swiper-slide",
    wrapperClass: "swiper-wrapper",
  });

  // Optional: Add hover pause functionality
  const sliderContainer = document.querySelector(".swiper-wrap");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      swiper.autoplay.stop();
    });

    sliderContainer.addEventListener("mouseleave", () => {
      swiper.autoplay.start();
    });
  }

  // Optional: Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      swiper.slidePrev();
    } else if (e.key === "ArrowRight") {
      swiper.slideNext();
    }
  });
});

// Alternative initialization if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}

function initializeSlider() {
  // Check if Swiper is available
  if (typeof Swiper === "undefined") {
    console.error("Swiper.js is not loaded. Please include Swiper.js before this script.");
    return;
  }

  // Check if the slider container exists
  const sliderContainer = document.querySelector(".swiper-wrap");
  if (!sliderContainer) {
    console.warn("Slider container .swiper-wrap not found");
    return;
  }

  // Add required Swiper classes to Webflow structure
  sliderContainer.classList.add("swiper");

  // Find existing wrapper element (likely a Webflow CMS list)
  let swiperWrapper = sliderContainer.querySelector(".w-dyn-list, .collection-list-wrapper, [data-w-dyn='list']");

  // If no Webflow CMS wrapper found, look for any existing wrapper
  if (!swiperWrapper) {
    swiperWrapper = sliderContainer.querySelector(".swiper-wrapper");
  }

  // If still no wrapper found, look for any direct child that contains slides
  if (!swiperWrapper) {
    const potentialWrappers = sliderContainer.children;
    for (let wrapper of potentialWrappers) {
      if (wrapper.querySelector(".swiper-slide") || wrapper.querySelector(".w-dyn-item")) {
        swiperWrapper = wrapper;
        break;
      }
    }
  }

  // If we found an existing wrapper, preserve its classes and add swiper-wrapper
  if (swiperWrapper) {
    // Add swiper-wrapper class while preserving existing Webflow classes
    swiperWrapper.classList.add("swiper-wrapper");

    // Ensure all slide items have the swiper-slide class
    const slides = swiperWrapper.querySelectorAll(".w-dyn-item, .collection-item, .swiper-slide");
    slides.forEach((slide) => {
      slide.classList.add("swiper-slide");
    });
  } else {
    // Fallback: create new wrapper if none exists
    swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    // Move all potential slide elements into the wrapper
    const slides = sliderContainer.querySelectorAll(".swiper-slide, .w-dyn-item, .collection-item");
    slides.forEach((slide) => {
      slide.classList.add("swiper-slide");
      swiperWrapper.appendChild(slide);
    });

    sliderContainer.appendChild(swiperWrapper);
  }

  // Initialize the slider
  new Swiper(".swiper-wrap", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,

    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    speed: 600,
  });
}
