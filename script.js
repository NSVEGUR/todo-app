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
const myList = document.querySelector('.menuList');
const help = document.querySelector('.menuHelp');
const colorOne = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const colorTwo = 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)';
const colorThree = 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)';
const colorFour = 'linear-gradient(120deg, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)';
let themeCount = 1;


const foot = `<h1 class="task-foot">Made with ❤ by NSVegur</h1>`;
const addMore = `<input class="task task-add" type="text" value="+  Add more" onfocus='this.value = ""' />`;
let html = `<div class="task click" data-num="1">
<span><img class="task-img" src="Images/todo.png" /></span>
To do
</div>
<div class="task click" data-num="2">
<span><img class="task-img" src="Images/imp.png" /></span>
Important
</div>
<div class="task click" data-num="3">
<span><img class="task-img" src="Images/nor.png" /></span>
Normal
</div>`;
const updateMain = function () {
  if (localStorage.getItem('mainFlag') && localStorage.getItem('mainFullFlag')) {
    main.innerHTML = '';
    main.style.height = '130vh';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + foot);
  }
  else if (localStorage.getItem('mainFlag')) {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addMore + foot);
  } else {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", html + addMore + foot);
  }
}

updateMain();

//themeChanger Function
const themeSwticher = function (color) {
  main.style.background = color;
  title.style.background = color;
  art.style.background = color;
}

//restore theme
const themeStorage = function () {
  switch (Number(localStorage.getItem('themeCount')) - 1) {
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
}

themeStorage();

let pageFlag = 0;

art.style.background = colorOne;

let currentSlide = 0;

const goTo = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );

  setTimeout(() => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }, 1000);

};

//slider auto

const sliderAuto = function () {
  setInterval(() => {
    if (currentSlide < 2) {
      ++currentSlide;
      goTo(currentSlide);
    }
    else if (currentSlide === 2) {
      currentSlide = 0;
      goTo(currentSlide);
    }
  }, 3200);
}

//Creating splash screen
const splash = document.querySelector('.splash');

//remove splash if visited session
if (sessionStorage.isVisited) {
  splash.classList.add('display-none');
  sliderAuto();
}

//new session
if (!sessionStorage.isVisited) {
  setTimeout(() => {
    sessionStorage.isVisited = 'true'
  }, 3700)
  document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
      splash.classList.add('display-none');
      sliderAuto();
    }, 3000);
  });
}

//removing intro if visited local
if (localStorage.isVisited) {
  getStarted.style.display = 'none';
  main.classList.remove('display-content');
  document.querySelector('.task-head').classList.remove('display-content');
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


document
  .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
  .classList.add('dots__dot--active');

let flag = 1;



//slider dynamic
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


//getting Started
getStartedBtn.addEventListener('click',
  () => {
    getStarted.style.display = 'none';
    main.classList.remove('display-content');
    document.querySelector('.task-head').classList.remove('display-content');
    localStorage.isVisited = 'true';
  });

//Theme Changing

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

    localStorage.setItem('themeCount', String(themeCount));

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



const intask = ` <div class="tasks-add">
<div class="tasks-item cir">
  <button class="circle"></button>
</div>
<input class="tasks-item context" type="text" value="Add a task" onfocus='this.value = ""' />
<input class="tasks-item due" type="date" data-title="Due" />
</div>`;

let newtask = '';



//Date modification
const dateModify = function (string) {
  const arr = string.split('-');
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
}



//Enter for add
document.addEventListener('keydown',
  (e) => {

    if (e.key === 'Enter' && taskCount < 11 && pageFlag === 0 && !Number(localStorage.getItem('mainFlag'))) {
      task = document.querySelector('.task-add').value;
      if (task !== '+  Add more' && task !== '') {
        main.innerHTML = '';
        localStorage.setItem('mainFlag', '1');
        html += `<div class="task click" data-num = ${taskCount}>
      <span><img class="task-img" src="Images/new.png" /></span>${task}</div>`;
        ++taskCount;
        main.insertAdjacentHTML("afterbegin", html + addMore + foot);
        localStorage.setItem('mainPage', html);
      }
    } else if (e.key === 'Enter' && taskCount < 11 && pageFlag === 0) {
      task = document.querySelector('.task-add').value;


      if (task !== '+  Add more' && task !== '') {
        main.innerHTML = '';
        const addon = `<div class="task click" data-num = ${taskCount}>
      <span><img class="task-img" src="Images/new.png" /></span>${task}</div>`;
        ++taskCount;
        if (taskCount % 6 === 0) {
          main.style.height = '160vh';
        }
        if (taskCount === 11) {
          main.style.height = '130vh';
          localStorage.setItem('mainFullFlag', '1');
          main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addon + foot);
          localStorage.setItem('mainPage', localStorage.getItem('mainPage') + addon);
        }
        else {
          main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addon + addMore + foot);
          localStorage.setItem('mainPage', localStorage.getItem('mainPage') + addon);
        }
      }
    }

    if (e.key === 'Enter' && taskCount < 11 && pageFlag === 1) {
      const context = document.querySelector('.context').value;
      const date = document.querySelector('.due').value;

      const def = new Date();

      const day = `${def.getFullYear()}-${String(def.getMonth() + 1).padStart(2, '0')}-${String(def.getDate()).padStart(2, '0')}`



      if (context !== 'Add a task' && context !== '') {
        main.innerHTML = '';

        newtask += `<div class="tasks tasks-1">
      <input class="tasks-item cir-check" id="done" type="checkbox" />
      <div class=" tasks-item context-after">
        ${context}
      </div>
      <div class="tasks-item due-after">${date ? dateModify(date) : dateModify(day)}
      </div>
      <div align="right" class="tasks-item del-after">
        <img class="del" src="Images/delete.png">
      </div>
    </div>`;

        main.insertAdjacentHTML("afterbegin", newtask + intask + foot);

        pageFlag = 1;
      }
    }
  });



main.addEventListener('click',
  (e) => {
    const clicked = e.target.closest('.click');


    if (!clicked)
      return;

    //console.log(clicked.dataset.num);

    main.innerHTML = '';
    main.style.height = '100vh';

    main.insertAdjacentHTML("afterbegin", intask + foot);

    pageFlag = 1;
  })

myList.addEventListener('click',
  () => {
    document.querySelector('.menuBar').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');

    updateMain();

    pageFlag = 0;
  })

