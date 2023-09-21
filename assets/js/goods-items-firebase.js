// Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Конфигурация Firebase (здесь используются ваши реальные данные из Firebase проекта)
const firebaseConfig = {
    apiKey: "AIzaSyBj0V9Ad6uhLGLP62KChqHwnUaKHL3_C3o",
    authDomain: "passord.firebaseapp.com",
    databaseURL: "https://passord-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "passord",
    storageBucket: "passord.appspot.com",
    messagingSenderId: "278411986072",
    appId: "1:278411986072:web:7f61a849fa521d7f7e3ced"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Проверка аутентификации при загрузке страницы
// var userEmail = null;
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // Аутентификация прошла успешно, отображаем email пользователя на странице
//         userEmail = user.email;
//         loadAllGoods()
//     } else {
//         // Пользователь не аутентифицирован, перенаправляем его на страницу входа
//         window.location.href = "/dist/sing-in/input.html";
//     }
// });



const productCardsContainer = document.getElementById('productCards');
let goods;
function loadAllGoods(){
    const database = getDatabase(app);
    const userRef = ref(database, `goodInfo`);
    get(userRef)
    .then((snapshot) => {
            goods = snapshot.val();
            //Поиск текущего товара
            const thisItem = goods.filter(function(item){
              return item.id == productId;
            });
            goodsInfo(...thisItem);
            //4 товара снизу
            let goodsIndexArr = [];
            let goodsArr = [];
            for (let i = 0; goodsIndexArr.length < 4; i++) {
                const index = Math.floor(Math.random() * goods.length);
                const indexSearchElement = goodsIndexArr.indexOf(index);
                if (indexSearchElement === -1) {
                  goodsIndexArr.push(index);
                  goodsArr.push(goods[index])
                }
              }
            goodsLoad(goodsArr);
    })
    .catch((error) => {
        console.error("Ошибка при получении данных:", error);
    });
};
loadAllGoods()

function goodsLoad(arr){
    arr.forEach(function(item){
        let type = '';
        if(item.type === 'Vitamins & Dietary Supplements'){
            type = 'vitamin';
          }else if(item.type === 'Antioxidants'){
            type = 'antiox';
          }else if(item.type === 'Minerals'){
            type = 'mineral';
          }else if(item.type === 'Pain Relief'){
            type = 'pain';
          }else if(item.type === 'Prenatal Vitamins'){
            type = 'prenatal';
          }else if(item.type === 'Probiotics'){
            type = 'probiotics';
          }else if(item.type === 'Weight Loss'){
            type = 'weight';
          }
          const productHTML = `
          <a href="${item.url}" class="product ${sale}">
              <div class="product__image image-bg__vitamin">
                  <picture>
                      <source srcset="${item.imageSrc}">
                      <img src="${item.imageSrcPng}">
                  </picture>
              </div>
              <div class="product__main">
                  <div class="product__type ${type}" >${item.type}</div>
                  <div class="product__name"><span class="display-none">${item.name}</div>
                  <div class="product__price">$${item.price}</div>
              </div>
          </a>
          `;
          productCardsContainer.insertAdjacentHTML('beforeend', productHTML); 
    });
}
  
//Функция которая заполняет информацию о данном товаре
function goodsInfo(obj){
  const img = document.getElementById('img');
  const srcImg = document.getElementById('srcImg');
  const type = document.getElementById('type');
  const name = document.getElementById('name');
  const price = document.getElementById('priceItem');
  const description = document.getElementById('description');
  const li1 = document.getElementById('li-1');
  const li2 = document.getElementById('li-2');
  const li3 = document.getElementById('li-3');
  const li4 = document.getElementById('li-4');
  const info1 = document.getElementById('info-1');
  const info2 = document.getElementById('info-2');
  const info3 = document.getElementById('info-3');
  const info4 = document.getElementById('info-4');
  const info5one = document.getElementById('info-5-1');
  const info5two = document.getElementById('info-5-2');
  const main = document.getElementById('main');
  //фото товара
  img.src = obj.imageSrc;
  srcImg.srcset = obj.imageSrcPng;
  //имя, тип, цена
  type.innerHTML = obj.type;
  name.innerHTML = obj.name
  price.innerHTML = obj.price
  //Описание
  description.innerHTML = obj.description.main;
  li1.innerHTML = obj.description.oneP;
  li2.innerHTML = obj.description.twoP;
  li3.innerHTML = obj.description.threeP;
  li4.innerHTML = obj.description.foutP;
  info1.innerHTML = obj.description.safetyInformation;
  info2.innerHTML = obj.description.indications;
  info3.innerHTML = obj.description.ingredients;
  info4.innerHTML = obj.description.directions;
  info5one.innerHTML = obj.description.disclaimerOneP;
  info5two.innerHTML = obj.description.disclaimerTwoP;

  if(obj.type === 'Vitamins & Dietary Supplements'){
    main.classList.add('vitamin');
  }else if(obj.type === 'Antioxidants'){
    main.classList.add('antiox');
  }else if(obj.type === 'Minerals'){
    main.classList.add('minerals');
  }else if(obj.type === 'Pain Relief'){
    main.classList.add('pain');
  }else if(obj.type === 'Prenatal Vitamins'){
    main.classList.add('prenatal');
  }else if(obj.type === 'Probiotics'){
    main.classList.add('probiotics');
  }else if(obj.type === 'Weight Loss'){
    main.classList.add('weight');
  }

  const html = document.querySelector('html');
  html.classList.remove('preloager-active')

  if(obj.sale){
    const main = document.querySelector('main');
    main.classList.add('sale-info')
  }
}

