function isOrderDataComplete(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            return false; 
        }
    }
    return true; 
}

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

const firebaseConfig = {
    apiKey: "AIzaSyBj0V9Ad6uhLGLP62KChqHwnUaKHL3_C3o",
    authDomain: "passord.firebaseapp.com",
    databaseURL: "https://passord-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "passord",
    storageBucket: "passord.appspot.com",
    messagingSenderId: "278411986072",
    appId: "1:278411986072:web:7f61a849fa521d7f7e3ced"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var userEmail = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmail = user.email;
        console.log(userEmail);
    } else {
        window.location.href = "/dist/sing-in/input.html";
    }
});

//Обнуление корзины
function basketNull() {
    localStorage.removeItem('itemGoods');
};

function firebasePush() {
    const database = getDatabase(app);
    if (userEmail) {
        const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData/${formattedDate}`);
        set(userRef, orderData)
            .then(() => {
                basketNull()
                alert('Данные успешно сохранены в Firebase!');
                location();
            })
            .catch((error) => {
                console.error('Ошибка сохранения данных в Firebase:', error);
            });
    } else {
        console.error('Ошибка: пользователь не аутентифицирован');
    }
};

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