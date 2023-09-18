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
//         console.log(userEmail);
//         loadAllGoods()
//     } else {
//         // // Пользователь не аутентифицирован, перенаправляем его на страницу входа
//         // window.location.href = "/dist/sing-in/input.html";
//     }
// });

let goods;
// function loadAllGoods(){
//     const filerFun = localStorage.getItem('filerFun');
//     console.log(userEmail);
//     const database = getDatabase(app);
//     const userRef = ref(database, `goodInfo`);
//     get(userRef)
//     .then((snapshot) => {
//         if (snapshot.exists()) {
//             goods = snapshot.val();
//             if(filerFun !== null){
//                 loadGoodsFilter(parseFloat(filerFun))
//                 localStorage.setItem('filerFun', 1);
//             }else{
//                 loadGoodsFilter(1)
//             }
//         } else {
//             console.log("Данные не найдены");
//         }
//     })
//     .catch((error) => {
//         console.error("Ошибка при получении данных:", error);
//     });
// };

// Функция для загрузки данных
function loadAllGoods() {
    const filerFun = localStorage.getItem('filerFun');
    const database = getDatabase(app);
    const userRef = ref(database, `goodInfo`);
    
    get(userRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            goods = snapshot.val();
            if(filerFun !== null){
                loadGoodsFilter(parseFloat(filerFun))
                localStorage.setItem('filerFun', 1);
            }else{
                loadGoodsFilter(1)
            }
            console.log("Загруженные данные:", goods);
        } else {
            console.log("Данные не найдены");
        }
    })
    .catch((error) => {
        console.error("Ошибка при получении данных:", error);
    });
}

// Вызываем функцию для загрузки данных
loadAllGoods();

function loadGoodsFilter(num){
    let newArr = [];
    if(num === 1){
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

allGoods.addEventListener('click', function(){
    loadGoodsFilter(1);
});
vitamins.addEventListener('click', function(){
    loadGoodsFilter(2);
});
weightLoss.addEventListener('click', function(){
    loadGoodsFilter(8)
});
minerals.addEventListener('click', function(){
    loadGoodsFilter(4)
});
probiotics.addEventListener('click', function(){
    loadGoodsFilter(7)
});
antioxidants.addEventListener('click', function(){
    loadGoodsFilter(3)
});
painId.addEventListener('click', function(){
    loadGoodsFilter(5)
});
prenatalId.addEventListener('click', function(){
    loadGoodsFilter(6)
});
saleId.addEventListener('click', function(){
    loadGoodsFilter(9)
});

// const loadBtn =document.querySelector('#loadButton')
// const allGoods = document.getElementById('allGoods')
// const vitamins = document.getElementById('vitamins')
// const weightLoss = document.getElementById('weight-loss')
// const minerals = document.getElementById('minerals')
// const probiotics = document.getElementById('probiotics')
// const antioxidants = document.getElementById('antioxidants')
// const painId = document.getElementById('painId')
// const prenatalId = document.getElementById('prenatalId')
// const saleId = document.getElementById('saleId')
// const menuTitle = document.querySelector('#title-menu')








































