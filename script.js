'use-strict';

const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const getStarted = document.querySelector('.getStarted');
const getStartedBtn = document.querySelector('.head-start');
const main = document.querySelector('main');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const theme = document.querySelector('.theme');
const title = document.querySelector('.task-head');
const art = document.querySelector('.task-foot');
const menu = document.querySelector('.menu');
const colorOne = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const colorTwo = 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)';
const colorThree = 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)';
const colorFour = 'linear-gradient(120deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)';
let themeCount = 1;

art.style.background = colorOne;

// //Creating splash screen
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

//creating dots

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



  //slider creation
const slider = function () {

  const goTo = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

 setTimeout(()=>{
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
   
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');}, 1000);

  };

  const nextSlide = function () {
    if (currentSlide < 2) {
      ++currentSlide;
      goTo(currentSlide);
    }
    else if (currentSlide === 2) {
      currentSlide = 0;
      goTo(currentSlide);
    }
  }

  const prevSlide = function () {
    if (currentSlide > 0) {
      --currentSlide;
      goTo(currentSlide);
    }
    else if (currentSlide === 0) {
      currentSlide = 2;
      goTo(currentSlide);
    }
  }

  right.addEventListener('click', nextSlide);
  left.addEventListener('click', prevSlide);
}

slider();

getStartedBtn.addEventListener('click',
  () => {
    getStarted.style.display = 'none';
    main.classList.remove('display-content');
    document.querySelector('.task-head').classList.remove('display-content');
  });

//Theme Changing
const themeSwticher = function (color) {
  main.style.background = color;
  title.style.background = color;
  art.style.background = color;
}


theme.addEventListener('click',
  () => {
    switch (themeCount) {
      case 1: themeSwticher(colorTwo);
        ++themeCount;
        break;
      case 2: themeSwticher(colorThree);
        ++themeCount;
        break;
      case 3: themeSwticher(colorFour);
        ++themeCount;
        break;
      case 4: themeSwticher(colorOne);
        themeCount = 1;
        break;
      default: break;
    }
  })

//Menu bar
menu.addEventListener('click',
  () => {
    document.querySelector('.overlay').style.height = main.style.height;
    document.querySelector('.menuBar').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
  })
document.querySelector('.overlay').addEventListener('click',
  () => {
    document.querySelector('.menuBar').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  })
let task = '';
let taskCount = 4;

let html = `<div class="task task-1">
<span><img class="task-img" src="Images/todo.png" /></span>
To do
</div>
<div class="task task-2">
<span><img class="task-img" src="Images/imp.png" /></span>
Important
</div>
<div class="task task-3">
<span><img class="task-img" src="Images/nor.png" /></span>
Normal
</div>`;

const foot = `<h1 class="task-foot">Made with ❤ by NSVegur</h1>`;

let addMore = `<input class="task task-add" type="text" value="+  Add more" onfocus='this.value = ""' />`;
document.addEventListener('keydown',
  (e) => {

    if (e.key === 'Enter' && taskCount < 11) {
      task = document.querySelector('.task-add').value;
      if (task !== '+  Add more' && task !== '') {
        main.innerHTML = '';

        html += `<div class="task task-${taskCount}">
      <span><img class="task-img" src="Images/new.png" /></span>${task}</div>`;
        ++taskCount;
        if (taskCount % 6 === 0) {
          main.style.height = '160vh';
        }
        if (taskCount === 11) {
          main.style.height = '130vh';
          main.insertAdjacentHTML("afterbegin", html + foot);
        }
        else {
          main.insertAdjacentHTML("afterbegin", html + addMore + foot);
        }
      }
    }
  });
