import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

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
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Обработка нажатия кнопки выхода (логаута)
    const btnSingExit = document.querySelectorAll(".sing-exit");
    btnSingExit.forEach(function(btn){
      btn.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            // После успешного выхода (логаута) перенаправляем пользователя на страницу входа
            window.location.href = "/dist/sing-in/input.html";
          })
          .catch((error) => {
            console.error("Ошибка выхода из аккаунта:", error);
          });
      });
    });
  }
});
