import { initSwitchTheme } from "./theme.js";
import { initBurger } from "./burger.js";

initSwitchTheme();
initBurger();

const slider = document.querySelector(".slider");
const track = document.querySelector(".slider-track");
const btnPrev = document.querySelector(".slider-button-left");
const btnNext = document.querySelector(".slider-button-right");
const slidesOrig = document.querySelectorAll(".slide");
const bullets = document.querySelectorAll(".bullet");
const containerBullets = document.querySelector(".bullets-container");

const cloneFirst = slidesOrig[0].cloneNode(true);
const cloneLast = slidesOrig[slidesOrig.length - 1].cloneNode(true);

track.append(cloneFirst);
track.prepend(cloneLast);

const allSlides = document.querySelectorAll(".slide");

let currentIndex = 1;
let isTransitioning = false;

track.style.transform = `translateX(-${currentIndex * 100}%)`;

function moveSlider(direction) {
  if (isTransitioning) return;

  isTransitioning = true;
  track.style.transition = "transform 0.5s";
  if (direction === "next") {
    currentIndex++;
  } else {
    currentIndex--;
  }
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

track.addEventListener("transitionend", () => {
  isTransitioning = false;
  if (currentIndex === allSlides.length - 1) {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (currentIndex === 0) {
    track.style.transition = "none";
    currentIndex = allSlides.length - 2;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });

  bullets[currentIndex - 1].classList.add("active");
});

btnNext.addEventListener("click", () => moveSlider("next"));
btnPrev.addEventListener("click", () => moveSlider("prev"));

containerBullets.addEventListener("click", (event) => {
  if (event.target.closest(".bullet")) {
    currentIndex = Number(event.target.dataset.index);
    track.style.transition = "transform 0.5s";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;

slider.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

slider.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  },
  { passive: true },
);

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) >= minSwipeDistance) {
    if (swipeDistance > 0) {
      moveSlider("prev");
    } else {
      moveSlider("next");
    }
  }
}
