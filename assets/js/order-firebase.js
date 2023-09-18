function isOrderDataComplete(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            return false; 
        }
    }
    return true; 
}

//Текуща дата
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
orderData.data = formattedDate;

const placeOrder = document.querySelectorAll('.oval-button');

let localStorageFirebase = JSON.parse(localStorage.getItem('itemGoods'));
console.log(localStorageFirebase);
orderData.order = localStorageFirebase;

// Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
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
var userEmail = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Аутентификация прошла успешно, отображаем email пользователя на странице
        userEmail = user.email;
        console.log(userEmail);
    } else {
        // Пользователь не аутентифицирован, перенаправляем его на страницу входа
        window.location.href = "/dist/sing-in/input.html";
    }
});

//Обнуление корзины
function basketNull() {
    localStorage.removeItem('itemGoods');
};

let goods = [];
let i;
// for( i= 0; i < 23; i++){
//     goods.push(
//         {
//             id: i + 1,
//             imageSrc: `https://artemkliuiev.github.io/dist/assets/images/goods/${i + 1}.webp`, 
//             imageSrcPng: `https://artemkliuiev.github.io/dist/assets/images/goods/${i + 1}.png`, 
//             type: 'Vitamins & Dietary Supplements', 
//             name: 'Ortho B Complex', 
//             price: 61.98, 
//             sale: false,
//             description:{
//                 main: '500-C Methoxyflavone is a synergistic formula that features a specialized complex of bioflavonoids combined with vitamin C.*',
//                 oneP: 'Citrus bioflavonoid complex',
//                 twoP: 'Provides potent antioxidant protection and supports healthy immune system function*',
//                 threeP: 'Supports healthy collagen production, the main component of connective tissue*',
//                 foutP: 'This product is non-GMO, gluten free, and vegetarian',
//                 safetyInformation: 'Keep out of the reach of children.',
//                 indications: 'Deficient or weak Immune System Function',
//                 ingredients: 'Vitamin C (as ascorbic acid), Citrus Bioflavonoid Complex [standardized to 45% (225 mg) bioflavonoids: hesperidin and other naturally occurring phenolic compounds]. Other Ingredients: Cellulose, silica, stearic acid (vegetable), croscarmellose sodium, magnesium stearate (vegetable), and coating (hypromellose, medium chain triglycerides, and hydroxypropylcellulose).',
//                 directions: 'Take one tablet daily or as directed by your healthcare practitioner.',
//                 disclaimerOneP: '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
//                 disclaimerTwoP: 'Statements regarding dietary supplements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease or health condition.',
//             }
//         });
// }
// console.log(goods)

// function firebasePushe() {
//     const database = getDatabase(app);
//     if (userEmail) {
//         const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData/${formattedDate}`);
//         // Устанавливаем данные для пользователя с определенным ключом (email)
//         set(userRef, goods)
//             .then(() => {
//                 basketNull()
//                 alert('Данные успешно сохранены в Firebase!');
//                 location(); // Перенаправление пользователя после сохранения данных
//             })
//             .catch((error) => {
//                 console.error('Ошибка сохранения данных в Firebase:', error);
//             });
//     } else {
//         console.error('Ошибка: пользователь не аутентифицирован');
//     }
//   };

//   firebasePushe()

// function firebasePush() {
//     const database = getDatabase(app);
//     if (userEmail) {
//         const userRef = ref(database, `goodInfo`);
//         // Устанавливаем данные для пользователя с определенным ключом (email)
//         set(userRef, goods)
//             .then(() => {
//                 basketNull()
//                 alert('Данные успешно сохранены в Firebase!');
//                 location(); // Перенаправление пользователя после сохранения данных
//             })
//             .catch((error) => {
//                 console.error('Ошибка сохранения данных в Firebase:', error);
//             });
//     } else {
//         console.error('Ошибка: пользователь не аутентифицирован');
//     }
// };
setTimeout(function(){
    firebasePush()
},1500)
placeOrder.forEach(function(btn){
    btn.addEventListener('click', function(){
        console.log('есть ли все данные:', isOrderDataComplete(orderData));
        console.log('orderData', orderData)
        if(isOrderDataComplete(orderData)){
            firebasePush()
        }else{
            console.log('не все данные были введены коректно'); 
        }
    })
});

function location() {
    window.location.href = "/dist/order-finish.html";
}


