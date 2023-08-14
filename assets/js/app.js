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
const header = document.querySelector('header');
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        header.style.top = '0px';
        header.style.position = 'fixed';
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

//Задний фон апр скроле
window.addEventListener('scroll', () => {
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
});

 
function filtration(number){
    if(number === 1){
        localStorage.setItem('filerFun', 1);
    }else if(number === 2){
        localStorage.setItem('filerFun', 2);
    }else if(number === 3){
        localStorage.setItem('filerFun', 3);
    }else if(number === 4){
        localStorage.setItem('filerFun', 4);
    }else if(number === 5){
        localStorage.setItem('filerFun', 5);
    }else if(number === 6){
        localStorage.setItem('filerFun', 6);
    }else if(number === 7){
        localStorage.setItem('filerFun', 7);
    }else if(number === 8){
        localStorage.setItem('filerFun', 8);
    }else if(number === 9){
        localStorage.setItem('filerFun', 9);
    }
}

// Корзина

function basket(){
    body.classList.toggle('basket-active');
}

//Ajax загрузка товаров

// Функция для загрузки страницы через XMLHttpRequest
var contentElement = document.getElementById("basket-goods");
function loadItem(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var newContent = this.responseText;
            contentElement.insertAdjacentHTML('beforeend', newContent);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


// Ваш массив с URL-адресами товаров
let basketGoods = [
    // '/basket-goods/prenatal/1.html',
];

let arrScript = [

]
  
  // Функция для загрузки и добавления контента на страницу
  const containerElement = document.getElementById('basket-goods');
  function loadAndAppendContent(url) {
    fetch(url)
      .then(response => response.text())
      .then(htmlContent => {
        // Выбираем элемент, куда хотим добавить загруженный HTML код

  
        // Добавляем полученный HTML код внутрь выбранного элемента
        containerElement.innerHTML += htmlContent;
      })
      .catch(error => {
        // Обрабатываем ошибку, если запрос не удался
        console.error('Ошибка при загрузке HTML файла:', error);
      });
  }
    
  function loadScript() {
    containerElement.innerHTML = '';
    for(i=0; i < arrScript.length; i++ ){
        var script = document.createElement('script');
        script.src = arrScript[i];
        // script.setAttribute('data-dynamic', 'true'); // Добавляем атрибут data-dynamic
        document.head.appendChild(script);
    }
  }

//   

  // Загружаем и добавляем контент для каждого URL-адреса из массива
function loadGoods (){
        for (let i = 0; i < basketGoods.length; i++) {
            loadAndAppendContent(basketGoods[i]);
        }
}
loadGoods ()


function addItem (oneItem) {
    if(basketGoods.includes(oneItem)){
        console.log('товар уже в корзине')
    }else{
        basketGoods.push(oneItem)
        loadGoods ()
    }
    localStorageFunc ()
}

function addScript(script) {
    if(arrScript.includes(script)){
        console.log('скрипт уже подключен')
    }else{
        arrScript.push(script)
        console.log(arrScript)
        loadScript()
    }
    localStorageFunc ()
}


//Локальное хранилище, товары и скрипты
function localStorageFunc () {
        console.log('ok')
        localStorage.setItem('goods', JSON.stringify({
            'goodsCard': basketGoods,
            'script': arrScript,
        }))
}

(function(){
    const localInfo = JSON.parse(localStorage.getItem('goods'));
    if(localInfo !== null){
        arrScript = localInfo.script;
        basketGoods = localInfo.goodsCard;
    }
    loadGoods ();
    loadScript();
}())
