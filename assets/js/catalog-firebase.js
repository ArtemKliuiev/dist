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


// Функция для загрузки данных
let goods;
function loadAllGoods() {
    const filerFun = localStorage.getItem('filerFun');
    const database = getDatabase(app);
    const userRef = ref(database, `goodInfo`);
    get(userRef)
    .then((snapshot) => {
        goods = snapshot.val();
            if(filerFun !== null){
                loadGoodsFilter(parseFloat(filerFun))
                localStorage.setItem('filerFun', 1);
            }else{
                loadGoodsFilter(1)
            }
    })
}

// Вызываем функцию для загрузки данных
loadAllGoods();

function loadGoodsFilter(num){
    let newArr = [];
    if(num == 1){
        newArr = goods;
    }else if(num == 2){
        newArr = goods.filter(function(item){
          return  item.type == 'Vitamins & Dietary Supplements';
        });
    }else if(num == 3){
        newArr = goods.filter(function(item){
            return  item.type == 'Antioxidants';
        });
    }else if(num == 4){
        newArr = goods.filter(function(item){
            return  item.type == 'Minerals';
        });
    }else if(num == 5){
        newArr = goods.filter(function(item){
            return  item.type == 'Pain Relief';
        });
    }else if(num == 6){
        newArr = goods.filter(function(item){
            return  item.type == 'Prenatal Vitamins';
        });
    }else if(num == 7){
        newArr = goods.filter(function(item){
            return  item.type == 'Probiotics';
        });
    }else if(num == 8){
        newArr = goods.filter(function(item){
            return  item.type == 'Weight Loss';
        });
    }else if(num == 9){
        newArr = goods.filter(function(item){
            return  item.sale === true;
        });
    }
    const containerGoods = document.querySelector('#goods');
    containerGoods.innerHTML = '';
    newArr.forEach(function(item){
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
        let sale = '';
        if(item.sale){
            sale = 'sale'
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
                <div class="product__name"><span class="display-none" ><span class="quantity-item item1">1</span> x </span>${item.name}</div>
                <div class="product__price">$${item.price}</div>
                <div class="product__price-total">$0.00</div>
            </div>
        </a>
        `;
        containerGoods.insertAdjacentHTML('beforeend', productHTML); 
    });
    const html = document.querySelector('html');
    html.classList.remove('preloager-active')
}

//Табы
const filterButtons = document.querySelectorAll('.menu-two__item');

filterButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const filterValue = button.getAttribute('data-filter');
    loadGoodsFilter(filterValue);
  });
});










































