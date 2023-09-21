const btnAddGoods = document.querySelector('#add-item-btn');
const basketTotalPrice = document.querySelector('#basket-total-price');
const productsContainer = document.querySelector('#basket-goods');


// function goodsAdd(){
function addGoods(productsArr){
    productsContainer.innerHTML = ''
    productsArr.forEach(product => { 
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
                    <div id="price" data-price= "${product.price}" class="basket-product__price">$${product.price}</div>
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
            const option = thisProduct.querySelector('#custom-select');
            const decreaseButtons = thisProduct.querySelector(".decrease");
            const increaseButtons = thisProduct.querySelector(".increase");
            const removeBtn = thisProduct.querySelector('.decreaseButton-remove');
            const totalNumber = thisProduct.querySelector(".number");
            const price = thisProduct.querySelector('#price');
            const dataPrice = parseFloat(price.getAttribute("data-price"));
            const check = thisProduct.querySelector('.checkbox');
            const exitCard = thisProduct.querySelector('.basket-product__exit');

            if(${product.checkbox}){
                check.checked = true;
            }

            decreaseButtons.addEventListener('click', function(){
                if(parseFloat(totalNumber.innerHTML) > 1){
                    totalNumber.innerHTML = parseFloat(totalNumber.innerHTML) - 1;
                }
                changeInfo();
            });  
            increaseButtons.addEventListener('click', function(){
                totalNumber.innerHTML = parseFloat(totalNumber.innerHTML) + 1;
                changeInfo();
            });  
            function opacityBtn(){
                if(parseFloat(totalNumber.innerHTML) < 2){
                    decreaseButtons.classList.add('opacity')
                }else{
                    decreaseButtons.classList.remove('opacity')
                }
            }
            function priceInfo(){
                price.innerHTML = '$' + (dataPrice * parseFloat(totalNumber.innerHTML)).toFixed(2);
            }

            document.addEventListener('click', function(event) {
                if (!castumOption.contains(event.target)) {
                    castumOption.classList.remove('list-active');
                }
            });
            castumOption.addEventListener('click', function(){
                castumOption.classList.toggle('list-active');
            });

            optionLi.forEach(function(li){
                li.addEventListener('click', function(){
                    option.innerHTML = li.textContent
                    changeInfo();
                });
            });

            check.addEventListener('change', function(){
                changeInfo();
            });

            let delet = false;
            exitCard.addEventListener('click', function(event) {
                delet = true;
                changeInfo();
            });

            function changeInfo(){
                opacityBtn();
                priceInfo();
                const eventData = {
                    id: ${product.id},
                    checked: check.checked,
                    quantity: parseFloat(totalNumber.innerHTML),
                    days: parseFloat(option.innerHTML),
                    delet: delet,
                  };
                  
                const customEvent = new CustomEvent('myCustomEvent', {
                    detail: eventData
                });
                document.dispatchEvent(customEvent);
            }
            changeInfo();
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
};

function startLoad(itemsArr){
        if(itemsArr.length > 0){
            document.body.classList.add('not-empty');
            var cartIcon = document.querySelector('.header__basket')
            cartIcon.classList.add('shake');
            cartIcon.addEventListener('animationend', function() {
            cartIcon.classList.remove('shake');
        });
        }else{
            document.body.classList.remove('not-empty');
        }
    addGoods(itemsArr);
};

function localInfoAdd(){
    const itemGoodsJSON = localStorage.getItem('itemGoods');
    if (itemGoodsJSON) {
        products = JSON.parse(itemGoodsJSON)
        startLoad(products);
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    localInfoAdd()
    if(btnAddGoods != null){
        btnAddGoods.addEventListener('click', localInfoAdd);
    }
});

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

document.addEventListener('myCustomEvent', function(event) {
    const info = event.detail;
    const index = products.findIndex(function(obj) {
        return obj.id == info.id;
    });
    products[index].checkbox = info.checked;
    products[index].quantity = info.quantity
    products[index].days = info.days;

    if(info.delet){
        products.splice(index, 1);
        addGoods(products);
        startLoad(products);
    }
    localStorageBasketGoods();
    allPrice();
});

//Локальное хранилище
function localStorageBasketGoods() {
    localStorage.setItem('itemGoods', JSON.stringify(products));
};
