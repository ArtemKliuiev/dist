document.addEventListener('DOMContentLoaded', function() {
    const productCardsContainer = document.getElementById('goods');
  
    // Очистка содержимого контейнера
    productCardsContainer.innerHTML = '';
  
    // Функция для загрузки данных о товарах через AJAX
    function loadProducts(url) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            productCardsContainer.insertAdjacentHTML('beforeend', xhr.responseText);
          } else {
            console.log('Ошибка при загрузке данных о товарах. Код ошибки: ' + xhr.status);
          }
        }
      };
      xhr.send();
    }
  
    // Загрузка данных из 4 различных HTML файлов
    loadProducts('/dist/goods/personal-pack/1.html');
    loadProducts('/dist/goods/personal-pack/2.html');
    loadProducts('/dist/goods/personal-pack/3.html');
    loadProducts('/dist/goods/personal-pack/4.html');
  });
  
// Получаем элемент, которому хотим добавить класс
const boxElement = document.querySelector('.goods-bottom');
function checkScrollPosition() {
  let totalPageHeight = document.documentElement.scrollHeight; // Полная высота страницы
  let fixedBtn = 730;
  let res = totalPageHeight - fixedBtn;

  let scrollButtonPosition = window.scrollY + window.innerHeight;

  if (scrollButtonPosition > res) {
    boxElement.classList.add('fixed')
  } else {
    boxElement.classList.remove('fixed')
  }
}

// Выполняем функцию при загрузке страницы
window.addEventListener('load', checkScrollPosition);

// Выполняем функцию при скролле
window.addEventListener('scroll', checkScrollPosition);













// window.addEventListener('scroll', function() {
//   if (window.scrollY >= (document.body.scrollHeight - window.innerHeight - 720)) {
//     console.log(false)
//     boxElement.classList.add('fixed')
//   }else{
//     console.log(true)
//     boxElement.classList.remove('fixed')
//   }
// });
