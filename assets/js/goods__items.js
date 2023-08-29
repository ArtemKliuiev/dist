const check = document.querySelector('.apple-switch');
var decreaseButtons = document.getElementsByClassName("decreaseButton");
var increaseButtons = document.getElementsByClassName("increaseButton");
const removeBtn = document.querySelector('.decreaseButton-remove');
const selectedOption = document.querySelector('#custom-select-option');
const btnAddItem = document.getElementById('add-item-btn');
const cardItem = document.querySelector('.item');
const itemName = document.querySelector('.item__name');
const itemPrice = document.querySelector('.item__price');
const number = document.querySelector('.number');
const itemType = document.querySelector('.item__type');
const customSelects = document.querySelectorAll('.custom-select');
const thisCardId = parseFloat(cardItem.getAttribute('data-id'));

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
customSelects.forEach((select) => {
  const optionsList = select.querySelector('.custom-select__list');
  const options = optionsList.querySelectorAll('li');
  options.forEach((option) => {
    option.addEventListener('click', () => {
      selectedOption.textContent = option.textContent;
    });
  });
});  

//
let arr = [];
let localStorageArr = JSON.parse(localStorage.getItem('itemGoods'));
if(localStorageArr != null){
  arr = localStorageArr
};


btnAddItem.addEventListener('click', function(){
  const findId = arr.find(function(item){
  return item.id === thisCardId;
  });
  if(!findId){
    arr.push({
      id: thisCardId,
      imageSrc: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.webp`, 
      type: thisItemType, 
      name: itemName.textContent, 
      price: itemPrice.textContent, 
      quantity: number.textContent,
      checkbox: check.checked,
      days: selectedOption.textContent,
      sale: sale,
    });
  }else{
    for(i=0;i < arr.length; i++){
      if(arr[i].id === thisCardId){
        arr[i] = {
          id: thisCardId,
          imageSrc: `https://artemkliuiev.github.io/dist/assets/images/goods/${thisCardId}.webp`, 
          type: thisItemType, 
          name: itemName.textContent, 
          price: itemPrice.textContent, 
          quantity: number.textContent, 
          checkbox: check.checked,
          days: selectedOption.textContent,
          sale: sale,
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
console.log(arr)


