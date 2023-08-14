setTimeout(function(){
    // JavaScript код
    const goodsInfo = 'item9';
    const thisUrl = '/dist/basket-goods/minerals/2.html';
    const thisScript = '/assets/js/basket-goods/9.js';
    const thisProduct = document.querySelector('#product9')
    const decreaseButtons = thisProduct.getElementsByClassName("decrease");
    const increaseButtons = thisProduct.getElementsByClassName("increase");
    let numberElement = thisProduct.getElementsByClassName("number")[0];
    const item = thisProduct.querySelector('.container');
    const price = thisProduct.querySelector('#price');
    const priceAll = document.querySelectorAll('.basket-product__price');
    const check = thisProduct.querySelector('#check9');
    const option = thisProduct.querySelector('#custom-select');
    const basketTotalPrice = document.querySelector('#basket-total-price');
    const productCard = thisProduct.querySelector('#product');
    const exitCard = thisProduct.querySelector('.basket-product__exit');
    const optionLi = thisProduct.querySelectorAll('.li')

    console.log(option.textContent)
    

    const priceInNum = parseFloat(price.textContent.slice(1,6))
    let finishPrice = priceInNum ;
    let quantity = '';


    //Оптион 
    function optionFunc(num){
        option.innerHTML = num;
    }


    optionLi.forEach(function(btn,index){
        btn.addEventListener('click', function(){
            optionFunc(optionLi[index].textContent)
        });
    });

    //кнопки + -
    function attachEventHandlers() {
        for (var i = 0; i < decreaseButtons.length; i++) {
            decreaseButtons[i].addEventListener("click", decreaseNumber);
        }
        for (var i = 0; i < increaseButtons.length; i++) {
            increaseButtons[i].addEventListener("click", increaseNumber);
        }
    }

    (function(){
        let localGoodsInfo = JSON.parse(localStorage.getItem(goodsInfo))
        if(localGoodsInfo.quantity > 1){
            numberElement.innerHTML = localGoodsInfo.quantity;
        }
        if(localGoodsInfo.checked){
            check.checked = true;
        }
        option.innerHTML = localGoodsInfo.days
        console.log(localGoodsInfo.checked, 'check')
        totalPrice ()

    }());
    // setInterval(function(){
    //     console.log(localGoodsInfo.checked, 'check')
    // },500)

    function decreaseNumber() {
        var currentValue = parseInt(numberElement.textContent);
        if(currentValue > 1) {
            numberElement.textContent = currentValue - 1;
            quantity = numberElement.textContent
            console.log(numberElement.textContent)
            if(currentValue < 3){
                item.classList.remove('opacity')
            }
        }
        totalPrice ()
        localStorageFunc ()
        basketPrice ()
    }

    function increaseNumber() {
        var currentValue = parseInt(numberElement.textContent);
        numberElement.textContent = currentValue + 1;
        quantity = numberElement.textContent
        console.log(numberElement.textContent)
        if(currentValue > 0){
            item.classList.add('opacity')
        }
        totalPrice ()
        localStorageFunc ()
        basketPrice ()
    }
    attachEventHandlers();

    // Цена товар
    function totalPrice (){
        const quantity = parseFloat(numberElement.textContent);
        const totalPrica = priceInNum * quantity;
        finishPrice = totalPrica.toFixed(2)
        price.innerHTML = `$${finishPrice}`;
    };
    //Цена корзина
    function basketPrice (){
        let sum = 0;
        let res = priceAll.forEach((num, index) =>{
            let thisPrice = parseFloat(num.textContent.slice(1))
            sum += thisPrice 
        })
        basketTotalPrice.innerHTML = `$${sum.toFixed(2)}`
        console.log(sum.toFixed(2))
    }
    basketPrice ()
    // Галочка/дата
    function checkedFun (){
        checked = check.checked
        localStorageFunc ()
    };
    check.addEventListener("change", checkedFun);

    //Удалить това
    exitCard.addEventListener('click',function(){
        const index = basketGoods.indexOf(thisUrl)
        const indexScript = arrScript.indexOf(thisScript)
        basketGoods.splice(index, 1);
        arrScript.splice(indexScript, 1);
        console.log(basketGoods)
        console.log(arrScript)
        localStorage.setItem('goods', JSON.stringify({
            'goodsCard': basketGoods,
            'script': arrScript,
        }))
        localStorage.removeItem(goodsInfo);
        thisProduct.remove()
    });


    //Локальное хранилище
    function localStorageFunc () {
            localStorage.setItem(goodsInfo, JSON.stringify({
                'checked': checked,
                'days': option.textContent,
                'totalPrice': finishPrice,
                'quantity': quantity,
            }
        ))
    }
},100);





