'use-strict';


//Variables used
const backsOne = document.querySelectorAll('.back-1');
const backsTwo = document.querySelectorAll('.back-2');
const metaThemeColor = document.querySelector("meta[name=theme-color]");
const slides = document.querySelectorAll('.slide');
const helpSlides = document.querySelectorAll('.slide-help');
const dotContainer = document.querySelector('.dots');
const getStarted = document.querySelector('.getStarted');
const getStartedBtn = document.querySelector('.head-start');
const helpStarted = document.querySelector('.help');
const helpStartedBtn = document.querySelector('.help-start');
const vid = document.querySelector('.help--vid')
const main = document.querySelector('main');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const theme = document.querySelector('.theme');
const lightDarkBtn = document.querySelector('.light-dark');
const title = document.querySelector('.task-head');
const art = document.querySelector('.task-foot');
const heading = document.querySelector('.title');
const menu = document.querySelector('.menu');
const myList = document.querySelector('.menuList');
const help = document.querySelector('.menuHelp');
const creator = document.querySelector('.menuCreator');
const colorOneOne = 'rgba(62, 133, 243, 1)';
const colorOneTwo = 'rgba(17, 115, 183, 1)';
const colorTwoOne = 'rgba(111, 104, 114, 1)';
const colorTwoTwo = 'rgba(77, 70, 82, 1)';
const colorThreeOne = 'rgba(161, 2, 173, 1)';
const colorThreeTwo = 'rgba(229, 115, 237, 1)';
const colorFourOne = 'rgba(243, 106, 62, 1)';
const colorFourTwo = 'rgba(255, 179, 11, 1)';
let themeCount = 1;
let whichPage = 0;
let helpSlideInterval = '';


const lightDark = function (lightDarkFlag) {
  if (lightDarkFlag) {
    document.querySelector('body').style.color = '#ffffff';
    document.querySelectorAll('.task').forEach((e) => e.style.color = '#ffffff')
    document.querySelectorAll('.tasks-item').forEach((e) => e.style.color = '#ffffff')
    main.style.background = '#121212';
    lightDarkBtn.textContent = '✹';
    localStorage.setItem('lightDarkFlag', '1');
  } else {
    document.querySelector('body').style.color = '#000000';
    document.querySelectorAll('.task').forEach((e) => e.style.color = '#000000')
    document.querySelectorAll('.tasks-item').forEach((e) => e.style.color = '#000000')
    main.style.background = '#ffffff';
    lightDarkBtn.textContent = '☾';
    localStorage.setItem('lightDarkFlag', '0');
  }
}

// if (screen.orientation.type === 'portrait-primary') {
//   document.querySelector('svg').style.height = '60vh';
//   main.style.height = '100vh';
// } else {
//   document.querySelector('svg').style.height = '';
// }

const foot = `<h1 class="task-foot">Made with ❤ by NSVegur</h1>`;
const addMore = `<input class="task task-add" type="text" placeholder="+  Add more" />`;
const tempHidden = `<div class="tasks tasks-1 hide">
<input class="tasks-item cir-check" id="done" type="checkbox" />
<div class=" tasks-item context-after">
</div>
<div class="tasks-item due-after">
</div>
<div align="right" class="tasks-item del-after">
  <img class="del" src="Images/delete.png">
</div>
</div>`
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
const addInMore = ` <div class="tasks-add">
<div class="tasks-item cir">
  <button class="circle"></button>
</div>
<input class="tasks-item context" type="text" placeholder="Add a task"/>
<input class="tasks-item due" type="date" data-title="Due" />
</div>`;

localStorage.setItem('subPageTitle-1', 'To do');
localStorage.setItem('subPageTitle-2', 'Important');
localStorage.setItem('subPageTitle-3', 'Normal');


//Function which updates the main page
const updateMain = function () {

  heading.textContent = 'ToDo-App';

  if (localStorage.getItem('mainFlag') && localStorage.getItem('mainFullFlag')) {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + tempHidden + foot);
  }
  else if (localStorage.getItem('mainFlag')) {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addMore + tempHidden + foot);
  } else {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", html + addMore + tempHidden + foot);
  }

  Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);

}

updateMain();


//updates the changes occured in checkbox and deletions in local storage
const updateChanges = function () {

  const arr = main.innerHTML.split('<div class="tasks-add">');
  localStorage.setItem(`subPage-${whichPage}`, arr[0]);

  Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);

}


//Updates the sub page based on number 
const updateSub = function (pageNumber) {

  heading.textContent = localStorage.getItem(`subPageTitle-${pageNumber}`);



  if (localStorage.getItem(`subFlag-${pageNumber}`) && localStorage.getItem(`subFullFlag-${pageNumber}`)) {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem(`subPage-${pageNumber}`) + tempHidden + foot);
  }
  else if (localStorage.getItem(`subFlag-${pageNumber}`)) {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", localStorage.getItem(`subPage-${pageNumber}`) + addInMore + tempHidden + foot);
  } else {
    main.innerHTML = '';
    main.insertAdjacentHTML("afterbegin", addInMore + tempHidden + foot);
  }

  Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);

}

//themeChanger Function
const themeSwticher = function (colorOne, colorTwo) {
  backsOne.forEach((e) => {
    e.setAttribute('stop-color', colorOne)
  })
  backsTwo.forEach((e) => {
    e.setAttribute('stop-color', colorTwo)
  })

  metaThemeColor.setAttribute('content', colorOne);
  // console.log(metaThemeColor.getAttribute('content'))
}

//restore theme
const themeStorage = function () {
  switch (Number(localStorage.getItem('themeCount')) - 1) {
    case 1: themeSwticher(colorTwoOne, colorTwoTwo);
      ++themeCount;
      break;
    case 2: themeSwticher(colorThreeOne, colorThreeTwo);
      ++themeCount;
      break;
    case 3: themeSwticher(colorFourOne, colorFourTwo);
      ++themeCount;
      break;
    case 4: themeSwticher(colorOneOne, colorOneTwo);
      themeCount = 1;
      break;
    default: break;
  }
}

themeStorage();

let pageFlag = 0;

// art.style.background = colorOne;



lightDarkBtn.addEventListener('click',
  () => {
    Number(localStorage.getItem('lightDarkFlag')) ? lightDark(0) : lightDark(1);
  })

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
  Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);
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

// const changesInHelp = function (slide) {

//   helpSlides.forEach(
//     (s, i) => {
//       s.style.transform = `translateX(${100 * (i - slide)}%)`;
//     }
//   );
//   forAutoplay.forEach(
//     (s) => {
//       s.load();
//     }
//   )
// }



// const moveHelpSlides = function () {
//   let currentHelpSlide = 0;
//   let reverseFlag = 0;
//   helpSlideInterval = setInterval(() => {
//     if (currentHelpSlide === 0) {
//       ++currentHelpSlide;
//       changesInHelp(currentHelpSlide);
//     }
//     else if (currentHelpSlide === 1 && !reverseFlag) {
//       ++currentHelpSlide;
//       changesInHelp(currentHelpSlide);
//       reverseFlag = 1;
//     } else if (currentHelpSlide === 1 && reverseFlag) {
//       --currentHelpSlide;
//       changesInHelp(currentHelpSlide);
//       reverseFlag = 0;
//     } else if (currentHelpSlide === 2) {
//       --currentHelpSlide;
//       changesInHelp(currentHelpSlide);
//     }
//   }, 5000);
// }

//getting Started
getStartedBtn.addEventListener('click',
  () => {
    getStarted.style.display = 'none';
    document.querySelector('.help').classList.remove('hide-help');
    vid.load();
    // moveHelpSlides();
  });

helpStartedBtn.addEventListener('click',
  () => {
    document.querySelector('.help').classList.add('hide-help');
    main.classList.remove('display-content');
    document.querySelector('.task-head').classList.remove('display-content');
    localStorage.isVisited = 'true';

    // clearInterval(helpSlideInterval);
  })

//Theme Changing

theme.addEventListener('click',
  () => {
    switch (themeCount) {
      case 1: themeSwticher(colorTwoOne, colorTwoTwo);
        ++themeCount;
        break;
      case 2: themeSwticher(colorThreeOne, colorThreeTwo);
        ++themeCount;
        break;
      case 3: themeSwticher(colorFourOne, colorFourTwo);
        ++themeCount;
        break;
      case 4: themeSwticher(colorOneOne, colorOneTwo);
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
let newtask = '';

//Date modification
const dateModify = function (string) {
  const arr = string.split('-');
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
}


//Tabs count in subPage
const tabCount = function () {
  let maxArr = [];
  let tabs = document.querySelectorAll('.forTab');
  tabs.forEach((val) => {
    maxArr.push(val.dataset.sub);
  }
  )
  return Math.max(...maxArr)
}
//Enter for add
document.addEventListener('keydown',
  (e) => {

    if (e.key === 'Enter' && taskCount < 11 && pageFlag === 0 && !Number(localStorage.getItem('mainFlag'))) {
      task = document.querySelector('.task-add').value;
      localStorage.setItem(`subPageTitle-${taskCount}`, task);

      if (task !== '+  Add more' && task !== '') {
        main.innerHTML = '';
        localStorage.setItem('mainFlag', '1');
        html += `<div class="task click" data-num = ${taskCount}>
      <span><img class="task-img" src="Images/new.png" /></span>${task}</div>`;
        ++taskCount;
        main.insertAdjacentHTML("afterbegin", html + addMore + foot);
        localStorage.setItem('mainPage', html);

        Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);

      }
    } else if (e.key === 'Enter' && taskCount < 11 && pageFlag === 0) {
      task = document.querySelector('.task-add').value;
      localStorage.setItem(`subPageTitle-${taskCount}`, task);


      if (task !== '+  Add more' && task !== '') {
        main.innerHTML = '';
        const addon = `<div class="task click" data-num = ${taskCount}>
      <span><img class="task-img" src="Images/new.png" /></span>${task}</div>`;

        ++taskCount;
        if (taskCount % 6 === 0) {
        }
        if (taskCount === 11) {
          localStorage.setItem('mainFullFlag', '1');
          main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addon + foot);
          localStorage.setItem('mainPage', localStorage.getItem('mainPage') + addon);
        }
        else {
          main.insertAdjacentHTML("afterbegin", localStorage.getItem('mainPage') + addon + addMore + foot);
          localStorage.setItem('mainPage', localStorage.getItem('mainPage') + addon);
        }
      }

      Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);

    }

    if (e.key === 'Enter' && pageFlag === 1 && !Number(localStorage.getItem(`subFlag-${whichPage}`))) {

      const context = document.querySelector('.context').value;
      const date = document.querySelector('.due').value;
      const def = new Date();
      const day = `${def.getFullYear()}-${String(def.getMonth() + 1).padStart(2, '0')}-${String(def.getDate()).padStart(2, '0')}`

      if (context !== 'Add a task' && context !== '') {
        main.innerHTML = '';
        localStorage.setItem(`subFlag-${whichPage}`, '1');
        newtask = `<div class="tasks forTab" data-sub = "1">
        <div class="tasks-item cir">
        <button class="circle cir-check" data-val = "0"></button>
      </div>
      <div class=" tasks-item context-after">
        ${context}
      </div>
      <div class="tasks-item due-after">${date ? dateModify(date) : dateModify(day)}
      </div>
      <div align="right" class="tasks-item del-after">
        <img class="del" src="Images/delete.png">
      </div>
    </div>`;
        localStorage.setItem(`subTabCount-${whichPage}`, '1');

        main.insertAdjacentHTML("afterbegin", newtask + addInMore + foot);
        localStorage.setItem(`subPage-${whichPage}`, newtask);

        Number(localStorage.getItem('lightDarkFlag')) ? lightDark(1) : lightDark(0);



        pageFlag = 1;
      }
    } else if (e.key === 'Enter' && pageFlag === 1 && (Number(localStorage.getItem(`subTabCount-${whichPage}`)) < 11)) {


      const context = document.querySelector('.context').value;
      const date = document.querySelector('.due').value;
      const def = new Date();
      const day = `${def.getFullYear()}-${String(def.getMonth() + 1).padStart(2, '0')}-${String(def.getDate()).padStart(2, '0')}`

      if (context !== 'Add a task' && context !== '') {
        localStorage.setItem(`subTabCount-${whichPage}`, `${tabCount()}`);
        const dataTabCount = Number(localStorage.getItem(`subTabCount-${whichPage}`)) + 1;
        main.innerHTML = '';
        newtask = `<div class="tasks forTab" data-sub = "${String(dataTabCount)}">
        <div class="tasks-item cir">
          <button class="circle cir-check" data-val = "0"></button>
        </div>
        <div class=" tasks-item context-after">
          ${context}
        </div>
        <div class="tasks-item due-after">${date ? dateModify(date) : dateModify(day)}
        </div>
        <div align="right" class="tasks-item del-after">
          <img class="del" src="Images/delete.png">
        </div>
      </div>`;


        if (dataTabCount % 6 === 0) {
        }
        if (dataTabCount === 11) {
          localStorage.setItem(`subFullFlag-${whichPage}`, '1');
          main.insertAdjacentHTML("afterbegin", localStorage.getItem(`subPage-${whichPage}`) + newtask + foot);
          localStorage.setItem(`subPage-${whichPage}`, localStorage.getItem(`subPage-${whichPage}`) + newtask);
        }
        else {
          main.insertAdjacentHTML("afterbegin", localStorage.getItem(`subPage-${whichPage}`) + newtask + addInMore + foot);
          localStorage.setItem(`subPage-${whichPage}`, localStorage.getItem(`subPage-${whichPage}`) + newtask);
        }

        updateChanges();

      }

      pageFlag = 1;

    }

    if (e.key === 'Escape' && pageFlag == 1) {
      document.querySelector('.menuBar').classList.add('hidden');
      document.querySelector('.overlay').classList.add('hidden');

      updateMain();

      pageFlag = 0;
    }
  });


//eventlistener for tabs in main page
main.addEventListener('click',
  (e) => {
    const clicked = e.target.closest('.click');


    if (!clicked)
      return;

    whichPage = clicked.dataset.num;

    main.innerHTML = '';
    main.style.height = '160vh';

    updateSub(whichPage);



    pageFlag = 1;
  })


//Event listener for myList tab in menu
myList.addEventListener('click',
  () => {
    document.querySelector('.menuBar').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');

    updateMain();

    pageFlag = 0;
  })

//click on check box
const checkBox = function () {
  main.addEventListener('click',
    (e) => {
      const clicked = e.target.closest('button');
      if (!clicked)
        return;
      if (clicked.dataset.val === '0') {
        clicked.dataset.val = '1';
        clicked.parentElement.parentElement.querySelector('.context-after').style.textDecoration = 'line-through';
        clicked.style.background = 'black';
      } else {
        clicked.dataset.val = '0';
        clicked.parentElement.parentElement.querySelector('.context-after').style.textDecoration = 'none';
        clicked.style.background = 'transparent';
      }
      updateChanges();
    })
}

checkBox();


//Deletion of tab
const deleteTab = function () {
  main.addEventListener('click',
    (e) => {
      const clicked = e.target.closest('.del');
      if (!clicked)
        return;
      clicked.parentElement.parentElement.remove();
      let tabs = document.querySelectorAll('.forTab');
      tabs.forEach((val, index) => {
        val.dataset.sub = index + 1;
      })

      localStorage.setItem(`subTabCount-${whichPage}`, `${tabCount()}`);

      updateChanges();

      if (tabCount() < 11)
        localStorage.setItem(`subFullFlag-${whichPage}`, '');

      updateSub(whichPage);
    })
}

deleteTab();

//Helplist

help.addEventListener('click',
  () => {

    document.querySelector('.menuBar').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');

    document.querySelector('.help').classList.remove('hide-help');
    main.classList.add('display-content');
    document.querySelector('.task-head').classList.add('display-content');

    // moveHelpSlides();

    vid.load();

    updateMain();

    pageFlag = 0;
  })

creator.addEventListener('click', () => {
  window.open('https://nsvegur.github.io/Blog/');
})