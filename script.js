'use-strict';

const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const getStarted = document.querySelector('.getStarted');
const getStartedBtn = document.querySelector('.head-start');


const splash = document.querySelector('.splash');

if (sessionStorage.isVisited)
  splash.classList.add('display-none');

if (!sessionStorage.isVisited) {
  setTimeout(() => {
    sessionStorage.isVisited = 'true'
  }, 3700)
  document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
      splash.classList.add('display-none');
    }, 3000);
  });
}


const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}">•</button>`
    );
  });
};

createDots();

let currentSlide = 0;

document
  .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
  .classList.add('dots__dot--active');

let flag = 1;



const moveForward = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );

  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');

};

if (!sessionStorage.isVisited) {
  setTimeout(() => {
    moveForward(currentSlide);
    ++currentSlide;

    setInterval(() => {

      if (currentSlide !== 3) {
        moveForward(currentSlide);
        ++currentSlide;
      }

      if (currentSlide === 3) currentSlide = 0;

    }, 2300);
  }, 3500);
} else {
  moveForward(currentSlide);
  ++currentSlide;

  setInterval(() => {

    if (currentSlide !== 3) {
      moveForward(currentSlide);
      ++currentSlide;
    }

    if (currentSlide === 3) currentSlide = 0;

  }, 2300);
}
getStartedBtn.addEventListener('click',
  () => {
    getStarted.style.display = 'none';
  })
