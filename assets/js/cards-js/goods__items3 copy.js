const thisCard = document.querySelector('#card3');
const goodsInfo = 'item3';
const check = thisCard.querySelector('.apple-switch');
var decreaseButtons = document.getElementsByClassName("decreaseButton");
var increaseButtons = document.getElementsByClassName("increaseButton");
const removeBtn = document.querySelector('.decreaseButton-remove');
const selectedOption = thisCard.querySelector('#custom-select-option');
let numberRes = 1;
let checked = false;

function attachEventHandlers() {
  for (var i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", decreaseNumber);
  }

  for (var i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", increaseNumber);
  }
}

function decreaseNumber() {
  var numberElement = this.parentNode.querySelector(".number");
  var currentValue = parseInt(numberElement.textContent);
  if(currentValue > 1) {
    numberElement.textContent = currentValue - 1;
    if(currentValue < 3){
      removeBtn.classList.remove('opacity')
    }
  }
  numberRes = parseInt(numberElement.textContent);
  console.log(numberRes)
  localStorageFuncCard()
}

function increaseNumber() {
  var numberElement = this.parentNode.querySelector(".number");
  var currentValue = parseInt(numberElement.textContent);
  numberElement.textContent = currentValue + 1;
  if(currentValue > 0){
    removeBtn.classList.add('opacity')
  }
  numberRes = parseInt(numberElement.textContent);
  console.log(numberRes)
  localStorageFuncCard()
}

attachEventHandlers();


////////////////////////////////////////////

  // Получаем список всех выпадающих списков
  const customSelects = document.querySelectorAll('.custom-select');

  // Проходимся по каждому выпадающему списку и привязываем события
  customSelects.forEach((select) => {
    const optionsList = select.querySelector('.custom-select__list');
    const options = optionsList.querySelectorAll('li');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        selectedOption.textContent = option.textContent;
        localStorageFuncCard()
      });
    });
  });  


    console.log(selectedOption.textContent)


  document.addEventListener('DOMContentLoaded', function() {
    const productCardsContainer = document.getElementById('productCards');
  
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
    loadProducts('../../goods/for-one-item/1.html');
    loadProducts('../../goods/for-one-item/2.html');
    loadProducts('../../goods/for-one-item/3.html');
    loadProducts('../../goods/for-one-item/4.html');
  });
  
function checkedFun (){
    checked = check.checked
    localStorageFuncCard()
};
check.addEventListener("change", checkedFun);





    //Локальное хранилище
function localStorageFuncCard() {
    localStorage.setItem(goodsInfo, JSON.stringify({
        'checked': checked,
        'days': selectedOption.textContent,
        'quantity': numberRes,
    }))
}
localStorageFuncCard()

// setInterval(function(){
//   console.log(checked)
// },500)

function checkedFunc(){
  // check.checked = false
}