const btnAddGoods = document.querySelector('#add-item-btn');
const basketTotalPrice = document.querySelector('#basket-total-price');
const productsContainer = document.querySelector('#basket-goods');
let products = [];

function allPrice(){
    const allPrices = document.querySelectorAll('.basket-product__price');
    let thisTotalPrice = 0;
    if(products.length >= 1){
        allPrices.forEach(function(onePrice){
            let thisPrice = parseFloat( onePrice.textContent.replace("$", ""));
            thisTotalPrice += thisPrice;
        });
        basketTotalPrice.innerHTML = `$${thisTotalPrice.toFixed(2)}`
    }else{
        basketTotalPrice.innerHTML = `$0.00`
    }
};

//Локальное хранилище
function localStorageBasketGoods() {
    localStorage.setItem('itemGoods', JSON.stringify(products));
};

// function goodsAdd(){
function addGoods(){
    productsContainer.innerHTML = ''
    products.forEach(product => { 
        const productHTML = `         
            <style>
                .opacity{
                    opacity: 0.5;
                }
            </style>
            <div id="product${product.id}" class="basket-product ${product.type}">
            <div class="basket-product__break"></div>
            <div class="basket-product__image">
                <picture>
                    <source srcset="${product.imageSrc}" type="image/webp">
                    <img src="${product.imageSrcPng}" alt="#">
                </picture>
            </div>
            <div class="basket-product__main">
                <div class="basket-product__title-row">
                    <a href="${product.thisItemUrl}" class="basket-product__title">${product.name}</a>
                    <div class="basket-product__exit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 13L13 0.999998" stroke="#C7C7C7" stroke-width="2"/>
                            <path d="M13 13L1 0.999999" stroke="#C7C7C7" stroke-width="2"/>
                        </svg>
                    </div>
                </div>
                <div class="basket-product__price-row">
                    <div class="basket-product__add-btn">
                        <div class="item-basket__quantity-buttons">
                            <div class="container ">
                                <button class="decrease item-basket__btn-decrease item-basket__add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="15" fill="#F5F5F5"/>
                                        <rect opacity="1" x="11" y="14" width="8" height="2" fill="black"/>
                                    </svg>
                                </button>
                                <span class="item-basket__quantity-number number">${product.quantity}</span>
                                <button class="increase item-basket__btn-increase item-basket__add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="15" fill="#F5F5F5"/>
                                        <path d="M16 11H14V14H11V16H14V19H16V16H19V14H16V11Z" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="price" data-price= "${product.price}" class="basket-product__price">${product.price}</div>
                </div>
                <div class="basket-product__setting-row">
                    <div class="basket-product__castum-check">
                        <input type="checkbox" class="checkbox" id="${product.id}check" name="check" />
                        <label for="${product.id}check"></label>
                    </div>
                    <div class="basket-product__info"><span>Autoship every</span><span>Deliver every</span></div>
                    <div class="basket-product__option">
                        <div class="custom-select-basket">
                            <span class="custom-select-basket__option">
                                <span id="custom-select">${product.days}</span>
                            </span>
                            <svg class="custom-select-basket__arrow" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M10 0.975838L9.02886 5.59011e-07L5 4.04832L0.971145 4.34387e-07L-2.19613e-07 0.975838L5 6L10 0.975838Z" fill="black"/>
                            </svg>
                            <ul class="custom-select-basket__list">
                            <li class="li" >15</li>
                            <li class="li" >30</li>
                            <li class="li last-li" >45</li>
                            </ul>
                        </div>
                    </div>
                    <div class="basket-product__days"><span>days</span></div>
                </div>
            </div>
        </div>
        `; 
        const script = document.createElement('script');
        script.textContent = `
        (function(){
            const thisProduct = document.querySelector('#product${product.id}');
            const optionLi = thisProduct.querySelectorAll('.li');
            const castumOption = thisProduct.querySelector('.custom-select-basket');
            const thisBreak = thisProduct.querySelector('.basket-product__break');
            const castumOptionAll = document.querySelectorAll('.custom-select-basket');
            const option = thisProduct.querySelector('#custom-select');
            const decreaseButtons = thisProduct.querySelector(".decrease");
            const increaseButtons = thisProduct.querySelector(".increase");
            const removeBtn = thisProduct.querySelector('.decreaseButton-remove');
            let number = parseFloat(thisProduct.querySelector(".number").textContent) ;
            let totalNumber = thisProduct.querySelector(".number");
            let price = thisProduct.querySelector('#price');
            const dataPrice = parseFloat(price.getAttribute("data-price").replace("$", ""));
            const check = thisProduct.querySelector('.checkbox');
            const exitCard = thisProduct.querySelector('.basket-product__exit');
            if(${product.checkbox}){
                check.checked = true;
            };
            let indexThisObj = products.findIndex(function(obj){
                return obj.id === ${product.id};
            });
            function optionFunc(num){
                option.innerHTML = num;
                if (indexThisObj !== -1) {
                    products[indexThisObj].days = num;
                    localStorageBasketGoods();
                }
            };
            optionLi.forEach(function(btn,index){
                btn.addEventListener('click', function(){
                    optionFunc(optionLi[index].textContent)
                });
            });
            //кнопки + -
            (function(){
                if(number < 2){
                    decreaseButtons.classList.add('opacity')
                }else{
                    decreaseButtons.classList.remove('opacity')
                } 
            }());
            decreaseButtons.addEventListener('click', function(){
                if(number < 2){
                    decreaseButtons.classList.add('opacity')
                }else{
                    number -= 1; 
                    if(number < 2){
                        decreaseButtons.classList.add('opacity')
                    }
                }
                totalNumber.innerHTML = number;
                totalPrice();
            });
            increaseButtons.addEventListener('click', function(){
                number += 1; 
                decreaseButtons.classList.remove('opacity')
                totalNumber.innerHTML = number;
                totalPrice();
                if (indexThisObj !== -1) {
                    products[indexThisObj].quantity = number;
                    localStorageBasketGoods();
                }
            });
            function totalPrice(){
                const totalPrice = dataPrice * number;
                price.innerHTML = '$' +  totalPrice.toFixed(2);
                allPrice();
                if (indexThisObj !== -1) {
                    products[indexThisObj].quantity = number;
                    localStorageBasketGoods();
                }
            };
            totalPrice();
            exitCard.addEventListener('click', function(){
                if (indexThisObj !== -1) {
                    products.splice(indexThisObj, 1);
                }
                localStorageBasketGoods();
                startLoad();
                allPrice();
            });
            check.addEventListener("input", function(event) {
                if (indexThisObj !== -1) {
                    products[indexThisObj].checkbox = check.checked;
                    localStorageBasketGoods();
                }
            });
            const outerContainer = document.querySelector('#basket-goods');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    castumOption.classList.remove('list-active-top');
                  } else {
                    castumOption.classList.add('list-active-top');
                  }
                });
              }, {
                threshold: 1,
                rootMargin: '50px', // Добавляем отступ в 50px
              });
              
              observer.observe(thisBreak);
            }());
        `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML); 
        document.body.appendChild(script);
    });    
    const scriptTwo = document.createElement('script');
    scriptTwo.textContent = `
        const castumOptionAll = document.querySelectorAll('.custom-select-basket');
        function removeClass(){
            for(i=0; i < castumOptionAll.length; i++){
                castumOptionAll[i].classList.remove('list-active');
            }
        }
        castumOptionAll.forEach(function(element) {
            document.addEventListener('click', function(event){
                if (element.contains(event.target)) {
                }else{
                    element.classList.remove('list-active');
                }
            });
            element.addEventListener('click', function(){
                if (element.classList.contains('list-active')) {
                    removeClass();
                } else {
                    removeClass();
                    element.classList.add('list-active');
                }
            });
        });
    `;
    document.body.appendChild(scriptTwo);
};
function startLoad(){
    let localStorageApp = JSON.parse(localStorage.getItem('itemGoods'));
    if(localStorageApp != null){
        products = localStorageApp
        if(products.length > 0){
            document.body.classList.add('not-empty');
            var cartIcon = document.querySelector('.header__basket')
            cartIcon.classList.add('shake');
            cartIcon.addEventListener('animationend', function() {
            cartIcon.classList.remove('shake');
        });
        }else{
            document.body.classList.remove('not-empty');
        }
    };
    addGoods();
};

document.addEventListener('DOMContentLoaded', function() {
    startLoad();
    if(btnAddGoods != null){
        btnAddGoods.addEventListener('click', startLoad);
    }
});

