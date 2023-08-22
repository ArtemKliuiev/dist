// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// // Конфигурация Firebase (здесь используются ваши реальные данные из Firebase проекта)
// const firebaseConfig = {
//     apiKey: "AIzaSyBj0V9Ad6uhLGLP62KChqHwnUaKHL3_C3o",
//     authDomain: "passord.firebaseapp.com",
//     databaseURL: "https://passord-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "passord",
//     storageBucket: "passord.appspot.com",
//     messagingSenderId: "278411986072",
//     appId: "1:278411986072:web:7f61a849fa521d7f7e3ced"
// };

// // Инициализация Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Проверка аутентификации при загрузке страницы
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // Аутентификация прошла успешно, отображаем email пользователя на странице
//     document.getElementById("email").textContent = user.email;

//     // Обработка нажатия кнопки выхода (логаута)
//     document.getElementById("logoutButton").addEventListener("click", () => {
//       signOut(auth)
//         .then(() => {
//           // После успешного выхода (логаута) перенаправляем пользователя на страницу входа
//           window.location.href = "input.html";
//         })
//         .catch((error) => {
//           console.error("Ошибка выхода из аккаунта:", error);
//         });
//     });
//   } else {
//     // Пользователь не аутентифицирован, перенаправляем его на страницу входа
//     window.location.href = "input.html";
//   }
// });