'use-strict';

const slides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * (i + 1)}%)`;
});


let currentSlide = 0;

let flag = 1;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const moveForward = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

setInterval(() => {

  if (currentSlide === -1) {
    goToSlide();
    ++currentSlide;
  }

  else if (currentSlide !== 5) {
    moveForward(currentSlide);
    ++currentSlide;
  }

  if (currentSlide === 5) currentSlide = -1;

}, 1000);
