
const googleInput = document.querySelector('#googleInput')
//РЕГИСТРАЦИЯ
// Импортируем необходимые функции из нужных нам SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { initializeAuth, getAuth, createUserWithEmailAndPassword, signInWithRedirect, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBj0V9Ad6uhLGLP62KChqHwnUaKHL3_C3o",
    authDomain: "passord.firebaseapp.com",
    databaseURL: "https://passord-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "passord",
    storageBucket: "passord.appspot.com",
    messagingSenderId: "278411986072",
    appId: "1:278411986072:web:7f61a849fa521d7f7e3ced"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//Вход через гугл
const provider = new GoogleAuthProvider();
googleInput.addEventListener('click', (e) => {

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// Получаем кнопку регистрации по её идентификатору
const signUpButton = document.getElementById('accountLink');

// Добавляем слушатель события 'click' на кнопку регистрации
signUpButton.addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при нажатии кнопки

    // Получаем значения полей email, password и userName из формы
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var userName = document.getElementById('userName').value;
    var lastName = document.getElementById('lastName').value;

  // Создаём нового пользователя с помощью электронной почты и пароля
// Создаём нового пользователя с помощью электронной почты и пароля
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // Сохраняем информацию о пользователе в базе данных
        set(ref(database, 'users/' + user.uid), {
            userName: userName,
            email: email,
            password: password,
            lastName: lastName,
        })
        .then(() => {
            // После успешного сохранения данных в базу данных
            console.log('User signed up:', user);
            // Перенаправляем пользователя на другую страницу
            location();
        })
        .catch((error) => {
            console.error('Error while saving user data:', error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Show alert with error message
        alert(errorMessage);
        console.error('Error:', error);
    });

});

var accountLink = document.getElementById('accountLink');
function location() {
  var hrefValue = accountLink.getAttribute('href');
  if (hrefValue === "wholesale-after.html") {
    window.location.href = "wholesale-after.html";
  } else if (hrefValue === "") {
    window.location.href = "../person.html";
  }
}

