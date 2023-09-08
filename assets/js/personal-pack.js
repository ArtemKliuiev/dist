document.addEventListener('DOMContentLoaded', function() {
    const productCardsContainer = document.getElementById('goods');
  
    // Очистка содержимого контейнера
    productCardsContainer.innerHTML = '';
  
    // Функция для загрузки данных о товарах через AJAX
    function loadProducts(url) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            productCardsContainer.insertAdjacentHTML('beforeend', xhr.responseText);
          } else {
            console.log('Ошибка при загрузке данных о товарах. Код ошибки: ' + xhr.status);
          }
        }
      };
      xhr.send();
    }
  
    // Загрузка данных из 4 HTML файлов
    loadProducts('goods/personal-pack/1.html');
    loadProducts('goods/personal-pack/2.html');
    loadProducts('goods/personal-pack/3.html');
    loadProducts('goods/personal-pack/4.html');

    // Получаем элемент, которому хотим добавить класс
    const boxElement = document.querySelector('.goods-bottom');
    function checkScrollPosition() {
      let totalPageHeight = document.documentElement.scrollHeight; 
      let fixedBtn = 730;
      let res = totalPageHeight - fixedBtn;

      let scrollButtonPosition = window.scrollY + window.innerHeight;

      if (scrollButtonPosition > res) {
        boxElement.classList.add('fixed')
      } else {
        boxElement.classList.remove('fixed')
      }
    }

    window.addEventListener('load', checkScrollPosition);
    window.addEventListener('scroll', checkScrollPosition);
  });
  
//Добавление товаров в корзину
const btnAddItem = document.querySelector('#personal-pack-btn')
//Информация о товарах
let thisGoods = [
  {"id":1,"imageSrc":"https://artemkliuiev.github.io/dist/assets/images/goods/1.webp","imageSrcPng":"https://artemkliuiev.github.io/dist/assets/images/goods/1.png","type":"bg-basket-item__vitamin","name":"Ortho B Complex","price":"$61.98","quantity":1,"checkbox":true,"days":"30","sale":false,"data":"2023-09-08 13:20:30","thisItemUrl":"/dist/goods_card/vitamins/card1.html"},
  {"id":2,"imageSrc":"https://artemkliuiev.github.io/dist/assets/images/goods/2.webp","imageSrcPng":"https://artemkliuiev.github.io/dist/assets/images/goods/2.png","type":"bg-basket-item__vitamin","name":"Metagenics - 500-C Methoxyflavone","price":"$61.98","quantity":1,"checkbox":true,"days":"30","sale":false,"data":"2023-09-08 13:20:34","thisItemUrl":"/dist/goods_card/vitamins/card2.html"},
  {"id":3,"imageSrc":"https://artemkliuiev.github.io/dist/assets/images/goods/3.webp","imageSrcPng":"https://artemkliuiev.github.io/dist/assets/images/goods/3.png","type":"bg-basket-item__vitamin","name":"Ortho Molecular - Vitamin D","price":"$61.98","quantity":1,"checkbox":true,"days":"30","sale":false,"data":"2023-09-08 13:20:19","thisItemUrl":"/dist/goods_card/vitamins/card3.html"},
  {"id":13,"imageSrc":"https://artemkliuiev.github.io/dist/assets/images/goods/13.webp","imageSrcPng":"https://artemkliuiev.github.io/dist/assets/images/goods/13.png","type":"bg-basket-item__mineral","name":"Ortho Molecular Products, Reacted Chromium","price":"$61.98","quantity":1,"checkbox":true,"days":"30","sale":false,"data":"2023-09-08 13:20:38","thisItemUrl":"/dist/goods_card/mineral/card4.html"}
];

thisGoods.forEach(function(thisItem){
  console.log(thisItem.id)
});


// var currentURL = window.location.pathname;


//
let arr = [];
let localStorageArr = JSON.parse(localStorage.getItem('itemGoods'));
if(localStorageArr != null){
  arr = localStorageArr
};

//Текуща дата
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const infoDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

function addPersonalPack(){
  thisGoods.forEach(function(thisItem){
    console.log(thisItem.id);
    const findId = arr.find(function(item){
      return item.id === thisItem.id;
    });
      if(!findId){
        arr.push({
          id: thisItem.id,
          imageSrc: thisItem.imageSrc, 
          imageSrcPng: thisItem.imageSrcPng, 
          type: thisItem.type, 
          name: thisItem.name, 
          price: thisItem.price, 
          quantity: thisItem.quantity,
          checkbox: thisItem.checkbox,
          days: thisItem.days,
          sale: thisItem.sale,
          data: thisItem.data,
          thisItemUrl: thisItem.thisItemUrl,
        });
      }else{
        for(i=0;i < arr.length; i++){
          if(arr[i].id === thisItem.id){
            arr[i] = {
              id: thisItem.id,
              imageSrc: thisItem.imageSrc, 
              imageSrcPng: thisItem.imageSrcPng, 
              type: thisItem.type, 
              name: thisItem.name, 
              price: thisItem.price, 
              quantity: thisItem.quantity,
              checkbox: thisItem.checkbox,
              days: thisItem.days,
              sale: thisItem.sale,
              data: thisItem.data,
              thisItemUrl: thisItem.thisItemUrl,
            }
          }
        }
      }
      console.log(arr);
      localStorageGoods()
  });
}
btnAddItem.addEventListener('click', function(){
  addPersonalPack();
  startLoad();
  document.body.classList.add('window-active');
});

document.querySelector('.window__exit').addEventListener('click', function(){
  document.body.classList.remove('window-active');
});

//Локальное хранилище
function localStorageGoods() {
  localStorage.setItem('itemGoods', JSON.stringify(arr));
};
console.log(arr);

