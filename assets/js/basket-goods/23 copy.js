setTimeout(function(){
    // JavaScript код
    const thisUrl = '/basket-goods/prenatal/1.html';
    const thisProduct = document.querySelector('#product23')
    const decreaseButtons = thisProduct.getElementsByClassName("decrease");
    const increaseButtons = thisProduct.getElementsByClassName("increase");
    var numberElement = thisProduct.getElementsByClassName("number")[0];
    const item = thisProduct.querySelector('.container');
    const price = thisProduct.querySelector('#price');
    const priceAll = document.querySelectorAll('.basket-product__price');
    const check = thisProduct.querySelector('#check');
    const option = thisProduct.querySelector('#custom-select');
    const basketTotalPrice = document.querySelector('#basket-total-price');
    const productCard = thisProduct.querySelector('#product');
    const exitCard = thisProduct.querySelector('.basket-product__exit');
    const optionLi = thisProduct.querySelectorAll('.li')

    console.log(option.textContent)

    let checked = false;
    const priceInNum = parseFloat(price.textContent.slice(1,6))
    let finishPrice = priceInNum ;



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

    function decreaseNumber() {
        var currentValue = parseInt(numberElement.textContent);
        if(currentValue > 1) {
            numberElement.textContent = currentValue - 1;
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
        if (index !== -1) {
            basketGoods.splice(index, 1);
        }
        thisProduct.remove()
    });

    //Локальное хранилище
    function localStorageFunc () {
            localStorage.setItem('item23', JSON.stringify({
                'checked': checked,
                'days': option.textContent,
                'totalPrice': finishPrice,
            }
        ))
    }













},100);





