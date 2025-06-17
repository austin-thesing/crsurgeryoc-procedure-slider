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
  const swiper = new Swiper(".procedure-slider-wrap", {
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
      delay: 5000,
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
    slideClass: "procedure-slide-outer",
    wrapperClass: "swiper-wrapper",
  });

  // Optional: Add hover pause functionality
  const sliderContainer = document.querySelector(".procedure-slider-wrap");
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
  const sliderContainer = document.querySelector(".procedure-slider-wrap");
  if (!sliderContainer) {
    console.warn("Slider container .procedure-slider-wrap not found");
    return;
  }

  // Add required Swiper classes to Webflow structure
  sliderContainer.classList.add("swiper");

  // Create or find swiper wrapper
  let swiperWrapper = sliderContainer.querySelector(".swiper-wrapper");
  if (!swiperWrapper) {
    swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    // Move all procedure-slide-outer elements into the wrapper
    const slides = sliderContainer.querySelectorAll(".procedure-slide-outer");
    slides.forEach((slide) => {
      slide.classList.add("swiper-slide");
      swiperWrapper.appendChild(slide);
    });

    sliderContainer.appendChild(swiperWrapper);
  }

  // Initialize the slider (this will run even if already initialized above)
  new Swiper(".procedure-slider-wrap", {
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
