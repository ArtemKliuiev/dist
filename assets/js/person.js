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
let userEmail = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmail = user.email;
    } else {
        // Пользователь не аутентифицирован, перенаправляем его на страницу входа
        window.location.href = "/dist/sing-in/input.html";
    }
});

function firebaseDataPush() {
    const database = getDatabase(app);
    if (userEmail) {
        const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/profileData`);
        // Устанавливаем данные для пользователя с определенным ключом (email)
        set(userRef, orderData)
            .then(() => {
                alert('Данные успешно сохранены в Firebase!');
            })
            .catch((error) => {
                console.error('Ошибка сохранения данных в Firebase:', error);
            });
    } else {
        console.error('Ошибка: пользователь не аутентифицирован');
    }
};

function firebasePayDataPush() {
    const database = getDatabase(app);
    if (userEmail) {
        const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/profilePayInfo`);
        // Устанавливаем данные для пользователя с определенным ключом (email)
        set(userRef, payInfo)
            .then(() => {
                alert('Данные успешно сохранены в Firebase!');
            })
            .catch((error) => {
                console.error('Ошибка сохранения данных в Firebase:', error);
            });
    } else {
        console.error('Ошибка: пользователь не аутентифицирован');
    }
};

function isOrderDataComplete(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            return false; 
        }
    }
    return true; 
};

const saveInfoBtn = document.querySelector('#saveInfo');
saveInfoBtn.addEventListener('click', function(){
    console.log('есть ли все данные:', isOrderDataComplete(orderData));
    console.log('orderData', orderData)
    if(isOrderDataComplete(orderData)){
        firebaseDataPush()
    }else{
        console.log('не все данные были введены коректно'); 
    }
});

function location() {
    window.location.href = "/dist/order-finish.html";
}

const SavePayBtn = document.querySelector('#payInfoSave');
SavePayBtn.addEventListener('click', function(){
    console.log(payInfo)
    if(isOrderDataComplete(payInfo)){
        firebasePayDataPush()
    }
});

let orderData;
setTimeout(function(){
    console.log(userEmail);
    // В этом примере, userEmail - это email пользователя, для которого вы хотите получить данные
    const database = getDatabase(app);
    const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData/`);
    get(userRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Здесь вы можете обработать полученные данные (data)
            orderData = data
            console.log(orderData);
            orderInfo();
            historyOrderInfo();
        } else {
            console.log("Данные не найдены");
        }
    })
    .catch((error) => {
        console.error("Ошибка при получении данных:", error);
    });
},500);

//История заказов
function historyOrderInfo(){
    const historyContainer = document.querySelector('#orders')
    for (const key in orderData) {
        if (orderData.hasOwnProperty(key)) {
          const value = orderData[key];
          orderLoad(value);
        }
      }
    function orderLoad(value){
        const productHTML = `         
        <div class="one-order" id="${value.data}" >
        <div class="one-order__top-line">
          <div class="one-order__data">18 May 2020</div>
          <div class="one-order__info">Shipping</div>
          <div class="one-order__order-number">No 67824-6786</div>
        </div>
        <div class="one-order__goods" id="orders-goods"></div>
          <div class="one-order__bottom-line">
            <div class="one-order__amount-title">Order amount:</div>
            <div class="one-order__amount">$180.90</div>
            <div class="one-order__amount-btn">Add to cart</div>
          </div>
        </div>
        `; 
        const script = document.createElement('script');
        script.textContent = `
        const thisOrder = document.getElementById('${value.data}');
        // const orderContainer = document.querySelector('.one-order__goods');
        // console.log(orderContainer);
        // const itemHTML = 'fffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        // orderContainer.insertAdjacentHTML('beforeend', itemHTML); 
        `;
        historyContainer.insertAdjacentHTML('beforeend', productHTML); 
        document.body.appendChild(script);
    }
};
//Подписка
let newInfo;
let dataThisOrder;
function orderInfo(){
    let subscription;
    for (const key in orderData) {
        if (orderData.hasOwnProperty(key)) {
          const value = orderData[key];
          subscription = value;
        }
      }
    dataThisOrder = subscription.data;
    let subscriptioArr = subscription.order.filter((order) => order.checkbox === true)
    const container = document.querySelector('.profile__subscriptions-goods')
    container.innerHTML = ''
    subscriptioArr.forEach(product => { 
        const productHTML = `         
        <div class="product-profile " id="product${product.id}">
            <div class="product-profile__image ${product.type}"><img src="${product.imageSrc}" alt=""></div>
        <div class="product-profile__main">
            <div class="product-profile__type product__type antiox"></div>
            <div class="product-profile__name"><span class="display-none" ><span class="quantity-item">${product.quantity}</span> x </span>${product.name}</div>
            <div class="product-profile__data-title">Shipment every <span id="days">60</span> days</div>
            <div class="product-profile__next-data">Next delivery: <span>28</span>th <span>Apr</span> <span>2020</span></div>
        </div>
            <div class="product-profile__price">${product.price}</div>
            <div id="btn${product.id}" class="product-profile__btn">Unsubscribe</div>
        </div>
        `; 
        // function checkFunction(){
        //     console.log('ok')
        // }
        const script = document.createElement('script');
        script.textContent = `
        (function(){            
            const allBtn = document.querySelector('#btn${product.id}');
            allBtn.addEventListener('click', function(){
                console.log('удалить', ${product.id})
                
            });
        }());
        `;
        container.insertAdjacentHTML('beforeend', productHTML); 
        document.body.appendChild(script);
    });    
    // dataThis(); 
};


// function dataThis(){
//     // console.log(dataThisOrder);
//     // console.log(newInfo)
//     let localStorageNew = JSON.parse(localStorage.getItem('subscriptionsInfo'));
//     console.log(localStorageNew)
//     if(localStorageNew != null){
//         console.log(localStorageNew)
//     };
// }


//Изминение последнего заказа
function firebaseEditData() {
    const database = getDatabase(app);
    if (userEmail) {
        const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData/${dataThisOrder}/order/`);
        // Устанавливаем данные для пользователя с определенным ключом (email)
        set(userRef, newInfo)
            .then(() => {
                alert('Данные успешно сохранены в Firebase!');
            })
            .catch((error) => {
                console.error('Ошибка сохранения данных в Firebase:', error);
            });
    } else {
        console.error('Ошибка: пользователь не аутентифицирован');
    }
};
