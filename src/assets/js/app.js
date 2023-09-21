const body = document.querySelector('body')
const adaptiveMenu = () => {
    body.classList.toggle('burger-acive')
}
const adaptiveMenuShop = (number) => {
    if(number === 1){
        body.classList.add('burger-acive__shop')
    }else if (number === 2){
        body.classList.remove('burger-acive__shop')
    }
}
const adaptiveMenuInformation = (number) => {
    if(number === 1){
        body.classList.add('burger-acive__information')
    }else if (number === 2){
        body.classList.remove('burger-acive__information')
    }
}
const adaptiveMenuProfile = () => {
    body.classList.remove('burger-acive__profile')
}
const header = document.querySelector('.header');
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        header.style.top = '0px';
        header.style.position = 'fixed';
    }
  });
//Задний фон апр скроле
window.addEventListener('scroll', () => {
    if (window.innerWidth >= 768) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
            header.style.position = 'fixed';
            if (window.innerWidth <= 768) {
                header.style.top = '0px';
                header.style.position = 'fixed';
            } else{
                header.style.top = '0px';
                header.style.position = 'fixed';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.position = 'absolute';
            header.style.top = '20px';
            if (window.innerWidth <= 768) {
                header.style.top = '0px';
                header.style.position = 'absolute';
            } else{
                header.style.top = '20px';
                header.style.position = 'absolute';
            }
        }
    }else{
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
 
// Отключаем ссылку Profile при зарширении меньше 768px
const linkProfile = document.querySelector('.header__profile');
linkProfile.addEventListener('click', preventLink);
function preventLink(event) {
    if (window.innerWidth < 768) {
      event.preventDefault(); 
      body.classList.add('burger-acive__profile')
    } else {
    }
  }

// Фильтрация товаров
function filtration(number){
    localStorage.setItem('filerFun', number);
}

// Корзина
function basket(){
    body.classList.toggle('basket-active');
}
const basketBG = document.querySelector('.basket-active-bg');
basketBG.addEventListener('click', function() {
    body.classList.remove('basket-active');
});

//Адаптивное меню провиль
function filtrationProfile(number){
    localStorage.setItem('ProfileItem', number);
}
