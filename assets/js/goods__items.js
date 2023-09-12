const check = document.querySelector('.apple-switch');
var decreaseButtons = document.getElementsByClassName("decreaseButton");
var increaseButtons = document.getElementsByClassName("increaseButton");
const removeBtn = document.querySelector('.decreaseButton-remove');
const selectedOption = document.querySelector('#custom-select-option');
const selectedOptionWrapper = document.querySelector('.custom-select__option');
const btnAddItem = document.getElementById('add-item-btn');
const cardItem = document.querySelector('.item');
const itemName = document.querySelector('.item__name');
const itemPrice = document.querySelector('.item__price');
const number = document.querySelector('.number');
const itemType = document.querySelector('.item__type');
const customSelects = document.querySelectorAll('.custom-select');
const thisCardId = parseFloat(cardItem.getAttribute('data-id'));
const checkRowItem = document.querySelector('.item__check-row');
const checkRowItemLabel = document.querySelectorAll('.item__check-row label');
const checkbox = document.querySelector('.apple-switch');
const checkRow = document.querySelector(".item__check-row");

let sale = thisCardId === 7;

//Cчетчик товаров
function attachEventHandlers() {
  for (var i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", decreaseNumber);
  }

  for (var i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", increaseNumber);
  }
};

var currentURL = window.location.pathname;

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
};

function increaseNumber() {
  var numberElement = this.parentNode.querySelector(".number");
  var currentValue = parseInt(numberElement.textContent);
  numberElement.textContent = currentValue + 1;
  if(currentValue > 0){
    removeBtn.classList.add('opacity')
  }
  numberRes = parseInt(numberElement.textContent);
};
attachEventHandlers();

//Тип товара
let thisItemType = '';
(function(){
  if(itemType.textContent === 'Vitamins & Dietary Supplements'){
    thisItemType = 'bg-basket-item__vitamin';
  }else if(itemType.textContent === 'Antioxidants'){
    thisItemType = 'bg-basket-item__antiox';
  }else if(itemType.textContent === 'Minerals'){
    thisItemType = 'bg-basket-item__mineral';
  }else if(itemType.textContent === 'Pain Relief'){
    thisItemType = 'bg-basket-item__pain';
  }else if(itemType.textContent === 'Prenatal Vitamins'){
    thisItemType = 'bg-basket-item__prenatal';
  }else if(itemType.textContent === 'Probiotics'){
    thisItemType = 'bg-basket-item__probiotics';
  }else if(itemType.textContent === 'Weight Loss'){
    thisItemType = 'bg-basket-item__weight';
  }
}());

//Касиумный Оптион
selectedOptionWrapper.addEventListener('click', function() {
  if (checkbox.checked){
    checkRowItem.classList.toggle('list-active');
  }
});

checkRowItemLabel.forEach(function(label){
  if (checkbox.checked){
  label.addEventListener('click', function(){
    checkRowItem.classList.toggle('list-active');
  });
  }
});

customSelects.forEach((select) => {
  const optionsList = select.querySelector('.custom-select__list');
  const options = optionsList.querySelectorAll('li');
  options.forEach((option) => {
    option.addEventListener('click', () => {
      selectedOption.textContent = option.textContent;
      checkRowItem.classList.remove('list-active');
      checkbox.checked = true
      checkRow.classList.add("opacity-check-row"); 
    });
  });
});  

document.addEventListener('click', function(event) {
  const labelOne = checkRowItemLabel[0];
  const labelTwo = checkRowItemLabel[1];
  if ( labelOne.contains(event.target)) {
  }else if(labelTwo.contains(event.target)){
  }else if(selectedOptionWrapper.contains(event.target)){
  }else{
    checkRowItem.classList.remove('list-active');
  }
});


//
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

btnAddItem.addEventListener('click', function(){
  const findId = arr.find(function(item){
  return item.id === thisCardId;
  });
  if(!findId){
    arr.push({
      id: thisCardId,
      imageSrc: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.webp`, 
      imageSrcPng: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.png`, 
      type: thisItemType, 
      name: itemName.textContent, 
      price: itemPrice.textContent, 
      quantity: number.textContent,
      checkbox: check.checked,
      days: selectedOption.textContent,
      sale: sale,
      data: infoDate,
      thisItemUrl: currentURL,
    });
  }else{
    for(i=0;i < arr.length; i++){
      if(arr[i].id === thisCardId){
        arr[i] = {
          id: thisCardId,
          imageSrc: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.webp`, 
          imageSrcPng: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.png`, 
          type: thisItemType, 
          name: itemName.textContent, 
          price: itemPrice.textContent, 
          quantity: number.textContent, 
          checkbox: check.checked,
          days: selectedOption.textContent,
          sale: sale,
          data: infoDate,
          thisItemUrl: currentURL,
        }
      }
    }
  }
  console.log(arr);
  localStorageGoods()
});
//Локальное хранилище
function localStorageGoods() {
  localStorage.setItem('itemGoods', JSON.stringify(arr));
};
console.log(arr);

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

//Кастумная галочка
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    checkRow.classList.add("opacity-check-row"); 
  } else {
    checkRow.classList.remove("opacity-check-row");
  }
});