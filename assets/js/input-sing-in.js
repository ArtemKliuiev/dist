import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

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

// Обработка события отправки формы (входа)
document.getElementById("sing-in").addEventListener("click", function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей email и пароля
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Вход в аккаунт через Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Вход прошел успешно, перенаправляем пользователя на его персональную страницу
      window.location.href = "person.html";
    })
    .catch((error) => {
      // Обработка ошибок при входе
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Ошибка входа:", errorCode, errorMessage);
    });
});