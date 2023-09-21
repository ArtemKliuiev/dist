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
const img = document.getElementById('img');
const srcImg = document.getElementById('srcImg');
const currentURL = window.location.pathname;

let sale = thisCardId === 7;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//Прелоадер
(function(){
  const html = document.querySelector('html');
  html.classList.add('preloager-active')
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

checkbox.addEventListener('change', function(){
  if (checkbox.checked){
    checkRow.classList.add("opacity-check-row"); 
  }else{
    checkRow.classList.remove("opacity-check-row"); 
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

let products = [];
let localStorageArr = JSON.parse(localStorage.getItem('itemGoods'));
if(localStorageArr != null){
  products = localStorageArr
};

//Текуща дата arr
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const infoDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

btnAddItem.addEventListener('click', function(){
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
  const findId = products.find(function(item){
    return item.id == productId;
  });


  if(!findId){
    products.push({
      id: productId,
      imageSrc: srcImg.srcset , 
      imageSrcPng: img.src, 
      type: thisItemType, 
      name: itemName.textContent, 
      price: itemPrice.textContent.replace('$', ''), 
      quantity: number.textContent,
      checkbox: check.checked,
      days: selectedOption.textContent,
      sale: sale,
      data: infoDate,
      thisItemUrl: `${currentURL}?id=${productId}`,
    });
  }else{
    for(i=0;i < products.length; i++){
      if(products[i].id == productId){
        products[i].quantity = parseFloat(products[i].quantity) + parseFloat(number.textContent);
        products[i].days = selectedOption.textContent;
        products[i].checkbox = check.checked;
      }
    }
  }
  localStorageGoods()
});
//Локальное хранилище
function localStorageGoods() {
  localStorage.setItem('itemGoods', JSON.stringify(products));
};


