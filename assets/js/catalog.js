//Прелоадер
(function(){
  const html = document.querySelector('html');
  html.classList.add('preloager-active')
}());

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1.28,
    centeredSlides: true,
    spaceBetween: 50,
    centeredSlidesBounds: true,
    // If we need pagination
    breakpoints: {
          100: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        600: {
            slidesPerView: 1.2,
            spaceBetween: 25,
        },
        800: {
            slidesPerView: 1.15,
            spaceBetween: 30,
        },
        1030: {
            slidesPerView: 1.2,
            spaceBetween: 40,
        },
        1500: {
            slidesPerView: 1.28,
        },
        2000: {
            slidesPerView: 1.5,
        },
      },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button__prev',
      prevEl: '.swiper-button__next',
    },
  });

  const comentarSwiper = new Swiper('.comentars-swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 3000,
      },
    breakpoints: {
      650: {
          slidesPerView: 2,
          spaceBetween: 33,
      },
      1350: {
        slidesPerView: 3,
        spaceBetween: 33,
      },
    },
});



  // Добавление обработчика события на завершение перехода к новому слайду
  swiper.on('slideChangeTransitionEnd', function () {
    var activeSlide = swiper.slides[swiper.activeIndex];
    var slideIndex = activeSlide.getAttribute('slide-index');

    // Получаем все элементы точек пагинации
    var paginationItems = document.querySelectorAll('.swiper-pagination__item');

    // Удаляем класс 'swiper-pagination__item-active' у всех элементов точек
    paginationItems.forEach(function(item) {
      item.classList.remove('swiper-pagination__item-active');
    });

    // Добавляем класс 'swiper-pagination__item-active' для соответствующей точки пагинации
    paginationItems[slideIndex - 1].classList.add('swiper-pagination__item-active');
  });

// Получаем элементы блоков
var block1 = document.querySelector('.banner');
var block2 = document.querySelector('.swiper-button');

// Функция для присвоения ширины второму блоку
function setBlock2Width() {
  var block1Width = block1.offsetWidth; // Получаем ширину первого блока
  block2.style.width = block1Width + 90 + 'px'; // Присваиваем ширину второму блоку
}

// Функция для задержки вызова функции setBlock2Width()
function debounce(func, delay) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

// Вызываем функцию для установки начальной ширины второго блока
setBlock2Width();

// Добавляем обработчик события на изменение размеров окна с задержкой в 300 миллисекунд
window.addEventListener('resize', debounce(function () {
  setBlock2Width(); // Вызываем функцию при изменении размеров окна
}, 300));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ajax загругка товаров
const loadBtn =document.querySelector('#loadButton')
const allGoods = document.getElementById('allGoods')
const vitamins = document.getElementById('vitamins')
const weightLoss = document.getElementById('weight-loss')
const minerals = document.getElementById('minerals')
const probiotics = document.getElementById('probiotics')
const antioxidants = document.getElementById('antioxidants')
const painId = document.getElementById('painId')
const prenatalId = document.getElementById('prenatalId')
const saleId = document.getElementById('saleId')
const menuTitle = document.querySelector('#title-menu')

// Массив с URL-адресами страниц для загрузки







function addAllGoods(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  allGoods.classList.add('active')
  menuTitle.innerHTML = allGoods.innerText;
  menuTitle.style.color = '#000000';
}
function vitam(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  vitamins.classList.add('active')
  menuTitle.style.color = '#000000';
}
function weights(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  weightLoss.classList.add('active')
  menuTitle.innerHTML = weightLoss.innerText;
  menuTitle.style.color = '#000000';
}
function mineralFun(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  minerals.classList.add('active')
  menuTitle.innerHTML = minerals.innerText;
  menuTitle.style.color = '#000000';
}
function probiot(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  probiotics.classList.add('active')
  menuTitle.innerHTML = probiotics.innerText;
  menuTitle.style.color = '#000000';
}
function antioxid(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  antioxidants.classList.add('active')
  menuTitle.innerHTML = antioxidants.innerText;
  menuTitle.style.color = '#000000';
}
function painFun(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  painId.classList.add('active');
  menuTitle.innerHTML = painId.innerText;
  menuTitle.style.color = '#000000';
}
function prenatalFun(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  prenatalId.classList.add('active')
  menuTitle.innerHTML = prenatalId.innerText;
  menuTitle.style.color = '#000000';
}
function saleFun(){
  document.getElementById("goods").innerHTML = '';
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach(element => {
    element.classList.remove('active');
  });
  saleId.classList.add('active');
  menuTitle.innerHTML = saleId.innerText;
  menuTitle.style.color = '#D32D2C';
}

//adaptive-menu
const containerMenu = document.querySelector('.goods__menu')
const menuBtn = document.querySelector('.goods__adaptine-menu');
menuBtn.onclick = function () {
  containerMenu.classList.toggle('adaptive-menu-active');
};
function adaptiveBtn() {
  containerMenu.classList.toggle('adaptive-menu-active');
}

//Фильтрация при переходе по ссылке
const filerFun = localStorage.getItem('filerFun');
setTimeout(function(){
  if(filerFun == 1){
      addAllGoods()
  }else if(filerFun == 2){
      vitam()
  }else if(filerFun == 3){
      weights()
  }else if(filerFun == 4){
      mineralFun()
  }else if(filerFun == 5){
      antioxid()
  }else if(filerFun == 6){
      probiot()
  }else if(filerFun == 7){
      painFun()
  }else if(filerFun == 8){
      prenatalFun()
  }else if(filerFun == 9){
      saleFun()
  }
}, 200);

