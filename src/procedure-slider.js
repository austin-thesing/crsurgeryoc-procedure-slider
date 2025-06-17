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
    slidesPerView: 1,
    spaceBetween: 24,
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

  // Store original styles to preserve Webflow styling
  const originalDisplay = getComputedStyle(sliderContainer).display;
  const originalFlexDirection = getComputedStyle(sliderContainer).flexDirection;

  // Add required Swiper classes to Webflow structure
  sliderContainer.classList.add("swiper");

  // Create or find swiper wrapper
  let swiperWrapper = sliderContainer.querySelector(".swiper-wrapper");
  if (!swiperWrapper) {
    swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    // Preserve any existing Webflow classes on the container
    const existingClasses = sliderContainer.className;

    // Move all swiper-slide elements into the wrapper (they already have the right class!)
    const slides = sliderContainer.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
      // Slides already have swiper-slide class, just move them
      swiperWrapper.appendChild(slide);
    });

    sliderContainer.appendChild(swiperWrapper);
  }

  // Initialize the slider (this will run even if already initialized above)
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
