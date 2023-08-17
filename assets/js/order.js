const btnList = document.querySelector('.adaprive-list');
const body = document.querySelector('body');
const goodsContainer = document.querySelector('#goods');
const totalPrice = document.querySelector('#total-price');
const discountPrice = document.querySelector('#discount-price');
const delivery = document.querySelector('#delivery');
const allPrice = document.querySelector('#all-price');

//
btnList.addEventListener('click', function(){
    body.classList.toggle('adaprive-list-active')
})

let arrUrls = [];


const localStoragePages = localStorage.getItem('goods');
const item1 = JSON.parse(localStorage.getItem('item1'));
const item2 = JSON.parse(localStorage.getItem('item2'));
const item3 = JSON.parse(localStorage.getItem('item3'));
const item4 = JSON.parse(localStorage.getItem('item4'));
const item5 = JSON.parse(localStorage.getItem('item5'));
const item6 = JSON.parse(localStorage.getItem('item6'));
const item7 = JSON.parse(localStorage.getItem('item7'));
const item8 = JSON.parse(localStorage.getItem('item8'));
const item9 = JSON.parse(localStorage.getItem('item9'));
const item10 = JSON.parse(localStorage.getItem('item10'));
const item11 = JSON.parse(localStorage.getItem('item11'));
const item12 = JSON.parse(localStorage.getItem('item12'));
const item13 = JSON.parse(localStorage.getItem('item13'));
const item14 = JSON.parse(localStorage.getItem('item14'));
const item15 = JSON.parse(localStorage.getItem('item15'));
const item16 = JSON.parse(localStorage.getItem('item16'));
const item17 = JSON.parse(localStorage.getItem('item17'));
const item18 = JSON.parse(localStorage.getItem('item18'));
const item19 = JSON.parse(localStorage.getItem('item19'));
const item20 = JSON.parse(localStorage.getItem('item20'));
const item21 = JSON.parse(localStorage.getItem('item21'));
const item22 = JSON.parse(localStorage.getItem('item22'));
const item23 = JSON.parse(localStorage.getItem('item23'));

function quantityItem(){
    if(item1 != null){
        document.querySelector('.item1').innerHTML = item1.quantity;
    }
    if(item2 != null){
        document.querySelector('.item2').innerHTML = item2.quantity;
    }
    if(item3 != null){
        document.querySelector('.item3').innerHTML = item3.quantity;
    }
    if(item4 != null){
        document.querySelector('.item4').innerHTML = item4.quantity;
    }
    if(item5 != null){
        document.querySelector('.item5').innerHTML = item5.quantity;
    }
    if(item6 != null){
        document.querySelector('.item6').innerHTML = item6.quantity;
    }
    if(item7 != null){
        document.querySelector('.item7').innerHTML = item7.quantity;
    }
    if(item8 != null){
        document.querySelector('.item8').innerHTML = item8.quantity;
    }
    if(item9 != null){
        document.querySelector('.item9').innerHTML = item9.quantity;
    }
    if(item10 != null){
        document.querySelector('.item10').innerHTML = item10.quantity;
    }
    if(item11 != null){
        document.querySelector('.item11').innerHTML = item11.quantity;
    }
    if(item12 != null){
        document.querySelector('.item12').innerHTML = item12.quantity;
    }
    if(item13 != null){
        document.querySelector('.item13').innerHTML = item13.quantity;
    }
    if(item14 != null){
        document.querySelector('.item14').innerHTML = item14.quantity;
    }
    if(item15 != null){
        document.querySelector('.item15').innerHTML = item15.quantity;
    }
    if(item16 != null){
        document.querySelector('.item16').innerHTML = item16.quantity;
    }
    if(item17 != null){
        document.querySelector('.item17').innerHTML = item17.quantity;
    }
    if(item18 != null){
        document.querySelector('.item18').innerHTML = item18.quantity;
    }
    if(item19 != null){
        document.querySelector('.item19').innerHTML = item19.quantity;
    }
    if(item20 != null){
        document.querySelector('.item20').innerHTML = item20.quantity;
    }
    if(item21 != null){
        document.querySelector('.item21').innerHTML = item21.quantity;
    }
    if(item22 != null){
        document.querySelector('.item22').innerHTML = item22.quantity;
    }
    if(item23 != null){
        document.querySelector('.item23').innerHTML = item23.quantity;
    }
}


if(localStoragePages != null){
    const pageObj = JSON.parse(localStoragePages);
    const pageArr = pageObj.goodsCard
    const newArr = pageArr.map((url) => url.replace('basket-goods', 'goods'));
    arrUrls.push(...newArr);
}


//Подшрузка товаров
function loadGoods(url){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Обработка данных, полученных от сервера
            goodsContainer.innerHTML = goodsContainer.innerHTML + xhr.responseText;
        }
    };
    xhr.open("GET", url, true); // Метод GET и асинхронный режим
    xhr.send();
}

function arrUrl(arr){
    arr.forEach(function(url){
        loadGoods(url)
    })
}
arrUrl(arrUrls)

function discount(){
    const element = document.querySelector('.sale');
    if (element) {
        body.classList.add('discount')
    } else {
        body.classList.remove('discount')
    }
}

//Общая стоимость определенной карточки
function allPriceCountItem(){
    const oneCard = document.querySelectorAll('.product');
    oneCard.forEach(function(card){
        const quantityTotal = parseFloat(card.querySelector('.quantity-item').innerHTML);
        const price = parseFloat(card.querySelector('.product__price').innerHTML.replace('$', ''));
        const totalSum = card.querySelector('.product__price-total');
        const res = quantityTotal * price;
        totalSum.innerHTML = `$${res.toFixed(2)}` ;
    })
}



//Общая скидка
function allDiscount() {
    const oldPrice = document.querySelectorAll('.product__old-price')
    let res = 0;
    oldPrice.forEach(function(price){
        var discountValue = parseFloat(price.getAttribute('data-discount'));
        res = res + discountValue;
    });
    discountPrice.innerHTML = `-$${res.toFixed(2)}`
}

//Общая стоимость
function totalPriceNew() {
    const onePrice = document.querySelectorAll('.product__price-total');
    const discountSum = parseFloat(discountPrice.innerHTML.replace('$', ''));
    let res = 0;
    onePrice.forEach(function(price){
        var num = parseFloat(price.innerHTML.replace('$', ''));
        res = res + num ;
    });
    res = res + Math.abs(discountSum);
    totalPrice.innerHTML = `$${res.toFixed(2) }`
}

//Общая стоимость со скидкой и доставкой
function allTotalPrice() {
    let priceOne = parseFloat(totalPrice.innerHTML.replace('$', ''));
    let priceTwo = parseFloat(discountPrice.innerHTML.replace('$', ''));
    let priceThree = parseFloat(delivery.innerHTML.replace('$', ''));
    let sum = priceOne + priceTwo + priceThree;
    allPrice.innerHTML = `$${sum.toFixed(2)}`
}




setTimeout(function(){
    quantityItem();
    allPriceCountItem();
    discount();
    allDiscount();
    totalPriceNew();
    allTotalPrice();
},500);

setTimeout(function(){
    quantityItem();
    allPriceCountItem();
    discount();
    allDiscount();
    totalPriceNew();
    allTotalPrice();
},1000);

setTimeout(function(){
    quantityItem();
    allPriceCountItem();
    discount();
    allDiscount();
    totalPriceNew();
    allTotalPrice();
},1500);
// //калькулятор цены

