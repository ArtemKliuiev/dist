function isOrderDataComplete(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            return false; 
        }
    }
    return true; 
}

const placeOrder = document.querySelectorAll('.oval-button');

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
    


    function firebasePush() {
        const database = getDatabase(app);
        if (userEmail) {
            const userRef = ref(database, `users/${userEmail.replace(/\./g, '_')}/orderData`);
            // Устанавливаем данные для пользователя с определенным ключом (email)
            set(userRef, orderData)
                .then(() => {
                    alert('Данные успешно сохранены в Firebase!');
                    location(); // Перенаправление пользователя после сохранения данных
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