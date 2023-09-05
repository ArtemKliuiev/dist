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
},800);

//Преобразование даты
function formatDate(inputDate, type) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Octr', 'Nov', 'Dec'
    ];
    const parts = inputDate.split(' '); // Разбиваем строку по пробелу
    const datePart = parts[0]; // "2023-08-31"
    const timePart = parts[1]; // "17:27:15"

    const dateComponents = datePart.split('-'); // Разбиваем дату по дефису
    const year = dateComponents[0]; // "2023"
    const monthIndex = parseInt(dateComponents[1]) - 1; // "08" -> 7 (индекс массива months)
    const day = dateComponents[2]; // "31"
    let formattedDate;
    if(type === 1){
        formattedDate = `${day} ${months[monthIndex]} ${year}`;
    }else if(type === 2){
        formattedDate = `${day}th ${months[monthIndex]} ${year}`;
    }
    return formattedDate;
}

//История заказов
function historyOrderInfo(){
    const historyContainer = document.querySelector('#orders');
    var orderCount = 0;
    for (const key in orderData) {
        if (orderData.hasOwnProperty(key)) {
            const value = orderData[key];
            const formattedDate = formatDate(value.data, 1);
            //   console.log(value);
            orderCount = orderCount + 1;
            const productHTML = `         
            <div class="one-order one-order${orderCount}" id="${orderCount}" >
            <div class="one-order__top-line top-line${orderCount}">
                <div class="one-order__data">${formattedDate}<span class="span-adaptive"><span>•</span>Shipping</span></div>
                <div class="one-order__info">Shipping</div>
                <span class="one-order__arrow span-adaptive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                        <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M14.8788 1.46376L13.4339 3.6646e-07L7.43942 6.07249L1.44495 -6.31608e-08L-3.2942e-07 1.46376L7.43942 9L14.8788 1.46376Z" fill="black"/>
                    </svg>
                </span>
                <div class="one-order__order-number">No 67824-${orderCount}</div>
            </div>
            <div class="one-order__goods goods${orderCount}" id="orders-goods"></div>
                <div class="one-order__bottom-line">
                <div class="one-order__amount-title">Order amount:</div>
                <div class="one-order__amount">$0.00</div>
                <div class="one-order__amount-btn">Add to cart</div>
                </div>
            </div>
            `; 
            const script = document.createElement('script');
            const thisOrderInfo = value.order
            for (let i = 0; i < thisOrderInfo.length; i++) {
            let typeInfo;
            let typeForClass;
            if(thisOrderInfo[i].type === 'bg-basket-item__vitamin'){
                typeInfo ='Vitamins & Dietary Supplements';
                typeForClass = 'vitamin';
            }else if(thisOrderInfo[i].type === 'bg-basket-item__antiox'){
                typeInfo ='Antioxidants';
                typeForClass = 'antioxid';
            }else if(thisOrderInfo[i].type === 'bg-basket-item__mineral'){
                typeInfo ='Minerals';
                typeForClass = 'mineral';
            }else if(thisOrderInfo[i].type === 'bg-basket-item__pain'){
                typeInfo ='Pain Relief';
                typeForClass = 'pain'
            }else if(thisOrderInfo[i].type === 'bg-basket-item__prenatal'){
                typeInfo ='Prenatal Vitamins';
                typeForClass = 'prenatal';
            }else if(thisOrderInfo[i].type === 'bg-basket-item__probiotics'){
                typeInfo ='Probiotics';
                typeForClass = 'probiotic'
            }else if(thisOrderInfo[i].type === 'bg-basket-item__weight'){
                typeInfo ='Weight Loss';
                typeForClass = 'weight'
            }
            script.textContent += `
            (function(){
                const thisItem = document.querySelector('.one-order${orderCount}');
                const thisOrderContainer = document.querySelector('.goods${orderCount}');
                const tabsBtn = document.querySelector('.top-line${orderCount}');
                let count = false;
                tabsBtn.addEventListener("click", function(){
                    if(!count){
                        var activeElements = document.querySelectorAll('.orders-active');
                        activeElements.forEach(function(element) {
                            element.classList.remove('orders-active');
                        });
                        thisItem.classList.add('orders-active');
                    }else{
                        thisItem.classList.remove('orders-active');
                    }
                    count = !count;
                });
                thisOrderContainer.innerHTML += '\
                <div class="product-history ${typeForClass}">\
                    <div class="product-history__image"><img src="${thisOrderInfo[i].imageSrc}" alt=""></div>\
                    <div class="product-history__main">\
                        <div class="product-history__type">${typeInfo}</div>\
                        <div class="product-history__name"><span class="display-none"><span class="quantity-item">${thisOrderInfo[i].quantity}</span> x </span>${thisOrderInfo[i].name}</div>\
                        <div class="product-history__price">${thisOrderInfo[i].price}</div>\
                        <div class="product-history__all-price">${parseFloat(thisOrderInfo[i].price.replace('$', '')) *  thisOrderInfo[i].quantity}</div>\
                    </div>\
                </div>\
                '; 
            })();
            `;
          }
          const scriptTwo = document.createElement('script');
          scriptTwo.textContent = `
          (function(){
            const thisOrder = document.getElementById('${orderCount}')
            const btnAddGoods = thisOrder.querySelector('.one-order__amount-btn');
            const thisPrices = thisOrder.querySelector('.one-order__amount');
            const allPriceThisOrder = thisOrder.querySelectorAll('.product-history__all-price');
            let thisAllPrice = 0
            allPriceThisOrder.forEach(function(thisPrice){
                thisAllPrice += parseFloat(thisPrice.textContent)
            });
            thisPrices.innerHTML = '$' + thisAllPrice.toFixed(2);
            btnAddGoods.addEventListener('click', function(){
                const customEvent = new CustomEvent('thisOrder', { 'detail': '${value.data}' });
                document.dispatchEvent(customEvent);
            });
          }());
          `;
          historyContainer.insertAdjacentHTML('beforeend', productHTML); 
          document.body.appendChild(script);
          document.body.appendChild(scriptTwo);
        }
    }
};

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

//Локальное хранилище
function localStorageGoods() {
  localStorage.setItem('itemGoods', JSON.stringify(arr));
};

document.addEventListener('thisOrder', function(event) {
    const info = event.detail;
    const arrOrder = orderData[info].order;
    arrOrder.forEach(function(thisOrder){
        const findId = arr.find(function(item){
            return item.id === thisOrder.id;
        });
        if(!findId){
            console.log(thisOrder.id)
          arr.push({
            id: thisOrder.id,
            imageSrc: `${thisOrder.imageSrc}`, 
            type: thisOrder.type, 
            name: thisOrder.name, 
            price: thisOrder.price, 
            quantity: thisOrder.quantity,
            checkbox: thisOrder.checkbox,
            days: thisOrder.days,
            sale: thisOrder.sale,
            data: thisOrder.data,
          });
        }else{
            console.log(thisOrder.id, 'ss')
            arr.forEach(function(thisArr){
                thisArr = {
                    id: thisOrder.id,
                    imageSrc: `${thisOrder.imageSrc}`, 
                    type: thisOrder.type, 
                    name: thisOrder.name, 
                    price: thisOrder.price, 
                    quantity: thisOrder.quantity,
                    checkbox: thisOrder.checkbox,
                    days: thisOrder.days,
                    sale: thisOrder.sale,
                    data: thisOrder.data,
                }
            });
          }
        console.log(arr);
        localStorageGoods()
        addGoodsTwo()
    });
});
console.log(arr);

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
    newInfo = subscription;
    dataThisOrder = subscription.data;
    let subscriptioArr = subscription.order.filter((order) => order.checkbox === true)
    const container = document.querySelector('.profile__subscriptions-goods')
    container.innerHTML = ''
    subscriptioArr.forEach(product => { 
        const currentDate = new Date(product.data);
        currentDate.setDate(currentDate.getDate() + parseFloat(product.days));
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
        const totalData = formatDate(formattedDate, 2)
        let typeInfo;
        let typeForClass;
        if(product.type === 'bg-basket-item__vitamin'){
            typeInfo ='Vitamins & Dietary Supplements';
            typeForClass = 'vitamin';
        }else if(product.type === 'bg-basket-item__antiox'){
            typeInfo ='Antioxidants';
            typeForClass = 'antioxid';
        }else if(product.type === 'bg-basket-item__mineral'){
            typeInfo ='Minerals';
            typeForClass = 'mineral';
        }else if(product.type === 'bg-basket-item__pain'){
            typeInfo ='Pain Relief';
            typeForClass = 'pain'
        }else if(product.type === 'bg-basket-item__prenatal'){
            typeInfo ='Prenatal Vitamins';
            typeForClass = 'prenatal';
        }else if(product.type === 'bg-basket-item__probiotics'){
            typeInfo ='Probiotics';
            typeForClass = 'probiotic'
        }else if(product.type === 'bg-basket-item__weight'){
            typeInfo ='Weight Loss';
            typeForClass = 'weight'
        }
        const productHTML = `         
        <div class="product-profile " id="product${product.id}">
            <div class="product-profile__image ${product.type}"><img src="${product.imageSrc}" alt=""></div>
            <div class="product-profile__main">
                <div class="product-profile__type ${typeForClass}">${typeInfo}</div>
                <div class="product-profile__name"><span class="display-none"><span class="quantity-item">${product.quantity}</span> x </span>${product.name}</div>
                <div class="product-profile__data-title">Shipment every <span id="days">${product.days}</span> days</div>
                <div class="product-profile__next-data">Next delivery: ${totalData}</div>
                <div class="product-profile__price-adaptive">${product.price}</div>
            </div>
            <div class="product-profile__price">${product.price}</div>
            <div id="btn${product.id}" class="product-profile__btn">Unsubscribe</div>
        </div>
        `; 
        const script = document.createElement('script');
        script.textContent = `
        (function(){    
            const thisProduct = document.querySelector('#product${product.id}');     
            const allBtn = document.querySelector('#btn${product.id}');
            allBtn.addEventListener('click', function(){
                const customEvent = new CustomEvent('dataAvailable', { detail: '${product.id}' });
                document.dispatchEvent(customEvent);
            });
        }());
        `;
        container.insertAdjacentHTML('beforeend', productHTML); 
        document.body.appendChild(script);
    });    
};

// В вашем основном коде
let newOrderInfo;
document.addEventListener('dataAvailable', function(event) {
    const info = parseFloat(event.detail);
    const arrInfo = newInfo.order;
    const thisOrder = arrInfo.map((order) =>{
        if(order.id === info){
            order.checkbox = !order.checkbox
            console.log(order.checkbox)
        }
    });
    orderInfo();
    newOrderInfo = arrInfo;
    console.log(arrInfo)
    firebaseEditData()
});

// Обычная функция, которую мы хотим вызвать из динамически созданного скрипта
function myFunction() {
    console.log('Функция из обычного скрипта');
}

// Экспортируем функцию
export { myFunction };

//Изминение последнего заказа
function firebaseEditData() {
    const database = getDatabase(app);
    if (userEmail) {
        const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData/${dataThisOrder}/order/`);
        // Устанавливаем данные для пользователя с определенным ключом (email)
        set(userRef, newOrderInfo)
            .then(() => {
            })
            .catch((error) => {
                console.error('Ошибка сохранения данных в Firebase:', error);
            });
    } else {
        console.error('Ошибка: пользователь не аутентифицирован');
    }
};

function addGoodsTwo(){
    function startLoad(){
        let localStorageApp = JSON.parse(localStorage.getItem('itemGoods'));
        if(localStorageApp != null){
            products = localStorageApp
        };
        addGoods();
    };
    startLoad();
    
    if(btnAddGoods != null){
        btnAddGoods.addEventListener('click', startLoad);
    }
}
